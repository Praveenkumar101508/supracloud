"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "@/app/components/ui/HolographicCard";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { CheckCircle, MinusCircle, Shield, ArrowRight, Building2 } from "lucide-react";

// ── Tier definitions ──────────────────────────────────────────────────────────

const TIERS = [
  {
    id:       "core",
    name:     "Core",
    badge:    null,
    tagline:  "Single-domain autonomous agent for one regulated use case.",
    color:    "#00F5FF",
    variant:  "default" as const,
    features: [
      { label: "1 autonomous AI agent",                  included: true  },
      { label: "RAG pipeline + knowledge base",          included: true  },
      { label: "FCA-aligned full audit trail",           included: true  },
      { label: "Deployment in your cloud tenant",        included: true  },
      { label: "Standard analytics dashboard",           included: true  },
      { label: "Monthly performance reviews",            included: true  },
      { label: "Human escalation paths",                 included: true  },
      { label: "Multi-agent orchestration",              included: false },
      { label: "Continuous fine-tuning pipeline",        included: false },
      { label: "Embedded success engineer",              included: false },
    ],
    cta:          "Contact Sales Team",
    ctaVariant:   "outline" as const,
    secondaryCta: "Request Custom Quote",
  },
  {
    id:       "advanced",
    name:     "Advanced",
    badge:    "Most Popular",
    tagline:  "Multi-agent platform for enterprise teams at scale.",
    color:    "#8B5CF6",
    variant:  "purple" as const,
    features: [
      { label: "Up to 5 autonomous AI agents",           included: true  },
      { label: "RAG pipeline + knowledge base",          included: true  },
      { label: "FCA/GDPR full compliance documentation", included: true  },
      { label: "Deployment in your cloud tenant",        included: true  },
      { label: "Advanced analytics + deflection reports",included: true  },
      { label: "Bi-weekly performance reviews",          included: true  },
      { label: "Human escalation paths + confidence tuning", included: true  },
      { label: "Multi-agent orchestration",              included: true  },
      { label: "Quarterly fine-tuning pipeline",         included: true  },
      { label: "Embedded success engineer",              included: false },
    ],
    cta:          "Contact Sales Team",
    ctaVariant:   "purple" as const,
    secondaryCta: "Request Custom Quote",
  },
  {
    id:       "platform",
    name:     "Platform",
    badge:    "Enterprise",
    tagline:  "Unlimited agents, custom SLAs, white-glove delivery.",
    color:    "#10B981",
    variant:  "default" as const,
    features: [
      { label: "Unlimited autonomous AI agents",         included: true  },
      { label: "Custom RAG + vector store architecture", included: true  },
      { label: "Full regulatory documentation pack",     included: true  },
      { label: "Multi-cloud / on-premises deployment",   included: true  },
      { label: "Real-time SLA monitoring + alerting",    included: true  },
      { label: "Weekly executive briefings",             included: true  },
      { label: "Human escalation paths + confidence tuning", included: true  },
      { label: "Multi-agent orchestration",              included: true  },
      { label: "Continuous fine-tuning pipeline",        included: true  },
      { label: "Embedded success engineer (dedicated)",  included: true  },
    ],
    cta:          "Contact Sales Team",
    ctaVariant:   "outline" as const,
    secondaryCta: "Request Custom Quote",
  },
] as const;

// ── Feature row ───────────────────────────────────────────────────────────────

function FeatureRow({ label, included, color }: { label: string; included: boolean; color: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      {included ? (
        <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color }} />
      ) : (
        <MinusCircle size={14} className="shrink-0 mt-0.5 text-white/15" />
      )}
      <span style={{ color: included ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.22)" }}>
        {label}
      </span>
    </li>
  );
}

// ── Tier card ─────────────────────────────────────────────────────────────────

function TierCard({ tier, index }: { tier: typeof TIERS[number]; index: number }) {
  const isPopular = tier.badge === "Most Popular";

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.55 }}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            className="px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase whitespace-nowrap"
            style={{
              background:  isPopular ? tier.color : "rgba(255,255,255,0.06)",
              color:       isPopular ? "white"     : "rgba(255,255,255,0.5)",
              border:      isPopular ? "none"      : "1px solid rgba(255,255,255,0.12)",
              boxShadow:   isPopular ? `0 0 24px ${tier.color}55` : "none",
            }}
            animate={isPopular ? {
              boxShadow: [
                `0 0 20px ${tier.color}44`,
                `0 0 36px ${tier.color}77`,
                `0 0 20px ${tier.color}44`,
              ],
            } : {}}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            {tier.badge}
          </motion.div>
        </div>
      )}

      <HolographicCard variant={tier.variant} className="h-full flex flex-col p-6 pt-7">
        {/* Header */}
        <div className="mb-5">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 text-[9px] font-bold tracking-widest uppercase"
            style={{
              background: `${tier.color}12`,
              color:      tier.color,
              border:     `1px solid ${tier.color}28`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: tier.color }} />
            {tier.name}
          </div>
          <p className="text-white/40 text-xs leading-relaxed">{tier.tagline}</p>
        </div>

        {/* Pricing block */}
        <div
          className="mb-6 pb-6 rounded-xl p-4"
          style={{
            background: `${tier.color}07`,
            border:     `1px solid ${tier.color}18`,
          }}
        >
          <p
            className="text-base font-black mb-0.5"
            style={{ color: tier.color }}
          >
            Custom Enterprise Pricing
          </p>
          <p className="text-[11px] text-white/35 leading-relaxed">
            Starting from enterprise scale&nbsp;·&nbsp;Tailored to your deployment
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-7">
          {tier.features.map((f) => (
            <FeatureRow
              key={f.label}
              label={f.label}
              included={f.included}
              color={tier.color}
            />
          ))}
        </ul>

        {/* CTAs */}
        <div className="space-y-2.5">
          <GlowButton
            variant={tier.ctaVariant}
            size="md"
            href="/contact"
            fullWidth
          >
            {tier.cta}
          </GlowButton>
          <a
            href="/book"
            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-semibold transition-all group"
            style={{
              color:  `${tier.color}80`,
              border: `1px solid ${tier.color}18`,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color       = tier.color;
              e.currentTarget.style.borderColor = `${tier.color}40`;
              e.currentTarget.style.background  = `${tier.color}08`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color       = `${tier.color}80`;
              e.currentTarget.style.borderColor = `${tier.color}18`;
              e.currentTarget.style.background  = "transparent";
            }}
          >
            {tier.secondaryCta}
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </HolographicCard>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function EnterprisePlans() {
  return (
    <section className="relative py-32 px-4 overflow-hidden" id="pricing">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full blur-[180px]"
          style={{ background: "rgba(139,92,246,0.04)" }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(0,245,255,0.025)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
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
            <Building2 size={11} />
            Enterprise Plans
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Built for Regulated
            <br />
            <span
              style={{
                background:           "linear-gradient(135deg, #8B5CF6 0%, #00F5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
              }}
            >
              Enterprise Scale.
            </span>
          </h2>

          <p className="text-white/40 text-base max-w-xl mx-auto mb-8">
            Purpose-built AI agents with custom pricing based on number of agents,
            deployment model, volume, and compliance requirements. Our team will
            prepare a tailored proposal for your organisation.
          </p>

          {/* Differentiator strip */}
          <motion.div
            className="inline-flex flex-wrap justify-center items-center gap-x-5 gap-y-2 px-6 py-3 rounded-2xl"
            style={{
              background: "rgba(0,245,255,0.04)",
              border:     "1px solid rgba(0,245,255,0.12)",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { icon: Shield, label: "Zero data exfiltration" },
              { icon: Shield, label: "Full tenant isolation" },
              { icon: Shield, label: "FCA / GDPR-ready from day one" },
            ].map(({ icon: Icon, label }, i) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-white/55">
                {i > 0 && <span className="text-white/15 hidden sm:inline">·</span>}
                <Icon size={11} className="text-[#00F5FF] shrink-0" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 items-stretch">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-10 text-center space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-white/22 max-w-2xl mx-auto leading-relaxed">
            All plans include deployment inside your cloud tenant, full compliance documentation,
            engineer-led onboarding, and a dedicated technical point of contact.
            Pricing is scoped per engagement following an initial discovery call —
            no obligation to proceed.
          </p>

          {/* Trust line */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
            <span className="text-[10px] text-white/20 tracking-wider uppercase">
              Trusted by leading financial institutions and retailers
            </span>
          </div>

          {/* Brand strip */}
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 pt-1">
            {["HSBC", "Barclays", "Lloyds", "Monzo", "Tesco", "Sainsbury's"].map((b) => (
              <span key={b} className="text-[11px] font-semibold text-white/18 hover:text-white/35 transition-colors">
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default EnterprisePlans;
