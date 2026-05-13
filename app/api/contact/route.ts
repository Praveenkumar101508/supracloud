import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { sanitiseText } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rateLimiter";

const TO_EMAIL = "rk@supracloud.co.uk";

const INQUIRY_TYPES = ["client", "partnership", "talent"] as const;

const ContactSchema = z.object({
  inquiryType: z.enum(INQUIRY_TYPES).optional().default("talent"),
  name:        z.string().min(1, "Name is required.").max(100),
  email:       z.string().email("Valid email is required.").max(200),
  company:     z.string().max(200).optional().default(""),
  phone:       z.string().max(30).optional().default(""),
  service:     z.string().max(200).optional().default(""),
  message:     z.string().max(5000).optional().default(""),
});

export async function POST(req: NextRequest) {
  const rl = await rateLimit(req);
  if (!rl.success) return rl.response!;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const d = parsed.data;

  // Sanitise all free-text fields
  const name    = sanitiseText(d.name, 100);
  const company = sanitiseText(d.company, 200);
  const message = sanitiseText(d.message, 5000);
  const service = sanitiseText(d.service, 200);

  let subject: string;
  let text: string;

  if (d.inquiryType === "client") {
    subject = `New Enterprise Client Enquiry — ${company || name}`;
    text = [
      "Form: Enterprise Client Enquiry",
      `Name: ${name}`,
      `Company: ${company || "Not provided"}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || "Not provided"}`,
      `Service Interest: ${service || "Not provided"}`,
      `Requirements: ${message || "Not provided"}`,
    ].join("\n");
  } else if (d.inquiryType === "partnership") {
    subject = `New Partnership Enquiry — ${company || name}`;
    text = [
      "Form: Partnership Enquiry",
      `Name: ${name}`,
      `Organisation: ${company || "Not provided"}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || "Not provided"}`,
      `Partnership Type: ${service || "Not provided"}`,
      `Details: ${message || "Not provided"}`,
    ].join("\n");
  } else {
    subject = `New Talent Programme Enquiry — ${name}`;
    text = [
      "Form: Talent Programme Enquiry",
      `Name: ${name}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || "Not provided"}`,
      `Programme Interest: ${service || "Not provided"}`,
      `Message: ${message || "Not provided"}`,
    ].join("\n");
  }

  try {
    const resend    = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    await resend.emails.send({ from: fromEmail, to: TO_EMAIL, subject, text });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Contact] Email send error:", message);
    // Don't expose internal errors to the client
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
