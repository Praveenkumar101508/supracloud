import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import Logo from "./Logo";

const solutionLinks = [
  { label: "Banking AI Agents", href: "/solutions/banking" },
  { label: "Supermarket AI Agents", href: "/solutions/supermarket" },
];

const serviceLinks = [
  { label: "IT Staffing & Outsourcing", href: "/services/it-staffing" },
  { label: "Enterprise IT Consultation", href: "/services/consultation" },
  { label: "Book a Discovery Call", href: "/book" },
];

const talentLinks = [
  { label: "Industry Training Programs", href: "/careers/training" },
  { label: "Placement Year Partnerships", href: "/talent/partnerships" },
  { label: "Graduate Internships", href: "/careers/internships" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Client Portal", href: "/portal" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A192F" }} className="text-slate-300 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1 — Brand (spans 1 on mobile, takes up more on desktop) */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="SupraCloud — Home">
              <Logo variant="light" size="sm" showWordmark className="mb-3" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              Enterprise AI Agent Development and IT Solutions — engineer-led, production-grade, built for scale.
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:rk@supracloud.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={14} className="text-emerald-500 shrink-0" />
                  rk@supracloud.co.uk
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447776456694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle size={14} className="text-emerald-500 shrink-0" />
                  +44 7776456694 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 — Solutions */}
          <div>
            <p className="text-white text-xs font-semibold mb-4 uppercase tracking-wider">Solutions</p>
            <ul className="space-y-2.5 text-sm">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-white text-xs font-semibold mb-4 mt-6 uppercase tracking-wider">Services</p>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Talent */}
          <div>
            <p className="text-white text-xs font-semibold mb-4 uppercase tracking-wider">Talent</p>
            <ul className="space-y-2.5 text-sm">
              {talentLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div>
            <p className="text-white text-xs font-semibold mb-4 uppercase tracking-wider">Company</p>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2026 SupraCloud Ltd. All rights reserved. Registered in England &amp; Wales.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
