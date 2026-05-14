"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { track } from "@/lib/posthog";

export const FAQ_ITEMS = [
  {
    q: "How does SupraCloud ensure my customer data never leaves our environment?",
    a: "Every SupraCloud agent runs entirely inside your own AWS or Azure tenant — not ours. We deploy the agent runtime using your cloud credentials, your KMS keys, and your network policies. All LLM inference routes through your chosen provider endpoint (Azure OpenAI or AWS Bedrock). We have no access to your data post-deployment, and we require NDA signature before the first technical discussion.",
  },
  {
    q: "Are your agents compliant with FCA regulations?",
    a: "Our agents are designed with FCA alignment from the architecture stage: every decision is logged with timestamp, rationale, confidence score, and the data sources used. We produce explainability outputs suitable for SMCR accountability requirements and Consumer Duty obligations. We provide full compliance documentation for your legal and risk teams. Note: we are an AI engineering firm, not a regulated firm — your regulatory obligations remain yours, and we help you evidence compliance.",
  },
  {
    q: "How long does a typical deployment take?",
    a: "A contained single-agent deployment (e.g., L1 customer support deflection) typically runs 4–6 weeks from discovery call to production go-live. Multi-agent platforms spanning multiple use cases typically run 3–6 months. We don't run 18-month transformation programmes — we scope, build, and ship in fixed phases with defined deliverables.",
  },
  {
    q: "What happens if the AI agent makes an incorrect decision?",
    a: "Every agent includes human escalation paths and confidence thresholds. Below a defined confidence level, the agent automatically escalates to a human agent with full context handed over. All incorrect decisions are captured in the feedback loop and used to improve the model. Our audit trail means you can reconstruct every decision for regulatory or customer service purposes.",
  },
  {
    q: "Can you integrate with our existing core banking systems or ERP?",
    a: "Yes — API-first integration is central to our architecture. We do not require a rip-and-replace of any existing systems. Common integrations include core banking APIs, Salesforce, ServiceNow, SharePoint, document management systems, and proprietary internal tools via REST or GraphQL. We produce integration specifications during the architecture phase.",
  },
  {
    q: "Do the agents improve over time without manual intervention?",
    a: "Yes. Every agent includes structured feedback loops: interaction outcomes, CSAT scores, escalation patterns, and resolution rates are fed back into a fine-tuning pipeline. Deflection rates typically improve 8–15% per quarter without manual retraining. We provide weekly deflection reports and trigger model updates automatically when performance thresholds are breached.",
  },
  {
    q: "What is the pricing model and are there long-term contracts?",
    a: "We operate on fixed-scope, fixed-price engagements — not open-ended time-and-materials contracts. After the initial deployment, ongoing managed services are offered on quarterly or annual terms with defined SLAs. There are no 18-month lock-ins. Enterprise pricing is scoped per engagement based on query volume, number of agents, and integration complexity.",
  },
  {
    q: "Do you provide training for our internal team?",
    a: "Yes. Every engagement includes a full handover: runbooks, architecture documentation, agent configuration guides, and a 4-hour technical knowledge transfer session for your team. We can also provide ongoing training for internal AI champions through our Talent Programme.",
  },
  {
    q: "Can SupraCloud help us build an internal AI capability, not just deploy agents?",
    a: "Absolutely. Our Talent Programme places AI engineers into your team for 6–12 month tracks, and we offer structured training pathways (Foundation, Application Engine, Full Accelerator) for upskilling existing engineers. Several clients combine agent deployment with talent embedding to build lasting internal capability.",
  },
  {
    q: "What cloud providers do you support?",
    a: "Primarily AWS and Microsoft Azure, which cover the vast majority of UK regulated enterprises. We support Azure OpenAI Service, AWS Bedrock, and on-premises model endpoints for highest-sensitivity workloads. Google Cloud deployments are evaluated case-by-case. We do not support single-vendor lock-in — all architectures are portable.",
  },
];

function FAQItem({
  item,
  idx,
  open,
  onToggle,
}: {
  item: typeof FAQ_ITEMS[number];
  idx: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      style={{
        background: open ? "rgba(0,245,255,0.03)" : "rgba(255,255,255,0.02)",
        border: open
          ? "1px solid rgba(0,245,255,0.15)"
          : "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.2s, background 0.2s",
      }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.04 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-semibold text-white/85 leading-snug">
          {item.q}
        </span>
        <motion.div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: open ? "rgba(0,245,255,0.12)" : "rgba(255,255,255,0.06)",
            border: open ? "1px solid rgba(0,245,255,0.25)" : "1px solid rgba(255,255,255,0.1)",
            color: open ? "#00F5FF" : "rgba(255,255,255,0.4)",
          }}
          animate={{ rotate: open ? 0 : 0 }}
        >
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div
                className="h-px mb-4"
                style={{ background: "rgba(0,245,255,0.08)" }}
              />
              <p className="text-sm text-white/50 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    const isOpening = openIdx !== i;
    setOpenIdx((prev) => (prev === i ? null : i));
    track(isOpening ? "faq_opened" : "faq_closed", { question: FAQ_ITEMS[i]?.q, index: i });
  };

  return (
    <section className="relative py-28 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: "rgba(0,245,255,0.08)",
              color: "#00F5FF",
              border: "1px solid rgba(0,245,255,0.18)",
            }}
          >
            Common Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Questions Enterprises
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00F5FF 0%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Actually Ask.
            </span>
          </h2>
          <p className="text-white/40 text-lg">
            Straight answers — no marketing fluff.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 mb-12">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              idx={i}
              open={openIdx === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/30 text-sm mb-5">
            Still have questions? Ask Nova in 30 seconds — or book a call with an engineer.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <GlowButton
              variant="cyan"
              size="md"
              onClick={() => document.dispatchEvent(new CustomEvent("nova:open"))}
            >
              Ask Nova Now
            </GlowButton>
            <GlowButton variant="outline" size="md" href="/book">
              Talk to an Engineer
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQSection;
