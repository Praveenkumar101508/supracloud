import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = "rk@supracloud.co.uk";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://supracloud.co.uk";

// Add your permanent Google Meet link to .env.local as MEET_LINK
// e.g. MEET_LINK=https://meet.google.com/xxx-xxxx-xxx
const MEET_LINK = process.env.MEET_LINK || "https://meet.google.com/";

// ── Client confirmation email ──────────────────────────────────────────────
function clientHtml(d: {
  name: string;
  firstName: string;
  company: string;
  inquiryType: string;
  slots: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Discovery Call Confirmed — SupraCloud</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:48px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

        <!-- Top accent bar -->
        <tr><td style="background:linear-gradient(135deg,#0A192F 0%,#0d2137 100%);padding:32px 40px 28px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#10B981;">SUPRACLOUD</p>
          <p style="margin:0;font-size:13px;color:#94a3b8;font-weight:400;">Enterprise AI Agent Development &amp; IT Solutions</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px 0;">

          <p style="margin:0 0 20px;font-size:16px;color:#1e293b;line-height:1.5;">Hi ${d.firstName},</p>

          <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
            Thanks for reaching out to SupraCloud. I&rsquo;ve received your discovery call request and will confirm a time with you within <strong style="color:#0A192F;">1 business day</strong>.
          </p>

          <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">
            In the meantime — here is your Google Meet link for the call:
          </p>

          <!-- Meet link CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr><td style="background:#f0fdf4;border:2px solid #10B981;border-radius:12px;padding:20px 24px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#059669;">Your Google Meet Link</p>
              <a href="${MEET_LINK}" style="display:block;font-size:16px;font-weight:700;color:#0A192F;word-break:break-all;margin-bottom:14px;text-decoration:none;">${MEET_LINK}</a>
              <a href="${MEET_LINK}" style="display:inline-block;padding:10px 24px;background:#10B981;color:#ffffff;font-size:13px;font-weight:700;border-radius:8px;text-decoration:none;">
                Join Google Meet &rarr;
              </a>
              <p style="margin:12px 0 0;font-size:12px;color:#6b7280;line-height:1.5;">
                Save this link. Once I confirm the exact date and time, just click it at the agreed slot.
              </p>
            </td></tr>
          </table>

          <!-- Booking summary -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#94a3b8;">Your Request</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:5px 0;font-size:13px;color:#94a3b8;width:38%;">Name</td>
                  <td style="padding:5px 0;font-size:13px;font-weight:600;color:#1e293b;">${d.name}</td>
                </tr>
                ${d.company ? `<tr>
                  <td style="padding:5px 0;font-size:13px;color:#94a3b8;">Organisation</td>
                  <td style="padding:5px 0;font-size:13px;font-weight:600;color:#1e293b;">${d.company}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding:5px 0;font-size:13px;color:#94a3b8;">Topic</td>
                  <td style="padding:5px 0;font-size:13px;font-weight:600;color:#1e293b;">${d.inquiryType}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;font-size:13px;color:#94a3b8;vertical-align:top;">Preferred times</td>
                  <td style="padding:5px 0;font-size:13px;font-weight:600;color:#1e293b;">${d.slots.replace(/\n/g, "<br>")}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- What to expect -->
          <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.7;">Here&rsquo;s what happens next:</p>

          <p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.7;">
            <strong style="color:#0A192F;">1.</strong> I&rsquo;ll reply to this email within 1 business day to confirm the exact date and time.
          </p>
          <p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.7;">
            <strong style="color:#0A192F;">2.</strong> You&rsquo;ll receive a calendar invite to your inbox — just click Accept.
          </p>
          <p style="margin:0 0 28px;font-size:14px;color:#374151;line-height:1.7;">
            <strong style="color:#0A192F;">3.</strong> On the call (30 min), we&rsquo;ll map your requirements and scope a solution — no hard sell.
          </p>

          <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">
            If you need to reach me sooner, just reply to this email or message me on WhatsApp:
            <a href="https://wa.me/447776456694" style="color:#10B981;font-weight:600;"> +44 7776 456694</a>.
          </p>

          <p style="margin:0 0 6px;font-size:15px;color:#374151;">Talk soon,</p>
          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0A192F;">Praveen Kumar</p>
          <p style="margin:0 0 32px;font-size:13px;color:#94a3b8;">Founder · SupraCloud &nbsp;|&nbsp; ex-IBM AI/ML Engineer</p>

          <hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:24px;">
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:0 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:12px;color:#94a3b8;line-height:1.8;">
                <strong style="color:#64748b;">SupraCloud Ltd</strong><br>
                <a href="mailto:rk@supracloud.co.uk" style="color:#10B981;text-decoration:none;">rk@supracloud.co.uk</a>
                &nbsp;&middot;&nbsp;
                <a href="${SITE_URL}" style="color:#10B981;text-decoration:none;">supracloud.co.uk</a>
                <br>Registered in England &amp; Wales
              </td>
              <td align="right" style="vertical-align:top;">
                <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#10B981;">SUPRACLOUD</p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:11px;color:#cbd5e1;line-height:1.6;">
            This email was sent to you because you submitted a discovery call request on supracloud.co.uk.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Owner notification email ───────────────────────────────────────────────
function ownerHtml(d: {
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  slots: string;
  message: string;
}) {
  const replySubject = encodeURIComponent(`Re: SupraCloud Discovery Call — confirming your slot`);
  const replyBody = encodeURIComponent(
    `Hi ${d.name},\n\nThanks for your interest in SupraCloud.\n\nI'd like to confirm your discovery call for [DATE] at [TIME] GMT.\n\nYour Google Meet link: ${MEET_LINK}\n\nI'll send a calendar invite to this email shortly.\n\nLook forward to speaking with you.\n\nBest,\nPraveen\nFounder · SupraCloud`
  );

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:#0A192F;padding:20px 28px;">
          <p style="margin:0 0 2px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#10B981;">NEW BOOKING</p>
          <p style="margin:0;font-size:18px;font-weight:800;color:#fff;">${d.name}${d.company ? ` — ${d.company}` : ""}</p>
        </td></tr>

        <!-- Details -->
        <tr><td style="padding:24px 28px;">

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            ${[
              ["Topic", d.inquiryType],
              ["Name", d.name],
              ["Company", d.company || "—"],
              ["Email", `<a href="mailto:${d.email}" style="color:#10B981;">${d.email}</a>`],
              ["Phone", d.phone || "—"],
              ["Preferred slots", d.slots.replace(/\n/g, "<br>")],
            ].map(([k, v]) => `
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:9px 0;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:34%;vertical-align:top;">${k}</td>
              <td style="padding:9px 0;font-size:14px;color:#1e293b;">${v}</td>
            </tr>`).join("")}
          </table>

          ${d.message ? `
          <div style="background:#f8fafc;border-left:3px solid #10B981;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:20px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">Requirements</p>
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${d.message}</p>
          </div>` : ""}

          <!-- Action buttons -->
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:10px;">
                <a href="mailto:${d.email}?subject=${replySubject}&body=${replyBody}"
                   style="display:inline-block;padding:11px 22px;background:#10B981;color:#fff;font-size:13px;font-weight:700;border-radius:8px;text-decoration:none;">
                  Reply to Confirm Slot
                </a>
              </td>
              <td>
                <a href="${MEET_LINK}"
                   style="display:inline-block;padding:11px 22px;background:#f1f5f9;color:#0A192F;font-size:13px;font-weight:700;border-radius:8px;text-decoration:none;border:1px solid #e2e8f0;">
                  Open Meet Link
                </a>
              </td>
            </tr>
          </table>

          <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;line-height:1.6;">
            Meet link to include in reply: <a href="${MEET_LINK}" style="color:#10B981;">${MEET_LINK}</a>
          </p>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Route handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, inquiryType, slots, message } = body;

    if (!name || !email || !inquiryType || !slots) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const firstName = name.trim().split(" ")[0];

    // 1 — Confirmation email to client
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: OWNER_EMAIL,
      subject: "Your SupraCloud discovery call request — meet link inside",
      html: clientHtml({
        name,
        firstName,
        company: company || "",
        inquiryType,
        slots,
      }),
    });

    // 2 — Notification to owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `📅 New booking: ${name}${company ? ` (${company})` : ""} — ${inquiryType}`,
      html: ownerHtml({
        name,
        company: company || "",
        email,
        phone: phone || "",
        inquiryType,
        slots,
        message: message || "",
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
