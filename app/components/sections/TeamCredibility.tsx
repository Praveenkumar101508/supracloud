"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "@/app/components/ui/HolographicCard";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { ExternalLink } from "lucide-react";

function LinkedInIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const TEAM = [
  {
    initials: "RK",
    name: "Ravindra K.",
    role: "Founder & CEO",
    bg: "linear-gradient(135deg, #00F5FF22, #8B5CF622)",
    border: "rgba(0,245,255,0.3)",
    color: "#00F5FF",
    credentials: [
      "Led AI deployments at Tier-1 UK banks",
      "10+ years enterprise software delivery",
      "LangGraph & RAG architecture specialist",
      "FCA-regulated environment veteran",
    ],
    linkedin: "https://www.linkedin.com/company/supracloud",
    badge: "Founder",
  },
  {
    initials: "TL",
    name: "Tech Lead",
    role: "Principal AI Engineer",
    bg: "linear-gradient(135deg, #8B5CF622, #0070FF22)",
    border: "rgba(139,92,246,0.3)",
    color: "#8B5CF6",
    credentials: [
      "Ex AWS solutions architect",
      "Multi-cloud AI infrastructure",
      "RLHF & fine-tuning pipelines",
      "Real-time agent orchestration",
    ],
    linkedin: "https://www.linkedin.com/company/supracloud",
    badge: "Engineering",
  },
  {
    initials: "CD",
    name: "Compliance Director",
    role: "Head of Regulated Delivery",
    bg: "linear-gradient(135deg, #10B98122, #00F5FF22)",
    border: "rgba(16,185,129,0.3)",
    color: "#10B981",
    credentials: [
      "Former FCA-authorised firm senior manager",
      "SMCR & Consumer Duty specialist",
      "ISO 27001 lead implementer",
      "AI governance framework author",
    ],
    linkedin: "https://www.linkedin.com/company/supracloud",
    badge: "Compliance",
  },
];

const STATS = [
  { value: "£2B+", label: "Transaction volume processed by agents we've built" },
  { value: "12+",  label: "Enterprise AI deployments in regulated environments" },
  { value: "100%", label: "Clients who passed regulator audits post-deployment" },
  { value: "6wk",  label: "Average time from brief to production" },
];

export function TeamCredibility() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px]"
          style={{ background: "rgba(139,92,246,0.025)" }} />
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
              color: "#8B5CF6",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            The Team
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Built by Engineers
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #00F5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Who&rsquo;ve Done It Before.
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            No generalist consultants. No offshore delivery. A focused team with
            documented track records in regulated AI deployment.
          </p>
        </motion.div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <HolographicCard className="p-6 h-full group">
                <div className="flex flex-col h-full">
                  {/* Avatar */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black"
                      style={{
                        background: member.bg,
                        border: `1px solid ${member.border}`,
                        color: member.color,
                        boxShadow: `0 0 20px ${member.color}15`,
                      }}
                    >
                      {member.initials}
                    </div>
                    <span
                      className="text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase"
                      style={{
                        background: `${member.color}10`,
                        color: member.color,
                        border: `1px solid ${member.color}25`,
                      }}
                    >
                      {member.badge}
                    </span>
                  </div>

                  {/* Name + role */}
                  <div className="mb-4">
                    <h3 className="text-white font-bold text-base group-hover:text-[#00F5FF] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-white/40 text-xs">{member.role}</p>
                  </div>

                  {/* Credentials */}
                  <ul className="space-y-2 flex-1 mb-5">
                    {member.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs text-white/50">
                        <span className="mt-0.5 shrink-0" style={{ color: member.color }}>▸</span>
                        {c}
                      </li>
                    ))}
                  </ul>

                  {/* LinkedIn link */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: `${member.color}60` }}
                    onMouseOver={(e) => (e.currentTarget.style.color = member.color)}
                    onMouseOut={(e) => (e.currentTarget.style.color = `${member.color}60`)}
                  >
                    <LinkedInIcon size={12} />
                    Connect on LinkedIn
                    <ExternalLink size={10} />
                  </a>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>

        {/* Track record stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <HolographicCard variant="cyan" className="p-8">
            <p className="text-center text-[10px] font-bold tracking-wider uppercase text-white/25 mb-6">
              Collective Track Record — Anonymised Where Required
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="text-3xl font-black mb-2"
                    style={{
                      background: "linear-gradient(135deg, #00F5FF, #8B5CF6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </div>
                  <p className="text-xs text-white/35 leading-relaxed">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </HolographicCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <GlowButton variant="purple" size="lg" href="/about">
            Meet the Full Team
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}

export default TeamCredibility;
