import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

const columns = [
  {
    heading: "AI Solutions",
    links: [
      { label: "Banking AI Agents",     href: "/solutions/banking" },
      { label: "Supermarket AI Agents", href: "/solutions/supermarket" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "IT Staffing",     href: "/services/it-staffing" },
      { label: "IT Consultation", href: "/services/consultation" },
    ],
  },
  {
    heading: "Career Programs",
    links: [
      { label: "Internships",    href: "/careers/internships" },
      { label: "Training",       href: "/careers/training" },
      { label: "Placement Year", href: "/talent/partnerships" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",          href: "/about" },
      { label: "Contact",        href: "/contact" },
      { label: "Client Portal",  href: "/portal" },
      { label: "Case Studies",   href: "/case-studies" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#0B0E14", borderTop: "1px solid rgba(0,245,255,0.1)" }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="rgba(0,245,255,0.08)" stroke="rgba(0,245,255,0.35)" strokeWidth="1" />
                <path d="M7 14 L14 7 L21 14 L14 21 Z" stroke="#00F5FF" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <circle cx="14" cy="14" r="3" fill="#00F5FF" />
              </svg>
              <span className="text-sm font-extrabold" style={{ color: "#E2E8F0" }}>
                Supra<span style={{ color: "#00F5FF" }}>Cloud</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "#475569" }}>
              Premium UK-based AI development and IT solutions firm.<br />
              Engineer-led. Production-grade. Results-driven.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:rk@supracloud.co.uk"
                  className="flex items-center gap-2 text-xs transition-colors hover:text-white"
                  style={{ color: "#64748B" }}
                >
                  <Mail size={13} style={{ color: "#00F5FF" }} />
                  rk@supracloud.co.uk
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447776456694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs transition-colors hover:text-white"
                  style={{ color: "#64748B" }}
                >
                  <MessageCircle size={13} style={{ color: "#39FF14" }} />
                  +44 7776 456694 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Nav columns */}
          {columns.map(col => (
            <div key={col.heading}>
              <p
                className="text-[10px] font-mono font-bold tracking-widest uppercase mb-4"
                style={{ color: "#475569" }}
              >
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-xs transition-colors hover:text-white"
                      style={{ color: "#64748B" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[10px] font-mono" style={{ color: "#334155" }}>
            © 2026 SupraCloud Ltd. All rights reserved.
          </p>
          <p className="text-[10px] font-mono" style={{ color: "#334155" }}>
            Built with ◈ in the UK
          </p>
        </div>
      </div>
    </footer>
  );
}
