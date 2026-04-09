import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const schedule = [
  { day: "Monday", focus: "Project Build Session", time: "18:00 – 20:00 GMT", status: "upcoming" },
  { day: "Tuesday", focus: "CV & LinkedIn Review", time: "18:00 – 19:00 GMT", status: "upcoming" },
  { day: "Wednesday", focus: "Technical Interview Prep", time: "18:00 – 20:00 GMT", status: "upcoming" },
  { day: "Thursday", focus: "Mock Interview / Coaching", time: "18:00 – 19:30 GMT", status: "upcoming" },
];

const progressItems = [
  { label: "CV Rewrite", done: true },
  { label: "LinkedIn Optimisation", done: true },
  { label: "GitHub Profile Setup", done: false },
  { label: "Project 1: RAG Chatbot", done: false },
  { label: "Project 2: Azure Pipeline", done: false },
  { label: "Mock Interview #1", done: false },
  { label: "Mock Interview #2", done: false },
  { label: "Job Applications Started", done: false },
];

const announcements = [
  {
    type: "info",
    message: "Week 2 project brief has been uploaded to the Resources section.",
    date: "Today",
  },
  {
    type: "success",
    message: "Your CV draft has been reviewed — feedback shared via email.",
    date: "Yesterday",
  },
];

export default function PortalDashboard() {
  const completed = progressItems.filter((p) => p.done).length;
  const percent = Math.round((completed / progressItems.length) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s your programme overview for this week.</p>
      </div>

      {/* Progress tracker */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Programme Progress</h2>
          <span className="text-sm font-medium text-emerald-600">{completed}/{progressItems.length} completed</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {progressItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 text-sm">
              <CheckCircle
                size={16}
                className={item.done ? "text-emerald-500" : "text-slate-200"}
              />
              <span className={item.done ? "text-gray-900 line-through" : "text-gray-600"}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly schedule */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">This Week&apos;s Schedule</h2>
          <div className="space-y-3">
            {schedule.map((s) => (
              <div key={s.day} className="flex items-start gap-3">
                <Clock size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.day} — {s.focus}</p>
                  <p className="text-xs text-slate-400">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Announcements</h2>
          <div className="space-y-4">
            {announcements.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                {a.type === "success" ? (
                  <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={15} className="text-blue-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="text-sm text-gray-700">{a.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
