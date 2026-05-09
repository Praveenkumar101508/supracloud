import { NextRequest, NextResponse } from "next/server";

const TO_EMAIL = "rk@supracloud.co.uk";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    } else if (formType === "contact") {
      subject = `New Contact Enquiry — ${body.company || "Unknown"} — ${body.service || "Not specified"}`;
      text = [
        `Form: Contact Enquiry`,
        `Name: ${body.name}`,
        `Company: ${body.company || "Not provided"}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "Not provided"}`,
        `Service Interest: ${body.service || "Not specified"}`,
        `Budget Range: ${body.budget || "Not provided"}`,
        `Requirements: ${body.requirements || "Not provided"}`,
      ].join("\n");
    } else {
      subject = `New Business Brief — ${body.company || "Unknown"} — ${body.service || "Not specified"}`;
      text = [
        `Form: Business Brief`,
        `Company: ${body.company || "Not provided"}`,
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "Not provided"}`,
        `Service Interest: ${body.service || "Not specified"}`,
        `Budget Range: ${body.budget || "Not provided"}`,
        `Requirements: ${body.requirements || "Not provided"}`,
        `Message: ${body.message || "Not provided"}`,
      ].join("\n");
    }

    const apiKey = process.env.EMAIL_SERVICE_API_KEY || process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Graceful degradation — log and return success
      console.log("[contact/route] No email API key configured. Email content:");
      console.log(`To: ${TO_EMAIL}`);
      console.log(`Subject: ${subject}`);
      console.log(text);
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const FROM_EMAIL =
      process.env.EMAIL_FROM ||
      process.env.RESEND_FROM_EMAIL ||
      "onboarding@resend.dev";

    await resend.emails.send({ from: FROM_EMAIL, to: TO_EMAIL, subject, text });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[contact/route] Error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
