import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "rk@supracloud.co.uk";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { inquiryType } = body;

    let subject: string;
    let text: string;

    if (inquiryType === "client") {
      subject = `New Enterprise Client Enquiry — ${body.company || body.name}`;
      text = [
        `Form: Enterprise Client Enquiry`,
        `Name: ${body.name}`,
        `Company: ${body.company || "Not provided"}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "Not provided"}`,
        `Service Interest: ${body.service || "Not provided"}`,
        `Requirements: ${body.message || "Not provided"}`,
      ].join("\n");
    } else if (inquiryType === "partnership") {
      subject = `New Partnership Enquiry — ${body.company || body.name}`;
      text = [
        `Form: Partnership Enquiry`,
        `Name: ${body.name}`,
        `Organisation: ${body.company || "Not provided"}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "Not provided"}`,
        `Partnership Type: ${body.service || "Not provided"}`,
        `Details: ${body.message || "Not provided"}`,
      ].join("\n");
    } else {
      subject = `New Talent Programme Enquiry — ${body.name}`;
      text = [
        `Form: Talent Programme Enquiry`,
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "Not provided"}`,
        `Programme Interest: ${body.service || "Not provided"}`,
        `Message: ${body.message || "Not provided"}`,
      ].join("\n");
    }

    await resend.emails.send({ from: FROM_EMAIL, to: TO_EMAIL, subject, text });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
