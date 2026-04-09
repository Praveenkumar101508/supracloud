import { CheckCircle, Clock, MessageCircle, Mail } from "lucide-react";

const prepItems = [
  "Your current CV or LinkedIn profile URL",
  "The type of role(s) you're targeting (title, seniority, location)",
  "Tools and technologies you're comfortable with today",
  "What you've already tried and why it hasn't worked",
  "Your timeline — when do you want to be in a new role?",
];

export default function BookPage() {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            Free Assessment Call
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Let&apos;s Map Out Your Path to Hired
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            A focused 30-minute call to understand where you are, where you need to be,
            and which programme gets you there.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: prep + contact */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Clock size={18} className="text-emerald-500" />
              <p className="text-sm font-semibold text-gray-700">30 minutes · Remote · No hard sell</p>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">What to Prepare</h2>
            <ul className="space-y-3 mb-10">
              {prepItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Prefer to Reach Out Directly?</h2>
            <div className="space-y-3">
              <a
                href="mailto:radhakrishna.uk.ai@gmail.com"
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Mail size={16} className="text-emerald-500 shrink-0" />
                radhakrishna.uk.ai@gmail.com
              </a>
              <a
                href="https://wa.me/447776456694"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <MessageCircle size={16} className="text-emerald-500 shrink-0" />
                +44 7776456694 on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Calendly placeholder */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <Clock size={28} className="text-emerald-500" />
            </div>
            <p className="text-lg font-bold text-gray-900 mb-2">Calendly Booking</p>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              The live scheduling widget will appear here once the Calendly account is connected.
            </p>
            <a
              href="https://wa.me/447776456694"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-md text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Message on WhatsApp to Book
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
