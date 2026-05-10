import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const SYSTEM_PROMPT = `You are Aria, SupraCloud's enterprise AI assistant. SupraCloud is a UK-based company that builds production-grade autonomous AI agents for banking and retail enterprises.

Core services:
- Banking AI Agents: L1/L2 customer support, fraud triage, back-office automation. FCA-compliant.
- Retail AI Agents: inventory, omnichannel support, personalisation. 24/7 autonomous.
- Cloud Architecture: AI-ready AWS/Azure infrastructure. ISO 27001 aligned.
- IT Staffing: engineer-screened AI, ML, data and DevOps talent. No recruiters.
- Managed Services: 24/7 monitoring, SLA management, continuous optimisation.
- Academy: graduate internships, cohort training, university placement partnerships.

Key facts:
- UK-based, engineer-led (not sales-led)
- Production agents deployed, not MVPs
- 63% average L1 deflection in banking deployments
- 60% support cost reduction achieved
- 99% uptime SLA
- Typical agent: discovery to production in 6-10 weeks

Rules:
- Keep responses to 2-3 concise sentences max
- Never make up specific pricing numbers — redirect to discovery call
- Be direct and avoid corporate fluff
- If asked about competitors, focus on SupraCloud's engineering-led approach
- Sound professional but warm, like a senior engineer who genuinely wants to help`;

export async function POST(req: NextRequest) {
  try {
    const { question, pathname, visitorName, history = [] } = await req.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        answer: "I'm not fully configured yet. Please reach out via the Contact page or book a call directly.",
      });
    }

    const contextNote = `[Current page: ${pathname || "/"}${visitorName ? ` | Visitor: ${visitorName}` : ""}]`;

    // Build conversation turns from history (last 6 exchanges)
    const recentHistory = history.slice(-12);
    const contents = [
      ...recentHistory.map((msg: { role: string; text: string }) => ({
        role: msg.role === "aria" ? "model" : "user",
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: `${contextNote}\n\n${question}` }],
      },
    ];

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
        topP: 0.9,
      },
    };

    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Gemini error: ${res.status}`);

    const data = await res.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return NextResponse.json({
      answer: answer || "I'm not sure about that — book a 30-minute discovery call and one of our engineers will answer directly.",
    });
  } catch {
    return NextResponse.json({
      answer: "I'm having a little trouble right now. Please try again or use the Contact page to reach us.",
    });
  }
}
