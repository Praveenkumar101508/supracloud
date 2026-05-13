"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown,
  Building2, ShoppingCart,
  Cloud, Users, Settings,
  GraduationCap, BookOpen, Handshake,
  ArrowRight, Zap,
} from "lucide-react";

function NovaOrb({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15" fill="url(#ng)" />
      <circle cx="16" cy="16" r="7"  fill="rgba(0,245,255,0.2)" />
      <circle cx="16" cy="16" r="3.5" fill="#00F5FF" />
      <circle cx="16" cy="8"  r="1.8" fill="#00F5FF" opacity="0.65" />
      <circle cx="16" cy="24" r="1.8" fill="#00F5FF" opacity="0.65" />
      <circle cx="8"  cy="16" r="1.8" fill="#00F5FF" opacity="0.65" />
      <circle cx="24" cy="16" r="1.8" fill="#00F5FF" opacity="0.65" />
      <line x1="16" y1="12.5" x2="16" y2="9.8"  stroke="#00F5FF" strokeWidth="1.2" opacity="0.4" />
      <line x1="16" y1="19.5" x2="16" y2="22.2" stroke="#00F5FF" strokeWidth="1.2" opacity="0.4" />
      <line x1="9.8"  y1="16" x2="12.5" y2="16" stroke="#00F5FF" strokeWidth="1.2" opacity="0.4" />
      <line x1="19.5" y1="16" x2="22.2" y2="16" stroke="#00F5FF" strokeWidth="1.2" opacity="0.4" />
      <defs>
        <radialGradient id="ng" cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#00F5FF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#050510" stopOpacity="0.98" />
        </radialGradient>
      </defs>
    </svg>
  );
}

type NavItem = { label: string; href: string; desc: string; icon: React.ReactNode; badge?: string };

const solutions: NavItem[] = [
  { label: "Banking AI Agents", href: "/solutions/banking", desc: "Fraud triage, L1/L2 support & back-office automation", icon: <Building2 size={16} />, badge: "SOC2 Ready" },
  { label: "Retail AI Agents",  href: "/solutions/retail",  desc: "Inventory, concierge & omnichannel support agents",   icon: <ShoppingCart size={16} />, badge: "24/7" },
];

const services: NavItem[] = [
  { label: "Cloud Architecture", href: "/services/cloud-architecture", desc: "AI-ready infrastructure design & migration on AWS/Azure", icon: <Cloud size={16} /> },
  { label: "IT Staffing",        href: "/services/staffing",           desc: "Engineer-screened AI, data & DevOps talent",            icon: <Users size={16} /> },
  { label: "Managed Services",   href: "/services/managed-services",   desc: "24/7 agent monitoring, SLA management & optimisation",  icon: <Settings size={16} /> },
];

const academy: NavItem[] = [
  { label: "Graduate Internships",   href: "/talent/internships",  desc: "6-month AI engineering tracks — ship to production",     icon: <GraduationCap size={16} /> },
  { label: "Training Programmes",    href: "/talent/programs",     desc: "Cohort-based LangGraph & RAG engineering pathways",      icon: <BookOpen size={16} /> },
  { label: "Placement Partnerships", href: "/talent/partnerships", desc: "University placement years with enterprise AI hosts",    icon: <Handshake size={16} /> },
];

const dropVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.15, ease: "easeOut" as const } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.1 } },
};

function MegaDropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors py-1 select-none"
        aria-expanded={open}
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={13} strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropVariants} initial="hidden" animate="visible" exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 z-50 overflow-hidden"
            style={{ background: "#0a0a14", border: "1px solid rgba(0,245,255,0.12)", borderRadius: 14, boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(0,245,255,0.04)" }}
          >
            <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #00F5FF, transparent)" }} />
            <div className="p-2">
              {items.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link href={item.href} onClick={() => setOpen(false)}
                    className="flex items-start gap-3 px-3 py-3 rounded-[10px] group transition-colors hover:bg-white/[0.04]">
                    <div className="shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(0,245,255,0.08)", color: "#00F5FF" }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white group-hover:text-[#00F5FF] transition-colors">{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase"
                            style={{ background: "rgba(0,245,255,0.10)", color: "#00F5FF", border: "1px solid rgba(0,245,255,0.2)" }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                    <ArrowRight size={12} className="shrink-0 mt-1 text-gray-700 group-hover:text-[#00F5FF] transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-4 py-2.5 flex items-center gap-1.5 text-[11px] font-medium"
              style={{ borderTop: "1px solid rgba(0,245,255,0.06)", color: "#4B5563" }}>
              <Zap size={10} style={{ color: "#00F5FF" }} /> Engineer-led · UK-Based · Production-Grade
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSection({ label, items, onClose }: { label: string; items: NavItem[]; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pl-3 pb-2 flex flex-col gap-0.5" style={{ borderLeft: "1px solid rgba(0,245,255,0.15)" }}>
              {items.map(item => (
                <Link key={item.href} href={item.href} onClick={onClose}
                  className="flex items-center gap-2.5 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                  <span style={{ color: "#00F5FF" }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setMobileOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,5,0.92)" : "rgba(5,5,5,0.7)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(0,112,255,0.1)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5 group" aria-label="SupraCloud — Home">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
            style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", boxShadow: "0 0 18px rgba(0,245,255,0.15)" }}>
            <NovaOrb size={22} />
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            Supra<span style={{ color: "#00F5FF", textShadow: "0 0 12px rgba(0,245,255,0.5)" }}>Cloud</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <MegaDropdown label="Solutions" items={solutions} />
          <MegaDropdown label="Services"  items={services}  />
          <MegaDropdown label="Academy"   items={academy}   />
          <Link href="/pricing" className="text-sm font-medium text-gray-400 hover:text-[#00F5FF] transition-colors">Pricing</Link>
          <Link href="/about"   className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/portal" className="text-sm font-semibold px-4 py-2 rounded-lg text-gray-500 hover:text-white transition-colors">
            Client Portal
          </Link>
          <Link href="/book"
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg text-black transition-all duration-200"
            style={{ background: "#00F5FF", boxShadow: "0 0 20px rgba(0,245,255,0.4)" }}
            onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 32px rgba(0,245,255,0.7)"; }}
            onMouseOut={e  => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 20px rgba(0,245,255,0.4)"; }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
            Book a Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation"
          style={{ background: mobileOpen ? "rgba(0,245,255,0.06)" : "transparent" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={mobileOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid rgba(0,245,255,0.06)", background: "rgba(5,5,16,0.98)" }}>
            <div className="px-4 pb-6 pt-3 flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <MobileSection label="Solutions" items={solutions} onClose={close} />
              <MobileSection label="Services"  items={services}  onClose={close} />
              <MobileSection label="Academy"   items={academy}   onClose={close} />
              <div className="py-3 flex flex-col gap-0.5">
                <Link href="/pricing" onClick={close} className="py-2.5 text-sm font-semibold text-[#00F5FF]/70 hover:text-[#00F5FF] transition-colors">Pricing</Link>
                <Link href="/about"   onClick={close} className="py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/contact" onClick={close} className="py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <Link href="/portal" onClick={close} className="text-center py-2.5 rounded-lg text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Client Portal</Link>
                <Link href="/book" onClick={close} className="text-center py-3 rounded-lg text-sm font-bold text-black"
                  style={{ background: "#00F5FF", boxShadow: "0 0 20px rgba(0,245,255,0.4)" }}>Book a Discovery Call</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
