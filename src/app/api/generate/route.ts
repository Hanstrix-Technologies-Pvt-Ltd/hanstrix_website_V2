import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import crypto from "crypto";

export const runtime = "nodejs";

/* ===== Config ===== */
const MODEL_ID = "gemini-2.5-flash";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const MIN_PROMPT = 8;
const MAX_PROMPT = 1000;
const MAX_REQ_PER_MIN = 6;   // per IP
const MAX_REQ_PER_HOUR = 60; // per IP

/* ===== Init ===== */
const hasAI = GEMINI_API_KEY.length > 0;
const genAI = hasAI ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

/* ===== Rate limit (memory) ===== */
type Stamp = number;
const perMin = new Map<string, Stamp[]>();
const perHour = new Map<string, Stamp[]>();

function getIP(req: NextRequest): string {
  const xfwd = req.headers.get("x-forwarded-for");
  if (xfwd) return xfwd.split(",")[0]!.trim();
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "0.0.0.0"
  );
}
function prune(list: Stamp[], windowMs: number) {
  const cutoff = Date.now() - windowMs;
  let i = 0;
  while (i < list.length && list[i] < cutoff) i++;
  if (i > 0) list.splice(0, i);
}
function touch(ip: string) {
  const now = Date.now();
  const m = perMin.get(ip) ?? [];
  m.push(now); prune(m, 60_000); perMin.set(ip, m);
  const h = perHour.get(ip) ?? [];
  h.push(now); prune(h, 60 * 60_000); perHour.set(ip, h);
  return { m: m.length, h: h.length };
}

/* ===== Small cache across hot reloads ===== */
type Draft = { subject: string; message: string };
type GlobalWithCache = typeof globalThis & { __ai_cache?: Map<string, Draft> };
const g = globalThis as GlobalWithCache;
const cache: Map<string, Draft> = g.__ai_cache ?? new Map();
g.__ai_cache = cache;

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

/* ===== Helpers ===== */
function stripTags(s: string) {
  return s.replace(/<\/?script[^>]*>/gi, "").trim();
}

/** Scrub any greeting, sign-off, or stray "Subject:" if the model slips. */
function cleanMessage(raw: string): string {
  let s = raw.replace(/\r\n/g, "\n").trim();
  s = s.replace(/^\s*(subject\s*:\s*.*)\n+/i, "");                            // Subject:
  s = s.replace(/^(?:hello|hi|dear|greetings|hey)[^,\n]*,\s*\n+/i, "");       // Greeting
  s = s.replace(
    /(?:\n|\r|\r\n)\s*(?:thanks(?: again)?|thank you|best(?: regards)?|kind regards|sincerely|cheers|warm(?: regards)?)[\s\S]*$/i,
    ""
  );                                                                          // Sign-off
  s = s.replace(/\n+\s*\[.*?(name|company).*?\]\s*$/i, "");                   // [Name]
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

function parseJsonDraft(text: string): Draft {
  // try strict JSON first
  const match = text.trim().match(/\{[\s\S]*\}/);
  const candidate = match ? match[0] : text;
  try {
    const parsed = JSON.parse(candidate) as Partial<Draft>;
    const subject = String(parsed.subject ?? "Contact request").slice(0, 120);
    const message = cleanMessage(stripTags(String(parsed.message ?? "")));
    return { subject, message: message || "Please contact me." };
  } catch {
    // fallback: first line = subject, rest = message
    const lines = stripTags(text).split(/\n+/);
    const subject = (lines[0] ?? "Contact request").slice(0, 120);
    const message = cleanMessage(lines.slice(1).join("\n"));
    return { subject, message: message || "Please contact me." };
  }
}

/* ===== System prompt (single call returns both) ===== */
const SYSTEM_PROMPT = `
You are Hanstrix AI Assistant.
Given a user's brief requirement, produce strict JSON:

{
  "subject": "<<=120 chars, concise, specific>",
  "message": "<email body only>"
}

Rules for "message":
- Body only: NO greeting/openers, NO sign-off, NO names.
- Do NOT include a "Subject:" line.
- Professional, concise, specific to the request.
- Short paragraphs or bullets when helpful.
Return ONLY the JSON object (no surrounding text).
`;

/* ===== Handler ===== */
type Ok = { result: Draft };
type Err = { error: string };

export async function POST(req: NextRequest): Promise<NextResponse<Ok | Err>> {
  try {
    if (!hasAI || !genAI) {
      return NextResponse.json<Err>({ error: "AI service not configured" }, { status: 503 });
    }

    const body = (await req.json()) as { prompt?: string };
    const prompt = (body.prompt ?? "").trim();

    if (prompt.length < MIN_PROMPT) {
      return NextResponse.json<Err>({ error: "Please add a bit more detail." }, { status: 400 });
    }
    if (prompt.length > MAX_PROMPT) {
      return NextResponse.json<Err>({ error: `Please keep it under ${MAX_PROMPT} characters.` }, { status: 400 });
    }

    const ip = getIP(req);
    const c = touch(ip);
    if (c.m > MAX_REQ_PER_MIN) {
      const res = NextResponse.json<Err>({ error: "Too many requests — try again in a minute." }, { status: 429 });
      res.headers.set("Retry-After", "60");
      return res;
    }
    if (c.h > MAX_REQ_PER_HOUR) {
      const res = NextResponse.json<Err>({ error: "Hourly limit reached — try again later." }, { status: 429 });
      res.headers.set("Retry-After", "3600");
      return res;
    }

    const key = sha256(prompt);
    const hit = cache.get(key);
    if (hit) return NextResponse.json<Ok>({ result: hit });

    const model = genAI.getGenerativeModel({ model: MODEL_ID, generationConfig: { temperature: 0.5 } });

    const userPrompt =
      `${SYSTEM_PROMPT}\n\nUser requirement:\n"""${prompt}"""\n`;

    const out = await model.generateContent(userPrompt);
    const raw = typeof out?.response?.text === "function" ? out.response.text() : "";
    if (!raw.trim()) {
      return NextResponse.json<Err>({ error: "Empty AI response" }, { status: 502 });
    }

    const draft = parseJsonDraft(raw);
    cache.set(key, draft);
    if (cache.size > 200) {
      const first = cache.keys().next().value as string | undefined;
      if (first) cache.delete(first);
    }

    return NextResponse.json<Ok>({ result: draft });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI service error";
    return NextResponse.json<Err>({ error: msg }, { status: 500 });
  }
}
