"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Bot, Building2, GraduationCap, Briefcase, Lightbulb, Users, BookOpen, Handshake, TrendingUp } from "lucide-react";
import Logo from "./Logo";

type NavItem = { label: string; href: string; desc: string; icon: React.ReactNode };

const solutionsLinks: NavItem[] = [
  {
    label: "Banking AI Agents",
    href: "/solutions/banking",
    desc: "L1/L2 support automation for financial services",
    icon: <Building2 size={16} className="text-emerald-400 shrink-0" />,
  },
  {
    label: "Supermarket AI Agents",
    href: "/solutions/supermarket",
    desc: "Inventory, order and customer support automation",
    icon: <Bot size={16} className="text-emerald-400 shrink-0" />,
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    desc: "Production deployment results and client outcomes",
    icon: <TrendingUp size={16} className="text-emerald-400 shrink-0" />,
  },
];

const servicesLinks: NavItem[] = [
  {
    label: "IT Staffing & Outsourcing",
    href: "/services/it-staffing",
    desc: "Vetted engineers for contract and permanent roles",
    icon: <Briefcase size={16} className="text-emerald-400 shrink-0" />,
  },
  {
    label: "Enterprise IT Consultation",
    href: "/services/consultation",
    desc: "Technology advisory and digital transformation",
    icon: <Lightbulb size={16} className="text-emerald-400 shrink-0" />,
  },
];

const talentLinks: NavItem[] = [
  {
    label: "Industry Training Programs",
    href: "/careers/training",
    desc: "Structured pathways for Data, Cloud & AI",
    icon: <BookOpen size={16} className="text-emerald-400 shrink-0" />,
  },
  {
    label: "Placement Year Partnerships",
    href: "/talent/partnerships",
    desc: "University placement schemes with enterprise hosts",
    icon: <Handshake size={16} className="text-emerald-400 shrink-0" />,
  },
  {
    label: "Graduate Internships",
    href: "/careers/internships",
    desc: "Paid technical internships across the UK",
    icon: <GraduationCap size={16} className="text-emerald-400 shrink-0" />,
  },
];

function MegaDropdown({
  label,
  items,
  onClose,
  width = "w-72",
}: {
  label: string;
  items: NavItem[];
  onClose: () => void;
  width?: string;
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
        className="flex items-center gap-1 text-slate-300 hover:text-white text-sm font-medium transition-colors py-1"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 mt-2 ${width} rounded-xl bg-[#0d2137] border border-slate-700/60 shadow-2xl py-2 z-50`}
          style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { setOpen(false); onClose(); }}
              className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
            >
              <span className="mt-0.5">{item.icon}</span>
              <span>
                <span className="block text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                  {item.label}
                </span>
                <span className="block text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileAccordion({
  label,
  items,
  onClose,
  icon,
}: {
  label: string;
  items: NavItem[];
  onClose: () => void;
  icon: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-left py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pl-4 flex flex-col gap-0.5 mb-1 border-l border-slate-700 ml-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <header style={{ backgroundColor: "#0A192F" }} className="sticky top-0 z-50 border-b border-slate-800/60 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="SupraCloud — Home">
          <Logo variant="light" size="md" showWordmark />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <MegaDropdown label="Solutions" items={solutionsLinks} onClose={close} />
          <MegaDropdown label="Services" items={servicesLinks} onClose={close} width="w-80" />
          <MegaDropdown label="Talent" items={talentLinks} onClose={close} width="w-80" />
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
            href="/portal"
            className="text-sm font-semibold px-4 py-2 rounded-md text-slate-400 hover:text-white transition-colors"
          >
            Client Login
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold px-4 py-2 rounded-md border border-white/30 text-white bg-white/5 hover:border-emerald-400 hover:bg-white/10 transition-colors"
          >
            Submit a Brief
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
        <div style={{ backgroundColor: "#0A192F" }} className="md:hidden border-t border-slate-700 px-4 pb-6">
          <div className="flex flex-col gap-0.5 pt-3">
            <MobileAccordion
              label="Solutions"
              items={solutionsLinks}
              onClose={close}
              icon={<Bot size={14} className="text-emerald-500" />}
            />
            <MobileAccordion
              label="Services"
              items={servicesLinks}
              onClose={close}
              icon={<Briefcase size={14} className="text-emerald-500" />}
            />
            <MobileAccordion
              label="Talent"
              items={talentLinks}
              onClose={close}
              icon={<Users size={14} className="text-emerald-500" />}
            />
            <Link href="/about" onClick={close} className="py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" onClick={close} className="py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-700">
              <Link
                href="/contact"
                onClick={close}
                className="text-sm font-semibold px-4 py-2.5 rounded-md text-center border border-slate-600 text-white hover:border-emerald-500 transition-colors"
              >
                Submit a Brief
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
