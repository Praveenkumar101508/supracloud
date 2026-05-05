import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import Logo from "./Logo";

const candidateLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Internships", href: "/internships" },
  { label: "Apply Now", href: "/apply" },
];

const businessLinks = [
  { label: "AI Agents", href: "/ai-agents" },
  { label: "IT Services", href: "/it-services" },
  { label: "IT Staffing", href: "/it-services#staffing" },
  { label: "IT Consultation", href: "/it-services#consultation" },
  { label: "Book a Call", href: "/book" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A192F" }} className="text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div>
            <Link href="/" aria-label="SupraCloud — Home">
              <Logo variant="light" size="sm" showWordmark className="mb-3" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Engineer-led. Real-world. Results-driven.
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

          {/* Column 2 — For Candidates */}
          <div>
            <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">For Candidates</p>
            <ul className="space-y-2.5 text-sm">
              {candidateLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — For Businesses */}
          <div>
            <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">For Businesses</p>
            <ul className="space-y-2.5 text-sm">
              {businessLinks.map((link) => (
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
            <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Company</p>
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
          <p>© 2026 SupraCloud Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
