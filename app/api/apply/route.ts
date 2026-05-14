import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sanitiseText } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rateLimiter";

// ── Request schema ─────────────────────────────────────────────────────────────

const VALID_ROLES = [
  "AI/ML Engineer",
  "Data Engineer",
  "DevOps / Cloud Engineer",
  "Full-Stack Engineer",
  "Backend Engineer",
  "Data Scientist",
  "Cybersecurity Engineer",
  "Other",
] as const;

const VALID_LEVELS = ["Junior", "Mid", "Senior", "Graduate / Trainee"] as const;

const ApplySchema = z.object({
  name:       z.string().min(1, "Name is required.").max(100),
  email:      z.string().email("Valid email is required.").max(200),
  targetRole: z.enum(VALID_ROLES, { message: "Invalid target role." }),
  level:      z.enum(VALID_LEVELS, { message: "Invalid experience level." }),
  tools:      z.string().max(500).optional().default(""),
  goal:       z.string().min(10, "Goal must be at least 10 characters.").max(2000),
});

// ── Helper: escape HTML entities (prevent email HTML injection) ───────────────

function esc(value: string): string {
  return value
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#x27;");
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const rl = await rateLimit(req);
  if (!rl.success) return rl.response!;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = ApplySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid application data.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const d = parsed.data;

  // Sanitise all free-text fields
  const name  = sanitiseText(d.name, 100);
  const tools = sanitiseText(d.tools, 500);
  const goal  = sanitiseText(d.goal, 2000);
  // targetRole and level are enum-validated — safe to use directly after escaping
  const targetRole = d.targetRole;
  const level      = d.level;
  const email      = d.email; // validated as RFC email by Zod

  if (!process.env.RESEND_API_KEY) {
    // Accept silently if email not configured — don't expose config state
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from:    "SupraCloud <applications@supracloud.co.uk>",
      to:      ["rk@supracloud.co.uk"],
      replyTo: email,
      subject: `New Application: ${esc(name)} — ${esc(targetRole)}`,
      // All dynamic values escaped before insertion into HTML
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:8px;">
          <div style="background:#0A192F;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:22px;">New Application Received</h1>
            <p style="color:#10B981;margin:8px 0 0;">SupraCloud</p>
          </div>
          <div style="background:#ffffff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;font-weight:bold;color:#64748b;width:160px;vertical-align:top;">Full Name</td>
                <td style="padding:10px 0;color:#111827;">${esc(name)}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:10px 0;font-weight:bold;color:#64748b;vertical-align:top;">Email</td>
                <td style="padding:10px 0;"><a href="mailto:${esc(email)}" style="color:#10B981;">${esc(email)}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:bold;color:#64748b;vertical-align:top;">Target Role</td>
                <td style="padding:10px 0;color:#111827;">${esc(targetRole)}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:10px 0;font-weight:bold;color:#64748b;vertical-align:top;">Experience Level</td>
                <td style="padding:10px 0;color:#111827;">${esc(level)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:bold;color:#64748b;vertical-align:top;">Tools Known</td>
                <td style="padding:10px 0;color:#111827;">${tools ? esc(tools) : "Not specified"}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:10px 0;font-weight:bold;color:#64748b;vertical-align:top;">Goal</td>
                <td style="padding:10px 0;color:#111827;line-height:1.6;">${esc(goal)}</td>
              </tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-left:4px solid #10B981;border-radius:4px;">
              <p style="margin:0;color:#065f46;font-size:14px;">
                <strong>Next step:</strong> Reply to this email or contact ${esc(name)} directly at
                <a href="mailto:${esc(email)}">${esc(email)}</a> to schedule their assessment call within 48 hours.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Apply] Email send error");
      return NextResponse.json({ error: "Failed to send application." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("[Apply] Unexpected error");
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
