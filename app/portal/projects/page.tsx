export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Projects</h1>
      <p className="text-slate-500 text-sm mb-8">Your active AI agent and IT delivery projects.</p>
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
        <p className="text-slate-400 text-sm">No active projects yet.</p>
        <p className="text-slate-400 text-xs mt-2">
          Your project dashboard will be set up after your discovery call.
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
