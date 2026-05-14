"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "We went from 40% CSAT on our customer portal to 91% in three months after deploying SupraCloud's agent. The FCA compliance work was rigorous — audit trail on every decision, explainable outputs. Exactly what our risk team needed.",
    name: "Head of Digital Transformation",
    org: "UK Retail Bank",
    badge: "Banking",
    metric: "+51pts CSAT",
    metricColor: "#00F5FF",
  },
  {
    quote:
      "The engineer-first approach made a real difference. They understood our stack on day one — no three-week discovery theatre, no bloated requirements doc. Realistic estimate on the first call, delivered on time.",
    name: "CTO",
    org: "Fintech Scale-up, London",
    badge: "Fintech",
    metric: "6-week delivery",
    metricColor: "#8B5CF6",
  },
  {
    quote:
      "SupraCloud's Talent Programme placed three engineers who are now leading our internal AI platform. Hands-on from week one. They shipped production code in their first fortnight — not tutorials, not demos.",
    name: "Engineering Director",
    org: "FTSE 250 Retail Group",
    badge: "Retail",
    metric: "3 engineers placed",
    metricColor: "#10B981",
  },
  {
    quote:
      "We deployed a Level-1 support deflection agent across four product lines in eight weeks. The self-improving loops mean our deflection rate has grown every single sprint without a manual retraining cycle.",
    name: "VP Technology",
    org: "UK Insurance Provider",
    badge: "Insurance",
    metric: "4 products, 8 weeks",
    metricColor: "#F97316",
  },
];

export function TestimonialRotator() {
  const [idx, setIdx]       = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const t = TESTIMONIALS[idx];

  return (
    <section
      className="relative py-24 px-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Proven in Production
          </h2>
          <p className="text-white/40 text-lg">
            Results shared under NDA — anonymised with client permission.
          </p>
        </motion.div>

        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(8,8,20,0.7)",
            border: "1px solid rgba(0,245,255,0.15)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 0 60px rgba(0,245,255,0.04)",
          }}
        >
          {/* Gradient accent top */}
          <div
            className="h-0.5"
            style={{
              background: `linear-gradient(90deg, transparent, ${t.metricColor}, transparent)`,
              transition: "background 0.5s ease",
            }}
          />

          <div className="px-8 md:px-12 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={t.metricColor} aria-hidden>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 font-medium italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/35 text-xs mt-0.5">
                      {t.org} &middot; Anonymised with permission
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Industry badge */}
                    <span
                      className="text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase"
                      style={{
                        background: `${t.metricColor}15`,
                        color: t.metricColor,
                        border: `1px solid ${t.metricColor}30`,
                      }}
                    >
                      {t.badge}
                    </span>
                    {/* Metric */}
                    <span
                      className="text-sm font-black"
                      style={{ color: t.metricColor }}
                    >
                      {t.metric}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div
            className="flex items-center justify-between px-8 md:px-12 py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Dot indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? 24 : 6,
                    height: 6,
                    background: i === idx ? t.metricColor : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              {[
                { fn: prev, label: "Previous", d: "M15 19l-7-7 7-7" },
                { fn: next, label: "Next",     d: "M9 5l7 7-7 7" },
              ].map(({ fn, label, d }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#00F5FF";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d={d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialRotator;
