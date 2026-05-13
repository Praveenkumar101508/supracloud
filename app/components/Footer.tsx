import Link from "next/link";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";

const COLS = [
  {
    heading: "Solutions",
    links: [
      { label: "Banking AI Agents", href: "/solutions/banking" },
      { label: "Retail AI Agents",  href: "/solutions/retail"  },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Cloud Architecture", href: "/services/cloud-architecture" },
      { label: "IT Staffing",        href: "/services/staffing"           },
      { label: "Managed Services",   href: "/services/managed-services"   },
      { label: "IT Consultation",    href: "/services/consultation"       },
    ],
  },
  {
    heading: "Academy",
    links: [
      { label: "Pricing",                href: "/pricing"             },
      { label: "Graduate Internships",   href: "/talent/internships"  },
      { label: "Training Programmes",    href: "/talent/programs"     },
      { label: "Placement Partnerships", href: "/talent/partnerships" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",          href: "/about"    },
      { label: "Contact",        href: "/contact"  },
      { label: "Book a Call",    href: "/book"     },
      { label: "Client Portal",  href: "/portal"   },
      { label: "Privacy Policy", href: "/privacy"  },
      { label: "Terms",          href: "/terms"    },
      { label: "Security",       href: "/security" },
    ],
  },
];

function FooterNovaOrb() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15" fill="url(#fng)" />
      <circle cx="16" cy="16" r="7"  fill="rgba(0,245,255,0.18)" />
      <circle cx="16" cy="16" r="3.5" fill="#00F5FF" />
      <circle cx="16" cy="8"  r="1.8" fill="#00F5FF" opacity="0.6" />
      <circle cx="16" cy="24" r="1.8" fill="#00F5FF" opacity="0.6" />
      <circle cx="8"  cy="16" r="1.8" fill="#00F5FF" opacity="0.6" />
      <circle cx="24" cy="16" r="1.8" fill="#00F5FF" opacity="0.6" />
      <line x1="16" y1="12.5" x2="16" y2="9.8"  stroke="#00F5FF" strokeWidth="1.2" opacity="0.35" />
      <line x1="16" y1="19.5" x2="16" y2="22.2" stroke="#00F5FF" strokeWidth="1.2" opacity="0.35" />
      <line x1="9.8"  y1="16" x2="12.5" y2="16" stroke="#00F5FF" strokeWidth="1.2" opacity="0.35" />
      <line x1="19.5" y1="16" x2="22.2" y2="16" stroke="#00F5FF" strokeWidth="1.2" opacity="0.35" />
      <defs>
        <radialGradient id="fng" cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#00F5FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#050510" stopOpacity="0.98" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#050510", borderTop: "1px solid rgba(0,245,255,0.07)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top — brand + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14 pb-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(0,245,255,0.07)", border: "1px solid rgba(0,245,255,0.15)", boxShadow: "0 0 14px rgba(0,245,255,0.12)" }}>
                <FooterNovaOrb />
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                Supra<span style={{ color: "#00F5FF", textShadow: "0 0 10px rgba(0,245,255,0.4)" }}>Cloud</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              Production-grade AI agents for banking and retail.<br />Engineer-led. FCA-aware. UK-based.
            </p>
          </div>

          <Link href="/book"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl text-black shrink-0 transition-all duration-200 hover:scale-105"
            style={{ background: "#00F5FF", boxShadow: "0 0 24px rgba(0,245,255,0.4)" }}>
            Book a Discovery Call <ArrowRight size={14} />
          </Link>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {COLS.map(col => (
            <div key={col.heading}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: "#00F5FF", textShadow: "0 0 8px rgba(0,245,255,0.3)" }}>
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href}
                      className="text-sm text-gray-600 hover:text-[#00F5FF] transition-colors duration-150">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-8"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          {[
            { label: "FCA Aligned",  icon: "🏛" },
            { label: "GDPR Ready",   icon: "🔒" },
            { label: "ISO 27001",    icon: "✓"  },
            { label: "SOC 2",        icon: "⚙"  },
            { label: "UK Based",     icon: "🇬🇧" },
            { label: "OWASP Top 10", icon: "🛡"  },
          ].map((b) => (
            <span key={b.label}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.15)", color: "rgba(0,245,255,0.6)" }}>
              <span aria-hidden>{b.icon}</span>{b.label}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div>
            <p className="text-xs text-gray-700">
              © {new Date().getFullYear()} SupraCloud Ltd. All rights reserved. Registered in England &amp; Wales.
            </p>
            <p className="text-[10px] text-gray-800 mt-1">Powered by Nova AI · SupraCloud</p>
          </div>
          <div className="flex items-center gap-5">
            <a href="mailto:rk@supracloud.co.uk"
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#00F5FF] transition-colors">
              <Mail size={13} /> rk@supracloud.co.uk
            </a>
            <a href="https://wa.me/447776456694" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#00F5FF] transition-colors">
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
