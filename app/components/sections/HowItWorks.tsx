"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HolographicCard } from "@/app/components/ui/HolographicCard";
import { GlowButton } from "@/app/components/ui/GlowButton";
import {
  PhoneCall, Cpu, Rocket, BrainCircuit, BarChart3,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: <PhoneCall size={22} />,
    title: "30-Minute Discovery Call",
    subtitle: "Engineer-led, zero sales deck",
    desc: "An engineer — not an account manager — joins the first call. We scope your data sources, infrastructure, compliance requirements, and define measurable success criteria. You get a realistic technical estimate before the call ends.",
    outputs: ["Scoped agent brief", "Data access map", "Compliance checklist", "Timeline estimate"],
    color: "#00F5FF",
    bgGlow: "rgba(0,245,255,0.04)",
  },
  {
    num: "02",
    icon: <Cpu size={22} />,
    title: "Architecture Design",
    subtitle: "Inside your perimeter from day one",
    desc: "We design the agent architecture: RAG pipeline, knowledge base structure, tool definitions, escalation logic, and audit trail schema. All within your cloud tenant. You review and approve before a single line of code is written.",
    outputs: ["Agent architecture doc", "RAG pipeline design", "Integration specs", "Security review"],
    color: "#8B5CF6",
    bgGlow: "rgba(139,92,246,0.04)",
  },
  {
    num: "03",
    icon: <Rocket size={22} />,
    title: "Build & Deploy",
    subtitle: "Typically weeks 2–5",
    desc: "We build, test, and deploy directly into your cloud tenant. Prompt injection hardening, output validation, and compliance logging are part of the build — not a QA phase. We run parallel with your human agents before any cutover.",
    outputs: ["Production agent", "Hardening report", "Audit dashboard", "Compliance pack"],
    color: "#10B981",
    bgGlow: "rgba(16,185,129,0.04)",
  },
  {
    num: "04",
    icon: <BrainCircuit size={22} />,
    title: "Self-Improvement Loops",
    subtitle: "Gets better every week, automatically",
    desc: "After go-live, the agent learns from every interaction through structured feedback loops. Deflection rates, CSAT scores, and escalation patterns are monitored. The model is fine-tuned on your data — no manual retraining cycles needed.",
    outputs: ["Weekly deflection reports", "Feedback pipeline", "CSAT tracking", "Auto-reranking"],
    color: "#F97316",
    bgGlow: "rgba(249,115,22,0.04)",
  },
  {
    num: "05",
    icon: <BarChart3 size={22} />,
    title: "Measure & Scale",
    subtitle: "From L1 to full multi-agent platform",
    desc: "We track your SLA metrics, present monthly business reviews, and help you expand agent coverage to new use cases. From a single L1 deflection agent to a multi-agent platform spanning banking, retail, and back-office — at your pace.",
    outputs: ["Monthly business review", "SLA dashboards", "Expansion roadmap", "New agent specs"],
    color: "#00F5FF",
    bgGlow: "rgba(0,245,255,0.04)",
  },
];

// ── Scroll progress bar ───────────────────────────────────────────────────────
function ScrollProgressBar() {
  const ref  = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* Track */}
      <div
        className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      {/* Fill */}
      <motion.div
        className="absolute left-6 top-0 w-px hidden md:block origin-top"
        style={{
          scaleX: 1,
          scaleY: scaleX,
          background: "linear-gradient(to bottom, #00F5FF, #8B5CF6, #10B981, #F97316, #00F5FF)",
        }}
      />

      {/* Steps */}
      <div className="flex flex-col gap-8 md:pl-16">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            {/* Step node (desktop) */}
            <div className="relative">
              <div
                className="absolute -left-[52px] top-4 w-8 h-8 rounded-full items-center
                           justify-center hidden md:flex z-10"
                style={{
                  background: `${step.color}15`,
                  border: `2px solid ${step.color}50`,
                  color: step.color,
                  boxShadow: `0 0 16px ${step.color}25`,
                }}
              >
                <span className="text-[10px] font-black">{step.num}</span>
              </div>

              <HolographicCard className="p-0 overflow-hidden">
                <div
                  className="h-0.5"
                  style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                />
                <div className="p-6 md:p-8" style={{ background: step.bgGlow }}>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left: icon + meta */}
                    <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4 md:gap-3 md:w-40">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${step.color}12`,
                          border: `1px solid ${step.color}30`,
                          color: step.color,
                        }}
                      >
                        {step.icon}
                      </div>
                      <div className="md:hidden">
                        <div className="text-[10px] font-black tracking-wider uppercase"
                          style={{ color: step.color }}>Step {step.num}</div>
                        <h3 className="text-base font-bold text-white">{step.title}</h3>
                      </div>
                    </div>

                    {/* Right: content */}
                    <div className="flex-1 min-w-0">
                      <div className="hidden md:block mb-1">
                        <span className="text-[10px] font-bold tracking-wider uppercase"
                          style={{ color: step.color }}>Step {step.num}</span>
                      </div>
                      <h3 className="hidden md:block text-xl font-bold text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm font-medium mb-3" style={{ color: `${step.color}80` }}>
                        {step.subtitle}
                      </p>
                      <p className="text-sm text-white/50 leading-relaxed mb-5">{step.desc}</p>

                      {/* Output tags */}
                      <div className="flex flex-wrap gap-2">
                        {step.outputs.map((o) => (
                          <span
                            key={o}
                            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              background: `${step.color}08`,
                              border: `1px solid ${step.color}20`,
                              color: `${step.color}90`,
                            }}
                          >
                            ✓ {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function HowItWorks() {
  return (
    <section className="relative py-28 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            How It Works
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            From Discovery to
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00F5FF 0%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Self-Improving Production
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            A structured, low-risk path from brief to deployed agent — typically in six weeks.
            No 18-month transformation. No rip-and-replace.
          </p>
        </motion.div>

        {/* Scroll-linked timeline */}
        <ScrollProgressBar />

        {/* Bottom CTA */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <GlowButton variant="cyan" size="lg" href="/book">
            Start with a 30-Minute Discovery Call
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
