"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

interface FloatingNovaButtonProps {
  onOpen: () => void;
  unreadCount?: number;
  isOpen?: boolean;
}

// ── Premium full-body female robot — 80×132 coordinate space ──────────────────

function FullBodyNovaRobot({ glowing = false }: { glowing?: boolean }) {
  const c = "#00F5FF";   // cyan
  const p = "#8B5CF6";   // purple
  const w = "#D8F6FF";   // silver-white

  return (
    // overflow="visible" keeps the antenna glow from being clipped
    <svg viewBox="0 0 80 132" fill="none" overflow="visible"
         className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="nv-head" cx="38%" cy="26%" r="66%">
          <stop offset="0%"   stopColor={w}  stopOpacity="0.58" />
          <stop offset="55%"  stopColor={c}  stopOpacity="0.14" />
          <stop offset="100%" stopColor="#020214" stopOpacity="0.97" />
        </radialGradient>
        <radialGradient id="nv-body" cx="36%" cy="20%" r="72%">
          <stop offset="0%"   stopColor={w}  stopOpacity="0.38" />
          <stop offset="48%"  stopColor={p}  stopOpacity="0.17" />
          <stop offset="100%" stopColor="#020214" stopOpacity="0.96" />
        </radialGradient>
        <radialGradient id="nv-skirt" cx="36%" cy="14%" r="76%">
          <stop offset="0%"   stopColor={p}  stopOpacity="0.28" />
          <stop offset="55%"  stopColor={c}  stopOpacity="0.09" />
          <stop offset="100%" stopColor="#020214" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="nv-arm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={w}  stopOpacity="0.36" />
          <stop offset="100%" stopColor={c}  stopOpacity="0.07" />
        </linearGradient>
        <radialGradient id="nv-aura" cx="50%" cy="48%" r="50%">
          <stop offset="0%"   stopColor={c}  stopOpacity="0.08" />
          <stop offset="70%"  stopColor={p}  stopOpacity="0.04" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nv-gem" cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor={p}      stopOpacity="0.8" />
        </radialGradient>
      </defs>

      {/* ── Background aura ── */}
      <ellipse cx="40" cy="72" rx="38" ry="58" fill="url(#nv-aura)" />

      {/* ═══ ANTENNA ═══ */}
      <line x1="40" y1="6" x2="40" y2="14" stroke={c}
            strokeWidth="1.8" strokeLinecap="round" opacity="0.92" />
      <ellipse cx="40" cy="14" rx="4" ry="2.5"
               fill={`${c}38`} stroke={c} strokeWidth="0.9" />
      {/* Antenna tip glow */}
      <circle cx="40" cy="4"  r="5"   fill={c} opacity="0.1" />
      <circle cx="40" cy="4"  r="3.2" fill={c} opacity={glowing ? 1 : 0.88} />

      {/* ═══ HAIR WISPS (decorative) ═══ */}
      <path d="M27 18 Q23 12 21 15" stroke={c} strokeWidth="1.4"
            fill="none" opacity="0.42" strokeLinecap="round" />
      <path d="M29 16 Q26  9 24 12" stroke={c} strokeWidth="1.1"
            fill="none" opacity="0.28" strokeLinecap="round" />
      <path d="M53 18 Q57 12 59 15" stroke={c} strokeWidth="1.4"
            fill="none" opacity="0.42" strokeLinecap="round" />
      <path d="M51 16 Q54  9 56 12" stroke={c} strokeWidth="1.1"
            fill="none" opacity="0.28" strokeLinecap="round" />

      {/* ═══ HEAD ═══ */}
      <ellipse cx="40" cy="28" rx="18" ry="19"
               fill="url(#nv-head)" stroke={c} strokeWidth="1.4" opacity="0.97" />

      {/* ── Left eye ── */}
      <ellipse cx="32" cy="25.5" rx="6.5" ry="7"
               fill={`${c}16`} stroke={c} strokeWidth="1.2" />
      <circle  cx="32" cy="25.5" r="4"     fill={c}     opacity="0.95" />
      <circle  cx="32" cy="25.5" r="2.2"   fill="#001828" opacity="0.92" />
      <circle  cx="34"  cy="23"   r="1.5"   fill="white"  opacity="0.84" />
      <circle  cx="31"  cy="27.2" r="0.7"   fill="white"  opacity="0.38" />
      {/* Left eyelashes */}
      <path d="M26.5 22 Q28.5 19.5 31.5 21" stroke={c} strokeWidth="1.1"
            fill="none" opacity="0.52" strokeLinecap="round" />
      <path d="M29.5 20   Q31 18 33 20"    stroke={c} strokeWidth="0.9"
            fill="none" opacity="0.38" strokeLinecap="round" />

      {/* ── Right eye ── */}
      <ellipse cx="48" cy="25.5" rx="6.5" ry="7"
               fill={`${c}16`} stroke={c} strokeWidth="1.2" />
      <circle  cx="48" cy="25.5" r="4"     fill={c}     opacity="0.95" />
      <circle  cx="48" cy="25.5" r="2.2"   fill="#001828" opacity="0.92" />
      <circle  cx="50"  cy="23"   r="1.5"   fill="white"  opacity="0.84" />
      <circle  cx="47"  cy="27.2" r="0.7"   fill="white"  opacity="0.38" />
      {/* Right eyelashes */}
      <path d="M53.5 22 Q51.5 19.5 48.5 21" stroke={c} strokeWidth="1.1"
            fill="none" opacity="0.52" strokeLinecap="round" />
      <path d="M50.5 20   Q49 18 47 20"    stroke={c} strokeWidth="0.9"
            fill="none" opacity="0.38" strokeLinecap="round" />

      {/* ── Nose ── */}
      <ellipse cx="40" cy="33" rx="1.8" ry="1.1" fill={c} opacity="0.2" />

      {/* ── Smile ── */}
      <path d="M33 39 Q40 45.5 47 39"
            stroke={c} strokeWidth="2.1" strokeLinecap="round"
            fill="none" opacity="0.92" />

      {/* ── Blush ── */}
      <ellipse cx="22.5" cy="32" rx="6.5" ry="3.8" fill="rgba(255,120,200,0.30)" />
      <ellipse cx="57.5" cy="32" rx="6.5" ry="3.8" fill="rgba(255,120,200,0.30)" />

      {/* ═══ NECK ═══ */}
      <rect x="34" y="46" width="12" height="8" rx="4"
            fill={`${c}28`} stroke={c} strokeWidth="0.9" />
      <circle cx="40" cy="50" r="2.2" fill={c} opacity="0.48" />

      {/* ═══ TORSO — hourglass feminine silhouette ═══ */}
      <path d="M16 55 Q12 69 15 82 Q25 87 40 87 Q55 87 65 82 Q68 69 64 55
               Q56 50 40 50 Q24 50 16 55 Z"
            fill="url(#nv-body)" stroke={p} strokeWidth="1.3" opacity="0.97" />

      {/* Torso panel seams */}
      <path d="M21 66 Q40 70 59 66" stroke={`${c}28`} strokeWidth="0.9"
            fill="none" strokeLinecap="round" />
      <path d="M19 77 Q40 82 61 77" stroke={`${c}22`} strokeWidth="0.9"
            fill="none" strokeLinecap="round" />

      {/* Chest power gem */}
      <circle cx="40" cy="66" r="7.5"  fill={`${p}28`} stroke={p} strokeWidth="1.2" />
      <circle cx="40" cy="66" r="4.5"  fill="url(#nv-gem)" opacity="0.88" />
      <circle cx="42" cy="63.5" r="1.7" fill="white" opacity="0.65" />

      {/* Belt line */}
      <path d="M17 83 Q40 88 63 83"
            stroke={`${c}55`} strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* Body accent dots */}
      <circle cx="32" cy="78.5" r="1.8" fill={`${c}68`} />
      <circle cx="40" cy="78.5" r="1.8" fill={`${c}68`} />
      <circle cx="48" cy="78.5" r="1.8" fill={`${c}68`} />

      {/* ═══ ARMS ═══ */}
      {/* Left arm */}
      <path d="M16 57 Q7 68 6 80 Q7 87 12 86 Q17 85 18 80 Q15 68 17 56 Z"
            fill="url(#nv-arm)" stroke={c} strokeWidth="1" opacity="0.88" />
      <ellipse cx="9" cy="87" rx="6" ry="4.5"
               fill={`${c}20`} stroke={c} strokeWidth="0.9" />
      {/* Left finger lines */}
      <line x1="6"  y1="89" x2="12" y2="92" stroke={c} strokeWidth="0.7"
            strokeLinecap="round" opacity="0.42" />
      <line x1="8"  y1="90.5" x2="10" y2="93.5" stroke={c} strokeWidth="0.7"
            strokeLinecap="round" opacity="0.32" />

      {/* Right arm */}
      <path d="M64 57 Q73 68 74 80 Q73 87 68 86 Q63 85 62 80 Q65 68 63 56 Z"
            fill="url(#nv-arm)" stroke={c} strokeWidth="1" opacity="0.88" />
      <ellipse cx="71" cy="87" rx="6" ry="4.5"
               fill={`${c}20`} stroke={c} strokeWidth="0.9" />
      {/* Right finger lines */}
      <line x1="68" y1="89" x2="74" y2="92" stroke={c} strokeWidth="0.7"
            strokeLinecap="round" opacity="0.42" />
      <line x1="70" y1="90.5" x2="72" y2="93.5" stroke={c} strokeWidth="0.7"
            strokeLinecap="round" opacity="0.32" />

      {/* ═══ CAPE RIBBONS ═══ */}
      <path d="M16 62 Q5  80 10 104"  stroke={p} strokeWidth="3"   fill="none"
            opacity="0.30" strokeLinecap="round" />
      <path d="M18 72 Q4  92 10 116"  stroke={p} strokeWidth="1.6" fill="none"
            opacity="0.16" strokeLinecap="round" />
      <path d="M64 62 Q75 80 70 104"  stroke={p} strokeWidth="3"   fill="none"
            opacity="0.30" strokeLinecap="round" />
      <path d="M62 72 Q76 92 70 116"  stroke={p} strokeWidth="1.6" fill="none"
            opacity="0.16" strokeLinecap="round" />

      {/* ═══ SKIRT — flared feminine silhouette ═══ */}
      <path d="M17 85 Q9 102 12 118 Q26 124 40 124 Q54 124 68 118
               Q71 102 63 85 Q52 90 40 90 Q28 90 17 85 Z"
            fill="url(#nv-skirt)" stroke={`${p}90`} strokeWidth="1.2" opacity="0.95" />

      {/* Skirt accent lines */}
      <path d="M14 98  Q40 106 66 98"  stroke={`${c}28`} strokeWidth="0.9"
            fill="none" strokeLinecap="round" />
      <path d="M12 110 Q40 119 68 110" stroke={`${c}20`} strokeWidth="0.9"
            fill="none" strokeLinecap="round" />
      {/* Skirt hem glow */}
      <path d="M12 118 Q40 125 68 118" stroke={c} strokeWidth="1.2"
            fill="none" opacity="0.48" strokeLinecap="round" />

      {/* ═══ BOOTS ═══ */}
      <ellipse cx="29" cy="124" rx="12.5" ry="6.5"
               fill={`${c}28`} stroke={c} strokeWidth="1.1" />
      <ellipse cx="51" cy="124" rx="12.5" ry="6.5"
               fill={`${c}28`} stroke={c} strokeWidth="1.1" />
      {/* Boot top highlights */}
      <path d="M19 120 Q29 117 39 120" stroke={c} strokeWidth="0.9"
            fill="none" opacity="0.55" strokeLinecap="round" />
      <path d="M41 120 Q51 117 61 120" stroke={c} strokeWidth="0.9"
            fill="none" opacity="0.55" strokeLinecap="round" />

      {/* ═══ HOVER GLOW RINGS ═══ */}
      {glowing && (
        <>
          <ellipse cx="40" cy="72" rx="44" ry="66" fill="none"
                   stroke={c} strokeWidth="0.8" opacity="0.18" />
          <ellipse cx="40" cy="72" rx="48" ry="70" fill="none"
                   stroke={p} strokeWidth="0.5" opacity="0.10" />
        </>
      )}

      {/* ═══ STATIC SPARKLE DOTS ═══ */}
      <circle cx="72" cy="38"  r="1.8" fill={c} opacity="0.48" />
      <circle cx="5"  cy="58"  r="1.4" fill={p} opacity="0.42" />
      <circle cx="76" cy="90"  r="1.2" fill={c} opacity="0.36" />
      <circle cx="3"  cy="100" r="1.5" fill={p} opacity="0.32" />
    </svg>
  );
}

// ── Floating sparkle dot (animated in React) ──────────────────────────────────

interface SparkleProps { left: string; top: string; delay: number; color: string; }

function Sparkle({ left, top, delay, color }: SparkleProps) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
      style={{ left, top, background: color }}
      animate={{ opacity: [0, 0.9, 0], scale: [0, 1.5, 0], y: [0, -14, -28] }}
      transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function FloatingNovaButton({
  onOpen,
  unreadCount = 0,
  isOpen = false,
}: FloatingNovaButtonProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse-follow 3-D tilt
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const rotateY   = useSpring(rawMouseX, { stiffness: 120, damping: 16 });
  const rotateX   = useSpring(rawMouseY, { stiffness: 120, damping: 16 });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawMouseX.set((e.clientX - (rect.left + rect.width  / 2)) /  13);
    rawMouseY.set((e.clientY - (rect.top  + rect.height / 2)) / -13);
  }, [rawMouseX, rawMouseY]);

  useEffect(() => {
    if (!hovered) { rawMouseX.set(0); rawMouseY.set(0); return; }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hovered, handleMouseMove, rawMouseX, rawMouseY]);

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          ref={containerRef}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]
                     flex flex-col items-center cursor-pointer select-none"
          initial={{ opacity: 0, scale: 0.4, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 40 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          onClick={onOpen}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          role="button"
          tabIndex={0}
          aria-label="Talk to Nova — SupraCloud AI assistant"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") onOpen();
          }}
        >
          {/* Tooltip — appears to the left on desktop */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute right-[calc(100%+10px)] top-[35%] -translate-y-1/2
                           hidden sm:flex items-center px-3 py-1.5 rounded-xl
                           text-xs font-semibold text-black bg-[#00F5FF]
                           whitespace-nowrap pointer-events-none z-10"
                style={{ boxShadow: "0 0 18px rgba(0,245,255,0.55)" }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.14 }}
              >
                Talk to Nova
                <span
                  className="absolute right-[-6px] top-1/2 -translate-y-1/2
                             border-[6px] border-transparent border-l-[#00F5FF]"
                  aria-hidden
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated sparkles floating around Nova */}
          <Sparkle left="108%"  top="18%" delay={0}   color="#00F5FF" />
          <Sparkle left="-20%"  top="38%" delay={1.0}  color="#8B5CF6" />
          <Sparkle left="112%"  top="62%" delay={1.9}  color="#00F5FF" />
          <Sparkle left="-14%"  top="80%" delay={0.5}  color="#8B5CF6" />

          {/* Robot — floats (bob) + 3-D mouse-follow tilt */}
          <motion.div
            className="relative w-[60px] h-[97px] sm:w-[76px] sm:h-[124px]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ rotateX, rotateY, transformPerspective: 550 }}
          >
            <FullBodyNovaRobot glowing={hovered} />

            {/* Unread badge anchored to the robot div */}
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px]
                             rounded-full bg-red-500 text-white text-[10px]
                             font-bold flex items-center justify-center px-1
                             pointer-events-none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  aria-label={`${unreadCount} unread`}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Ground shadow — pulses in sync with the bob */}
          <motion.div
            className="w-14 h-3.5 rounded-full -mt-1"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,245,255,0.45) 0%, transparent 70%)",
            }}
            animate={{ scaleX: [1, 0.62, 1], opacity: [0.65, 0.18, 0.65] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingNovaButton;
