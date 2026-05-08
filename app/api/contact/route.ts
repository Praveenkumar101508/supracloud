import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "rk@supracloud.co.uk";
const FROM_EMAIL =
  process.env.EMAIL_FROM ||
  process.env.RESEND_FROM_EMAIL ||
  "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resend = new Resend(
      process.env.EMAIL_SERVICE_API_KEY || process.env.RESEND_API_KEY || ""
    );
    const { formType } = body;

    let subject: string;
    let text: string;

    if (formType === "candidate") {
      subject = `New Candidate Enquiry — ${body.name}`;
      text = [
        `Form: Candidate Enquiry`,
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Current Role: ${body.currentRole || "Not provided"}`,
        `Target Role: ${body.targetRole || "Not provided"}`,
        `Message: ${body.message || "Not provided"}`,
      ].join("\n");
    } else {
      subject = `New Business Brief — ${body.company} — ${body.service}`;
      text = [
        `Form: Business Brief`,
        `Company: ${body.company}`,
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Service Interest: ${body.service}`,
        `Requirements: ${body.requirements || "Not provided"}`,
      ].join("\n");
    }

    await resend.emails.send({ from: FROM_EMAIL, to: TO_EMAIL, subject, text });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
