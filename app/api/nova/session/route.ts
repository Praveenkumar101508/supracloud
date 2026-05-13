/**
 * Nova session persistence.
 * GET  ?sessionId=xxx  → fetch last 10 messages + visitor name
 * POST { sessionId, role, content, visitorName? } → upsert session + store message
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sanitiseText } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rateLimiter";
import { createClient } from "@supabase/supabase-js";

const UpsertSchema = z.object({
  sessionId:   z.string().min(1).max(100),
  role:        z.enum(["user", "nova"]),
  content:     z.string().min(1).max(3000),
  visitorName: z.string().max(100).optional().default(""),
});

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// ── GET — restore session ─────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const rl = await rateLimit(req);
  if (!rl.success) return rl.response!;
  const sessionId = new URL(req.url).searchParams.get("sessionId");
  if (!sessionId || sessionId.length > 100) {
    return NextResponse.json({ messages: [], visitorName: "" }, { status: 200 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ messages: [], visitorName: "" }, { status: 200 });
  }

  try {
    // Fetch session metadata
    const { data: session } = await supabase
      .from("nova_sessions")
      .select("visitor_name")
      .eq("session_id", sessionId)
      .single();

    // Fetch last 10 messages
    const { data: messages } = await supabase
      .from("nova_messages")
      .select("id, role, content, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(10);

    return NextResponse.json({
      visitorName: session?.visitor_name ?? "",
      messages:    (messages ?? []).map((m: { id: string; role: string; content: string }) => ({
        id:   m.id,
        role: m.role,
        text: m.content,
      })),
    });
  } catch (err) {
    console.error("[Nova session GET] Error:", err);
    return NextResponse.json({ messages: [], visitorName: "" }, { status: 200 });
  }
}

// ── POST — store message ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const rl = await rateLimit(req);
  if (!rl.success) return rl.response!;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const parsed = UpsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const { sessionId, role, content, visitorName } = parsed.data;
  const safeContent     = sanitiseText(content, 3000);
  const safeVisitorName = sanitiseText(visitorName, 100);

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ success: true }, { status: 200 }); // silent no-op
  }

  try {
    // Upsert session (create if new, update last_seen_at if existing)
    await supabase.from("nova_sessions").upsert(
      {
        session_id:    sessionId,
        visitor_name:  safeVisitorName || null,
        last_seen_at:  new Date().toISOString(),
      },
      { onConflict: "session_id", ignoreDuplicates: false }
    );

    // Insert message
    const { data: msg } = await supabase
      .from("nova_messages")
      .insert([{ session_id: sessionId, role, content: safeContent }])
      .select("id")
      .single();

    return NextResponse.json({ success: true, messageId: msg?.id ?? null });
  } catch (err) {
    console.error("[Nova session POST] Error:", err);
    return NextResponse.json({ success: true }, { status: 200 }); // fail silently
  }
}
