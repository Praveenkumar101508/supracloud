export const metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Schedule</h1>
      <p className="text-slate-500 text-sm mb-8">Your upcoming sessions and discovery calls.</p>
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
        <p className="text-slate-400 text-sm">No sessions scheduled yet.</p>
        <p className="text-slate-400 text-xs mt-2">
          Once your discovery call is confirmed, it will appear here.
        </p>
        <a
          href="/book"
          className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
        >
          Book a Discovery Call
        </a>
      </div>
    </div>
  );
}
