import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "rk@supracloud.co.uk";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

// Supabase is optional — falls back to email only
async function trySupabase(lead: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);
    await supabase.from("aria_leads").insert([{
      name: lead.name,
      email: lead.email,
      company: lead.company,
      role: lead.role,
      challenge: lead.challenge,
      volume: lead.volume,
      timeframe: lead.timeframe,
      source_url: lead.source,
      created_at: lead.timestamp || new Date().toISOString(),
    }]);
  } catch (err) {
    console.error("Supabase lead insert error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();

    // Store in Supabase (if configured)
    await trySupabase(lead);

    // Always send email notification
    const fields = [
      ["Name", lead.name],
      ["Email", lead.email],
      ["Company", lead.company],
      ["Role", lead.role],
      ["Challenge", lead.challenge],
      ["Monthly volume", lead.volume],
      ["Timeframe", lead.timeframe],
      ["Source URL", lead.source],
      ["Captured at", lead.timestamp],
    ];

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Aria Lead — ${lead.name || "Unknown"} @ ${lead.company || "Unknown Company"}`,
      text: fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    // Return success anyway — don't break UX for a logging failure
    return NextResponse.json({ success: true });
  }
}
