import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Portal | SupraCloud",
  description: "SupraCloud Client Portal — secure delivery dashboard for active engagements. Coming soon.",
  openGraph: {
    title: "Client Portal | SupraCloud",
    description: "Secure delivery dashboard for SupraCloud clients. Contact us to access your engagement portal.",
    url: "https://supracloud.co.uk/portal",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/portal" },
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-24 px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
          <Lock size={28} className="text-slate-500" />
        </div>

        {/* Badge */}
        <p className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-600 border border-emerald-200 rounded-full px-3 py-1.5 bg-emerald-50">
          Client Portal
        </p>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Delivery Portal Coming Soon
        </h1>

        <p className="text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
          The SupraCloud Client Portal — your private dashboard for QA reports, agent traces, SLA metrics, and engagement progress — is currently in development.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8 text-left">
          <p className="text-sm font-semibold text-gray-800 mb-4">Active clients:</p>
          <div className="flex items-start gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <Mail size={14} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                To access your delivery reports and engagement data, contact{" "}
                <a
                  href="mailto:rk@supracloud.co.uk"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  rk@supracloud.co.uk
                </a>{" "}
                and we&rsquo;ll share your reports directly.
              </p>
              <p className="text-xs text-gray-400 mt-2">We respond within 1 business day.</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs text-gray-400 leading-relaxed">
              The portal will provide: live SLA dashboards, QA Playwright reports, agent conversation traces, delivery milestone tracking, and billing history.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:rk@supracloud.co.uk"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Email Us <Mail size={14} />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-gray-700 border border-slate-200 hover:border-slate-400 transition-colors"
          >
            Contact Page <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
