"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot, Building2, ShoppingCart, Cloud, Users, Settings,
  GraduationCap, ArrowRight, CheckCircle, Zap, Shield,
  TrendingUp, ChevronRight,
} from "lucide-react";
import { AIHub } from "./components/AIHub";

/* ── Animated counter ────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round(p * p * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Fade-up wrapper ─────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Bento card ──────────────────────────────────────────── */
function BentoCard({
  className = "", href, badge, badgeColor = "#0070FF", icon, title, desc, stat, statLabel, tag, delay = 0,
}: {
  className?: string; href: string; badge: string; badgeColor?: string;
  icon: React.ReactNode; title: string; desc: string;
  stat?: string; statLabel?: string; tag?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link href={href} className="card group h-full flex flex-col p-6 relative overflow-hidden">
        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,112,255,0.07) 0%, transparent 70%)` }}
        />

        {/* Badge */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${badgeColor}18`, color: badgeColor, border: `1px solid ${badgeColor}30` }}
          >
            {badge}
          </span>
          {tag && (
            <span className="text-[10px] font-semibold text-gray-600 tracking-wide">{tag}</span>
          )}
        </div>

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(0,112,255,0.1)", color: "#3B8EFF" }}
        >
          {icon}
        </div>

        {/* Title + desc */}
        <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{desc}</p>

        {/* Stat */}
        {stat && (
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-2xl font-extrabold" style={{ color: "#0070FF" }}>{stat}</p>
            <p className="text-xs text-gray-600 mt-0.5">{statLabel}</p>
          </div>
        )}

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-gray-700 group-hover:text-blue-400 transition-colors">
          Explore <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Terminal hero animation ─────────────────────────────── */
const LINES = [
  "$ supracloud init --env production",
  "$ deploying banking-agent-v3.2 → LIVE",
  "$ latency: 0.1s · accuracy: 94.2% · uptime: 99.97%",
  "$ L1_deflection: 63% ↑ · cost_reduction: 60% ↓",
  "$ retail-agent: 2,400 concurrent sessions · no errors",
  "$ all systems operational ✓",
];

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [cur, setCur] = useState(0);
  const [ch, setCh] = useState(0);

  useEffect(() => {
    if (cur >= LINES.length) return;
    const line = LINES[cur];
    if (ch < line.length) {
      const t = setTimeout(() => setCh(c => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLines(p => [...p, line]); setCur(l => l + 1); setCh(0); }, 160);
    return () => clearTimeout(t);
  }, [cur, ch]);

  const partial = cur < LINES.length ? LINES[cur].slice(0, ch) : null;

  return (
    <div className="terminal w-full">
      <div className="terminal-bar">
        <span className="terminal-dot" style={{ background: "#FF5F57" }} />
        <span className="terminal-dot" style={{ background: "#FEBC2E" }} />
        <span className="terminal-dot" style={{ background: "#28C840" }} />
        <span className="ml-3 text-xs text-gray-600">supracloud-agent-runtime</span>
      </div>
      <div className="p-5 min-h-[200px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className="mb-1" style={{ color: "#3B8EFF", opacity: 0.85 }}>{l}</div>
        ))}
        {partial !== null && (
          <div style={{ color: "#3B8EFF", opacity: 0.85 }}>
            {partial}
            <span className="inline-block w-1.5 h-4 ml-px align-middle" style={{ background: "#0070FF", animation: "blue-pulse 1s ease-in-out infinite" }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ background: "#050505" }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}>
        {/* Radial blue glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,112,255,0.12) 0%, transparent 65%)"
        }} />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <div>
              <FadeUp>
                <div className="badge mb-6">
                  <Zap size={10} /> Enterprise AI · UK-Based · Production-Grade
                </div>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
                  <span className="text-white">Autonomous AI</span>
                  <br />
                  <span className="gradient-text">Agents for</span>
                  <br />
                  <span className="text-white">Enterprise</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.14}>
                <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                  We design, build and deploy production-grade AI agents for banking and retail —
                  cutting L1/L2 support costs by 60% and handling millions of queries, 24/7.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link href="/book" className="btn-primary text-base px-7 py-4">
                    Book a Discovery Call <ArrowRight size={16} />
                  </Link>
                  <Link href="/solutions/banking" className="btn-ghost text-base px-7 py-4">
                    View Solutions
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.26}>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {["Banking & Retail Specialists", "FCA Compliance Ready", "UK-Based Engineers"].map(t => (
                    <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <CheckCircle size={12} style={{ color: "#0070FF" }} /> {t}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right — AI Hub + terminal */}
            <FadeUp delay={0.1} className="w-full flex flex-col items-center gap-10">
              <AIHub />
              <Terminal />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── LIVE STATS ─────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(0,112,255,0.08)", borderBottom: "1px solid rgba(0,112,255,0.08)", background: "#080808" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: 63, suffix: "%", label: "L1 query deflection" },
              { val: 60, suffix: "%", label: "Support cost reduction" },
              { val: 99, suffix: "%", label: "Agent uptime SLA" },
              { val: 5,  suffix: "+", label: "Years enterprise AI" },
            ].map(({ val, suffix, label }) => (
              <FadeUp key={label} className="text-center">
                <p className="text-3xl font-extrabold" style={{ color: "#0070FF" }}>
                  <Counter to={val} suffix={suffix} />
                </p>
                <p className="text-xs text-gray-600 mt-1 font-medium">{label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ─────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0070FF" }}>What We Build</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
              One Platform.<br />
              <span className="gradient-text">Three Capabilities.</span>
            </h2>
          </FadeUp>

          <div className="bento-grid">
            {/* Banking AI — large */}
            <BentoCard
              className="bento-col-4 bento-row-2"
              href="/solutions/banking"
              badge="Banking AI"
              icon={<Building2 size={20} />}
              title="Banking AI Agents"
              desc="Autonomous L1/L2 customer support agents for financial services — handling account queries, fraud flagging, and complex complaint resolution. FCA-aware escalation paths built in."
              stat="63%"
              statLabel="average L1 deflection rate in production"
              tag="SOC2 · FCA · GDPR"
              delay={0}
            />

            {/* Retail AI */}
            <BentoCard
              className="bento-col-2 bento-row-2"
              href="/solutions/retail"
              badge="Retail AI"
              badgeColor="#8B5CF6"
              icon={<ShoppingCart size={20} />}
              title="Retail AI Agents"
              desc="Omnichannel agents handling order management, inventory, personalisation, and 24/7 customer concierge — integrated with your ERP and CRM."
              stat="24/7"
              statLabel="autonomous peak demand coverage"
              delay={0.06}
            />

            {/* Cloud Architecture */}
            <BentoCard
              className="bento-col-2"
              href="/services/cloud-architecture"
              badge="Cloud"
              badgeColor="#06B6D4"
              icon={<Cloud size={18} />}
              title="Cloud Architecture"
              desc="AI-ready infrastructure design for AWS and Azure. We architect multi-tenant, compliant cloud environments built to run enterprise agents."
              delay={0.12}
            />

            {/* IT Staffing */}
            <BentoCard
              className="bento-col-2"
              href="/services/staffing"
              badge="Staffing"
              badgeColor="#10B981"
              icon={<Users size={18} />}
              title="IT Staffing"
              desc="Engineer-screened AI, ML, data and DevOps specialists — placed directly into your team. No recruiters, no CV farming."
              delay={0.16}
            />

            {/* Managed Services */}
            <BentoCard
              className="bento-col-2"
              href="/services/managed-services"
              badge="Managed"
              badgeColor="#F59E0B"
              icon={<Settings size={18} />}
              title="Managed Services"
              desc="Post-deployment agent monitoring, SLA management and continuous optimisation — so your agents keep improving in production."
              delay={0.2}
            />

            {/* Academy — wide */}
            <motion.div
              className="bento-col-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(99,102,241,0.12)", color: "#818CF8" }}>
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mr-2"
                      style={{ background: "rgba(99,102,241,0.12)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.25)" }}>
                      Academy
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">SupraCloud Academy</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Graduate internships, cohort training & placement partnerships — feeding a pipeline of production-ready AI engineers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link href="/talent/internships" className="btn-ghost text-sm px-4 py-2">Internships</Link>
                  <Link href="/talent/programs" className="btn-ghost text-sm px-4 py-2">Training</Link>
                  <Link href="/talent/partnerships" className="btn-ghost text-sm px-4 py-2">Partnerships</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0070FF" }}>The Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">From Discovery to Production in Weeks</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">No months-long waterfall. A clear three-phase model — engineer-led from day one.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line desktop */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,112,255,0.4), transparent)" }} />

            {[
              { step: "01", title: "Discovery Call", desc: "30 minutes. We map your workflows, data sources, escalation paths and compliance constraints — no slides, just engineering questions.", time: "Week 1", icon: <Users size={20} /> },
              { step: "02", title: "Agent Design & Build", desc: "Our ML engineers build your agent on Claude + LangGraph + RAG, trained on your knowledge base. You review at every milestone.", time: "Weeks 2–5", icon: <Bot size={20} /> },
              { step: "03", title: "Deploy & Optimise", desc: "Agent goes live with SLA dashboards, cost-per-query metrics and deflection tracking. We tune continuously — ROI from day one.", time: "Week 6+", icon: <TrendingUp size={20} /> },
            ].map((phase, i) => (
              <FadeUp key={phase.step} delay={i * 0.1} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center z-10 relative"
                    style={{ background: "#0d0d0d", border: "1px solid rgba(0,112,255,0.3)", color: "#3B8EFF" }}>
                    {phase.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "#0070FF" }}>
                    {phase.step}
                  </div>
                </div>
                <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#0070FF" }}>{phase.time}</span>
                <h3 className="text-lg font-bold text-white mb-3">{phase.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{phase.desc}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center mt-12">
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              Start with a Discovery Call <ArrowRight size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── COMPARISON TABLE ────────────────────────────────── */}
      <section className="py-20 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0070FF" }}>Why SupraCloud</p>
            <h2 className="text-3xl font-extrabold text-white">SupraCloud vs. Your Alternatives</h2>
          </FadeUp>

          <FadeUp>
            <div className="overflow-x-auto" style={{ border: "1px solid rgba(0,112,255,0.1)", borderRadius: 16 }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Capability</th>
                    <th className="py-4 px-6 text-center font-bold" style={{ color: "#0070FF" }}>SupraCloud</th>
                    <th className="py-4 px-6 text-center text-gray-600 font-semibold">Build In-House</th>
                    <th className="py-4 px-6 text-center text-gray-600 font-semibold">Generic AI Firm</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Time to production", "4–8 weeks", "6–18 months", "3–12 months"],
                    ["Banking/retail expertise", "Specialist", "You hire it", "Generic"],
                    ["Compliance-aware build", "Built in", "You build it", "Extra cost"],
                    ["Ongoing SLA monitoring", "Included", "You build it", "Not standard"],
                    ["Cost-per-query dashboards", "Included", "Custom build", "Not standard"],
                    ["Continuous optimisation", "Included", "Your team's time", "Day-rate extra"],
                  ].map(([cap, sc, ih, ai], i) => (
                    <tr key={cap} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                      <td className="py-3.5 px-6 font-medium text-gray-300">{cap}</td>
                      <td className="py-3.5 px-6 text-center">
                        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: "#0070FF" }}>
                          <CheckCircle size={13} /> {sc}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-center text-gray-600">{ih}</td>
                      <td className="py-3.5 px-6 text-center text-gray-600">{ai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TRUST SIGNALS ───────────────────────────────────── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#0070FF" }}>Built for Regulated Enterprise</p>
            <h2 className="text-2xl font-bold text-white">Security & Compliance First</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <Shield size={22} />, title: "Regulatory-Aware", desc: "FCA, GDPR, PCI-DSS compliance built into every agent from day one. Audit trails and explainability included." },
              { icon: <Zap size={22} />, title: "0.1s Agent Latency", desc: "Sub-200ms response times in production. LangGraph orchestration with RAG retrieval optimised for speed." },
              { icon: <CheckCircle size={22} />, title: "Your Data Perimeter", desc: "Agents run inside your cloud tenant. No data exfiltration to our infrastructure. NDA before discovery call." },
            ].map(item => (
              <FadeUp key={item.title}>
                <div className="card p-6 h-full">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,112,255,0.1)", color: "#3B8EFF" }}>
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ borderTop: "1px solid rgba(0,112,255,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,112,255,0.07) 0%, transparent 70%)"
        }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="badge mb-6 mx-auto w-fit">
              <Bot size={10} /> Ready when you are
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              Book a 30-Minute<br /><span className="gradient-text">Discovery Call</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
              Engineer-led, no sales pressure. We ask the right technical questions, then give you an honest scope on the same call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="btn-primary text-base px-8 py-4">
                Book a Discovery Call <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-ghost text-base px-8 py-4">
                Submit a Brief <ChevronRight size={16} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
