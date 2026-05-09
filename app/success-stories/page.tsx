import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Outcomes | SupraCloud",
  description: "Illustrative enterprise AI agent outcomes based on production deployment patterns — banking L1 deflection, supermarket peak automation, and IT staffing.",
  openGraph: {
    title: "Client Outcomes | SupraCloud",
    description: "Illustrative outcomes based on production AI agent deployment patterns. Banking, retail, and IT staffing — client names anonymised.",
    url: "https://supracloud.co.uk/success-stories",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/success-stories" },
};

const outcomes = [
  {
    label:     "Illustrative · Banking AI Agents",
    title:     "Tier 1 UK High Street Bank",
    challenge: "240,000 monthly L1 support contacts. 78% resolved by humans at £8.20 per contact.",
    outcome:   "58% L1 deflection achieved in 90 days. £1.2M annualised cost reduction. Agent latency under 400ms.",
    accent:    "#00F5FF",
  },
  {
    label:     "Illustrative · Supermarket AI Agents",
    title:     "UK Top-10 Supermarket Chain",
    challenge: "Christmas peak contact surge 4× normal volume. Seasonal headcount increase costing £340k.",
    outcome:   "71% stock-query deflection. NPS uplift +38. Zero seasonal headcount increase required.",
    accent:    "#00F5FF",
  },
  {
    label:     "Illustrative · IT Staffing",
    title:     "Series B Fintech, London",
    challenge: "3 ML Engineer positions open 4+ months. Internal recruitment failing to find production-ready candidates.",
    outcome:   "All 3 roles filled within 5 weeks. Engineers shipping to production from week one.",
    accent:    "#FF6B35",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden noise-overlay"
        style={{ background: "linear-gradient(180deg, #0D1117 0%, #0B0E14 100%)" }}
      >
        <div aria-hidden className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-5" style={{ color: "#00F5FF" }}>
            CLIENT OUTCOMES
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5" style={{ color: "#E2E8F0" }}>
            Client Outcomes
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>
            Illustrative outcomes based on production deployment patterns. Client names anonymised.
          </p>
        </div>
      </section>

      {/* Outcome cards */}
      <section className="py-20" style={{ background: "#0B0E14" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {outcomes.map((o) => (
            <div
              key={o.title}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Card header */}
              <div
                className="px-8 py-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span
                  className="inline-block text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                  style={{
                    background: `${o.accent}15`,
                    color:      o.accent,
                    border:     `1px solid ${o.accent}30`,
                  }}
                >
                  {o.label}
                </span>
                <h2 className="text-xl font-bold" style={{ color: "#E2E8F0" }}>{o.title}</h2>
              </div>

              {/* Challenge / Outcome columns */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="p-6">
                  <p
                    className="text-[10px] font-mono tracking-widest uppercase mb-3"
                    style={{ color: "#475569" }}
                  >
                    The Challenge
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{o.challenge}</p>
                </div>
                <div className="p-6">
                  <p
                    className="text-[10px] font-mono tracking-widest uppercase mb-3"
                    style={{ color: "#475569" }}
                  >
                    The Outcome
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{o.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#0D1117" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#E2E8F0" }}>
            Ready to build your outcome?
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: "#64748B" }}>
            Book a discovery call. We map your support workflows and scope a production
            deployment with measurable SLA targets.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-bold transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #00F5FF, #0099AA)",
              color:      "#0B0E14",
              boxShadow:  "0 0 24px rgba(0,245,255,0.3)",
            }}
          >
            Book a Discovery Call <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
