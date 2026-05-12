import type { Metadata } from "next";
import Link from "next/link";
import { Settings, CheckCircle, ArrowRight, Activity, Bell, RefreshCw, BarChart2, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Managed AI Agent Services | SupraCloud",
  description: "24/7 agent monitoring, SLA management, continuous optimisation and incident response for enterprise AI deployments. We run it, you own it.",
  openGraph: {
    title: "Managed Services | SupraCloud",
    description: "Post-deployment agent monitoring, SLA management and continuous optimisation — so your AI keeps improving in production.",
    url: "https://supracloud.co.uk/services/managed-services",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/services/managed-services" },
};

const features = [
  { icon: <Activity size={20} />, title: "24/7 Agent Monitoring", desc: "Real-time observability across all agent sessions, latency, error rates, and deflection metrics — with instant alerting." },
  { icon: <Bell size={20} />, title: "SLA Management", desc: "Agreed uptime and response-time SLAs with monthly reporting. We own the on-call rotation so you don't have to." },
  { icon: <RefreshCw size={20} />, title: "Continuous Optimisation", desc: "Monthly prompt tuning, RAG pipeline updates, and knowledge base refreshes based on real production data." },
  { icon: <BarChart2 size={20} />, title: "Cost-Per-Query Visibility", desc: "Live cost dashboards broken down by agent, session type, and LLM call — so you always know your ROI." },
  { icon: <Clock size={20} />, title: "Incident Response", desc: "P1 incident response within 30 minutes. Root cause analysis and post-mortem delivered within 24 hours." },
  { icon: <Shield size={20} />, title: "Compliance Maintenance", desc: "We keep your agent deployment audit-ready — updating controls as FCA and GDPR requirements evolve." },
];

export default function ManagedServicesPage() {
  return (
    <div style={{ background: "#050505" }}>

      {/* Header */}
      <section className="relative py-24 overflow-hidden" style={{ borderBottom: "1px solid rgba(0,112,255,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 65%)"
        }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(245,158,11,0.1)", color: "#FCD34D", border: "1px solid rgba(245,158,11,0.25)" }}>
            <Settings size={11} /> Managed Services
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            We Run It.<br />
            <span style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              You Own It.
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Post-deployment monitoring, SLA management, and continuous optimisation — so your enterprise AI agents keep improving without consuming your engineering team.
          </p>
          <Link href="/book" className="btn-primary text-base px-8 py-4">
            Book a Discovery Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#F59E0B" }}>What&apos;s Included</p>
            <h2 className="text-3xl font-extrabold text-white">Everything Your Agent Needs in Production</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => (
              <div key={f.title} className="card p-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(245,158,11,0.1)", color: "#FCD34D" }}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA tiers */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">What You Get</h2>
          <div className="space-y-4">
            {[
              "Monthly SLA report with uptime, latency and deflection metrics",
              "Quarterly knowledge base refresh and prompt optimisation",
              "P1 incident response SLA — 30 minutes acknowledgement",
              "Dedicated Slack channel with your SupraCloud engineer",
              "Cost-per-query dashboard updated daily",
              "Annual compliance review aligned to FCA and GDPR",
            ].map(item => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.1)" }}>
                <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ borderTop: "1px solid rgba(0,112,255,0.08)" }}>
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white mb-4">Keep Your Agents Running at Peak</h2>
          <p className="text-gray-400 mb-8">Talk to an engineer about a managed services retainer — scoped to your agent volume and SLA requirements.</p>
          <Link href="/book" className="btn-primary text-base px-8 py-4">Book a Discovery Call <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
