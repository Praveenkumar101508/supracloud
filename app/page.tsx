"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform, useScroll,
} from "framer-motion";
import Link from "next/link";
import { useAIState } from "./context/AIState";

/* ── Tokens ─────────────────────────────────────────────── */
const BG      = "#020202";
const PRIMARY = "#adc6ff";
const ON_BG   = "#e0e2ed";
const MUTED   = "#c1c6d7";
const GB      = "rgba(255,255,255,0.08)";
const GBT     = "rgba(255,255,255,0.12)";
const GBG     = "rgba(255,255,255,0.03)";
const GLASS   = {
  background: GBG,
  backdropFilter: "blur(40px)",
  WebkitBackdropFilter: "blur(40px)",
  borderTop: `1px solid ${GBT}`,
  borderLeft: `1px solid ${GB}`,
  borderRight: "1px solid rgba(255,255,255,0.04)",
  borderBottom: "1px solid rgba(255,255,255,0.04)",
  borderRadius: 12,
} as const;

/* ── Pulse dot ──────────────────────────────────────────── */
function PulseDot({ color = PRIMARY, size = 6 }: { color?: string; size?: number }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{
        display: "inline-block",
        width: size, height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size + 2}px ${color}`,
        flexShrink: 0,
      }}
    />
  );
}

/* ── Background: SupraCloud logo watermark + parallax ───── */
function LogoBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1200], [0, -180]);
  return (
    <motion.div
      aria-hidden
      style={{ y, position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}
    >
      {/* Giant SupraCloud S-mark centred on screen */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(70vh, 70vw)",
        height: "min(70vh, 70vw)",
        opacity: 0.028,
      }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <path
            d="M80 25H35C26.7157 25 20 31.7157 20 40V42.5C20 50.7843 26.7157 57.5 35 57.5H65C73.2843 57.5 80 64.2157 80 72.5V75C80 83.2843 73.2843 90 65 90H20"
            stroke="white"
            strokeWidth="14"
            strokeLinecap="square"
          />
        </svg>
      </div>
    </motion.div>
  );
}

/* ── Aurora glow layer + scroll parallax ────────────────── */
function AuroraLayer() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1200], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1200], [0, -80]);
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      <motion.div style={{
        y: y1,
        position: "absolute",
        top: "-20%", left: "-10%",
        width: "60%", height: "60%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,122,255,0.12) 0%, transparent 70%)",
        filter: "blur(120px)",
      }} />
      <motion.div style={{
        y: y2,
        position: "absolute",
        bottom: "-20%", right: "-10%",
        width: "50%", height: "50%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,91,193,0.08) 0%, transparent 70%)",
        filter: "blur(120px)",
      }} />
    </div>
  );
}

/* ── Glass card with mouse glow + magnetic tilt ─────────── */
function GlassCard({
  children, className = "", style = {}, tilt = true,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tilt?: boolean;
}) {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, vis: false });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 280, damping: 28 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 280, damping: 28 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - r.left, y: e.clientY - r.top, vis: true });
    if (tilt) {
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    }
  }, [tilt, mx, my]);

  const onLeave = useCallback(() => {
    setGlowPos(g => ({ ...g, vis: false }));
    if (tilt) { mx.set(0); my.set(0); }
  }, [tilt, mx, my]);

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ background: "rgba(255,255,255,0.055)" } as never}
      style={{
        rotateX: tilt ? rotX : 0,
        rotateY: tilt ? rotY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s",
        ...GLASS,
        ...style,
      }}
      className={className}
    >
      {/* Mouse-tracking glow */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
        background: `radial-gradient(350px circle at ${glowPos.x}px ${glowPos.y}px, rgba(173,198,255,0.12), transparent 55%)`,
        opacity: glowPos.vis ? 1 : 0,
        transition: "opacity 0.35s",
        zIndex: 1,
      }} />
      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ── HUD indicators ─────────────────────────────────────── */
function HUDBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const mono: React.CSSProperties = {
    fontFamily: "'Space Mono', 'Courier New', monospace",
    fontSize: 10, letterSpacing: "0.1em", color: MUTED,
  };

  return (
    <>
      <div style={{ position: "fixed", top: 20, left: 48, zIndex: 60, display: "flex", alignItems: "center", gap: 8 }}>
        <PulseDot color="#007AFF" />
        <span style={{ ...mono, textTransform: "uppercase" }}>Command Center // Active</span>
      </div>
      <div style={{ position: "fixed", top: 20, right: 48, zIndex: 60, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ ...mono, opacity: 0.5 }}>LATENCY: 0.1s</span>
        <span style={{ ...mono, opacity: 0.5 }}>SUBSTRATE: v4.0</span>
        {time && <span style={{ ...mono, opacity: 0.3 }}>{time}</span>}
      </div>
    </>
  );
}

/* ── Floating glass nav ─────────────────────────────────── */
function GlassNav({ onInitialize }: { onInitialize: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Command Center", href: "/",                  active: true },
    { label: "AI Services",    href: "/solutions/banking"              },
    { label: "Talent Lab",     href: "/talent/programs"               },
    { label: "Strategic Hub",  href: "/contact"                       },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 20, left: "50%",
        transform: "translateX(-50%)",
        width: "min(calc(100% - 96px), 1100px)",
        zIndex: 50,
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        ...GLASS,
        borderRadius: 9999,
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 800, color: ON_BG, letterSpacing: "-0.03em" }}>
          SupraCloud
        </span>
      </Link>

      {/* Desktop links */}
      <nav className="hidden md:flex" style={{ gap: 28, alignItems: "center" }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            fontFamily: "Inter, sans-serif", fontSize: 15,
            fontWeight: l.active ? 700 : 500,
            color: l.active ? PRIMARY : `${MUTED}90`,
            textDecoration: "none",
            borderBottom: l.active ? `1px solid ${PRIMARY}` : "none",
            paddingBottom: l.active ? 2 : 0,
          }}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <motion.button
          onClick={onInitialize}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: PRIMARY, color: "#002e69",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
            padding: "8px 20px", borderRadius: 9999, border: "none",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(173,198,255,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          Initialize Hub
        </motion.button>
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", color: ON_BG, cursor: "pointer", fontSize: 18 }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: "absolute", top: "calc(100% + 12px)", left: 0, right: 0,
              background: "#0d0f17", border: `1px solid ${GB}`,
              borderRadius: 12, padding: "8px 0",
            }}
          >
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                style={{
                  display: "block", padding: "10px 20px",
                  fontFamily: "Inter, sans-serif", fontSize: 15,
                  color: l.active ? PRIMARY : MUTED, textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── Spinning-rings Jarvis orb ──────────────────────────── */
function JarvisOrb() {
  return (
    <div style={{ position: "relative", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: "1px solid rgba(0,122,255,0.22)",
        }}
      >
        <div style={{
          position: "absolute", top: -4, left: "50%", marginLeft: -4,
          width: 8, height: 8, borderRadius: "50%",
          background: "#007AFF", boxShadow: "0 0 15px #007AFF",
        }} />
      </motion.div>

      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", inset: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)" }}
      />

      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", inset: 60, borderRadius: "50%", border: `1px solid rgba(173,198,255,0.18)` }}
      />

      {/* Core orb */}
      <div style={{
        width: 140, height: 140,
        ...GLASS, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% 65%, rgba(0,122,255,0.28), transparent 65%)",
        }} />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: 48, lineHeight: 1, position: "relative", zIndex: 1 }}
        >
          ⬡
        </motion.div>
      </div>
    </div>
  );
}

/* ── Animated metric progress bar ───────────────────────── */
function MetricBar({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: `${MUTED}80`, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: PRIMARY }}>{value}</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${PRIMARY}, rgba(173,198,255,0.5))`,
            borderRadius: 2,
            boxShadow: "0 0 8px rgba(173,198,255,0.4)",
          }}
        />
      </div>
    </div>
  );
}

/* ── Bento grid ─────────────────────────────────────────── */
function BentoGrid() {
  return (
    <div style={{ padding: "0 48px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Row 1: AI Agent Dev + IT Services */}
      <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 20, marginBottom: 20 }}
        className="bento-row-1">

        {/* AI Agent Dev */}
        <GlassCard style={{ padding: 32, minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 30, marginBottom: 10 }}>⚙</div>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 700, color: ON_BG, margin: 0, letterSpacing: "-0.02em" }}>
                  AI Agent Dev
                </h3>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{
                  padding: "3px 10px", borderRadius: 4,
                  border: `1px solid rgba(173,198,255,0.3)`,
                  background: "rgba(173,198,255,0.08)",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: PRIMARY }}>BANKING</span>
                  <PulseDot size={5} />
                </div>
                <div style={{
                  padding: "3px 10px", borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: `${MUTED}60` }}>RETAIL</span>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: `${MUTED}30`, display: "inline-block" }} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 18 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: `${MUTED}bb`, lineHeight: 1.65, maxWidth: 280, margin: 0 }}>
                Autonomous agents trained for high-stakes enterprise workflows — banking fraud triage, retail concierge, and predictive ops.
              </p>
              <Link href="/solutions/banking" style={{ textDecoration: "none" }}>
                <motion.span whileHover={{ x: 4 }} style={{ fontSize: 20, color: PRIMARY, display: "block", cursor: "pointer" }}>→</motion.span>
              </Link>
            </div>
          </div>
        </GlassCard>

        {/* IT Services */}
        <GlassCard style={{ padding: 32, minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, marginBottom: 6, color: `${MUTED}aa` }}>&gt;_</div>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 700, color: ON_BG, margin: "0 0 28px 0", letterSpacing: "-0.02em" }}>
              IT Services
            </h3>
            <MetricBar label="Staffing Efficiency" value="98.2%"  pct={98.2} />
            <MetricBar label="Success Rate"        value="99.97%" pct={99.97} />
          </div>
          <Link href="/services/staffing" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ color: PRIMARY } as never}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                color: `${MUTED}60`, display: "flex", alignItems: "center", gap: 6,
                textTransform: "uppercase", letterSpacing: "0.08em",
                transition: "color 0.2s",
              }}
            >
              VIEW METRIC LOGS <span style={{ fontSize: 14 }}>↗</span>
            </motion.div>
          </Link>
        </GlassCard>
      </div>

      {/* Row 2: Talent Lab full width */}
      <GlassCard
        tilt={false}
        style={{
          minHeight: 400,
          padding: 0,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          overflow: "hidden",
          position: "relative",
          borderRadius: 12,
        }}
      >
        {/* Background image */}
        <motion.img
          src="/talent-lab-bg.jpg"
          alt=""
          aria-hidden
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            mixBlendMode: "overlay",
            opacity: 0.28,
          }}
        />
        {/* Dark gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(2,2,2,0.9) 0%, rgba(2,2,2,0.2) 60%, transparent 100%)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, padding: "40px 48px", maxWidth: 680 }}>
          <div style={{
            display: "inline-block", padding: "4px 12px",
            background: "rgba(173,198,255,0.12)",
            border: `1px solid rgba(173,198,255,0.28)`,
            borderRadius: 4, marginBottom: 20,
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9,
              color: PRIMARY, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
            }}>
              Special Forces Selection
            </span>
          </div>

          <h3 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 800, color: ON_BG,
            margin: "0 0 16px 0", lineHeight: 1.1, letterSpacing: "-0.03em",
          }}>
            Forge Elite Architects
          </h3>

          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: `${MUTED}cc`, lineHeight: 1.65, margin: "0 0 32px 0" }}>
            We don't hire CVs. We identify high-frequency cognitive patterns. Our Talent Lab is a rigorous crucible that transforms senior architects into AI-augmented tactical units.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/talent/programs">
              <motion.button
                whileHover={{ background: "rgba(255,255,255,0.18)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "11px 26px", borderRadius: 9999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: ON_BG, fontFamily: "Inter, sans-serif",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                }}
              >
                Review Protocols
              </motion.button>
            </Link>
            <Link href="/talent/internships">
              <motion.button
                whileHover={{ gap: "20px" } as never}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "11px 26px", borderRadius: 9999,
                  background: "transparent", border: "none",
                  color: PRIMARY, fontFamily: "Inter, sans-serif",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                Enter the Lab <span>⚡</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

/* ── Jarvis on-demand boot sequence ─────────────────────── */
const JARVIS_LINES = [
  "JARVIS SUBSYSTEM v4.0 — INITIALIZING...",
  "Establishing secure enterprise subnet...",
  "Loading AI agent runtime [Claude · LangGraph · RAG]...",
  "Verifying compliance controls [FCA · GDPR · PCI-DSS]...",
  "Connecting to knowledge bases — indexed...",
  "Calibrating latency threshold: 0.1s ✓",
  "All systems operational. Welcome to SupraCloud. ✓",
];

function JarvisBootModal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const { setBooted } = useAIState();

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    JARVIS_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setLines(prev => {
          if (prev.includes(JARVIS_LINES[i])) return prev;
          return [...prev, JARVIS_LINES[i]];
        });
        setProgress(Math.round(((i + 1) / JARVIS_LINES.length) * 100));
        if (i === JARVIS_LINES.length - 1) {
          timers.push(setTimeout(() => setDone(true), 400));
        }
      }, 280 + i * 460));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  function complete() {
    setBooted(true);
    try { sessionStorage.setItem("sc_booted", "1"); } catch {}
    onClose();
  }

  const mono: React.CSSProperties = { fontFamily: "'Space Mono', 'Courier New', monospace" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(2,2,2,0.92)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
      }}
    >
      {/* Intensified aurora behind modal */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,122,255,0.09) 0%, transparent 70%)",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ position: "relative", maxWidth: 520, width: "100%", padding: "0 24px" }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              width: 44, height: 44,
              ...GLASS, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, boxShadow: `0 0 24px rgba(173,198,255,0.18)`,
            }}
          >
            ⬡
          </motion.div>
          <div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 800, color: ON_BG, letterSpacing: "-0.02em" }}>
              SupraCloud
            </div>
            <div style={{ ...mono, fontSize: 9, color: PRIMARY, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Jarvis Initialization Sequence
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              marginLeft: "auto", background: "none", border: "none",
              color: `${MUTED}60`, cursor: "pointer", fontSize: 18,
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Terminal */}
        <div style={{
          background: "#05060f",
          border: "1px solid rgba(173,198,255,0.12)",
          borderRadius: 10, overflow: "hidden", marginBottom: 18,
        }}>
          <div style={{
            height: 34, background: "#090a14",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            display: "flex", alignItems: "center", padding: "0 14px", gap: 6,
          }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
              <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }} />
            ))}
            <span style={{ ...mono, marginLeft: 10, fontSize: 10, color: "#374151" }}>jarvis-core-runtime</span>
          </div>
          <div style={{ padding: "16px 20px", minHeight: 210 }}>
            {lines.map((line, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  ...mono, fontSize: 12, lineHeight: 1.7, marginBottom: 2,
                  color: done && i === lines.length - 1 ? "#22C55E" : PRIMARY,
                }}
              >
                {line}
              </motion.div>
            ))}
            {!done && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ ...mono, fontSize: 13, color: PRIMARY }}
              >▋</motion.span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          background: "rgba(173,198,255,0.05)", borderRadius: 2, height: 2,
          border: "1px solid rgba(173,198,255,0.08)", marginBottom: 26,
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              height: "100%",
              background: `linear-gradient(90deg, ${PRIMARY}, rgba(173,198,255,0.4))`,
              borderRadius: 2, boxShadow: "0 0 8px rgba(173,198,255,0.4)",
            }}
          />
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: "center" }}
            >
              <motion.button
                onClick={complete}
                whileHover={{ scale: 1.04, boxShadow: "0 0 48px rgba(173,198,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: PRIMARY, color: "#002e69",
                  border: "none", borderRadius: 9999,
                  padding: "14px 48px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13, fontWeight: 800,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: "0 0 28px rgba(173,198,255,0.28)",
                }}
              >
                Enter the Platform →
              </motion.button>
              <p style={{
                marginTop: 14, ...mono, fontSize: 9,
                color: `${MUTED}40`, letterSpacing: "0.08em",
              }}>
                ENTERPRISE AI PLATFORM · UK-BASED · PRODUCTION-GRADE
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── Status pill ─────────────────────────────────────────── */
function StatusPill({ color, label }: { color: string; label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "5px 14px", borderRadius: 9999,
      border: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(255,255,255,0.03)",
    }}>
      <PulseDot color={color} size={5} />
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: MUTED }}>
        {label}
      </span>
    </div>
  );
}

/* ── Minimal home footer ─────────────────────────────────── */
function HomeFooter() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      background: "rgba(10,12,20,0.4)",
      backdropFilter: "blur(40px)",
      display: "flex", flexWrap: "wrap",
      justifyContent: "space-between", alignItems: "center",
      padding: "24px 48px", gap: 16,
    }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: `${MUTED}70`, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        SupraCloud Enterprise // Reactive Substrate v4.0
      </span>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {[
          { label: "Jarvis Core",         href: "/" },
          { label: "Banking",             href: "/solutions/banking" },
          { label: "Retail",              href: "/solutions/retail" },
          { label: "Talent Lab",          href: "/talent/programs" },
          { label: "Strategic Architect", href: "/contact" },
        ].map(l => (
          <Link key={l.href} href={l.href} style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            color: `${MUTED}50`, textDecoration: "none",
          }}>
            {l.label}
          </Link>
        ))}
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: `${MUTED}28` }}>
        © {new Date().getFullYear()} SUPRA.OS
      </span>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [bootOpen, setBootOpen] = useState(false);

  return (
    <div style={{ background: BG, minHeight: "100vh", position: "relative", overflowX: "hidden" }}>

      {/* Fixed background layers */}
      <LogoBackground />
      <AuroraLayer />

      {/* HUD + Nav */}
      <HUDBar />
      <GlassNav onInitialize={() => setBootOpen(true)} />

      {/* Scrollable content */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section style={{
          display: "flex", flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "112px 48px 64px",
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 36 }}
          >
            <JarvisOrb />
          </motion.div>

          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "clamp(36px, 5.5vw, 68px)",
                fontWeight: 800, color: ON_BG,
                lineHeight: 1.06, letterSpacing: "-0.04em",
                margin: "0 0 24px 0",
              }}
            >
              Engineering the Next Generation<br />of AI Experts.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 17, lineHeight: 1.65, color: `${MUTED}cc`,
                maxWidth: 560, margin: "0 auto 40px",
              }}
            >
              We don't just hire; we forge. SupraCloud is the reactive substrate for elite performance —
              merging human ingenuity with the precision of advanced artificial intelligence.
            </motion.p>

            {/* Status pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.46 }}
              style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}
            >
              <StatusPill color="#FF5F57" label="MLOps Active" />
              <StatusPill color="#007AFF" label="Node Cluster 04" />
              <StatusPill color="#28C840" label="All Systems Operational" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
            >
              <Link href="/book">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(173,198,255,0.38)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: PRIMARY, color: "#002e69",
                    border: "none", borderRadius: 9999,
                    padding: "14px 32px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15, fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 0 20px rgba(173,198,255,0.22)",
                  }}
                >
                  Book a Discovery Call
                </motion.button>
              </Link>
              <Link href="/solutions/banking">
                <motion.button
                  whileHover={{ borderColor: PRIMARY, color: PRIMARY } as never}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 9999,
                    padding: "14px 32px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15, fontWeight: 600,
                    color: MUTED, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  View Solutions
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Stats rail ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "28px 48px",
            display: "flex", justifyContent: "center",
            gap: "clamp(32px, 5vw, 80px)", flexWrap: "wrap",
          }}
        >
          {[
            { val: "63%",    label: "L1 Query Deflection" },
            { val: "60%",    label: "Support Cost Reduction" },
            { val: "99.97%", label: "Agent Uptime SLA" },
            { val: "0.1s",   label: "Agent Response Latency" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700, color: PRIMARY, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: `${MUTED}70`, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Bento section ──────────────────────────────────── */}
        <div style={{ padding: "72px 0 80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: 40, padding: "0 48px" }}
          >
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9,
              color: PRIMARY, textTransform: "uppercase", letterSpacing: "0.22em",
            }}>
              Capability Stack
            </span>
            <h2 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(26px, 3.5vw, 42px)",
              fontWeight: 800, color: ON_BG,
              margin: "12px 0 0", letterSpacing: "-0.03em",
            }}>
              One Platform. Three Pillars.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <BentoGrid />
          </motion.div>
        </div>
      </div>

      <HomeFooter />

      {/* Jarvis boot modal */}
      <AnimatePresence>
        {bootOpen && <JarvisBootModal onClose={() => setBootOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
