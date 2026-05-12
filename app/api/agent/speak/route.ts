import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sanitiseText } from "@/lib/sanitize";

const RequestSchema = z.object({
  text: z
    .string()
    .min(1, "Text is required.")
    .max(500, "Text must be under 500 characters for TTS."),
});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
// Nova voice — configurable via env, defaults to ElevenLabs "Sarah" (en-GB)
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL";

export async function POST(req: NextRequest) {
  // ── Parse + validate ────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Sanitise — strip any HTML that might have leaked into the text to speak
  const text = sanitiseText(parsed.data.text, 500);

  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "TTS not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key":   ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability:        0.48,
            similarity_boost: 0.76,
            style:            0.12,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Nova speak] ElevenLabs error:", res.status, errText);
      return NextResponse.json({ error: "TTS request failed." }, { status: 502 });
    }

    const audio = await res.arrayBuffer();
    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type":  "audio/mpeg",
        "Cache-Control": "no-store, no-cache",
        // Allow the browser to play cross-origin audio blob
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
    });
  } catch (err) {
    console.error("[Nova speak] Unhandled error:", err);
    return NextResponse.json({ error: "TTS failed." }, { status: 500 });
  }
}
