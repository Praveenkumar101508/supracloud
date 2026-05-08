"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bot, Briefcase, GraduationCap, CheckCircle, ArrowRight, Building2, ShoppingCart, Zap, Shield, TrendingUp, Users, ChevronRight } from "lucide-react";

/*  Terminal animation  */
const TERMINAL_LINES = [
  "$ initialising SupraCloud enterprise runtime...",
  "$ deploying banking-ai-agent v3.2.1 → production",
  "$ agent.handleQuery('account_balance') → resolved in 0.4s",
  "$ L1_deflection_rate: 63% ↑ | SLA: 99.97%",
  "$ retail-ai-agent: processing 2,400 concurrent queries",
  "$ rag_pipeline: 14ms avg latency | accuracy: 94.2%",
  "$ all systems operational ",
];

function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[currentLine];
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCharIndex(0);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [currentLine, charIndex]);

  const partialLine = currentLine < TERMINAL_LINES.length
    ? TERMINAL_LINES[currentLine].slice(0, charIndex)
    : null;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-xs text-slate-500 font-mono">supracloud-agent-runtime</span>
      </div>
      {/* Terminal body */}
      <div className="bg-slate-900/90 px-5 py-5 font-mono text-xs leading-relaxed min-h-[220px]">
        {visibleLines.map((line, i) => (
          <div key={i} className="text-emerald-400/90 mb-1">{line}</div>
        ))}
        {partialLine !== null && (
          <div className="text-emerald-400/90">
            {partialLine}
            <span className="cursor-blink inline-block w-2 h-4 bg-emerald-400 ml-px align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}

/*  Industry Solution Matrix  */
const matrix = {
  banking: {
    label: "Banking",
    icon: <Building2 size={18} />,
    color: "emerald",
    headline: "Banking AI Agents",
    sub: "L1 & L2 customer support automation for financial services",
    stat: { value: "63%", label: "reduction in L1 call volume" },
    capabilities: [
      "Account balance & transaction queries",
      "Product information & eligibility checks",
      "Fraud flag detection with human handoff",
      "Regulatory-aware escalation paths",
      "Complex complaint resolution (L2)",
      "Full context transfer on escalation",
    ],
    stack: ["Claude API", "LangGraph", "RAG", "FastAPI", "PostgreSQL", "Pinecone"],
    cta: "/solutions/banking",
  },
  retail: {
    label: "Retail",
    icon: <ShoppingCart size={18} />,
    color: "blue",
    headline: "Retail AI Agents",
    sub: "Order management, inventory escalation & customer support automation",
    stat: { value: "24/7", label: "peak demand coverage" },
    capabilities: [
      "Order status, delivery & returns tracking",
      "Product substitution & availability queries",
      "Store info — opening hours, click & collect",
      "Loyalty programme support",
      "Inventory & supplier escalation (L2)",
      "Multi-system complaint resolution",
    ],
    stack: ["Claude API", "LangGraph", "RAG", "FastAPI", "AWS", "Pinecone"],
    cta: "/solutions/retail",
  },
};

function IndustryMatrix() {
  const [active, setActive] = useState<"banking" | "retail">("banking");
  const data = matrix[active];

  return (
    <div className="w-full">
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="flex rounded-xl border border-slate-700/60 overflow-hidden">
          {(["banking", "retail"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all ${
                active === key
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              {matrix[key].icon}
              {matrix[key].label} Sector
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div key={active} className="matrix-in grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left — description */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-2">{data.headline}</h3>
          <p className="text-slate-400 text-sm mb-6">{data.sub}</p>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 mb-6">
            <p className="text-3xl font-extrabold text-emerald-400">{data.stat.value}</p>
            <p className="text-sm text-emerald-300/80 mt-1">{data.stat.label}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {data.stack.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700/60 text-slate-300 border border-slate-600/40">
                {t}
              </span>
            ))}
          </div>

          <Link
            href={data.cta}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View full solution <ArrowRight size={14} />
          </Link>
        </div>

        {/* Right — capabilities */}
        <div className="glass-card rounded-2xl p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-5">Capabilities</p>
          <ul className="space-y-3">
            {data.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/*  Page  */
export default function Home() {
  return (
    <>
      {/*  HERO  */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <p className="animate-fade-up inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
                <Zap size={11} /> Enterprise AI · UK-Based · Production-Grade
              </p>
              <h1 className="animate-fade-up-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                Autonomous AI Agents for{" "}
                <span className="gradient-text">Global Enterprise</span>
              </h1>
              <p className="animate-fade-up-2 text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                We design, build and deploy production-grade AI agents for banking and retail — slashing support costs and handling L1/L2 queries at scale, 24/7.
              </p>
              <div className="animate-fade-up-3 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  Book a Discovery Call <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors"
                >
                  Submit a Brief
                </Link>
              </div>
              <div className="animate-fade-up-4 mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-600" /> Banking & Retail Specialists</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-600" /> Engineer-Led Delivery</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-600" /> UK-Based Team</span>
              </div>
            </div>

            {/* Right — terminal */}
            <div className="animate-fade-in">
              <TerminalHero />
            </div>
          </div>
        </div>
      </section>

      {/*  STATS BAR  */}
      <section className="bg-slate-800/40 border-y border-slate-700/40 py-4" style={{ backgroundColor: "#071527" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm font-semibold text-slate-300">
            {[
              "Banking & Retail Sectors Served",
              "LangGraph + RAG Production Stack",
              "UK Enterprise Clients",
              "Built by ex-IBM Engineers",
            ].map((stat, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline text-slate-700">·</span>}
                <span className="text-emerald-500"></span> {stat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/*  THREE PILLARS  */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">What We Deliver</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Three Pillars of Enterprise Capability
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              End-to-end AI agent deployment, IT resource delivery, and specialised talent — under one roof.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot size={28} className="text-emerald-500" />,
                title: "AI Agent Development",
                desc: "Production-grade autonomous agents for banking and retail. Built on LLMs, RAG, and LangGraph — deployed, monitored, and continuously optimised.",
                links: [
                  { label: "Banking Agents", href: "/solutions/banking" },
                  { label: "Retail Agents", href: "/solutions/retail" },
                ],
              },
              {
                icon: <Briefcase size={28} className="text-emerald-500" />,
                title: "Enterprise IT Services",
                desc: "Vetted IT staffing for contract and permanent roles, plus strategic technology advisory to help you scale securely.",
                links: [
                  { label: "IT Staffing", href: "/services/staffing" },
                  { label: "IT Consultation", href: "/services/consultation" },
                ],
              },
              {
                icon: <GraduationCap size={28} className="text-emerald-500" />,
                title: "Talent Pipeline",
                desc: "Structured industry training, placement year partnerships, and graduate internships — feeding a pipeline of production-ready engineers.",
                links: [
                  { label: "Training Programs", href: "/talent/programs" },
                  { label: "Partnerships", href: "/talent/partnerships" },
                ],
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="hover-lift bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{pillar.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {pillar.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      {l.label} <ChevronRight size={12} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  INDUSTRY SOLUTION MATRIX  */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative py-24 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-3">Interactive Solution Matrix</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Choose Your Industry
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              See exactly how SupraCloud AI agents map to your sector&apos;s support workflows.
            </p>
          </div>
          <IndustryMatrix />
        </div>
      </section>

      {/*  WHY SUPRACLOUD  */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Why SupraCloud</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Engineer-Led. Production-Proven. Enterprise-Focused.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                We don&apos;t sell generic AI consulting — we deploy real agents into production environments with measurable SLAs, ongoing monitoring, and continuous optimisation.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: <Shield size={18} className="text-emerald-500" />,
                    title: "Compliance-Aware Architecture",
                    desc: "All agents are built with UK financial regulation and data protection in mind.",
                  },
                  {
                    icon: <TrendingUp size={18} className="text-emerald-500" />,
                    title: "Measurable ROI from Day One",
                    desc: "You get L1 deflection rates, cost-per-query metrics, and SLA dashboards — not vanity outputs.",
                  },
                  {
                    icon: <Users size={18} className="text-emerald-500" />,
                    title: "Full-Stack Delivery Team",
                    desc: "ML engineers, backend devs, and QA specialists — not just a solo consultant.",
                  },
                ].map((point) => (
                  <div key={point.title} className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{point.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Founder strip */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="flex flex-col sm:flex-row items-start gap-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-emerald-200 flex items-center justify-center shrink-0 text-xl font-bold text-slate-500 select-none">
                  PK
                </div>
                <div>
                  <p className="font-bold text-gray-900">Praveen Kumar</p>
                  <p className="text-sm text-emerald-600 font-medium mb-2">Founder · AI/ML Engineer · ex-IBM</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    5 years building production RAG pipelines and ML systems at IBM. SupraCloud exists because enterprise AI deserves engineering rigour, not just API wrappers.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "5+", label: "Years in enterprise AI" },
                  { value: "2", label: "Industry verticals" },
                  { value: "63%", label: "Avg. L1 deflection" },
                  { value: "99.9%", label: "Agent uptime SLA" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-100 text-center">
                    <p className="text-2xl font-extrabold text-emerald-600">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/about" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                  Read the full story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  FINAL CTA  */}
      <section style={{ backgroundColor: "#071527" }} className="py-24 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(16,185,129,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-4">Ready to Deploy?</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Let&apos;s Build Your Enterprise AI Solution
          </h2>
          <p className="text-slate-400 mb-10 text-lg leading-relaxed">
            Book a 30-minute discovery call. We&apos;ll map your support workflows, identify automation opportunities, and scope a solution that delivers measurable ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book a Discovery Call <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors"
            >
              Submit a Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
