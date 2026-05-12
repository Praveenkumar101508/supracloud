"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "./HolographicCard";
import { GlowButton } from "./GlowButton";
import { cn } from "@/lib/utils";

const METRICS = [
  { label: "Active Agents",       value: "12",    trend: "+2 this week",  color: "#00F5FF" },
  { label: "Queries Handled",     value: "48.2K", trend: "↑ 9% vs last",  color: "#8B5CF6" },
  { label: "Deflection Rate",     value: "74%",   trend: "↑ 2pp",         color: "#00F5FF" },
  { label: "Avg. Response Time",  value: "1.4s",  trend: "↓ 0.3s",        color: "#8B5CF6" },
];

const ACTIVITY = [
  { time: "09:41",  text: "Fraud alert auto-resolved — card block lifted" },
  { time: "09:38",  text: "Inventory reorder triggered — SKU 48821 at 8% stock" },
  { time: "09:31",  text: "Customer escalation deflected — refund issued autonomously" },
];

interface ClientPortalTeaserProps {
  className?: string;
}

export function ClientPortalTeaser({ className }: ClientPortalTeaserProps) {
  return (
    <section className={cn("relative py-24 px-4 overflow-hidden", className)}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[rgba(139,92,246,0.04)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] text-[11px] font-semibold text-[rgba(139,92,246,0.8)] tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[rgba(139,92,246,0.8)] animate-pulse" />
            Coming Soon
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Client Portal
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            A live command centre for every agent, metric, and decision your AI makes — with full audit trail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left — feature list */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { icon: "⚡", title: "Real-time Agent Monitoring",   desc: "Watch every decision, tool call, and resolution as it happens." },
              { icon: "📊", title: "ROI & Deflection Analytics",   desc: "Live dashboards with custom KPIs tied to your business metrics." },
              { icon: "🔐", title: "FCA Audit Log Export",         desc: "One-click export of full decision trails — regulator-ready." },
              { icon: "🔔", title: "Escalation Management",        desc: "Smart escalation routing with SLA tracking and alerting." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="flex gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(139,92,246,0.2)] hover:bg-[rgba(139,92,246,0.03)] transition-all"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
                <div>
                  <div className="text-white text-sm font-semibold mb-1">{f.title}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{f.desc}</div>
                </div>
              </motion.div>
            ))}

            <div className="pt-4">
              <GlowButton variant="purple" size="md" href="/contact">
                Join the Waitlist
              </GlowButton>
            </div>
          </motion.div>

          {/* Right — portal mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HolographicCard variant="purple" className="p-6" tilt>
              {/* Mockup header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-white font-bold text-sm">SupraCloud Portal</div>
                  <div className="text-white/30 text-[10px]">Live — last updated 2s ago</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(0,245,255,0.08)] border border-[rgba(0,245,255,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                  <span className="text-[10px] text-[rgba(0,245,255,0.7)] font-mono">Live</span>
                </div>
              </div>

              {/* Metric grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]"
                  >
                    <div className="text-[10px] text-white/35 mb-1">{m.label}</div>
                    <div className="text-xl font-black" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-[9px] text-white/25 mt-0.5">{m.trend}</div>
                  </div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="space-y-2">
                <div className="text-[10px] text-white/25 uppercase tracking-widest mb-2">Recent Activity</div>
                {ACTIVITY.map((a, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2.5 text-[11px]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-white/25 font-mono shrink-0">{a.time}</span>
                    <span className="text-white/55 leading-tight">{a.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Blur overlay — "coming soon" lock */}
              <div className="absolute inset-0 rounded-2xl backdrop-blur-[2px] bg-[rgba(5,5,16,0.35)] flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-white font-bold text-sm">Portal Preview</div>
                  <div className="text-white/40 text-xs mt-1">Full access on launch</div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ClientPortalTeaser;
