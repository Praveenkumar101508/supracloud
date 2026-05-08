export const metadata = { title: "Mock Interviews" };

export default function MockInterviewsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Mock Interviews</h1>
      <p className="text-slate-500 text-sm mb-8">Practice sessions and interview preparation resources.</p>
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
        <p className="text-slate-400 text-sm">No mock interview sessions scheduled.</p>
        <p className="text-slate-400 text-xs mt-2">
          Interview preparation begins after your talent programme enrolment.
        </p>
        <a
          href="/contact"
          className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
        >
          Enquire About Talent Programme
        </a>
      </div>
    </div>
  );
}
