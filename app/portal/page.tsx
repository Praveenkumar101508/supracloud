import Link from "next/link";
import { CheckCircle, FileText, AlertCircle, BarChart2, Clock, Download, ExternalLink, Bot, Zap } from "lucide-react";

const deliveries = [
  { label: "Banking AI Agent — Phase 1 Build", status: "completed", date: "2026-04-15" },
  { label: "QA Playwright E2E Test Suite", status: "completed", date: "2026-04-28" },
  { label: "ProdReady Labs Regression Report", status: "completed", date: "2026-04-30" },
  { label: "Banking AI Agent — Phase 2 (L2 Escalation)", status: "in_progress", date: "In progress" },
  { label: "RAG Knowledge Base Ingestion v2", status: "in_progress", date: "In progress" },
  { label: "Performance Dashboard Integration", status: "pending", date: "Upcoming" },
];

const agentMetrics = [
  { label: "L1 Deflection Rate", value: "61%", trend: "↑ +4% vs last month", positive: true },
  { label: "Avg. Response Latency", value: "0.42s", trend: "↓ -0.08s vs last month", positive: true },
  { label: "Agent Uptime", value: "99.94%", trend: "SLA: 99.9%", positive: true },
  { label: "Daily Query Volume", value: "4,821", trend: "↑ +12% vs last month", positive: true },
];

const reports = [
  {
    title: "ProdReady Labs Test Report",
    desc: "Full regression test coverage across all L1 banking agent journeys. Includes pass rates, coverage gaps, and recommended fixes.",
    type: "QA Report",
    date: "2026-04-30",
    icon: <CheckCircle size={18} className="text-emerald-500" />,
  },
  {
    title: "QA Playwright E2E Report",
    desc: "End-to-end Playwright automation results. Browser-level validation of agent conversation flows, escalation paths, and handoff scenarios.",
    type: "E2E Test Report",
    date: "2026-04-28",
    icon: <FileText size={18} className="text-emerald-500" />,
  },
];

const announcements = [
  {
    type: "success",
    message: "Phase 1 banking agent is live in production — L1 deflection tracking active.",
    date: "2026-04-15",
  },
  {
    type: "info",
    message: "Phase 2 (L2 escalation flows) build underway — estimated completion in 3 weeks.",
    date: "2026-05-01",
  },
  {
    type: "info",
    message: "RAG knowledge base v2 ingestion includes updated mortgage product documentation.",
    date: "2026-05-05",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    in_progress: "bg-blue-50 text-blue-700 border-blue-200",
    pending: "bg-slate-100 text-slate-500 border-slate-200",
  };
  const labels: Record<string, string> = {
    completed: "Delivered",
    in_progress: "In Progress",
    pending: "Upcoming",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function ClientPortal() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bot size={18} className="text-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Client Delivery Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SupraCloud Delivery Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Banking AI Agent Programme — Active Engagement</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Production agent live
        </div>
      </div>

      {/* Agent Performance Metrics */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 size={16} className="text-emerald-500" />
          <h2 className="font-semibold text-gray-900">Live Agent Performance</h2>
          <span className="ml-auto text-xs text-slate-400">Updated daily</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {agentMetrics.map((m) => (
            <div key={m.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-2xl font-extrabold text-gray-900">{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5 mb-2">{m.label}</p>
              <p className={`text-xs font-medium ${m.positive ? "text-emerald-600" : "text-red-500"}`}>{m.trend}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Tracker + Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery tracker */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={15} className="text-emerald-500" />
            <h2 className="font-semibold text-gray-900">Delivery Tracker</h2>
          </div>
          <div className="space-y-3">
            {deliveries.map((d) => (
              <div key={d.label} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle
                    size={14}
                    className={d.status === "completed" ? "text-emerald-500 shrink-0" : "text-slate-200 shrink-0"}
                  />
                  <span className={`text-sm truncate ${d.status === "completed" ? "text-gray-500 line-through" : "text-gray-700"}`}>
                    {d.label}
                  </span>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle size={15} className="text-blue-400" />
            <h2 className="font-semibold text-gray-900">Programme Updates</h2>
          </div>
          <div className="space-y-4">
            {announcements.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                {a.type === "success" ? (
                  <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={14} className="text-blue-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">{a.message}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock size={10} /> {a.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QA Reports */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileText size={16} className="text-emerald-500" />
          <h2 className="font-semibold text-gray-900">Delivery Reports</h2>
          <span className="ml-auto text-xs text-slate-400">ProdReady Labs · QA Playwright</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reports.map((report) => (
            <div key={report.title} className="flex flex-col bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  {report.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{report.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{report.type} · {report.date}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{report.desc}</p>
              <div className="flex gap-3">
                <Link
                  href="/portal/resources"
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <ExternalLink size={11} /> View Report
                </Link>
                <Link
                  href="/portal/resources"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <Download size={11} /> Download
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600" /> Next Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: "Phase 2 sign-off", desc: "Review L2 escalation spec and confirm scope before build starts" },
            { step: "Knowledge base review", desc: "Confirm new mortgage product docs are complete for v2 ingestion" },
            { step: "Performance review call", desc: "Monthly metrics review — book via the calendar link below" },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-lg p-4 border border-emerald-100">
              <p className="font-semibold text-gray-900 text-sm mb-1">{item.step}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/book" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
            Book a review call →
          </Link>
        </div>
      </div>
    </div>
  );
}
