/**
 * Nova conversation feedback.
 * POST { messageId, helpful: boolean } → store thumbs up/down in nova_feedback
 *
 * Powers the self-learning loop — negative feedback is reviewed weekly
 * to improve agentPersonality.js and the RAG knowledge base.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rateLimiter";

const FeedbackSchema = z.object({
  messageId: z.string().uuid("messageId must be a valid UUID."),
  helpful:   z.boolean(),
});

export async function POST(req: NextRequest) {
  const rl = await rateLimit(req);
  if (!rl.success) return rl.response!;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = FeedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid feedback data.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { messageId, helpful } = parsed.data;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // Supabase not configured — accept silently (don't break UX)
    return NextResponse.json({ success: true }, { status: 200 });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    // Upsert — one feedback per message (replace if user changes their mind)
    await supabase
      .from("nova_feedback")
      .upsert(
        [{ message_id: messageId, helpful }],
        { onConflict: "message_id" }
      );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Nova feedback] Supabase error:", err);
    return NextResponse.json({ success: true }, { status: 200 }); // fail silently
  }
}
