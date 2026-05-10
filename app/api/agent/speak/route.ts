import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
// Aria voice — ElevenLabs "Sarah" (en-GB) or custom voice ID
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json({ error: "TTS not configured" }, { status: 500 });
    }

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.48,
            similarity_boost: 0.76,
            style: 0.12,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("ElevenLabs error:", res.status, errText);
      return NextResponse.json({ error: "TTS request failed" }, { status: 500 });
    }

    const audio = await res.arrayBuffer();
    return new NextResponse(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("speak route error:", err);
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }
}
