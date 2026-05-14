"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HolographicCard } from "@/app/components/ui/HolographicCard";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { CheckCircle, MinusCircle } from "lucide-react";

// ── Tier data ─────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "starter",
    name: "Starter Agent",
    tagline: "Single-agent deployment for one use case.",
    monthly: 4_800,
    badge: null,
    color: "#00F5FF",
    variant: "default" as const,
    features: [
      { label: "1 autonomous AI agent", included: true },
      { label: "Up to 10,000 queries/mo", included: true },
      { label: "RAG pipeline + knowledge base", included: true },
      { label: "FCA-aligned audit trail", included: true },
      { label: "Deployment in your cloud tenant", included: true },
      { label: "Basic analytics dashboard", included: true },
      { label: "Monthly performance review", included: true },
      { label: "Multi-agent orchestration", included: false },
      { label: "Custom fine-tuning", included: false },
      { label: "Dedicated success engineer", included: false },
    ],
    cta: "Book a Discovery Call",
    ctaHref: "/book",
  },
  {
    id: "growth",
    name: "Growth Suite",
    tagline: "Multi-agent platform for scaling teams.",
    monthly: 12_500,
    badge: "Most Popular",
    color: "#8B5CF6",
    variant: "purple" as const,
    features: [
      { label: "Up to 5 autonomous AI agents", included: true },
      { label: "Up to 100,000 queries/mo", included: true },
      { label: "RAG pipeline + knowledge base", included: true },
      { label: "FCA-aligned audit trail", included: true },
      { label: "Deployment in your cloud tenant", included: true },
      { label: "Advanced analytics + deflection reporting", included: true },
      { label: "Bi-weekly performance reviews", included: true },
      { label: "Multi-agent orchestration", included: true },
      { label: "Custom fine-tuning (quarterly)", included: true },
      { label: "Dedicated success engineer", included: false },
    ],
    cta: "Book a Discovery Call",
    ctaHref: "/book",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Unlimited agents, custom SLAs, white-glove delivery.",
    monthly: null,
    badge: "Custom Pricing",
    color: "#10B981",
    variant: "default" as const,
    features: [
      { label: "Unlimited autonomous AI agents", included: true },
      { label: "Unlimited query volume", included: true },
      { label: "Custom RAG + vector store architecture", included: true },
      { label: "Full regulatory documentation pack", included: true },
      { label: "Multi-cloud / on-prem deployment", included: true },
      { label: "Real-time SLA monitoring + alerting", included: true },
      { label: "Weekly executive briefings", included: true },
      { label: "Multi-agent orchestration", included: true },
      { label: "Continuous fine-tuning pipeline", included: true },
      { label: "Dedicated success engineer (embedded)", included: true },
    ],
    cta: "Request Enterprise Pricing",
    ctaHref: "/book",
  },
];

const ANNUAL_DISCOUNT = 0.20;

// ── Feature row ───────────────────────────────────────────────────────────────
function FeatureRow({
  label,
  included,
  color,
}: {
  label: string;
  included: boolean;
  color: string;
}) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      {included ? (
        <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color }} />
      ) : (
        <MinusCircle size={14} className="shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.15)" }} />
      )}
      <span style={{ color: included ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.25)" }}>
        {label}
      </span>
    </li>
  );
}

// ── Tier card ─────────────────────────────────────────────────────────────────
function TierCard({
  tier,
  annual,
}: {
  tier: typeof TIERS[number];
  annual: boolean;
}) {
  const price = tier.monthly
    ? annual
      ? Math.round(tier.monthly * (1 - ANNUAL_DISCOUNT))
      : tier.monthly
    : null;

  return (
    <div className="relative h-full">
      {/* Popular badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            className="px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap"
            style={{
              background: tier.color,
              color: tier.id === "growth" ? "white" : "#050510",
              boxShadow: `0 0 20px ${tier.color}50`,
            }}
            animate={{ boxShadow: [`0 0 20px ${tier.color}40`, `0 0 32px ${tier.color}70`, `0 0 20px ${tier.color}40`] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {tier.badge}
          </motion.div>
        </div>
      )}

      <HolographicCard
        variant={tier.variant}
        className="h-full flex flex-col p-6"
      >
        {/* Header */}
        <div className="mb-6">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 text-[9px] font-bold tracking-wider uppercase"
            style={{
              background: `${tier.color}12`,
              color: tier.color,
              border: `1px solid ${tier.color}25`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: tier.color }} />
            {tier.name}
          </div>
          <p className="text-white/40 text-xs leading-relaxed">{tier.tagline}</p>
        </div>

        {/* Price */}
        <div className="mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <AnimatePresence mode="wait">
            {price ? (
              <motion.div
                key={`${annual}-price`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex items-end gap-2"
              >
                <span className="text-4xl font-black text-white">
                  £{price.toLocaleString()}
                </span>
                <span className="text-white/30 text-sm mb-1">/month</span>
                {annual && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full mb-1"
                    style={{
                      background: "rgba(16,185,129,0.12)",
                      color: "#10B981",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    −20%
                  </span>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="custom"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-3xl font-black text-white">Custom</span>
                <p className="text-white/30 text-xs mt-1">Scoped per engagement</p>
              </motion.div>
            )}
          </AnimatePresence>
          {annual && price && (
            <p className="text-[10px] text-white/25 mt-1">
              £{(price * 12).toLocaleString()} billed annually
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-7">
          {tier.features.map((f) => (
            <FeatureRow key={f.label} label={f.label} included={f.included} color={tier.color} />
          ))}
        </ul>

        {/* CTA */}
        <GlowButton
          variant={tier.id === "growth" ? "purple" : "outline"}
          size="md"
          href={tier.ctaHref}
          fullWidth
        >
          {tier.cta}
        </GlowButton>
      </HolographicCard>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function PricingTiers() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="relative py-28 px-4" id="pricing">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "rgba(139,92,246,0.03)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: "rgba(139,92,246,0.08)",
              color: "#8B5CF6",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            No Hidden Fees.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #00F5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              No 18-Month Contracts.
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-8">
            Fixed-scope delivery with defined SLAs. Every tier includes deployment
            in your cloud tenant — we never hold your data.
          </p>

          {/* Annual toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                background: !annual ? "rgba(0,245,255,0.12)" : "transparent",
                color: !annual ? "#00F5FF" : "rgba(255,255,255,0.35)",
                border: !annual ? "1px solid rgba(0,245,255,0.25)" : "1px solid transparent",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                background: annual ? "rgba(139,92,246,0.12)" : "transparent",
                color: annual ? "#8B5CF6" : "rgba(255,255,255,0.35)",
                border: annual ? "1px solid rgba(139,92,246,0.25)" : "1px solid transparent",
              }}
            >
              Annual
              <span
                className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  color: "#10B981",
                  border: "1px solid rgba(16,185,129,0.25)",
                }}
              >
                −20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TierCard tier={tier} annual={annual} />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center text-xs text-white/20 mt-8 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          All tiers include deployment inside your cloud tenant, compliance documentation,
          and engineer-led onboarding. Prices shown are guidance — final pricing is scoped
          on a per-engagement basis after a discovery call.
        </motion.p>
      </div>
    </section>
  );
}

export default PricingTiers;
