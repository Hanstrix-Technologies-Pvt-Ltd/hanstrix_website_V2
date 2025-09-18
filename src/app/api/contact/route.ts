// app/api/contact/route.ts
"use server";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/** ===== Brand / contact ===== */
const COMPANY_NAME = "Hanstrix Technologies";
const SITE_URL = "https://hanstrixtechnologies.com";
const TEAM_INBOX = "info@hanstrix.com";
const SUPPORT_PHONE_LABEL = "+91 97043 28648";
const SUPPORT_PHONE_TEL = SUPPORT_PHONE_LABEL.replace(/[^\d+]/g, "");

/** ===== SMTP (Zoho India) ===== */
const FROM_EMAIL = "info@hanstrix.com";
const SMTP_HOST = "smtp.zoho.in";
const SMTP_PORT = 465;
const SMTP_SECURE = true;
const SMTP_USER = FROM_EMAIL;
const SMTP_PASS = "UFMUMCUjesg7"; // your Zoho app password

type Payload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

/* ---------- validation ---------- */
type FieldErrors = Record<string, string>;
function validate(p: Partial<Payload>): { ok: boolean; errors?: FieldErrors } {
  const errors: FieldErrors = {};
  if (!p.name || p.name.trim().length < 2) errors.name = "Name is required";
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email))
    errors.email = "Valid email required";
  if (!p.subject || p.subject.trim().length < 2)
    errors.subject = "Subject required";
  if (!p.message || p.message.trim().length < 5)
    errors.message = "Message too short";
  return { ok: Object.keys(errors).length === 0, errors };
}

/* ---------- email utils & templates ---------- */

const UI = {
  bg: "#0b1220",
  card: "#0f172a",
  text: "#e5e7eb",
  sub: "#a5b4fc",
  link: "#22d3ee",
  line: "#1f2937",
  brand: "#67e8f9",
  btnL: "#06b6d4",
  btnR: "#8b5cf6",
};

const siteHost = SITE_URL.replace(/^https?:\/\//, "");

const pre = (t: string) =>
  `<div style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;visibility:hidden;">${t}</div>`;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));

const firstName = (n: string) => (n || "").trim().split(/\s+/)[0] || "there";

function formatMessageHTML(message: string): string {
  const safe = escapeHtml(message).trim();
  if (!safe) return "—";
  const lines = safe.split(/\r?\n/);
  const html = lines
    .map((ln) => {
      if (/^\s*([*-]|\d+\.)\s+/.test(ln)) {
        return `<div>• ${ln.replace(/^\s*([*-]|\d+\.)\s+/, "")}</div>`;
      }
      return `<p style="margin:0 0 10px 0">${ln || "&nbsp;"}</p>`;
    })
    .join("");
  return html;
}

/** Outlook-safe gradient button */
function ctaButton(href: string, label: string) {
  const l = escapeHtml(label);
  return `
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${href}" arcsize="50%" stroke="f" fillcolor="${UI.btnL}" style="height:44px;v-text-anchor:middle;width:280px;">
    <v:fill type="gradient" color="${UI.btnL}" color2="${UI.btnR}" />
    <w:anchorlock/>
    <center style="color:#ffffff;font-family:Segoe UI,Arial,sans-serif;font-size:16px;font-weight:700;">${l}</center>
  </v:roundrect>
  <![endif]-->
  <!--[if !mso]><!-- -->
  <a href="${href}"
     style="display:inline-block;padding:12px 20px;border-radius:999px;background-image:linear-gradient(90deg,${UI.btnL},${UI.btnR});color:#ffffff !important;font-weight:700;font-size:16px;text-decoration:none;">
    ${l}
  </a>
  <!--<![endif]-->`;
}

/** Responsive wrapper:
 *  - Desktop: two-column label/value
 *  - Mobile: stacks label above value (no wasted space)
 */
function wrap(title: string, preheader: string, inner: string) {
  return `<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(title)}</title>
<style>
  body{margin:0;background:${UI.bg};-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  a{color:${UI.link};text-decoration:underline}
  .container{padding:20px 12px}
  .card{max-width:640px;margin:0 auto;background:${UI.card};border-radius:16px;overflow:hidden;border:1px solid ${UI.line}}
  .header{padding:18px 20px;border-bottom:1px solid ${UI.line}}
  .brand{font:800 18px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,'Helvetica Neue',sans-serif;color:${UI.brand}}
  .pad{padding:18px 20px}
  .rowline{height:1px;background:${UI.line};opacity:.6;margin:6px 0}
  .kv-label{width:150px;color:#94a3b8;font-size:14px;vertical-align:top;padding:12px 0}
  .kv-value{color:${UI.text};font-size:15px;line-height:1.55;padding:12px 0}
  .footer{color:#9ca3af;font:400 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,'Helvetica Neue',sans-serif;text-align:center;margin:12px 0 0}
  @media only screen and (max-width:480px){
    .pad{padding:16px 14px}
    .header{padding:16px 14px}
    .kv-label,.kv-value{display:block !important; width:100% !important; padding:10px 0 4px 0 !important}
    .kv-value{padding:0 0 12px 0 !important}
    .rowline{margin:10px 0 !important}
  }
</style>
</head>
<body style="background:${UI.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,'Helvetica Neue',sans-serif;color:${UI.text}">
${pre(preheader)}
  <div class="container">
    <div class="card">
      <div class="header"><div class="brand">${COMPANY_NAME}</div></div>
      <div class="pad">
        ${inner}
      </div>
    </div>
    <div class="footer">© ${new Date().getFullYear()} ${COMPANY_NAME} • <a href="${SITE_URL}" style="color:${UI.link}">${siteHost}</a></div>
  </div>
</body>
</html>`;
}

/** One responsive “row”: label + value + subtle separator */
function row(label: string, valueHTML: string) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td class="kv-label">${escapeHtml(label)}</td>
      <td class="kv-value">${valueHTML}</td>
    </tr>
  </table>
  <div class="rowline"></div>`;
}

/** --- Admin email --- */
function adminHtml(p: Payload) {
  const preheader = `New contact from ${p.name} — ${p.subject}`;
  const replyHref = `mailto:${p.email}?subject=${encodeURIComponent("Re: " + p.subject)}`;

  const inner = `
    <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.25;color:${UI.brand};font-weight:800">New Message</h1>
    <p style="margin:0 0 14px 0;color:${UI.sub};font-size:14px">You received a new message from your website contact form.</p>

    ${row("Name", escapeHtml(p.name))}
    ${row("Email", `<a href="mailto:${p.email}" style="color:${UI.link};text-decoration:underline">${p.email}</a>`)}
    ${row("Phone", p.phone
        ? `<a href="tel:${p.phone.replace(/[^\d+]/g,"")}" style="color:${UI.link};text-decoration:underline">${escapeHtml(p.phone)}</a>`
        : "—")}
    ${row("Subject", escapeHtml(p.subject))}
    ${row("Message", formatMessageHTML(p.message))}

    <div style="margin:10px 0 0 0;color:${UI.sub};font-size:14px">Quick actions:</div>
    <div style="margin:8px 0 0 0">${ctaButton(replyHref, `Reply to ${escapeHtml(p.name)}`)}</div>
    <div style="margin-top:10px;color:${UI.sub};font-size:13px">
      or call <a href="tel:${SUPPORT_PHONE_TEL}" style="color:${UI.link};text-decoration:underline">${SUPPORT_PHONE_LABEL}</a>
    </div>
  `;
  return wrap(`New message — ${p.subject}`, preheader, inner);
}

/** --- User email --- */
function userHtml(p: Payload) {
  const preheader = `Thanks ${firstName(p.name)} — we received your message`;

  const inner = `
    <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.25;color:${UI.brand};font-weight:800">Thanks for Contacting Us</h1>
    <p style="margin:0 0 14px 0;color:${UI.sub};font-size:14px">Hi ${escapeHtml(firstName(p.name))}, we’ve received your message.</p>

    ${row("Subject", escapeHtml(p.subject))}
    ${row("Your message", formatMessageHTML(p.message))}

    <p style="margin:12px 0 16px 0;color:${UI.sub};font-size:14px">
      Need something urgent? Reply to this email or call us at
      <a href="tel:${SUPPORT_PHONE_TEL}" style="color:${UI.link};text-decoration:underline">${SUPPORT_PHONE_LABEL}</a>.
      You can also email <a href="mailto:${TEAM_INBOX}" style="color:${UI.link};text-decoration:underline">${TEAM_INBOX}</a>.
    </p>

    <div style="text-align:center;margin:8px 0 0 0;">
      ${ctaButton(SITE_URL, "Visit Hanstrix Technologies")}
    </div>
  `;
  return wrap(`Thanks for contacting ${COMPANY_NAME}`, preheader, inner);
}

/** --- Plain text fallbacks --- */
function adminText(p: Payload) {
  return `${COMPANY_NAME} — New Contact
Name: ${p.name}
Email: ${p.email}
Phone: ${p.phone || "-"}
Subject: ${p.subject}
Message:
${p.message}

Reply: ${p.email}
Call: ${SUPPORT_PHONE_TEL}
`;
}
function userText(p: Payload) {
  return `Thanks for contacting ${COMPANY_NAME}, ${p.name}!

Subject: ${p.subject}
Your message:
${p.message}

We’ll get back to you shortly. Reply to this email or call ${SUPPORT_PHONE_TEL}.
${SITE_URL}
`;
}

/* ---------- route handler ---------- */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const payload: Payload = {
      name: String(body.name || ""),
      email: String(body.email || ""),
      phone: String(body.phone || ""),
      subject: String(body.subject || ""),
      message: String(body.message || ""),
    };

    const v = validate(payload);
    if (!v.ok) {
      return NextResponse.json(
        { message: "Validation failed", errors: v.errors },
        { status: 400 }
      );
    }

    // Admin notification (from shows “User Name via Hanstrix”)
    await transporter.sendMail({
      from: `"${payload.name} via Hanstrix" <${FROM_EMAIL}>`,
      to: TEAM_INBOX,
      replyTo: payload.email,
      subject: `New Message — ${payload.subject}`.slice(0, 180),
      html: adminHtml(payload),
      text: adminText(payload),
    });

    // Auto-reply to visitor
    await transporter.sendMail({
      from: `${COMPANY_NAME} <${TEAM_INBOX}>`,
      to: payload.email,
      replyTo: TEAM_INBOX,
      subject: `Thanks for contacting ${COMPANY_NAME}`,
      html: userHtml(payload),
      text: userText(payload),
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (e) {
    console.error("contact API error", e);
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
  }
}
