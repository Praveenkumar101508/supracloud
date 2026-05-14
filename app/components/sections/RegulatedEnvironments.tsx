"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HolographicCard } from "@/app/components/ui/HolographicCard";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { Shield, Lock, FileCheck, Server, Zap, Eye } from "lucide-react";

// ── Compliance badge data ──────────────────────────────────────────────────────
const BADGES = [
  {
    id: "fca",
    label: "FCA Aligned",
    icon: "🏛",
    color: "#00F5FF",
    title: "Financial Conduct Authority",
    desc: "Every agent decision is explainable and audit-logged. Our architecture supports SMCR accountability, Consumer Duty obligations, and FCA PS21/3 AI guidance — built in from architecture stage, not retrofitted.",
  },
  {
    id: "gdpr",
    label: "GDPR Ready",
    icon: "🔒",
    color: "#8B5CF6",
    title: "UK & EU GDPR Compliance",
    desc: "All personal data stays within your designated cloud region. No cross-border transfers, no third-party model training on your data. Data subject rights (access, erasure) are supported via documented API hooks.",
  },
  {
    id: "iso",
    label: "ISO 27001",
    icon: "✅",
    color: "#10B981",
    title: "ISO/IEC 27001 Information Security",
    desc: "Our development and delivery processes follow ISO 27001 controls. Every engagement includes a shared responsibility matrix and ISMS-aligned documentation for your auditors.",
  },
  {
    id: "soc2",
    label: "SOC 2 Ready",
    icon: "🛡",
    color: "#F97316",
    title: "SOC 2 Type II Readiness",
    desc: "Agent infrastructure is designed for SOC 2 Type II environments. We provide control mapping documentation and support your security team through vendor assessment questionnaires.",
  },
  {
    id: "pci",
    label: "PCI-DSS Aware",
    icon: "💳",
    color: "#00F5FF",
    title: "PCI DSS Scope Awareness",
    desc: "Agents handling card-adjacent data are architected to minimise PCI scope. We operate in your CDE-adjacent zones using tokenised data and scoped network policies — never storing raw card data.",
  },
  {
    id: "owasp",
    label: "OWASP LLM Top 10",
    icon: "⚡",
    color: "#8B5CF6",
    title: "OWASP LLM Application Security",
    desc: "Every agent is hardened against the OWASP LLM Top 10: prompt injection, insecure output handling, training data poisoning, model denial of service, and supply chain risks — with documented mitigations.",
  },
];

// ── Deployment timeline steps ──────────────────────────────────────────────────
const TIMELINE = [
  {
    week: "Wk 1",
    label: "Secure Discovery",
    desc: "NDA signed. Engineer-led scoping call. Architecture review of your existing cloud tenant, data sources, and compliance constraints.",
    icon: <Lock size={14} />,
    color: "#00F5FF",
  },
  {
    week: "Wk 2–3",
    label: "Agent Architecture",
    desc: "RAG pipeline design, data access controls, audit trail schema, explainability layer — all within your perimeter. Zero external API dependencies.",
    icon: <Server size={14} />,
    color: "#8B5CF6",
  },
  {
    week: "Wk 4–5",
    label: "Build & Harden",
    desc: "Agent deployed to your tenant. Prompt injection hardening, output validation, GDPR-aware data handling, and compliance documentation produced.",
    icon: <Shield size={14} />,
    color: "#10B981",
  },
  {
    week: "Wk 6",
    label: "Production & Handover",
    desc: "Parallel run with human agents. Go/no-go sign-off. Full runbook, audit dashboard, and escalation playbook delivered to your team.",
    icon: <Zap size={14} />,
    color: "#F97316",
  },
];

// ── Architecture diagram (SVG) ─────────────────────────────────────────────────
function ArchDiagram() {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(5,5,16,0.95)",
        border: "1px solid rgba(0,245,255,0.12)",
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: "#0a0a14" }}
      >
        {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
          <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="text-[10px] font-mono text-white/25 ml-2">supracloud-architecture · tenant-isolation.svg</span>
      </div>

      <svg viewBox="0 0 520 280" className="w-full" style={{ fontFamily: "monospace" }}>
        {/* Outer: Customer Cloud Tenant */}
        <motion.rect
          x="12" y="12" width="496" height="256" rx="14"
          fill="none" stroke="rgba(0,245,255,0.18)" strokeWidth="1.5" strokeDasharray="6 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <text x="22" y="30" fill="rgba(0,245,255,0.5)" fontSize="9" fontWeight="700" letterSpacing="0.1em">
          YOUR CLOUD TENANT (AWS / AZURE)
        </text>

        {/* Data sources box */}
        <rect x="28" y="44" width="148" height="208" rx="10"
          fill="rgba(139,92,246,0.05)" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
        <text x="102" y="62" fill="rgba(139,92,246,0.7)" fontSize="8" fontWeight="700"
          textAnchor="middle" letterSpacing="0.08em">DATA SOURCES</text>

        {[
          { y: 80,  label: "Core Banking API" },
          { y: 116, label: "CRM / Salesforce" },
          { y: 152, label: "Document Store" },
          { y: 188, label: "Ticketing System" },
          { y: 224, label: "Audit Database" },
        ].map(({ y, label }) => (
          <g key={label}>
            <rect x="38" y={y - 12} width="128" height="26" rx="6"
              fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.15)" strokeWidth="0.8" />
            <text x="102" y={y + 5} fill="rgba(255,255,255,0.55)" fontSize="8"
              textAnchor="middle">{label}</text>
          </g>
        ))}

        {/* SupraCloud runtime box */}
        <rect x="204" y="44" width="148" height="208" rx="10"
          fill="rgba(0,245,255,0.04)" stroke="rgba(0,245,255,0.25)" strokeWidth="1.2" />
        <text x="278" y="62" fill="rgba(0,245,255,0.8)" fontSize="8" fontWeight="700"
          textAnchor="middle" letterSpacing="0.08em">SUPRACLOUD RUNTIME</text>

        {[
          { y: 80,  label: "Nova AI Agent",      active: true },
          { y: 116, label: "RAG Pipeline",        active: false },
          { y: 152, label: "Audit Logger",         active: true },
          { y: 188, label: "Explainability Layer", active: false },
          { y: 224, label: "Output Validator",     active: false },
        ].map(({ y, label, active }) => (
          <g key={label}>
            <rect x="214" y={y - 12} width="128" height="26" rx="6"
              fill={active ? "rgba(0,245,255,0.10)" : "rgba(0,245,255,0.04)"}
              stroke={active ? "rgba(0,245,255,0.35)" : "rgba(0,245,255,0.12)"}
              strokeWidth="0.8" />
            <text x="278" y={y + 5} fill={active ? "rgba(0,245,255,0.9)" : "rgba(255,255,255,0.5)"}
              fontSize="8" textAnchor="middle">{label}</text>
            {active && (
              <circle cx="334" cy={y} r="3" fill="#00F5FF" opacity="0.7">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        {/* Output box */}
        <rect x="380" y="44" width="120" height="208" rx="10"
          fill="rgba(16,185,129,0.04)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
        <text x="440" y="62" fill="rgba(16,185,129,0.7)" fontSize="8" fontWeight="700"
          textAnchor="middle" letterSpacing="0.08em">OUTPUTS</text>

        {[
          { y: 90,  label: "Customer UI" },
          { y: 126, label: "Agent Dashboard" },
          { y: 162, label: "Audit Reports" },
          { y: 198, label: "Compliance Docs" },
          { y: 234, label: "SLA Metrics" },
        ].map(({ y, label }) => (
          <g key={label}>
            <rect x="390" y={y - 12} width="100" height="26" rx="6"
              fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.15)" strokeWidth="0.8" />
            <text x="440" y={y + 5} fill="rgba(255,255,255,0.55)" fontSize="8"
              textAnchor="middle">{label}</text>
          </g>
        ))}

        {/* Data flow arrows (left → centre) */}
        {[80, 116, 152, 188, 224].map((y) => (
          <g key={y}>
            <line x1="166" y1={y} x2="204" y2={y}
              stroke="rgba(139,92,246,0.4)" strokeWidth="1" strokeDasharray="3 2">
              <animate attributeName="stroke-dashoffset" values="20;0" dur="1.5s" repeatCount="indefinite" />
            </line>
            <polygon points={`${202},${y - 3} ${208},${y} ${202},${y + 3}`}
              fill="rgba(139,92,246,0.5)" />
          </g>
        ))}

        {/* Data flow arrows (centre → right) */}
        {[90, 126, 162, 198, 234].map((y) => (
          <g key={y}>
            <line x1="352" y1={y} x2="380" y2={y}
              stroke="rgba(0,245,255,0.3)" strokeWidth="1" strokeDasharray="3 2">
              <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />
            </line>
            <polygon points={`${378},${y - 3} ${384},${y} ${378},${y + 3}`}
              fill="rgba(0,245,255,0.45)" />
          </g>
        ))}

        {/* NO DATA EXITS label — scan line across perimeter */}
        <rect x="148" y="130" width="44" height="20" rx="4"
          fill="rgba(0,245,255,0.06)" stroke="rgba(0,245,255,0.2)" strokeWidth="0.8" />
        <text x="170" y="144" fill="rgba(0,245,255,0.6)" fontSize="7"
          textAnchor="middle" fontWeight="700">INTERNAL</text>

        {/* Perimeter "no exit" shield */}
        <text x="260" y="278" fill="rgba(0,245,255,0.3)" fontSize="8"
          textAnchor="middle" letterSpacing="0.12em">
          ↑ Zero data crosses this boundary ↑
        </text>
      </svg>
    </motion.div>
  );
}

// ── Compliance badge with hover popover ───────────────────────────────────────
function ComplianceBadge({ badge }: { badge: typeof BADGES[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <motion.button
        className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl text-center transition-all duration-200 w-full"
        style={{
          background: open ? `${badge.color}10` : "rgba(255,255,255,0.03)",
          border: open ? `1px solid ${badge.color}40` : "1px solid rgba(255,255,255,0.08)",
          boxShadow: open ? `0 0 24px ${badge.color}15` : "none",
        }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={badge.title}
      >
        <span className="text-2xl">{badge.icon}</span>
        <span className="text-xs font-bold text-white/70">{badge.label}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-64 z-30 rounded-xl p-4"
            style={{
              background: "#0a0a18",
              border: `1px solid ${badge.color}30`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 24px ${badge.color}10`,
            }}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `6px solid ${badge.color}30`,
              }}
            />
            <p className="text-[10px] font-bold tracking-wider uppercase mb-1.5"
              style={{ color: badge.color }}>{badge.title}</p>
            <p className="text-xs text-white/55 leading-relaxed">{badge.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function RegulatedEnvironments() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(0,245,255,0.03)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "rgba(139,92,246,0.03)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
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
              background: "rgba(0,245,255,0.08)",
              color: "#00F5FF",
              border: "1px solid rgba(0,245,255,0.18)",
            }}
          >
            <Shield size={10} /> Built for Regulated Environments
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Compliance Is Architecture,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00F5FF 0%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Not an Afterthought.
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Every SupraCloud deployment runs inside your cloud tenant. We never see your data.
            Your security, legal, and risk teams get the documentation they need — before go-live.
          </p>
        </motion.div>

        {/* Compliance badges */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {BADGES.map((badge) => (
            <ComplianceBadge key={badge.id} badge={badge} />
          ))}
        </motion.div>
        <p className="text-center text-[10px] text-white/20 -mt-12 mb-16 tracking-wider">
          Hover / tap each badge for details · Compliance documentation provided on all engagements
        </p>

        {/* Two-column: diagram + tenant isolation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold tracking-wider uppercase text-[#00F5FF]/60 mb-3">
              Tenant-Isolated Architecture
            </p>
            <ArchDiagram />
          </motion.div>

          {/* Tenant isolation points */}
          <motion.div
            className="flex flex-col justify-center gap-5"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs font-bold tracking-wider uppercase text-[#8B5CF6]/60">
              What &ldquo;Zero Exfiltration&rdquo; Means in Practice
            </p>

            {[
              {
                icon: <Lock size={16} />,
                title: "Your tenant, your keys",
                desc: "The agent runtime deploys into your AWS or Azure subscription using your own KMS keys. We never hold credentials post-deployment.",
                color: "#00F5FF",
              },
              {
                icon: <Server size={16} />,
                title: "No external model calls",
                desc: "All LLM inference runs through your chosen provider endpoint (Azure OpenAI, AWS Bedrock, or on-prem). Your data never traverses public internet.",
                color: "#8B5CF6",
              },
              {
                icon: <Eye size={16} />,
                title: "Full audit trail on every decision",
                desc: "Every agent action — tool call, retrieval, output — is logged to your audit store with timestamp, user ID, decision rationale, and confidence score.",
                color: "#10B981",
              },
              {
                icon: <FileCheck size={16} />,
                title: "Regulator-ready documentation",
                desc: "We produce a compliance pack: data flow diagrams, DPA, DPIA template, model card, and incident response runbook — ready for your DPO and external auditors.",
                color: "#F97316",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="flex gap-4"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                  style={{
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}25`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">{item.title}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Deployment timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HolographicCard variant="default" className="p-8">
            <p className="text-xs font-bold tracking-wider uppercase text-[#00F5FF]/60 mb-6 text-center">
              Secure Deployment Timeline — Typically 4–6 Weeks
            </p>

            {/* Timeline track */}
            <div className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px"
                style={{ background: "rgba(0,245,255,0.1)" }} />

              {/* Animated fill */}
              <motion.div
                className="hidden md:block absolute top-6 left-[12.5%] h-px origin-left"
                style={{ background: "linear-gradient(90deg, #00F5FF, #8B5CF6)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              >
                <div className="absolute inset-0" style={{ right: 0, width: "75%" }} />
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {TIMELINE.map((step, i) => (
                  <motion.div
                    key={step.week}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    {/* Node */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10"
                      style={{
                        background: `${step.color}15`,
                        border: `2px solid ${step.color}50`,
                        color: step.color,
                        boxShadow: `0 0 20px ${step.color}20`,
                      }}
                    >
                      {step.icon}
                    </div>
                    <div className="text-[10px] font-bold tracking-wider uppercase mb-1"
                      style={{ color: step.color }}>
                      {step.week}
                    </div>
                    <div className="text-sm font-bold text-white mb-2">{step.label}</div>
                    <div className="text-xs text-white/35 leading-relaxed">{step.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </HolographicCard>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <GlowButton variant="cyan" size="lg" href="/book">
            Book a Compliance-First Discovery Call
          </GlowButton>
          <GlowButton variant="outline" size="md" href="/contact">
            Request Security Documentation
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}

export default RegulatedEnvironments;
