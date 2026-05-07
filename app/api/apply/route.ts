import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, targetRole, level, tools, goal } = await req.json();

    if (!name || !email || !targetRole || !level || !goal) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const { error } = await resend.emails.send({
      from: "SupraCloud <applications@supracloud.co.uk>",
      to: ["rk@supracloud.co.uk"],
      replyTo: email,
      subject: `New Application: ${name} — ${targetRole}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 32px; border-radius: 8px;">
          <div style="background: #0A192F; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Application Received</h1>
            <p style="color: #10B981; margin: 8px 0 0;">SupraCloud</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; width: 160px; vertical-align: top;">Full Name</td>
                <td style="padding: 10px 0; color: #111827;">${name}</td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #10B981;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Target Role</td>
                <td style="padding: 10px 0; color: #111827;">${targetRole}</td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Experience Level</td>
                <td style="padding: 10px 0; color: #111827;">${level}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Tools Known</td>
                <td style="padding: 10px 0; color: #111827;">${tools || "Not specified"}</td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Goal</td>
                <td style="padding: 10px 0; color: #111827; line-height: 1.6;">${goal}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-left: 4px solid #10B981; border-radius: 4px;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                <strong>Next step:</strong> Reply to this email or contact ${name} directly at <a href="mailto:${email}">${email}</a> to schedule their assessment call within 48 hours.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Error]", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Apply Route Error]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
