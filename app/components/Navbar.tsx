"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Programs",       href: "/programs" },
  { label: "Projects",       href: "/projects" },
  { label: "Success Stories",href: "/success-stories" },
  { label: "About",          href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background:     "rgba(11,14,20,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom:   "1px solid rgba(0,245,255,0.1)",
      }}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00F5FF, transparent)" }}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo wordmark */}
        <Link href="/" aria-label="SupraCloud — Home"
          className="shrink-0 flex items-center gap-2 group">
          {/* Icon mark */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="rgba(0,245,255,0.1)"
              stroke="rgba(0,245,255,0.4)" strokeWidth="1" />
            <path d="M7 14 L14 7 L21 14 L14 21 Z"
              stroke="#00F5FF" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <circle cx="14" cy="14" r="3" fill="#00F5FF" />
          </svg>
          <span
            className="text-base font-extrabold tracking-tight"
            style={{ color: "#E2E8F0" }}
          >
            Supra<span style={{ color: "#00F5FF" }}>Cloud</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold tracking-wider uppercase transition-colors hover:text-white"
              style={{ color: "#64748B", letterSpacing: "0.08em" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/portal"
            className="text-xs font-semibold px-3 py-2 rounded-lg transition-all hover:border-cyan-400 hover:text-white"
            style={{
              color:        "#64748B",
              border:       "1px solid rgba(255,255,255,0.08)",
              background:   "transparent",
            }}
          >
            Portal
          </Link>
          <Link
            href="/book"
            className="text-xs font-bold px-4 py-2 rounded-lg transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #00F5FF, #0099AA)",
              color:      "#0B0E14",
              boxShadow:  "0 0 16px rgba(0,245,255,0.25)",
            }}
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors"
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
          style={{
            background:   "rgba(11,14,20,0.98)",
            borderColor:  "rgba(0,245,255,0.1)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:text-white"
                style={{ color: "#64748B" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 py-3 rounded-lg text-sm font-bold text-center transition-all"
              style={{
                background: "linear-gradient(135deg, #00F5FF, #0099AA)",
                color:      "#0B0E14",
              }}
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
