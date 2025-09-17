// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const TO = process.env.CONTACT_TO || "mrwinsondong@gmail.com";
const FROM = process.env.CONTACT_FROM || "Portfolio <contact@w1nsonly.me>";


export async function POST(req: Request) {
  try {
    const { name, email, message, website } = await req.json();

    // Honeypot (bots fill hidden "website")
    if (website) return NextResponse.json({ ok: true });

    const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || "");
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !isEmail(email) ||
      message.trim().length < 5
    ) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM,       
      to: TO,           
      subject: "Portfolio Inquiry",
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
