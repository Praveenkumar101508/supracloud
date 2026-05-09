import Link from "next/link";
import {
  Landmark, ShoppingCart, Users, Briefcase,
  GraduationCap, BookOpen, ArrowRight,
  Shield, TrendingUp, Wrench,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */

const stats = [
  { value: "60%+",   label: "Target L1 deflection (target SLA)" },
  { value: "<400ms", label: "Average agent response latency" },
  { value: "99.9%",  label: "Agent uptime SLA guaranteed" },
  { value: "5+",     label: "Years enterprise AI delivery" },
];

const pillars = [
  {
    tag:   "PILLAR 01",
    title: "AI Agent Development",
    color: "#00F5FF",
    items: [
      { label: "Banking AI Agents",     href: "/solutions/banking",    Icon: Landmark,      desc: "L1 & L2 autonomous support for financial operations." },
      { label: "Supermarket AI Agents", href: "/solutions/supermarket", Icon: ShoppingCart,  desc: "Retail automation & peak-demand deflection." },
    ],
  },
  {
    tag:   "PILLAR 02",
    title: "Career Programs",
    color: "#FF6B35",
    items: [
      { label: "Training",       href: "/careers/training",    Icon: BookOpen,      desc: "Industry-standard AI engineering upskilling." },
      { label: "Internships",    href: "/careers/internships", Icon: GraduationCap, desc: "Paid placements in production AI squads." },
      { label: "Placement Year", href: "/talent/partnerships", Icon: Users,         desc: "University partner placement programmes." },
    ],
  },
  {
    tag:   "PILLAR 03",
    title: "IT Services",
    color: "#00F5FF",
    items: [
      { label: "IT Staffing",     href: "/services/it-staffing",  Icon: Users,     desc: "Pre-vetted ML & cloud engineers, placed fast." },
      { label: "IT Consultation", href: "/services/consultation", Icon: Briefcase, desc: "Engineer-led advisory, production code output." },
    ],
  },
];

const valueProps = [
  {
    Icon:  Shield,
    title: "Compliance-Native Architecture",
    body:  "Built for UK GDPR, PCI DSS awareness, and FCA operational resilience from day one — not retrofitted before go-live.",
  },
  {
    Icon:  TrendingUp,
    title: "Measurable ROI from Week One",
    body:  "L1 deflection rates, cost-per-query metrics, and SLA dashboards — not vanity outputs or slide decks.",
  },
  {
    Icon:  Wrench,
    title: "Engineer-Led Delivery",
    body:  "The engineer who designs your system also builds it and monitors it. No account managers, no subcontractor handoffs.",
  },
];

/* ── Page ─────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ══ HERO ════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden noise-overlay"
        style={{ background: "linear-gradient(180deg, #0D1117 0%, #0B0E14 100%)" }}
      >
        <div aria-hidden className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />
        <div aria-hidden className="scanline pointer-events-none" />
        <div aria-hidden className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)" }} />
        <div aria-hidden className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 sm:pt-28 sm:pb-14">
          <p className="text-center font-mono text-xs tracking-[0.3em] uppercase mb-5"
            style={{ color: "#00F5FF" }}>
            ◈ &nbsp;ENTERPRISE AI DELIVERY&nbsp; ◈
          </p>

          <h1 className="text-center text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.1] max-w-4xl mx-auto">
            <span style={{ color: "#E2E8F0" }}>Production AI Agents for </span>
            <br className="hidden sm:block" />
            <span className="text-glow" style={{ color: "#00F5FF" }}>
              UK Banking &amp; Retail
            </span>
          </h1>

          <p className="mt-6 text-center text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#94A3B8" }}>
            Engineer-led AI agent deployment with measurable SLAs —
            <span style={{ color: "#E2E8F0" }}> L1 deflection targets</span>,
            <span style={{ color: "#00F5FF" }}> compliance-native architecture</span>, and
            production monitoring from week one.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all hover:brightness-110 hover:scale-[1.02] text-center"
              style={{
                background: "linear-gradient(135deg, #00F5FF, #0099AA)",
                color:      "#0B0E14",
                boxShadow:  "0 0 24px rgba(0,245,255,0.35)",
              }}
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all hover:border-white hover:text-white text-center glass glass-hover"
              style={{ color: "#94A3B8" }}
            >
              See Client Outcomes <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ NUMBERS THAT MATTER ═════════════════════════ */}
      <section className="py-16" style={{ background: "#0D1117" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center font-mono text-xs tracking-[0.25em] uppercase mb-10"
            style={{ color: "#475569" }}>
            NUMBERS THAT MATTER
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="glass p-6 rounded-2xl text-center">
                <p className="text-3xl sm:text-4xl font-extrabold mb-2 text-glow"
                  style={{ color: "#00F5FF" }}>
                  {value}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THREE PILLARS ═══════════════════════════════ */}
      <section className="py-24" style={{ background: "#0B0E14" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
              style={{ color: "#FF6B35" }}>SERVICE ARCHITECTURE</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#E2E8F0" }}>
              Three Pillars of Delivery
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#64748B" }}>
              AI agent development, career programmes, and IT services — engineer-led across all three.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(({ tag, title, color, items }) => (
              <div key={title} className="glass glass-hover p-8 rounded-2xl transition-all duration-300">
                <p className="font-mono text-[10px] tracking-widest mb-4" style={{ color: "#475569" }}>
                  {tag}
                </p>
                <h3 className="text-base font-bold mb-5" style={{ color: "#E2E8F0" }}>{title}</h3>
                <div className="space-y-3">
                  {items.map(({ label, href, Icon, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-white/5 group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                      >
                        <Icon size={15} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-white transition-colors"
                          style={{ color: "#E2E8F0" }}>
                          {label}
                        </p>
                        <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#64748B" }}>
                          {desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY SUPRACLOUD ══════════════════════════════ */}
      <section className="py-24" style={{ background: "#0D1117" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
              style={{ color: "#00F5FF" }}>WHY SUPRACLOUD</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#E2E8F0" }}>
              Enterprise AI Done Differently
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueProps.map(({ Icon, title, body }) => (
              <div key={title} className="glass glass-hover p-8 rounded-2xl transition-all duration-300">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.25)" }}
                >
                  <Icon size={22} style={{ color: "#00F5FF" }} />
                </div>
                <h3 className="text-base font-bold mb-3" style={{ color: "#E2E8F0" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden noise-overlay"
        style={{ background: "linear-gradient(135deg, #0D1117 0%, #0B0E14 50%, #0D1117 100%)" }}
      >
        <div aria-hidden className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
        <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)" }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#00F5FF" }}>
            ◈ &nbsp;READY TO DEPLOY&nbsp; ◈
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5" style={{ color: "#E2E8F0" }}>
            Start With a Discovery Call
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#64748B" }}>
            30 minutes. No pitch deck. We map your support workflows and tell you honestly
            what AI can achieve — with production SLA targets, not vanity benchmarks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all hover:brightness-110 hover:scale-[1.02] glow-cyan text-center"
              style={{ background: "linear-gradient(135deg, #00F5FF, #0099AA)", color: "#0B0E14" }}
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all glass glass-hover text-center"
              style={{ color: "#94A3B8" }}
            >
              Submit a Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
