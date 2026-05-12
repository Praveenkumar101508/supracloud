import type { Metadata } from "next";
import { Lock, BarChart2, FileText, DollarSign } from "lucide-react";
import PortalLoginForm from "@/app/components/PortalLoginForm";

export const metadata: Metadata = {
  title: "Client Portal | SupraCloud",
  description: "SupraCloud Client Portal — SLA dashboards, deployment logs, QA reports, and cost-per-query analytics.",
  openGraph: {
    title: "Client Portal | SupraCloud",
    description: "Secure delivery dashboard for SupraCloud clients. SLA dashboards, agent QA reports, and cost analytics.",
    url: "https://supracloud.co.uk/portal",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/portal" },
  robots: { index: false, follow: false },
};

const features = [
  {
    icon: <BarChart2 size={22} className="text-emerald-400" />,
    title: "Live SLA Dashboards",
    desc: "Real-time L1 deflection rates, agent uptime, and response latency — tracked against your agreed SLAs.",
  },
  {
    icon: <FileText size={22} className="text-emerald-400" />,
    title: "Agent QA Replay Reports",
    desc: "Full Playwright-generated QA reports with conversation traces, tool call logs, and regression history.",
  },
  {
    icon: <DollarSign size={22} className="text-emerald-400" />,
    title: "Cost-per-Query Analytics",
    desc: "Granular cost attribution per query type, channel, and agent — so you always know your unit economics.",
  },
];

export default function PortalPage() {
  return (
    <div style={{ backgroundColor: "#0A192F" }} className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 text-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Lock size={24} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            SupraCloud Client Portal
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            SLA dashboards, deployment logs, QA reports, and cost-per-query analytics — all in one place.
          </p>
        </div>
      </section>

      {/* Login + features */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Login form */}
            <PortalLoginForm />

            {/* Feature cards */}
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-4">
                What&apos;s inside
              </p>
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 rounded-xl p-5"
                  style={{
                    backgroundColor: "#112240",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{f.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-12 rounded-2xl p-6 text-center"
            style={{
              backgroundColor: "#112240",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-slate-400 text-sm">
              Already a client?{" "}
              <a
                href="mailto:rk@supracloud.co.uk"
                className="text-emerald-400 font-semibold hover:underline"
              >
                Email rk@supracloud.co.uk
              </a>{" "}
              to request portal access.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
