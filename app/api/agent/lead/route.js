import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function buildEmailHtml(lead) {
  const rows = [
    ["Name",        lead.name      || "-"],
    ["Company",     lead.company   || "-"],
    ["Role",        lead.role      || "-"],
    ["Challenge",   lead.challenge || "-"],
    ["Volume",      lead.volume    || "-"],
    ["Timeframe",   lead.timeframe || "-"],
    ["Email",       lead.email     || "-"],
    ["Source page", lead.source    || "-"],
    ["Timestamp",   lead.timestamp || new Date().toISOString()],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#f8fafc;font-weight:600;font-size:13px;color:#374151;white-space:nowrap;border-bottom:1px solid #e2e8f0;">${label}</td>
        <td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #e2e8f0;">${value}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="background:linear-gradient(135deg,#0a192f,#1e293b);padding:24px 28px;">
      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#10b981;">New Lead via Aria</p>
      <h1 style="margin:6px 0 0;font-size:22px;font-weight:800;color:#fff;">
        ${lead.name ? `${lead.name} wants a call` : "New discovery call request"}
      </h1>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        ${tableRows}
      </table>
      ${lead.email && lead.email.includes("@") ? `
      <div style="margin-top:20px;">
        <a href="mailto:${lead.email}?subject=SupraCloud Discovery Call - ${encodeURIComponent(lead.name || "New Lead")}"
           style="display:inline-block;padding:11px 22px;background:#10b981;color:#fff;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;">
          Reply to ${lead.name || lead.email}
        </a>
      </div>` : ""}
    </div>
    <div style="padding:14px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:11px;color:#94a3b8;">Captured by Aria voice agent on supracloud.co.uk</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request) {
  let lead;
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const errors = [];

  // ── 1. Send email via Resend ──────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@supracloud.co.uk";
  const toEmail   = process.env.LEAD_TO_EMAIL     || "rk@supracloud.co.uk";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: `Aria at SupraCloud <${fromEmail}>`,
        to:   [toEmail],
        subject: `New lead: ${lead.name || "Unknown"} from ${lead.company || "Unknown company"} - ${lead.timeframe || "no timeframe"}`,
        html: buildEmailHtml(lead),
        replyTo: lead.email || undefined,
      });
    } catch (err) {
      console.error("Resend error:", err);
      errors.push("email");
    }
  }

  // ── 2. Post to webhook (Zapier / Make / n8n → Google Sheets) ─────────────
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      lead.name      || "",
          company:   lead.company   || "",
          role:      lead.role      || "",
          challenge: lead.challenge || "",
          volume:    lead.volume    || "",
          timeframe: lead.timeframe || "",
          email:     lead.email     || "",
          source:    lead.source    || "",
          timestamp: lead.timestamp || new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Webhook error:", err);
      errors.push("webhook");
    }
  }

  return NextResponse.json({ ok: true, errors });
}
