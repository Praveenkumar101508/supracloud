export const AGENT_NAME = "Nova";

// ── Auto-open timing per route (ms, 0 = immediate) ────────────────────────────

export const PAGE_AUTO_OPEN_DELAY = {
  "/":                   35_000,
  "/solutions/banking":  20_000,
  "/solutions/retail":   20_000,
  "/solutions/supermarket": 20_000,
  "/book":               0,
  "/pricing":            25_000,
  "/talent/programs":    30_000,
};

// ── Opening ───────────────────────────────────────────────────────────────────

export const ASK_NAME_SCRIPT =
  "Hi, I'm Nova — SupraCloud's AI assistant. I'm here to help with any questions about our AI agents, enterprise solutions, or talent programmes. Before we start, what's your name?";

export const GREET_BY_NAME = (name) =>
  `Great to meet you, ${name}! What can I help you with today?`;

export const GREET_RETURNING = (name) =>
  `Welcome back, ${name}! What can I help you with today?`;

// ── Per-route contextual opening lines (accept name param) ────────────────────

export const PAGE_SCRIPTS = {
  "/": (name) =>
    `${name ? `Welcome, ${name}. ` : "Welcome to SupraCloud. "}We build production-grade AI agents for banking and retail enterprises, and deliver expert IT staffing and consultation. What would you like to know?`,

  "/about": (name) =>
    `${name ? `${name}, you're ` : "You're "}on our About page. SupraCloud is engineer-led — we bridge the gap between AI research and real enterprise delivery in regulated industries. Any questions?`,

  "/solutions/banking": (name) =>
    `${name ? `${name}, ` : ""}you're exploring our Banking AI Agents. We build autonomous agents for customer queries, fraud triage, and back-office workflows — integrated into existing core banking systems. Want a walkthrough of what's possible?`,

  "/solutions/retail": (name) =>
    `${name ? `${name}, ` : ""}our Retail AI Agents help enterprises automate inventory decisions, personalise customer experiences, and reduce support load significantly. Want to know how we do it?`,

  "/solutions/supermarket": (name) =>
    `${name ? `${name}, ` : ""}you're exploring our Supermarket AI Agents. We automate inventory management, customer support, and supply chain decisions for large-scale retail environments. Want a walkthrough?`,

  "/services/staffing": (name) =>
    `${name ? `${name}, ` : ""}SupraCloud's IT Staffing places engineer-screened talent directly into your team — no recruiters, no CV farming. Need to scale a specific skill set?`,

  "/services/it-staffing": (name) =>
    `${name ? `${name}, ` : ""}SupraCloud IT Staffing places pre-vetted, engineer-screened talent directly into your team — AI engineers, data architects, DevOps specialists. What skill set are you looking to scale?`,

  "/services/consultation": (name) =>
    `${name ? `${name}, ` : ""}our Enterprise IT Consultation helps design AI and data architecture that's production-ready. We specialise in regulated industries. Want to talk through your challenge?`,

  "/talent/programs": (name) =>
    `${name ? `${name}, ` : ""}SupraCloud's Talent Programme is an industry-aligned training pathway for engineers specialising in AI agent development. I can walk you through each tier — which track interests you most?`,

  "/pricing": (name) =>
    `${name ? `${name}, ` : ""}you're on our Pricing page. I can help you understand which tier fits your team — or run a quick ROI estimate if you share your current transaction volume. What would be most useful?`,

  "/talent/partnerships": (name) =>
    `${name ? `${name}, ` : ""}we partner with universities for structured placement years. Students get real AI engineering experience; partners get a ready-trained talent pipeline.`,

  "/talent/internships": (name) =>
    `${name ? `${name}, ` : ""}our Graduate Internship places early-career engineers into live AI delivery projects. Applications are reviewed on a rolling basis.`,

  "/careers/internships": (name) =>
    `${name ? `${name}, ` : ""}you're looking at our Graduate Internship programme. Paid 3 and 6-month tracks in Banking AI, Solutions Engineering, and Platform SRE — real production work from week one.`,

  "/careers/training": (name) =>
    `${name ? `${name}, ` : ""}our training programmes run in live cohorts of up to eight — Foundations at eight weeks, Production AI at twelve, and closed Enterprise cohorts for in-house teams. Which track interests you?`,

  "/privacy": (name) =>
    `${name ? `${name}, you're ` : "You're "}reading our Privacy Policy. We keep data handling lean and compliant. Any questions?`,

  "/terms": (name) =>
    `${name ? `${name}, you're ` : "You're "}reviewing our Terms of Service. Written in plain English. If anything isn't clear, just ask.`,

  "/contact": (name) =>
    `${name ? `${name}, ` : ""}you're on our Contact page. Or if you'd prefer, I can take your details right now and get the team to reach out to you directly.`,

  "/book": (name) =>
    `${name ? `${name}, ` : ""}you're booking a discovery call — 30 minutes, engineer-led, no sales pressure. Shall I check available slots for you right now?`,

  "/portal": (name) =>
    `${name ? `Welcome back, ${name}. ` : "Welcome to your SupraCloud client portal. "}Here you can track your projects, view scheduled sessions, and access resources.`,
};

export const DEFAULT_PAGE_SCRIPT = (name) =>
  `${name ? `${name}, ` : ""}I can answer questions about our AI agents, IT staffing, consultation, or talent programmes. What would you like to know?`;

// ── Lead capture flow ─────────────────────────────────────────────────────────

export const LEAD_CAPTURE_INTRO = (name) =>
  `I'd love to arrange that for you, ${name}. Let me ask a few quick questions so the team can come prepared. First — what company are you with?`;

export const LEAD_QUESTIONS = [
  { field: "company",   question: "And what's your role there?" },
  { field: "role",      question: "What's the main challenge you're looking to solve — in a sentence or two?" },
  { field: "challenge", question: "Roughly how many customer queries or transactions does your team handle per month?" },
  { field: "volume",    question: "What timeframe are you working to — moving quickly or still exploring?" },
  { field: "timeframe", question: "Last one — what's the best email to send your booking confirmation to?" },
  { field: "email",     question: null },
];

export const LEAD_CONFIRM = (name, email) =>
  `Perfect, ${name}. I've sent your details straight through to the team. You'll receive a booking link at ${email} within the next hour. Is there anything else I can help with in the meantime?`;

export const LEAD_CONFIRM_NO_EMAIL = (name) =>
  `Perfect, ${name}. I've passed your details to the team and they'll be in touch shortly. Is there anything else I can help with?`;

// ── Proactive demo CTA (fires after 3+ exchanges with no demo request) ────────

export const PROACTIVE_CTA = (name) =>
  `By the way, ${name} — based on what you've shared, a quick 30-minute call with one of our engineers would show you exactly how this applies to your situation. Want me to arrange that now?`;

// ── Inactivity ────────────────────────────────────────────────────────────────

export const INACTIVITY_REMINDER = (name) =>
  `Still there, ${name}? No rush — just tap the mic or type whenever you're ready.`;

// ── Intent detection: triggers lead capture flow ──────────────────────────────

export const DEMO_INTENT_TAGS = [
  "demo", "call", "book", "speak to", "talk to", "meeting", "schedule",
  "appointment", "discovery", "get in touch", "arrange", "set up a call",
  "quote", "pricing", "proposal", "someone from", "your team", "your engineer",
  "yes please", "yes i would", "yes that", "that would be", "love to",
  "interested", "sign up", "get started", "next step",
];

// ── Tool definitions (for Claude function calling) ────────────────────────────

export const NOVA_TOOLS = [
  {
    name: "calculate_roi",
    description: "Calculate expected ROI for deploying a SupraCloud AI agent based on transaction volume and current cost.",
    input_schema: {
      type: "object",
      properties: {
        monthly_volume:  { type: "number", description: "Monthly transaction or query volume" },
        industry:        { type: "string", enum: ["banking", "retail", "other"], description: "Industry sector" },
        avg_handle_time: { type: "number", description: "Average handle time per query in minutes" },
      },
      required: ["monthly_volume"],
    },
  },
  {
    name: "get_pricing",
    description: "Return pricing information for a specific SupraCloud product tier.",
    input_schema: {
      type: "object",
      properties: {
        tier: { type: "string", enum: ["foundation", "application_engine", "full_accelerator", "enterprise"], description: "Product tier" },
      },
      required: [],
    },
  },
  {
    name: "qualify_lead",
    description: "Signal that the visitor is a qualified lead and should be offered a discovery call booking.",
    input_schema: {
      type: "object",
      properties: {
        reason: { type: "string", description: "Why this visitor appears to be a qualified lead" },
      },
      required: ["reason"],
    },
  },
];

// ── Tool result generators ────────────────────────────────────────────────────

export function calculateRoiResult({ monthly_volume = 10000, industry = "other", avg_handle_time = 5 }) {
  const deflectionRate   = industry === "banking" ? 0.72 : industry === "retail" ? 0.68 : 0.65;
  const costPerQuery     = avg_handle_time * 0.5; // £0.50/min
  const deflectedQueries = Math.round(monthly_volume * deflectionRate);
  const monthlySaving    = Math.round(deflectedQueries * costPerQuery);
  const annualSaving     = monthlySaving * 12;
  return {
    deflection_rate: `${Math.round(deflectionRate * 100)}%`,
    deflected_queries_per_month: deflectedQueries,
    estimated_monthly_saving: `£${monthlySaving.toLocaleString()}`,
    estimated_annual_saving:  `£${annualSaving.toLocaleString()}`,
    payback_months: annualSaving > 50000 ? "3–5" : "6–9",
  };
}

export const PRICING_DATA = {
  foundation:          { name: "Foundation",         price: "£2,500",  description: "8-week AI foundations programme" },
  application_engine:  { name: "Application Engine", price: "£15,000", description: "12-week production AI engineering track" },
  full_accelerator:    { name: "Full Accelerator",   price: "£25,000", description: "Complete enterprise AI delivery programme" },
  enterprise:          { name: "Enterprise",          price: "Custom",  description: "Closed cohort for in-house teams — contact us" },
};

// ── Pre-sales knowledge base ──────────────────────────────────────────────────

export const KNOWLEDGE_BASE = [
  {
    tags: ["price", "cost", "pricing", "how much", "quote", "fee", "budget"],
    answer: (name) =>
      `${name ? `${name}, p` : "P"}ricing depends on scope. AI agent projects are scoped on a discovery call where we understand your data, infrastructure, and outcomes. Book a 30-minute call and we'll give you a realistic ballpark on the same call — no follow-up deck required.`,
  },
  {
    tags: ["timeline", "how long", "time", "delivery", "weeks", "months", "speed", "fast", "quick"],
    answer: (name) =>
      `A contained AI agent typically goes from discovery to production in 6 to 10 weeks${name ? `, ${name}` : ""}. More complex multi-agent workflows take 3 to 6 months. We give specific estimates after the discovery call.`,
  },
  {
    tags: ["banking", "finance", "financial", "bank", "regulated", "compliance", "fca"],
    answer: (name) =>
      `${name ? `${name}, w` : "W"}e specialise in regulated financial environments. Our agents have audit trails, explainability layers, and role-based access controls from day one. We understand FCA compliance requirements your risk team will raise.`,
  },
  {
    tags: ["retail", "ecommerce", "e-commerce", "shop", "store", "inventory", "customer service"],
    answer: (name) =>
      `Our retail AI agents handle customer support, inventory processing, personalisation, and back-office automation${name ? `, ${name}` : ""}. We integrate with existing ERP, CRM, and ecommerce platforms — no rip-and-replace.`,
  },
  {
    tags: ["technology", "tech stack", "stack", "langchain", "langgraph", "rag", "llm", "gpt", "model"],
    answer: () =>
      `We build with LangGraph for agent orchestration and RAG pipelines for enterprise knowledge retrieval. We're model-agnostic — we recommend the right LLM for your latency, cost, and compliance requirements. Infrastructure runs on your cloud tenant.`,
  },
  {
    tags: ["staffing", "hire", "hiring", "developer", "engineer", "recruitment", "cv", "candidate"],
    answer: (name) =>
      `${name ? `${name}, ` : ""}our IT Staffing service is engineer-screened, not recruiter-sourced. Every candidate has been technically assessed by our own engineers for the specific role — data engineers, ML engineers, backend, DevOps, AI specialists.`,
  },
  {
    tags: ["consultation", "consulting", "advice", "strategy", "architecture", "roadmap"],
    answer: () =>
      `Our Enterprise IT Consultation engagements run 4 to 12 weeks and produce a concrete technical blueprint your team can execute — or we execute it for you. We specialise in regulated industries.`,
  },
  {
    tags: ["internship", "graduate", "student", "university", "programme", "training", "learn"],
    answer: (name) =>
      `${name ? `${name}, ` : ""}our Talent Programme and Graduate Internship involve real client briefs under senior engineer mentorship — not tutorials. Applications are reviewed on a rolling basis.`,
  },
  {
    tags: ["partnership", "university", "placement year", "collaborate", "partner"],
    answer: () =>
      `We partner with universities for structured placement years. Students get real AI engineering experience; university partners get a direct talent pipeline for employability outcomes.`,
  },
  {
    tags: ["security", "data", "gdpr", "privacy", "secure", "nda"],
    answer: () =>
      `All project work is covered by NDA before the discovery call. We operate within your existing data perimeter — agents don't exfiltrate data to our cloud. GDPR compliance is designed in from day one.`,
  },
  {
    tags: ["support", "maintenance", "after", "post", "ongoing", "sla"],
    answer: () =>
      `Post-delivery, we offer retainer-based support and maintenance with agreed SLA terms. Most clients retain us for ongoing iteration as agent usage grows.`,
  },
  {
    tags: ["case study", "proof", "work", "portfolio", "results", "example"],
    answer: (name) =>
      `We share anonymised outcomes during discovery calls${name ? `, ${name}` : ""} — not publicly, to protect client confidentiality. Our agents have processed hundreds of thousands of queries in production with measurable deflection rates.`,
  },
  {
    tags: ["who are you", "who is", "team", "founders", "company", "about supracloud", "background"],
    answer: () =>
      `SupraCloud is an engineer-led enterprise AI and IT firm based in the UK. Founded to bridge the gap between AI research and production delivery, particularly in regulated industries where most AI vendors struggle.`,
  },
  {
    tags: ["what do you do", "what is supracloud", "explain", "overview", "services"],
    answer: (name) =>
      `${name ? `${name}, ` : ""}SupraCloud does three things: we build autonomous AI agents for banking and retail, we provide engineer-screened IT staffing, and we run enterprise IT consultation engagements. All engineer-led, not sales-led.`,
  },
  {
    tags: ["roi", "return on investment", "savings", "cost saving", "benefit"],
    answer: (name) =>
      `${name ? `${name}, ` : ""}typical deployments achieve 65–75% query deflection within 90 days. For a team handling 10,000 queries per month, that's roughly £30,000–£45,000 in monthly savings. Want me to run a quick estimate for your volume?`,
  },
];
