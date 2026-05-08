import { NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are Aria, SupraCloud's AI pre-sales assistant embedded on the company website.

SupraCloud is a UK-based B2B enterprise technology company. It builds:
- Production-grade autonomous AI agents for banking (fraud triage, customer query automation, document processing) and retail (inventory, personalisation, support automation).
- Enterprise IT Staffing: engineer-screened placement of data engineers, ML engineers, backend engineers, and DevOps specialists.
- Enterprise IT Consultation: technical strategy, AI architecture, and delivery blueprints for regulated industries.
- Talent Programmes: industry-aligned training, graduate internships, and placement year partnerships with universities.

Your role: answer visitor questions honestly, concisely, and confidently. Never invent pricing figures or project timelines — instead direct visitors to book a discovery call for specifics. Keep answers under 80 words. Use plain British English. Do not use bullet points. Speak as a knowledgeable colleague, not a salesperson. If the question is completely outside SupraCloud's scope, say so briefly and redirect.`;

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { answer: "I'm not fully set up yet — please use the Contact page to reach us directly." },
      { status: 200 }
    );
  }

  let question, pathname, visitorName;
  try {
    const body = await request.json();
    question    = (body.question    || "").slice(0, 500);
    pathname    = body.pathname     || "/";
    visitorName = (body.visitorName || "").slice(0, 40);
  } catch {
    return NextResponse.json({ answer: "I didn't catch that - could you rephrase?" });
  }

  if (!question) {
    return NextResponse.json({ answer: "Please ask me a question." });
  }

  const ctxLines = [
    visitorName ? `[Visitor's name: ${visitorName} - address them by name in your reply]` : null,
    pathname && pathname !== "/" ? `[Visitor is on page: ${pathname}]` : null,
  ].filter(Boolean).join("\n");

  const userMessage = ctxLines ? `${ctxLines}\n\nQuestion: ${question}` : `Question: ${question}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic error:", res.status, err);
      return NextResponse.json({
        answer: "I'm having trouble thinking right now. Please try again or contact us directly.",
      });
    }

    const data = await res.json();
    const answer = data.content?.[0]?.text || "I'm not sure — please book a discovery call for a direct answer.";
    return NextResponse.json({ answer });
  } catch (err) {
    console.error("respond route error:", err);
    return NextResponse.json({
      answer: "Something went wrong on my end. Please use the Contact page to reach us.",
    });
  }
}
