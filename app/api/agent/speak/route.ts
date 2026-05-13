// TTS is handled entirely by the browser Web Speech API (SpeechSynthesisUtterance).
// This endpoint is intentionally disabled — return 501 so clients fall through to
// their built-in fallback without delay.
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Server-side TTS is not enabled. Use browser SpeechSynthesis." },
    { status: 501 }
  );
}
