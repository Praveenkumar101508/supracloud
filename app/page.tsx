import Link from "next/link";
import {
  Database, Zap, Brain, Rocket,
  GitBranch, FileText, Mic, Link2,
  CheckCircle, LayoutDashboard, BookOpen, Trophy,
  ArrowRight,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */

const pipeline = [
  { label: "INGEST",    sublabel: "Raw Data",      Icon: Database, color: "#00F5FF" },
  { label: "TRANSFORM", sublabel: "ETL / dbt",     Icon: Zap,      color: "#00F5FF" },
  { label: "TRAIN",     sublabel: "AI / ML",        Icon: Brain,    color: "#FF6B35" },
  { label: "DEPLOY",    sublabel: "Cloud / K8s",    Icon: Rocket,   color: "#00F5FF" },
];

const pillars = [
  {
    Icon: LayoutDashboard,
    color: "#00F5FF",
    tag: "MODULE 01",
    title: "Real Production-Style Projects",
    body: "Build end-to-end Data, Cloud & AI pipelines that mirror what employers ship. Walk into interviews with a GitHub portfolio that speaks for itself.",
  },
  {
    Icon: BookOpen,
    color: "#FF6B35",
    tag: "MODULE 02",
    title: "Structured Training & Applications",
    body: "A clear week-by-week programme with ATS-optimised CVs, LinkedIn profiles, and a done-for-you UK job application engine so you spend time learning, not grinding.",
    warm: true,
  },
  {
    Icon: Trophy,
    color: "#00F5FF",
    tag: "MODULE 03",
    title: "Interview Mastery",
    body: "Targeted technical and behavioural prep, mock interviews, and 1:1 coaching from engineers who have been on both sides of the hiring table.",
  },
];

const outcomes = [
  { Icon: GitBranch, label: "GitHub Portfolio",          detail: "3–4 production-quality repos with architecture diagrams" },
  { Icon: FileText,  label: "ATS-Optimised CV",          detail: "Keyword-tuned, recruiter-reviewed, role-specific" },
  { Icon: Mic,       label: "Mock Interview Readiness",  detail: "Technical + behavioural rounds with structured feedback" },
  { Icon: Link2,     label: "LinkedIn Optimised",        detail: "SSI-boosted profile that surfaces in UK searches" },
];

const tiers = [
  {
    badge: "TIER 01",
    name: "The Foundation",
    tagline: "Your professional presence, rebuilt from the ground up.",
    features: [
      "ATS-compliant CV rewrite",
      "LinkedIn profile optimisation",
      "GitHub profile formatting",
      "Professional portfolio creation",
    ],
    cta: "Get Started",
    href: "/apply",
    highlight: false,
    mascotQuote: null,
  },
  {
    badge: "TIER 02",
    name: "The Application Engine",
    tagline: "Everything in Tier 1, plus a done-for-you job search.",
    features: [
      "Everything in The Foundation",
      "Done-for-you UK job applications",
      "Application tracking strategy",
      "Weekly pipeline reporting",
    ],
    cta: "Apply Now",
    href: "/apply",
    highlight: true,
    mascotQuote: "Most popular path to an offer letter — fast.",
  },
  {
    badge: "TIER 03",
    name: "The Full Accelerator",
    tagline: "End-to-end support from profile to offer letter.",
    features: [
      "Everything in Tiers 1 & 2",
      "Heavy technical interview prep",
      "Behavioural coaching (STAR)",
      "1:1 coaching & mock interviews",
      "Dedicated training sessions",
    ],
    cta: "Book Assessment",
    href: "/book",
    highlight: false,
    mascotQuote: "Nova says: This is our most popular path to senior roles!",
  },
];

/* ── Components ───────────────────────────────────────── */

function StatusPip({ label, active = true }: { label: string; active?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-mono"
      style={{ color: active ? "#39FF14" : "#94A3B8" }}>
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background:  active ? "#39FF14" : "#475569",
          boxShadow:   active ? "0 0 6px #39FF14" : "none",
          animation:   active ? "antenna-blink 2s ease-in-out infinite" : "none",
        }}
      />
      {label}
    </span>
  );
}

function PipelineNode({ label, sublabel, Icon, color, last = false }:
  { label: string; sublabel: string; Icon: React.ElementType; color: string; last?: boolean }) {
  return (
    <div className="flex items-center gap-0 flex-1">
      <div className="flex flex-col items-center gap-2 min-w-0">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{
            background:  "rgba(11,14,20,0.9)",
            border:      `1.5px solid ${color}`,
            boxShadow:   `0 0 16px ${color}40`,
          }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div className="text-center">
          <p className="text-[10px] font-mono font-bold tracking-widest" style={{ color }}>
            {label}
          </p>
          <p className="text-[9px] text-slate-500 tracking-wide">{sublabel}</p>
        </div>
      </div>
      {!last && (
        <div className="flex-1 mx-2 relative h-px" style={{ background: "rgba(0,245,255,0.2)" }}>
          {/* Animated flow dots */}
          {[0, 1, 2].map(i => (
            <span
              key={i}
              aria-hidden
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background:     "#00F5FF",
                boxShadow:      "0 0 8px #00F5FF",
                animation:      "flow-dot 2.4s linear infinite",
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ══ HERO — Mission Control ══════════════════════ */}
      <section
        className="relative overflow-hidden noise-overlay"
        style={{ background: "linear-gradient(180deg, #0D1117 0%, #0B0E14 100%)" }}
      >
        {/* Grid texture */}
        <div aria-hidden className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />
        {/* Scan line */}
        <div aria-hidden className="scanline pointer-events-none" />
        {/* Gradient orbs */}
        <div aria-hidden className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)" }} />
        <div aria-hidden className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 sm:pt-28 sm:pb-14">

          {/* Status bar */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 flex-wrap">
            <StatusPip label="SYSTEMS OPERATIONAL" />
            <StatusPip label="UK DATA · CLOUD · AI" />
            <StatusPip label="COHORT OPEN" />
          </div>

          {/* Mission label */}
          <p className="text-center font-mono text-xs tracking-[0.3em] uppercase mb-5"
            style={{ color: "#00F5FF" }}>
            ◈ &nbsp;MISSION CONTROL&nbsp; ◈
          </p>

          {/* Headline */}
          <h1 className="text-center text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.1] max-w-4xl mx-auto">
            <span style={{ color: "#E2E8F0" }}>Become Industry-Ready for </span>
            <br className="hidden sm:block" />
            <span className="text-glow" style={{ color: "#00F5FF" }}>
              UK&nbsp;Data,&nbsp;Cloud&nbsp;&amp;&nbsp;AI&nbsp;Roles
            </span>
          </h1>

          <p className="mt-6 text-center text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#94A3B8" }}>
            An engineer-led career accelerator that takes you from
            <span style={{ color: "#E2E8F0" }}> qualified-but-overlooked</span> to
            <span style={{ color: "#00F5FF" }}> confidently hired</span> — with real
            production projects, structured applications, and relentless interview prep.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all hover:brightness-110 hover:scale-[1.02] text-center"
              style={{
                background:  "linear-gradient(135deg, #00F5FF, #0099AA)",
                color:       "#0B0E14",
                boxShadow:   "0 0 24px rgba(0,245,255,0.35)",
              }}
            >
              Book Free Assessment Call
            </Link>
            <Link
              href="/apply"
              className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all hover:border-white hover:text-white text-center glass glass-hover"
              style={{ color: "#94A3B8" }}
            >
              Apply Now <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>

          <p className="mt-6 text-center text-xs font-mono" style={{ color: "#475569" }}>
            Candidates placed at UK firms in Data Engineering · ML Engineering · Cloud Architecture
          </p>

          {/* ── Live Pipeline ── */}
          <div className="mt-16 glass rounded-2xl p-6 sm:p-8 overflow-x-auto">
            <p className="text-center text-[10px] font-mono tracking-widest mb-6"
              style={{ color: "#475569" }}>
              LIVE DATA PIPELINE // SIMULATED FLOW
            </p>
            <div className="flex items-start justify-between min-w-[480px]">
              {pipeline.map((node, i) => (
                <PipelineNode key={node.label} {...node} last={i === pipeline.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3 CORE PILLARS ═════════════════════════════ */}
      <section className="py-24" style={{ background: "#0B0E14" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
              style={{ color: "#FF6B35" }}>PROGRAMME ARCHITECTURE</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#E2E8F0" }}>
              Everything You Need to Land the Role
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#64748B" }}>
              Three modules engineered to close the gap between where you are
              and where UK employers need you to be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(({ Icon, color, tag, title, body, warm }) => (
              <div
                key={title}
                className={`glass glass-hover p-8 rounded-2xl ${warm ? "glass-warm" : ""} transition-all duration-300`}
              >
                <p className="font-mono text-[10px] tracking-widest mb-4" style={{ color: "#475569" }}>
                  {tag}
                </p>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}18`, border: `1px solid ${color}40` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-base font-bold mb-3" style={{ color: "#E2E8F0" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MEASURABLE OUTCOMES ═══════════════════════ */}
      <section className="py-24" style={{ background: "#0D1117" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
              style={{ color: "#00F5FF" }}>MISSION DELIVERABLES</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#E2E8F0" }}>
              What You Walk Away With
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: "#64748B" }}>
              Tangible, measurable deliverables — not vague "confidence boosts".
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {outcomes.map(({ Icon, label, detail }) => (
              <div
                key={label}
                className="glass glass-hover p-6 rounded-2xl group transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.25)" }}
                >
                  <Icon size={18} style={{ color: "#00F5FF" }} />
                </div>
                <p className="font-semibold text-sm mb-2" style={{ color: "#E2E8F0" }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MISSION TIERS ═════════════════════════════ */}
      <section className="py-24" style={{ background: "#0B0E14" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
              style={{ color: "#FF6B35" }}>MISSION TIERS</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#E2E8F0" }}>
              Choose Your Programme
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: "#64748B" }}>
              Three tiers designed to meet you where you are and take you where you need to be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 transition-all duration-300 relative ${tier.highlight ? "tier-highlight" : "glass glass-hover"}`}
                style={tier.highlight ? {
                  background:  "rgba(0,245,255,0.05)",
                  backdropFilter: "blur(16px)",
                } : {}}
              >
                {/* Popular badge */}
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #00F5FF, #FF6B35)",
                        color:      "#0B0E14",
                      }}
                    >
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color: "#475569" }}>
                  {tier.badge}
                </p>
                <h3 className="text-lg font-extrabold mb-1" style={{ color: "#E2E8F0" }}>
                  {tier.name}
                </h3>
                <p className="text-sm mb-6" style={{ color: "#64748B" }}>{tier.tagline}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#94A3B8" }}>
                      <CheckCircle
                        size={15}
                        className="shrink-0 mt-0.5"
                        style={{ color: tier.highlight ? "#00F5FF" : "#FF6B35" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Nova quote bubble */}
                {tier.mascotQuote && (
                  <div
                    className="mb-5 p-3 rounded-xl text-xs leading-relaxed italic"
                    style={{
                      background: "rgba(0,245,255,0.06)",
                      border:     "1px solid rgba(0,245,255,0.18)",
                      color:      "#00F5FF",
                    }}
                  >
                    ◈ Nova: "{tier.mascotQuote}"
                  </div>
                )}

                <Link
                  href={tier.href}
                  className="block text-center py-3 rounded-xl text-sm font-bold tracking-wide transition-all hover:brightness-110"
                  style={tier.highlight ? {
                    background: "linear-gradient(135deg, #00F5FF, #0099AA)",
                    color:      "#0B0E14",
                    boxShadow:  "0 0 20px rgba(0,245,255,0.3)",
                  } : {
                    background:  "rgba(255,255,255,0.04)",
                    border:      "1px solid rgba(255,255,255,0.1)",
                    color:       "#94A3B8",
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/programs"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "#00F5FF" }}>
              View full pricing &amp; programme details →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden noise-overlay"
        style={{ background: "linear-gradient(135deg, #0D1117 0%, #0B0E14 50%, #0D1117 100%)" }}
      >
        <div aria-hidden className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
        <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)" }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#00F5FF" }}>
            ◈ &nbsp;INITIATE LAUNCH SEQUENCE&nbsp; ◈
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5" style={{ color: "#E2E8F0" }}>
            Ready to Get Industry-Ready?
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#64748B" }}>
            Book a free 30-minute assessment call. We'll map out exactly where you
            are, where you need to be, and which programme gets you there fastest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all hover:brightness-110 hover:scale-[1.02] glow-cyan text-center"
              style={{
                background: "linear-gradient(135deg, #00F5FF, #0099AA)",
                color:      "#0B0E14",
              }}
            >
              Book Free Assessment Call
            </Link>
            <Link
              href="/apply"
              className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all glass glass-hover text-center"
              style={{ color: "#94A3B8" }}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
