import BookingEngine from "@/app/components/BookingEngine";

export const metadata = {
  title: "Book a Discovery Call | SupraCloud",
  description:
    "Schedule a 30-minute strategy session with our solutions engineers. We'll map your workflows and scope a production AI agent deployment.",
  openGraph: {
    title: "Book a Discovery Call | SupraCloud",
    description:
      "Book a 30-minute discovery call with SupraCloud. We'll map your support workflows and scope a production AI solution.",
    url: "https://supracloud.co.uk/book",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/book" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,112,255,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0070FF] mb-4">
            Discovery Call
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
            30 minutes that could
            <br />
            <span className="text-[#0070FF]">change your operations</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-lg mx-auto">
            Select a time that works for you. We&apos;ll scope your automation target and show you
            exactly what SupraCloud can deploy in 6–10 weeks.
          </p>
        </div>
      </section>

      {/* Booking Engine */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto bg-white/[0.02] border border-white/8 rounded-2xl p-8 shadow-2xl">
          <BookingEngine />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-white/5 py-10 px-6">
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-8 text-xs text-white/30 font-medium">
          <span>Google Meet · Encrypted</span>
          <span className="w-px h-4 bg-white/10" />
          <span>No commitment required</span>
          <span className="w-px h-4 bg-white/10" />
          <span>Confirmation sent instantly</span>
          <span className="w-px h-4 bg-white/10" />
          <span>rk@supracloud.co.uk</span>
        </div>
      </section>
    </main>
  );
}
