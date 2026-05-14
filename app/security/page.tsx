import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description:
    "SupraCloud's security architecture — tenant isolation, data handling, compliance posture, and responsible disclosure.",
};

const SECTIONS = [
  {
    title: "Zero Data Exfiltration",
    body: "Every AI agent we deploy runs entirely inside your own AWS or Azure cloud tenant. Your customer data, transaction records, and proprietary information never leave your perimeter — not during inference, not during fine-tuning, not ever. SupraCloud engineers access your environment only via time-limited, audited credentials agreed in advance.",
  },
  {
    title: "Full Tenant Isolation",
    body: "Each client deployment is a fully isolated environment. There is no shared compute, no shared model endpoints, and no shared storage between clients. Your agents run on dedicated infrastructure scoped exclusively to your organisation.",
  },
  {
    title: "FCA / GDPR Compliance Architecture",
    body: "Our agent architectures are designed from the ground up for regulated UK environments. Every decision made by an AI agent is logged with a full, immutable audit trail. Explainable AI outputs, human escalation paths, and confidence thresholds are built into every deployment — not added afterwards.",
  },
  {
    title: "ISO 27001-Aligned Infrastructure",
    body: "Our cloud architecture follows ISO 27001 controls. APIs are hardened to OWASP standards. All data at rest is encrypted with AES-256. All data in transit uses TLS 1.3. Access to production environments is governed by least-privilege IAM policies and reviewed quarterly.",
  },
  {
    title: "NDA Before Discovery",
    body: "We sign a mutual NDA before any technical discussion begins. No technical details, infrastructure information, or data samples are shared until the NDA is in place. This is a hard requirement, not an option.",
  },
  {
    title: "Penetration Testing",
    body: "SupraCloud engagements include a pre-deployment security review. For Platform-tier clients, third-party penetration testing of the deployed agent infrastructure is available as part of the engagement scope.",
  },
  {
    title: "Responsible Disclosure",
    body: "If you discover a security vulnerability in any SupraCloud system, please report it responsibly to security@supracloud.co.uk. We commit to acknowledging reports within 24 hours and resolving confirmed vulnerabilities within 30 days. We do not pursue legal action against good-faith security researchers.",
  },
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white">
      {/* Header */}
      <section className="relative py-28 px-4 text-center border-b border-white/[0.06]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,245,255,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: "rgba(0,245,255,0.08)",
              color: "#00F5FF",
              border: "1px solid rgba(0,245,255,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
            Security &amp; Trust
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
            Built Secure{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00F5FF 0%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              from the Ground Up.
            </span>
          </h1>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            Security is not a feature we add to our deployments — it is the
            foundation every engagement is built on. Here is exactly how we
            protect your data and your organisation.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {SECTIONS.map((s, i) => (
            <div
              key={s.title}
              className="flex gap-6 pb-12"
              style={{
                borderBottom:
                  i < SECTIONS.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              <div
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black mt-0.5"
                style={{
                  background: "rgba(0,245,255,0.08)",
                  color: "#00F5FF",
                  border: "1px solid rgba(0,245,255,0.18)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">{s.title}</h2>
                <p className="text-white/50 leading-relaxed text-sm">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        className="py-16 px-4 text-center border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-xl mx-auto">
          <p className="text-white/35 text-sm mb-2">Security enquiries</p>
          <a
            href="mailto:security@supracloud.co.uk"
            className="text-[#00F5FF] font-semibold hover:opacity-80 transition-opacity"
          >
            security@supracloud.co.uk
          </a>
        </div>
      </section>
    </main>
  );
}
