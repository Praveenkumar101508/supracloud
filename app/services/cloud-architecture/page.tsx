import type { Metadata } from "next";
import Link from "next/link";
import { Cloud, Shield, Zap, CheckCircle, ArrowRight, Server, Lock, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Cloud Architecture for Enterprise AI | SupraCloud",
  description: "AI-ready cloud infrastructure design and migration on AWS and Azure. Multi-tenant, compliant, built to run enterprise AI agents at scale.",
  openGraph: {
    title: "Cloud Architecture | SupraCloud",
    description: "AI-ready infrastructure design for AWS and Azure — built for regulated enterprise AI deployments.",
    url: "https://supracloud.co.uk/services/cloud-architecture",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/services/cloud-architecture" },
};

const capabilities = [
  { icon: <Cloud size={20} />, title: "AI-Ready Infrastructure", desc: "Architecture designed from the ground up to host LLM inference, vector stores, and RAG pipelines at enterprise scale." },
  { icon: <Shield size={20} />, title: "Compliance by Design", desc: "FCA, GDPR, ISO 27001-aligned cloud environments. Security controls and audit logging built in, not bolted on." },
  { icon: <Server size={20} />, title: "Multi-Tenant Isolation", desc: "Strict data perimeter per client. Your AI agents run in your tenant — nothing crosses boundaries." },
  { icon: <Zap size={20} />, title: "Low-Latency Optimisation", desc: "Network topology and caching layers tuned for sub-200ms agent response times in production." },
  { icon: <Lock size={20} />, title: "Zero-Trust Access", desc: "Role-based access controls, VPN-free architecture, and continuous identity verification across all services." },
  { icon: <TrendingUp size={20} />, title: "Cost Engineering", desc: "Right-sized infrastructure with spot instance orchestration, autoscaling, and cost-per-query visibility from day one." },
];

export default function CloudArchitecturePage() {
  return (
    <div style={{ background: "#050505" }}>

      {/* Header */}
      <section className="relative py-24 overflow-hidden" style={{ borderBottom: "1px solid rgba(0,112,255,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,112,255,0.1) 0%, transparent 65%)"
        }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(6,182,212,0.1)", color: "#22D3EE", border: "1px solid rgba(6,182,212,0.25)" }}>
            <Cloud size={11} /> Cloud Architecture
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            AI-Ready Cloud<br />
            <span style={{ background: "linear-gradient(135deg,#06B6D4,#0070FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Infrastructure
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            We design and build the cloud environments that enterprise AI agents need to run at scale — compliant, low-latency, and cost-efficient on AWS and Azure.
          </p>
          <Link href="/book" className="btn-primary text-base px-8 py-4">
            Book a Discovery Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#06B6D4" }}>What We Deliver</p>
            <h2 className="text-3xl font-extrabold text-white">Full-Spectrum Cloud Engineering</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map(c => (
              <div key={c.title} className="card p-6 hover:border-cyan-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(6,182,212,0.1)", color: "#22D3EE" }}>
                  {c.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">What You Get</h2>
          <div className="space-y-4">
            {[
              "Architecture blueprint tailored to your AI agent workloads",
              "AWS or Azure environment provisioned with IaC (Terraform/Pulumi)",
              "Compliance controls aligned to FCA, ISO 27001, SOC2",
              "VPC/VNET design with zero-trust network segmentation",
              "Monitoring, alerting and cost dashboards from day one",
              "Handover documentation and knowledge transfer to your team",
            ].map(item => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(0,112,255,0.04)", border: "1px solid rgba(0,112,255,0.1)" }}>
                <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#0070FF" }} />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ borderTop: "1px solid rgba(0,112,255,0.08)" }}>
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Design Your AI Infrastructure?</h2>
          <p className="text-gray-400 mb-8">30-minute call. We map your requirements and give you an honest scope — no slides, no sales pitch.</p>
          <Link href="/book" className="btn-primary text-base px-8 py-4">Book a Discovery Call <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
