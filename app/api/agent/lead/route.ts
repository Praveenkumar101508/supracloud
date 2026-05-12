import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { sanitiseText, hashIp } from "@/lib/sanitize";

const resend    = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL  = "rk@supracloud.co.uk";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

// ── Request schema ────────────────────────────────────────────────────────────

const LeadSchema = z.object({
  name:      z.string().max(100).optional().default(""),
  email:     z.string().email().max(200).optional().default(""),
  company:   z.string().max(200).optional().default(""),
  role:      z.string().max(200).optional().default(""),
  challenge: z.string().max(1000).optional().default(""),
  volume:    z.string().max(200).optional().default(""),
  timeframe: z.string().max(200).optional().default(""),
  source:    z.string().max(500).optional().default(""),
  timestamp: z.string().max(50).optional(),
  sessionId: z.string().max(100).optional().default(""),
});

// ── Lead scoring ──────────────────────────────────────────────────────────────

function scoreLead(lead: z.infer<typeof LeadSchema>): number {
  let score = 0;
  if (lead.email?.includes("@") && !lead.email.includes("@gmail") &&
      !lead.email.includes("@yahoo") && !lead.email.includes("@hotmail")) score += 30;
  if (lead.company) score += 20;
  if (lead.role)    score += 10;
  if (lead.challenge && lead.challenge.length > 50) score += 20;
  if (lead.timeframe?.toLowerCase().includes("urgent") ||
      lead.timeframe?.toLowerCase().includes("asap") ||
      lead.timeframe?.toLowerCase().includes("immediately")) score += 20;
  return Math.min(score, 100);
}

// ── Supabase storage (best-effort) ────────────────────────────────────────────

async function storeInSupabase(
  lead: z.infer<typeof LeadSchema>,
  score: number
): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    await supabase.from("nova_leads").insert([{
      session_id: lead.sessionId || null,
      name:       sanitiseText(lead.name || "", 100),
      email:      lead.email || null,
      company:    sanitiseText(lead.company || "", 200),
      role:       sanitiseText(lead.role || "", 200),
      challenge:  sanitiseText(lead.challenge || "", 1000),
      volume:     sanitiseText(lead.volume || "", 200),
      timeframe:  sanitiseText(lead.timeframe || "", 200),
      source_url: lead.source || null,
      score,
      created_at: lead.timestamp || new Date().toISOString(),
    }]);
  } catch (err) {
    console.error("[Nova lead] Supabase insert error:", err);
  }
}

// ── Audit log ─────────────────────────────────────────────────────────────────

async function auditLog(
  action: string,
  ipHash: string,
  metadata: Record<string, unknown>
): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);
    await supabase.from("audit_log").insert([{ action, ip_hash: ipHash, metadata }]);
  } catch {}
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid lead data.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const lead  = parsed.data;
  const score = scoreLead(lead);
  const ip    = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const ipHash = hashIp(ip);

  // Store in Supabase and audit log concurrently (non-blocking)
  await Promise.allSettled([
    storeInSupabase(lead, score),
    auditLog("nova_lead_captured", ipHash, { score, company: lead.company }),
  ]);

  // Email notification (always send — don't fail UX for a logging failure)
  if (process.env.RESEND_API_KEY) {
    const fields: [string, string | undefined][] = [
      ["Name",       lead.name],
      ["Email",      lead.email],
      ["Company",    lead.company],
      ["Role",       lead.role],
      ["Challenge",  lead.challenge],
      ["Volume",     lead.volume],
      ["Timeframe",  lead.timeframe],
      ["Source URL", lead.source],
      ["Lead Score", `${score}/100`],
      ["Captured at", lead.timestamp || new Date().toISOString()],
    ];

    try {
      await resend.emails.send({
        from:    FROM_EMAIL,
        to:      TO_EMAIL,
        subject: `🔥 Nova Lead [${score}/100] — ${lead.name || "Unknown"} @ ${lead.company || "Unknown"}`,
        text:    fields
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n"),
      });
    } catch (err) {
      console.error("[Nova lead] Email error:", err);
    }
  }

  // Always return success — don't expose internal state
  return NextResponse.json({ success: true }, { status: 200 });
}
