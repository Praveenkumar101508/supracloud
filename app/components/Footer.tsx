import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

const nav = [
  { label: "Programs",        href: "/programs" },
  { label: "Projects",        href: "/projects" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About",           href: "/about" },
  { label: "Privacy Policy",  href: "/privacy" },
  { label: "Terms",           href: "/terms" },
];

const systemStatus = [
  { label: "Platform",        ok: true  },
  { label: "Application API", ok: true  },
  { label: "Portal",          ok: true  },
  { label: "Coaching Slots",  ok: false },
];

function StatusRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: "#64748B" }}>{label}</span>
      <span
        className="flex items-center gap-1.5 font-mono"
        style={{ color: ok ? "#39FF14" : "#FF6B35" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: ok ? "#39FF14" : "#FF6B35",
            boxShadow:  ok ? "0 0 5px #39FF14" : "0 0 5px #FF6B35",
            animation:  "antenna-blink 2.5s ease-in-out infinite",
          }}
        />
        {ok ? "OPERATIONAL" : "LIMITED"}
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#0B0E14", borderTop: "1px solid rgba(0,245,255,0.1)" }}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="rgba(0,245,255,0.08)"
                  stroke="rgba(0,245,255,0.35)" strokeWidth="1" />
                <path d="M7 14 L14 7 L21 14 L14 21 Z"
                  stroke="#00F5FF" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <circle cx="14" cy="14" r="3" fill="#00F5FF" />
              </svg>
              <span className="text-sm font-extrabold" style={{ color: "#E2E8F0" }}>
                Supra<span style={{ color: "#00F5FF" }}>Cloud</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
              A premium UK Data, Cloud & AI Career Accelerator.<br />
              Engineer-led. Real-world. Results-driven.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-mono font-bold tracking-widest uppercase mb-4"
              style={{ color: "#475569" }}>NAVIGATE</p>
            <ul className="space-y-2">
              {nav.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "#64748B" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-mono font-bold tracking-widest uppercase mb-4"
              style={{ color: "#475569" }}>CONTACT</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:rk@supracloud.co.uk"
                  className="flex items-center gap-2 text-xs transition-colors hover:text-white"
                  style={{ color: "#64748B" }}>
                  <Mail size={13} style={{ color: "#00F5FF" }} />
                  rk@supracloud.co.uk
                </a>
              </li>
              <li>
                <a href="https://wa.me/447776456694" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs transition-colors hover:text-white"
                  style={{ color: "#64748B" }}>
                  <MessageCircle size={13} style={{ color: "#39FF14" }} />
                  +44 7776456694 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* System Status */}
          <div>
            <p className="text-[10px] font-mono font-bold tracking-widest uppercase mb-4"
              style={{ color: "#475569" }}>SYSTEM STATUS</p>
            <div
              className="rounded-xl p-4 space-y-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border:     "1px solid rgba(0,245,255,0.08)",
              }}
            >
              {systemStatus.map(s => (
                <StatusRow key={s.label} {...s} />
              ))}
            </div>
            <p className="mt-3 text-[9px] font-mono" style={{ color: "#334155" }}>
              Last check: live
            </p>
          </div>
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
