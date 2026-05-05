import Link from "next/link";
import { LayoutDashboard, BookOpen, Trophy, GitBranch, FileText, Mic, Link2, CheckCircle, Users, Building2 } from "lucide-react";

const pillars = [
  {
    icon: <LayoutDashboard size={32} className="text-emerald-500" />,
    title: "Real Production-Style Projects",
    description:
      "Build end-to-end Data, Cloud & AI projects that mirror what employers actually ship — not toy examples. Walk into interviews with a GitHub portfolio that speaks for itself.",
  },
  {
    icon: <BookOpen size={32} className="text-emerald-500" />,
    title: "Structured Training & Applications",
    description:
      "A clear week-by-week programme with ATS-optimised CVs, LinkedIn profiles, and a done-for-you UK job application engine so you spend time learning, not grinding job boards.",
  },
  {
    icon: <Trophy size={32} className="text-emerald-500" />,
    title: "Interview Mastery",
    description:
      "Targeted technical and behavioural interview prep, mock interviews, and 1:1 coaching from engineers who have been on both sides of the hiring table.",
  },
];

const outcomes = [
  { icon: <GitBranch size={24} className="text-emerald-500" />, label: "GitHub Portfolio", detail: "3–4 production-quality repos with architecture diagrams" },
  { icon: <FileText size={24} className="text-emerald-500" />, label: "ATS-Optimised CV", detail: "Keyword-tuned, recruiter-reviewed, role-specific" },
  { icon: <Mic size={24} className="text-emerald-500" />, label: "Mock Interview Readiness", detail: "Technical + behavioural rounds with structured feedback" },
  { icon: <Link2 size={24} className="text-emerald-500" />, label: "Recruiter-Optimised LinkedIn", detail: "SSI-boosted profile that surfaces in UK searches" },
];

const tiers = [
  {
    name: "The Foundation",
    price: "Tier 1",
    priceLabel: "From £299",
    description: "Your professional presence, rebuilt from the ground up.",
    features: [
      "ATS-compliant CV rewrite",
      "LinkedIn profile optimisation",
      "GitHub profile formatting",
      "Professional portfolio creation",
    ],
    cta: "Get Started",
    href: "/apply",
    highlight: false,
  },
  {
    name: "The Application Engine",
    price: "Tier 2",
    priceLabel: "From £599",
    description: "Everything in Tier 1, plus a done-for-you job search.",
    features: [
      "Everything in The Foundation",
      "Done-for-you UK job applications",
      "Application tracking strategy",
      "Weekly pipeline reporting",
    ],
    cta: "Apply Now",
    href: "/apply",
    highlight: true,
  },
  {
    name: "The Full Accelerator",
    price: "Tier 3",
    priceLabel: "From £999",
    description: "End-to-end support from profile to offer letter.",
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
  },
];

const stats = [
  "20+ Candidates Supported",
  "3 Industry Sectors",
  "£40k–£75k Roles Secured",
  "Built by ex-IBM Engineers",
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            UK Data · Cloud · AI
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
            Become Industry-Ready for{" "}
            <span className="text-emerald-400">UK Data, Cloud & AI Roles</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            SupraCloud is an engineer-led career accelerator that takes you from
            qualified-but-overlooked to confidently hired — with real projects, structured
            applications, and relentless interview prep.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book Free Assessment Call
            </Link>
            <Link
              href="/apply"
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white border border-slate-500 hover:border-white transition-colors"
            >
              Apply Now
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Candidates placed at UK firms in Data Engineering · ML Engineering · Cloud Architecture
          </p>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="bg-emerald-900/30 border-y border-emerald-800/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-emerald-300">
            {stats.map((stat, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline text-emerald-700">·</span>}
                {stat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Who is SupraCloud for?</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Whether you&apos;re a candidate ready to level up or a business that needs real tech capability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Candidate card */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <Users size={20} className="text-emerald-600" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">For Candidates</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Looking to break into UK Data, Cloud & AI?</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Career accelerator with real projects, done-for-you applications, and interview mastery. We close the gap between technically capable and confidently hired.
              </p>
              <Link
                href="/programs"
                className="mt-6 inline-block px-6 py-3 rounded-md text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors text-center"
              >
                View Programmes
              </Link>
            </div>

            {/* Business card */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <Building2 size={20} className="text-slate-600" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">For Businesses</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need AI agents or vetted tech talent?</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                We build custom AI agents for banking and retail, and staff vetted IT professionals across Data, Cloud, and AI. Engineer-led, not recruiter-led.
              </p>
              <Link
                href="/ai-agents"
                className="mt-6 inline-block px-6 py-3 rounded-md text-sm font-semibold text-gray-800 border border-slate-300 hover:border-slate-500 transition-colors text-center"
              >
                See Business Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 CORE PILLARS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need to Land the Role
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Three pillars engineered to close the gap between where you are and where UK employers need you to be.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-slate-50 rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEASURABLE OUTCOMES ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What You Walk Away With
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Tangible, measurable deliverables — not vague &ldquo;confidence boosts&rdquo;.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((o) => (
              <div
                key={o.label}
                className="flex flex-col gap-3 p-6 rounded-xl border border-slate-100 bg-white hover:shadow-sm transition-shadow"
              >
                <div>{o.icon}</div>
                <p className="font-semibold text-gray-900">{o.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{o.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAM TIER PREVIEW ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Choose Your Programme</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Three tiers designed to meet you where you are and take you where you need to be.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-8 border ${
                  tier.highlight
                    ? "border-emerald-500 shadow-lg bg-white"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                {tier.highlight && (
                  <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{tier.price}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-lg font-bold text-emerald-600 mb-2">{tier.priceLabel}</p>
                <p className="text-sm text-gray-500 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`block text-center py-3 rounded-md text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "border border-slate-300 hover:border-slate-500 text-gray-800"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/programs" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2">
              View full pricing & details →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOUNDER STRIP ── */}
      <section className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Photo placeholder */}
            <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-emerald-200 flex items-center justify-center shrink-0 text-2xl font-bold text-slate-400 select-none">
              PK
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-gray-900 text-lg">Praveen Kumar</p>
              <p className="text-sm text-emerald-600 font-medium mb-3">Founder · AI/ML Engineer · ex-IBM</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                I spent 5 years building production RAG pipelines and ML systems at IBM. I built SupraCloud because I know exactly what UK employers want — and most candidates are never shown how to deliver it.
              </p>
              <Link href="/about" className="inline-block mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                Read My Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Industry-Ready?
          </h2>
          <p className="text-slate-300 mb-10 text-lg leading-relaxed">
            Book a free 30-minute assessment call. We&apos;ll map out exactly where you are,
            where you need to be, and which programme gets you there fastest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book Free Assessment Call
            </Link>
            <Link
              href="/apply"
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white border border-slate-500 hover:border-white transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
