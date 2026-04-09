import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A192F" }} className="text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="SupraCloud — Home">
              <Logo variant="light" size="sm" showWordmark className="mb-3" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A premium UK Data, Cloud & AI Career Accelerator. Engineer-led. Real-world. Results-driven.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Programs", href: "/programs" },
                { label: "Projects", href: "/projects" },
                { label: "Success Stories", href: "/success-stories" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:rk@supracloud.co.uk"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={16} />
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
                  <MessageCircle size={16} />
                  +44 7776456694 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SupraCloud. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
