import type { NextRequest } from "next/server";
import { z } from "zod";
import { site } from "@/content/site";

const isTest =
  process.env.NODE_ENV === "test" ||
  process.env.VERCEL === "true" ||
  process.env.CI === "true";

const bodySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

async function sendEmail(to: string, subject: string, text: string) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://pierre-mvita.vercel.app";

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Inter, system-ui, sans-serif; background: #070705; color: #f4f0e6; line-height: 1.6; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background: #0e0d0a; border: 1px solid #2a2720; border-radius: 8px; padding: 24px;">
          <h1 style="font-family: Instrument Serif, serif; color: #d4af5a;">New message from ${site?.name ?? "Pierre Mvita"}</h1>
          <p style="color: #8a8578; font-size: 14px;">From: ${to}</p>
          <h2 style="color: #f0d78c; margin-top: 20px;">Subject</h2>
          <p style="background: #1a1812; padding: 12px; border-radius: 4px;">${subject}</p>
          <h2 style="color: #f0d78c; margin-top: 20px;">Message</h2>
          <div style="background: #1a1812; padding: 16px; border-radius: 4px; white-space: pre-wrap; font-family: 'Geist Mono', monospace; font-size: 14px;">${text}</div>
          <p style="color: #8a8578; font-size: 12px; margin-top: 24px; border-top: 1px solid #2a2720; padding-top: 12px;">
            This message was sent from your portfolio at ${baseUrl}
          </p>
        </div>
      </body>
    </html>
  `.replace(/></g, ">\n<");

  const apiKey = process.env.RESEND_API_KEY ?? process.env.SENDGRID_API_KEY;
  const from = `Portfolio <${process.env.RESEND_FROM ?? "hello@pierre-mvita.vercel.app"}>`;
  const toAddr = process.env.RESEND_TO ?? site.contact.email;

  if (!apiKey) {
    if (!isTest) {
      console.warn("[contact] No email API key configured — dropping message");
    }
    return { ok: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: toAddr, subject, html }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Resend error: ${res.status} ${JSON.stringify(data)}`);
  }

  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const parsed = bodySchema.safeParse(raw);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, subject, message } = parsed.data;

    let body = `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;
    await sendEmail(email, subject, body);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] POST failed:", err);
    if (process.env.NODE_ENV !== "production") {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
    return Response.json({ error: "Could not send your message" }, { status: 500 });
  }
}
