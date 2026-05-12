import Link from "next/link";
import { Mail, MessageCircle, Bot, ArrowRight } from "lucide-react";

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
      { label: "Pricing",              href: "/pricing"          },
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

export default function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(0,112,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top — brand + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14 pb-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#0070FF,#3B8EFF)", boxShadow: "0 0 14px rgba(0,112,255,0.5)" }}>
                <Bot size={15} color="#fff" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-base">
                Supra<span style={{ color: "#0070FF" }}>Cloud</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              Production-grade AI agents for banking and retail. Engineer-led. UK-based.
            </p>
          </div>

          <Link href="/book"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-lg text-black shrink-0"
            style={{ background: "#00F5FF", boxShadow: "0 0 20px rgba(0,245,255,0.35)" }}>
            Book a Discovery Call <ArrowRight size={14} />
          </Link>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {COLS.map(col => (
            <div key={col.heading}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#00F5FF" }}>
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href}
                      className="text-sm text-gray-600 hover:text-white transition-colors">
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
