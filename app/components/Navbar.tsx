"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#0A192F" }} className="sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="SupraCloud — Home">
          <Logo variant="light" size="md" showWordmark />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Link
            href="/book"
            className="text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            style={{ backgroundColor: "#10B981", color: "#ffffff" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#10B981")}
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ backgroundColor: "#0A192F" }} className="md:hidden border-t border-slate-700 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-2 text-sm font-semibold px-4 py-2 rounded-md text-center"
              style={{ backgroundColor: "#10B981", color: "#ffffff" }}
              onClick={() => setMobileOpen(false)}
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
