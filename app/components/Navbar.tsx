"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const solutions = [
  { label: "Banking AI Agents",     href: "/solutions/banking",    desc: "Autonomous L1 / L2 agents for financial ops." },
  { label: "Supermarket AI Agents", href: "/solutions/supermarket", desc: "Retail automation & inventory intel." },
];

const services = [
  { label: "IT Staffing",     href: "/services/it-staffing",  desc: "Pre-vetted engineering resources." },
  { label: "IT Consultation", href: "/services/consultation", desc: "Solutions engineering & architecture strategy." },
];

const careerPrograms = [
  { label: "Internships",    href: "/careers/internships", desc: "Paid placements in production AI squads." },
  { label: "Training",       href: "/careers/training",    desc: "Industry-standard AI upskilling programs." },
  { label: "Placement Year", href: "/talent/partnerships", desc: "University partner placement programmes." },
];

type DropdownKey = "solutions" | "services" | "career" | null;

export default function Navbar() {
  const [open, setOpen]                   = useState(false);
  const [active, setActive]               = useState<DropdownKey>(null);

  function Dropdown({ id, label, items }: { id: DropdownKey; label: string; items: typeof solutions }) {
    return (
      <div className="relative" onMouseEnter={() => setActive(id)} onMouseLeave={() => setActive(null)}>
        <button
          className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase px-3 py-2 rounded-lg transition-colors hover:text-white"
          style={{ color: "#64748B", letterSpacing: "0.08em" }}
        >
          {label} <ChevronDown size={12} />
        </button>
        {active === id && (
          <div
            className="absolute top-full left-0 mt-1 w-64 rounded-xl p-2 shadow-2xl z-50"
            style={{ background: "#0F1420", border: "1px solid rgba(0,245,255,0.15)" }}
          >
            {items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActive(null)}
                className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
              >
                <span className="text-xs font-semibold" style={{ color: "#E2E8F0" }}>{item.label}</span>
                <span className="text-[11px]" style={{ color: "#64748B" }}>{item.desc}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background:     "rgba(11,14,20,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom:   "1px solid rgba(0,245,255,0.1)",
      }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00F5FF, transparent)" }}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" aria-label="SupraCloud — Home" className="shrink-0 flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="rgba(0,245,255,0.1)" stroke="rgba(0,245,255,0.4)" strokeWidth="1" />
            <path d="M7 14 L14 7 L21 14 L14 21 Z" stroke="#00F5FF" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <circle cx="14" cy="14" r="3" fill="#00F5FF" />
          </svg>
          <span className="text-base font-extrabold tracking-tight" style={{ color: "#E2E8F0" }}>
            Supra<span style={{ color: "#00F5FF" }}>Cloud</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <Dropdown id="solutions" label="Solutions"        items={solutions} />
          <Dropdown id="services"  label="Services"         items={services} />
          <Dropdown id="career"    label="Career Programs"  items={careerPrograms} />
          <Link
            href="/about"
            className="text-xs font-semibold tracking-wider uppercase px-3 py-2 rounded-lg transition-colors hover:text-white"
            style={{ color: "#64748B", letterSpacing: "0.08em" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-xs font-semibold tracking-wider uppercase px-3 py-2 rounded-lg transition-colors hover:text-white"
            style={{ color: "#64748B", letterSpacing: "0.08em" }}
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/portal"
            className="text-xs font-semibold px-3 py-2 rounded-lg transition-all hover:border-cyan-400 hover:text-white"
            style={{ color: "#64748B", border: "1px solid rgba(255,255,255,0.08)", background: "transparent" }}
          >
            Portal
          </Link>
          <Link
            href="/book"
            className="text-xs font-bold px-4 py-2 rounded-lg transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #00F5FF, #0099AA)", color: "#0B0E14", boxShadow: "0 0 16px rgba(0,245,255,0.25)" }}
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#94A3B8" }}
          onClick={() => setOpen(p => !p)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden px-4 pb-5 pt-2 border-t"
          style={{ background: "rgba(11,14,20,0.98)", borderColor: "rgba(0,245,255,0.1)" }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-mono tracking-widest uppercase px-3 pt-3 pb-1" style={{ color: "#475569" }}>Solutions</p>
            {solutions.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:text-white"
                style={{ color: "#94A3B8" }}>{item.label}</Link>
            ))}
            <p className="text-[10px] font-mono tracking-widest uppercase px-3 pt-3 pb-1" style={{ color: "#475569" }}>Services</p>
            {services.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:text-white"
                style={{ color: "#94A3B8" }}>{item.label}</Link>
            ))}
            <p className="text-[10px] font-mono tracking-widest uppercase px-3 pt-3 pb-1" style={{ color: "#475569" }}>Career Programs</p>
            {careerPrograms.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:text-white"
                style={{ color: "#94A3B8" }}>{item.label}</Link>
            ))}
            <Link href="/about" onClick={() => setOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#94A3B8" }}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#94A3B8" }}>Contact</Link>
            <Link href="/book" onClick={() => setOpen(false)}
              className="mt-2 py-3 rounded-lg text-sm font-bold text-center transition-all"
              style={{ background: "linear-gradient(135deg, #00F5FF, #0099AA)", color: "#0B0E14" }}>
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
