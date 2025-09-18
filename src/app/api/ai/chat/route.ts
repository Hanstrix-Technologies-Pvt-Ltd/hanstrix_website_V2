import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Body:
 * {
 *   message: string;
 *   context?: string;
 *   history?: { role: "user"|"bot"; text: string }[];
 * }
 */
export const runtime = "nodejs";

const apiKey = process.env.GEMINI_API_KEY;
const MODEL_ID = "gemini-2.5-flash";

// Initialize genAI only if apiKey is available
let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

const SYSTEM_PROMPT = `
You are Hanstrix AI Assistant. Help website visitors understand Hanstrix Technologies' services.
Be concise, friendly, and practical. Avoid hallucinations.
Prefer structured answers: short paragraphs, bullet points, and **bold** for key phrases.
When unsure, say so briefly. When appropriate, suggest visiting the Contact page.
`;

export async function POST(req: NextRequest) {
  try {
    if (!apiKey || !genAI) {
      return NextResponse.json({ error: "AI service not configured" }, { status: 503 });
    }

    const { message, context, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid 'message'. Provide a non-empty string." },
        { status: 400 }
      );
    }

    const historyText =
      Array.isArray(history) && history.length
        ? "\n\nConversation so far:\n" +
          history
            .slice(-8)
            .map((m: { role: "user" | "bot"; text: string }) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
            .join("\n")
        : "";

    const ctx = context ? `\n\nPage Context: ${context}` : "";
    const prompt = `${SYSTEM_PROMPT}
${ctx}
${historyText}

Current user message: "${message}"
`;

    const model = genAI.getGenerativeModel({ model: MODEL_ID });
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() ?? "";

    if (!text.trim()) {
      return NextResponse.json({ error: "Empty response from model." }, { status: 502 });
    }

    const safe = text.replace(/<\/?script[^>]*>/gi, "").trim();
    return NextResponse.json({ response: safe });
  } catch (err: Error | unknown) {
    console.error("AI Chat error:", err);
    const msg = err instanceof Error ? err.message : "AI service error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
