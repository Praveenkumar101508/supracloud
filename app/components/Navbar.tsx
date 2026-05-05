"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";

const candidateLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Internships", href: "/internships" },
];

const businessLinks = [
  { label: "AI Agents", href: "/ai-agents" },
  { label: "IT Services", href: "/it-services" },
];

function Dropdown({
  label,
  links,
  onClose,
}: {
  label: string;
  links: { label: string; href: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-slate-300 hover:text-white text-sm font-medium transition-colors"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-[#0f2540] border border-slate-700 shadow-xl py-1 z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => { setOpen(false); onClose(); }}
              className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCandidateOpen, setMobileCandidateOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);

  const close = () => setMobileOpen(false);

  return (
    <header style={{ backgroundColor: "#0A192F" }} className="sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="SupraCloud — Home">
          <Logo variant="light" size="md" showWordmark />
        </Link>

        {/* Desktop centre links */}
        <div className="hidden md:flex items-center gap-8">
          <Dropdown label="For Candidates" links={candidateLinks} onClose={close} />
          <Dropdown label="For Businesses" links={businessLinks} onClose={close} />
          <Link href="/about" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            Contact
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/apply"
            className="text-sm font-semibold px-4 py-2 rounded-md border border-slate-500 text-white hover:border-white transition-colors"
          >
            Apply Now
          </Link>
          <Link
            href="/book"
            className="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors"
            style={{ backgroundColor: "#10B981" }}
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
        <div style={{ backgroundColor: "#0A192F" }} className="md:hidden border-t border-slate-700 px-4 pb-5">
          <div className="flex flex-col gap-1 pt-3">
            {/* For Candidates accordion */}
            <button
              onClick={() => setMobileCandidateOpen((v) => !v)}
              className="flex items-center justify-between w-full text-left py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              For Candidates
              <ChevronDown size={14} className={`transition-transform ${mobileCandidateOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileCandidateOpen && (
              <div className="pl-4 flex flex-col gap-1 mb-1">
                {candidateLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* For Businesses accordion */}
            <button
              onClick={() => setMobileBusinessOpen((v) => !v)}
              className="flex items-center justify-between w-full text-left py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              For Businesses
              <ChevronDown size={14} className={`transition-transform ${mobileBusinessOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileBusinessOpen && (
              <div className="pl-4 flex flex-col gap-1 mb-1">
                {businessLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/about" onClick={close} className="py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" onClick={close} className="py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>

            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-700">
              <Link
                href="/apply"
                onClick={close}
                className="text-sm font-semibold px-4 py-2.5 rounded-md text-center border border-slate-500 text-white hover:border-white transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/book"
                onClick={close}
                className="text-sm font-semibold px-4 py-2.5 rounded-md text-center text-white"
                style={{ backgroundColor: "#10B981" }}
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
