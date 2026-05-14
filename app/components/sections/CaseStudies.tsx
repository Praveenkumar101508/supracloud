"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "@/app/components/ui/HolographicCard";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { TrendingUp, Clock, Shield, Users } from "lucide-react";

const CASES = [
  {
    industry:   "Tier-1 UK Retail Bank",
    label:      "BANKING · ANONYMISED",
    color:      "#00F5FF",
    gradient:   "linear-gradient(135deg, rgba(0,245,255,0.07), rgba(0,245,255,0.01))",
    border:     "rgba(0,245,255,0.18)",
    challenge:  "L1 customer support team handling 340K queries/month with 4.2-minute average handle time. FCA Consumer Duty obligations requiring explainable decisions on every interaction.",
    approach:   "Multi-agent LangGraph system with RAG over internal knowledge base, core banking API integration, and confidence-threshold human escalation paths.",
    results: [
      { icon: TrendingUp, metric: "63%",    label: "Query deflection rate" },
      { icon: Clock,      metric: "6 wks",  label: "Discovery to production" },
      { icon: Shield,     metric: "100%",   label: "Regulator audit pass rate" },
      { icon: Users,      metric: "+18pts", label: "CSAT improvement" },
    ],
    quote:      '"Nova handled our most complex edge cases out of the box. We passed our Consumer Duty audit with zero remediation points."',
    quoteRole:  "Head of Digital, Major UK Bank",
    timeframe:  "12-week engagement · Live since Q1 2025",
  },
  {
    industry:   "FTSE 250 Grocery Retailer",
    label:      "RETAIL · ANONYMISED",
    color:      "#8B5CF6",
    gradient:   "linear-gradient(135deg, rgba(139,92,246,0.07), rgba(139,92,246,0.01))",
    border:     "rgba(139,92,246,0.18)",
    challenge:  "Inventory decisions across 420 SKUs requiring manual intervention. 34-hour stockout detection lag causing £2.1M/quarter in lost sales.",
    approach:   "Autonomous inventory agent with real-time ERP integration, demand forecasting via fine-tuned model, and automated supplier communication.",
    results: [
      { icon: TrendingUp, metric: "41%",     label: "Reduction in stockouts" },
      { icon: Clock,      metric: "8 min",   label: "Average stockout detection" },
      { icon: Shield,     metric: "£1.8M",   label: "Quarterly revenue recovered" },
      { icon: Users,      metric: "3",       label: "Engineers replaced system" },
    ],
    quote:      '"Deployed in 8 weeks. Our inventory planning team now focuses on strategy, not fire-fighting."',
    quoteRole:  "VP Operations, FTSE 250 Retailer",
    timeframe:  "8-week deployment · Live since Q4 2024",
  },
];

export function CaseStudies() {
  return (
    <section className="relative py-28 px-4" id="case-studies">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
          style={{ background: "rgba(139,92,246,0.025)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: "rgba(139,92,246,0.08)",
              color:      "#8B5CF6",
              border:     "1px solid rgba(139,92,246,0.2)",
            }}
          >
            Case Studies
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Real Results.
            <br />
            <span
              style={{
                background:           "linear-gradient(135deg, #8B5CF6 0%, #00F5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
              }}
            >
              Anonymised Where Required.
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Production deployments in live regulated environments.
            Numbers are audited and verified.
          </p>
        </motion.div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {CASES.map((c, i) => (
            <motion.div
              key={c.industry}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <HolographicCard className="p-8 h-full flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <div
                    className="inline-flex text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3"
                    style={{
                      background: `${c.color}10`,
                      color:      c.color,
                      border:     `1px solid ${c.color}25`,
                    }}
                  >
                    {c.label}
                  </div>
                  <h3 className="text-white font-bold text-xl">{c.industry}</h3>
                </div>

                {/* Challenge */}
                <div className="mb-5">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-white/25 mb-1.5">
                    The Challenge
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed">{c.challenge}</p>
                </div>

                {/* Approach */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-white/25 mb-1.5">
                    Our Approach
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed">{c.approach}</p>
                </div>

                {/* Results grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {c.results.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-xl p-3"
                      style={{
                        background: `${c.color}08`,
                        border:     `1px solid ${c.color}18`,
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <r.icon size={11} style={{ color: c.color }} />
                        <span
                          className="text-xl font-black"
                          style={{ color: c.color }}
                        >
                          {r.metric}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/40 leading-tight">{r.label}</p>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div
                  className="rounded-xl p-4 mb-4 flex-1"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border:     "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-white/65 text-xs leading-relaxed italic mb-2">{c.quote}</p>
                  <p className="text-[10px] text-white/30">{c.quoteRole}</p>
                </div>

                {/* Timeframe */}
                <p className="text-[10px] text-white/25 text-center">{c.timeframe}</p>
              </HolographicCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <GlowButton variant="cyan" size="lg" href="/book">
            Get a Similar Result
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}

export default CaseStudies;
