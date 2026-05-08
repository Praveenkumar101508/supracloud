import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL"; // default: Bella

  if (!apiKey) {
    return new NextResponse("ElevenLabs not configured", { status: 503 });
  }

  let text;
  try {
    const body = await request.json();
    text = (body.text || "").slice(0, 1000); // cap at 1000 chars
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  if (!text) {
    return new NextResponse("Missing text", { status: 400 });
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2",
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.1,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("ElevenLabs error:", res.status, err);
    return new NextResponse("TTS service error", { status: 502 });
  }

  const audioBuffer = await res.arrayBuffer();

  return new NextResponse(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
