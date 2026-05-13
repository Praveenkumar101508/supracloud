"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

interface FloatingNovaButtonProps {
  onOpen: () => void;
  unreadCount?: number;
  isOpen?: boolean;
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = "#00F5FF"; // cyan
const P = "#8B5CF6"; // purple
const W = "#D8F6FF"; // silver-white

// transformBox: fill-box makes transformOrigin relative to the element's own
// bounding box — no SVG coordinate maths needed, works at any render size.
const TB: React.CSSProperties = { transformBox: "fill-box" };

// ── Shared animation configs ───────────────────────────────────────────────────

// Eye blink: entire eye group (outline + iris + pupil + highlights) closes together
const BLINK_T = {
  duration: 5.0,
  repeat: Infinity,
  times: [0, 0.74, 0.80, 0.87, 1.0] as number[],
  ease: "easeInOut" as const,
};
const BLINK_V = { scaleY: [1, 1, 0.04, 1, 1] as number[] };

// Body breathing: gentle vertical expand from torso center
const BREATH_V = { scaleY: [1, 1.022, 1] as number[] };
const BREATH_T = { duration: 4.4, repeat: Infinity, ease: "easeInOut" as const };

// Cape sway: left and right ribbons counter-phase for natural drape
const CAPE_T = { duration: 5.8, repeat: Infinity, ease: "easeInOut" as const };

// Skirt sway: slight offset from cape so they move independently
const SKIRT_T = { duration: 4.9, repeat: Infinity, delay: 0.3, ease: "easeInOut" as const };

// Chest gem pulse
const GEM_V = { scale: [1, 1.18, 1] as number[] };
const GEM_T  = { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const };

// Antenna tip — faster, more energetic
const ANT_V = {
  opacity: [0.85, 1.0, 0.42, 1.0, 0.85] as number[],
  scale:   [1.0, 1.28, 0.80, 1.12, 1.0] as number[],
};
const ANT_T = { duration: 2.3, repeat: Infinity, ease: "easeInOut" as const };

// ── Full-body female robot SVG ─────────────────────────────────────────────────

function FullBodyNovaRobot({ glowing = false }: { glowing?: boolean }) {
  return (
    <svg viewBox="0 0 80 132" fill="none" overflow="visible"
         className="w-full h-full drop-shadow-sm" aria-hidden>
      <defs>
        <radialGradient id="nv-head" cx="38%" cy="26%" r="66%">
          <stop offset="0%"   stopColor={W} stopOpacity="0.60" />
          <stop offset="55%"  stopColor={C} stopOpacity="0.14" />
          <stop offset="100%" stopColor="#020214" stopOpacity="0.97" />
        </radialGradient>
        <radialGradient id="nv-body" cx="36%" cy="20%" r="72%">
          <stop offset="0%"   stopColor={W} stopOpacity="0.40" />
          <stop offset="48%"  stopColor={P} stopOpacity="0.18" />
          <stop offset="100%" stopColor="#020214" stopOpacity="0.96" />
        </radialGradient>
        <radialGradient id="nv-skirt" cx="36%" cy="14%" r="76%">
          <stop offset="0%"   stopColor={P} stopOpacity="0.30" />
          <stop offset="55%"  stopColor={C} stopOpacity="0.10" />
          <stop offset="100%" stopColor="#020214" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="nv-arm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={W} stopOpacity="0.38" />
          <stop offset="100%" stopColor={C} stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="nv-aura" cx="50%" cy="48%" r="50%">
          <stop offset="0%"   stopColor={C} stopOpacity="0.09" />
          <stop offset="70%"  stopColor={P} stopOpacity="0.04" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nv-gem" cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.65" />
          <stop offset="100%" stopColor={P}     stopOpacity="0.85" />
        </radialGradient>
        <radialGradient id="nv-eye" cx="35%" cy="35%" r="60%">
          <stop offset="0%"   stopColor={C} />
          <stop offset="55%"  stopColor="#0090B8" />
          <stop offset="100%" stopColor="#001828" />
        </radialGradient>
        <filter id="nv-glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nv-glow-s">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background aura */}
      <ellipse cx="40" cy="72" rx="38" ry="58" fill="url(#nv-aura)" />

      {/* ══ ANTENNA ══ */}
      <line x1="40" y1="6.5" x2="40" y2="14" stroke={C}
            strokeWidth="1.8" strokeLinecap="round" opacity="0.92" />
      <ellipse cx="40" cy="14" rx="4" ry="2.5"
               fill={`${C}38`} stroke={C} strokeWidth="0.9" />
      {/* Soft outer halo (static) */}
      <circle cx="40" cy="4" r="6" fill={C} opacity="0.07" />
      {/* Pulsing tip */}
      <motion.circle
        cx="40" cy="4" r="3.2" fill={C}
        style={{ ...TB, transformOrigin: "50% 50%", filter: "url(#nv-glow)" }}
        animate={ANT_V}
        transition={ANT_T}
      />

      {/* ══ HAIR WISPS ══ */}
      <path d="M27 18 Q22 10 19 13" stroke={C} strokeWidth="1.5"
            fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M30 16 Q26  8 23 11" stroke={C} strokeWidth="1.1"
            fill="none" opacity="0.28" strokeLinecap="round" />
      <path d="M31 14 Q29  6 26.5 9" stroke={C} strokeWidth="0.75"
            fill="none" opacity="0.17" strokeLinecap="round" />
      <path d="M53 18 Q58 10 61 13" stroke={C} strokeWidth="1.5"
            fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M50 16 Q54  8 57 11" stroke={C} strokeWidth="1.1"
            fill="none" opacity="0.28" strokeLinecap="round" />
      <path d="M49 14 Q51  6 53.5 9" stroke={C} strokeWidth="0.75"
            fill="none" opacity="0.17" strokeLinecap="round" />

      {/* ══ HEAD ══ */}
      <ellipse cx="40" cy="28" rx="18" ry="19"
               fill="url(#nv-head)" stroke={C} strokeWidth="1.4" opacity="0.97" />

      {/* ══ LEFT EYE — entire group blinks via scaleY ══ */}
      <motion.g
        style={{ ...TB, transformOrigin: "50% 50%" }}
        animate={BLINK_V}
        transition={BLINK_T}
      >
        <ellipse cx="32" cy="25.5" rx="6.5" ry="7"
                 fill={`${C}18`} stroke={C} strokeWidth="1.2" />
        <circle cx="32" cy="25.5" r="4.3" fill="url(#nv-eye)" />
        <circle cx="32" cy="25.5" r="2.1" fill="#001020" opacity="0.95" />
        <circle cx="33.8" cy="23.0" r="1.65" fill="white" opacity="0.90" />
        <circle cx="30.8" cy="27.4" r="0.75" fill="white" opacity="0.44" />
      </motion.g>
      {/* Left lashes — outside group so they stay during blink (natural) */}
      <path d="M25.5 21.2 Q28.5 18.5 32.0 20.5" stroke={C} strokeWidth="1.25"
            fill="none" opacity="0.58" strokeLinecap="round" />
      <path d="M28.5 19.5 Q30.8 17.2 33.5 19.0" stroke={C} strokeWidth="0.95"
            fill="none" opacity="0.40" strokeLinecap="round" />
      <path d="M32.2 18.6 Q33.8 17.0 35.6 18.5" stroke={C} strokeWidth="0.72"
            fill="none" opacity="0.28" strokeLinecap="round" />

      {/* ══ RIGHT EYE — slight delay for natural look ══ */}
      <motion.g
        style={{ ...TB, transformOrigin: "50% 50%" }}
        animate={BLINK_V}
        transition={{ ...BLINK_T, delay: 0.06 }}
      >
        <ellipse cx="48" cy="25.5" rx="6.5" ry="7"
                 fill={`${C}18`} stroke={C} strokeWidth="1.2" />
        <circle cx="48" cy="25.5" r="4.3" fill="url(#nv-eye)" />
        <circle cx="48" cy="25.5" r="2.1" fill="#001020" opacity="0.95" />
        <circle cx="49.8" cy="23.0" r="1.65" fill="white" opacity="0.90" />
        <circle cx="46.8" cy="27.4" r="0.75" fill="white" opacity="0.44" />
      </motion.g>
      {/* Right lashes */}
      <path d="M54.5 21.2 Q51.5 18.5 48.0 20.5" stroke={C} strokeWidth="1.25"
            fill="none" opacity="0.58" strokeLinecap="round" />
      <path d="M51.5 19.5 Q49.2 17.2 46.5 19.0" stroke={C} strokeWidth="0.95"
            fill="none" opacity="0.40" strokeLinecap="round" />
      <path d="M47.8 18.6 Q46.2 17.0 44.4 18.5" stroke={C} strokeWidth="0.72"
            fill="none" opacity="0.28" strokeLinecap="round" />

      {/* ─ Nose ─ */}
      <ellipse cx="40" cy="33.5" rx="1.6" ry="1.0" fill={C} opacity="0.22" />

      {/* ─ Smile ─ */}
      <path d="M33.5 38.5 Q40 45.5 46.5 38.5"
            stroke={C} strokeWidth="2.2" strokeLinecap="round"
            fill="none" opacity="0.92" />
      <circle cx="33.5" cy="38.5" r="1.2" fill={C} opacity="0.55" />
      <circle cx="46.5" cy="38.5" r="1.2" fill={C} opacity="0.55" />

      {/* ─ Blush ─ */}
      <ellipse cx="21.5" cy="32.5" rx="7" ry="4" fill="rgba(255,110,190,0.28)" />
      <ellipse cx="58.5" cy="32.5" rx="7" ry="4" fill="rgba(255,110,190,0.28)" />

      {/* ══ NECK ══ */}
      <rect x="34" y="46" width="12" height="8" rx="4"
            fill={`${C}28`} stroke={C} strokeWidth="0.9" />
      <circle cx="40" cy="50" r="2.2" fill={C} opacity="0.50" />

      {/* ══ TORSO (breathing) ══ */}
      <motion.g
        style={{ ...TB, transformOrigin: "50% 50%" }}
        animate={BREATH_V}
        transition={BREATH_T}
      >
        {/* Hourglass silhouette */}
        <path d="M16 55 Q12 69 15 82 Q25 87 40 87 Q55 87 65 82 Q68 69 64 55
                 Q56 50 40 50 Q24 50 16 55 Z"
              fill="url(#nv-body)" stroke={P} strokeWidth="1.3" opacity="0.97" />
        {/* Panel seams */}
        <path d="M21 66 Q40 70 59 66" stroke={`${C}28`} strokeWidth="0.9"
              fill="none" strokeLinecap="round" />
        <path d="M19 77 Q40 82 61 77" stroke={`${C}22`} strokeWidth="0.9"
              fill="none" strokeLinecap="round" />
        {/* Chest gem — outer ring static, inner crystal pulses */}
        <circle cx="40" cy="66" r="8" fill={`${P}22`} stroke={P} strokeWidth="1.1" />
        <motion.circle
          cx="40" cy="66" r="4.8"
          fill="url(#nv-gem)" opacity="0.92"
          style={{ ...TB, transformOrigin: "50% 50%", filter: "url(#nv-glow-s)" }}
          animate={GEM_V}
          transition={GEM_T}
        />
        <circle cx="41.8" cy="63.5" r="1.8" fill="white" opacity="0.68" />
        {/* Belt */}
        <path d="M17 83 Q40 88 63 83"
              stroke={`${C}55`} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* Accent dots */}
        <circle cx="32" cy="78.5" r="1.8" fill={`${C}68`} />
        <circle cx="40" cy="78.5" r="1.8" fill={`${C}68`} />
        <circle cx="48" cy="78.5" r="1.8" fill={`${C}68`} />
      </motion.g>

      {/* ══ ARMS ══ */}
      <path d="M16 57 Q7 68 6 80 Q7 87 12 86 Q17 85 18 80 Q15 68 17 56 Z"
            fill="url(#nv-arm)" stroke={C} strokeWidth="1" opacity="0.88" />
      <ellipse cx="9" cy="87" rx="6" ry="4.5"
               fill={`${C}20`} stroke={C} strokeWidth="0.9" />
      <line x1="6"  y1="89" x2="12" y2="92" stroke={C} strokeWidth="0.7"
            strokeLinecap="round" opacity="0.42" />
      <line x1="8"  y1="90.5" x2="10" y2="93.5" stroke={C} strokeWidth="0.7"
            strokeLinecap="round" opacity="0.32" />

      <path d="M64 57 Q73 68 74 80 Q73 87 68 86 Q63 85 62 80 Q65 68 63 56 Z"
            fill="url(#nv-arm)" stroke={C} strokeWidth="1" opacity="0.88" />
      <ellipse cx="71" cy="87" rx="6" ry="4.5"
               fill={`${C}20`} stroke={C} strokeWidth="0.9" />
      <line x1="68" y1="89" x2="74" y2="92" stroke={C} strokeWidth="0.7"
            strokeLinecap="round" opacity="0.42" />
      <line x1="70" y1="90.5" x2="72" y2="93.5" stroke={C} strokeWidth="0.7"
            strokeLinecap="round" opacity="0.32" />

      {/* ══ CAPE RIBBONS — counter-phase sway ══ */}
      {/* Left ribbons: pivot from shoulder top */}
      <motion.g
        style={{ ...TB, transformOrigin: "50% 0%" }}
        animate={{ rotate: [-3.5, 3.5, -3.5] }}
        transition={CAPE_T}
      >
        <path d="M16 62 Q5  80 10 104" stroke={P} strokeWidth="3.2" fill="none"
              opacity="0.32" strokeLinecap="round" />
        <path d="M18 72 Q4  92 10 116" stroke={P} strokeWidth="1.7" fill="none"
              opacity="0.17" strokeLinecap="round" />
      </motion.g>
      {/* Right ribbons: opposite phase for flowing drape effect */}
      <motion.g
        style={{ ...TB, transformOrigin: "50% 0%" }}
        animate={{ rotate: [3.5, -3.5, 3.5] }}
        transition={CAPE_T}
      >
        <path d="M64 62 Q75 80 70 104" stroke={P} strokeWidth="3.2" fill="none"
              opacity="0.32" strokeLinecap="round" />
        <path d="M62 72 Q76 92 70 116" stroke={P} strokeWidth="1.7" fill="none"
              opacity="0.17" strokeLinecap="round" />
      </motion.g>

      {/* ══ SKIRT + BOOTS — gentle sway from waist ══ */}
      <motion.g
        style={{ ...TB, transformOrigin: "50% 0%" }}
        animate={{ rotate: [-2.2, 2.2, -2.2] }}
        transition={SKIRT_T}
      >
        {/* Flared skirt */}
        <path d="M17 85 Q9 102 12 118 Q26 124 40 124 Q54 124 68 118
                 Q71 102 63 85 Q52 90 40 90 Q28 90 17 85 Z"
              fill="url(#nv-skirt)" stroke={`${P}90`} strokeWidth="1.2" opacity="0.95" />
        {/* Skirt folds */}
        <path d="M14 98  Q40 106 66 98"  stroke={`${C}28`} strokeWidth="0.9"
              fill="none" strokeLinecap="round" />
        <path d="M12 110 Q40 119 68 110" stroke={`${C}20`} strokeWidth="0.9"
              fill="none" strokeLinecap="round" />
        {/* Hem glow line */}
        <path d="M12 118 Q40 126 68 118" stroke={C} strokeWidth="1.3"
              fill="none" opacity="0.52" strokeLinecap="round" />
        {/* Boots */}
        <ellipse cx="29" cy="124" rx="12.5" ry="6.5"
                 fill={`${C}28`} stroke={C} strokeWidth="1.1" />
        <ellipse cx="51" cy="124" rx="12.5" ry="6.5"
                 fill={`${C}28`} stroke={C} strokeWidth="1.1" />
        <path d="M19 120 Q29 117 39 120" stroke={C} strokeWidth="0.9"
              fill="none" opacity="0.55" strokeLinecap="round" />
        <path d="M41 120 Q51 117 61 120" stroke={C} strokeWidth="0.9"
              fill="none" opacity="0.55" strokeLinecap="round" />
      </motion.g>

      {/* ══ HOVER GLOW RINGS ══ */}
      {glowing && (
        <>
          <ellipse cx="40" cy="72" rx="44" ry="66" fill="none"
                   stroke={C} strokeWidth="0.8" opacity="0.20" />
          <ellipse cx="40" cy="72" rx="48" ry="70" fill="none"
                   stroke={P} strokeWidth="0.5" opacity="0.12" />
        </>
      )}

      {/* Static ambient sparkle dots */}
      <circle cx="72" cy="38"  r="1.8" fill={C} opacity="0.50" />
      <circle cx="5"  cy="58"  r="1.4" fill={P} opacity="0.44" />
      <circle cx="76" cy="90"  r="1.2" fill={C} opacity="0.36" />
      <circle cx="3"  cy="100" r="1.5" fill={P} opacity="0.32" />
    </svg>
  );
}

// ── Orbiting sparkle particle ─────────────────────────────────────────────────

interface SparkleProps {
  left: string;
  top: string;
  delay: number;
  color: string;
  size?: number;
}

function Sparkle({ left, top, delay, color, size = 6 }: SparkleProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left, top, width: size, height: size, background: color }}
      animate={{ opacity: [0, 0.9, 0], scale: [0, 1.4, 0], y: [0, -12, -26] }}
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
}

// ── Main floating button ───────────────────────────────────────────────────────

export function FloatingNovaButton({
  onOpen,
  unreadCount = 0,
  isOpen = false,
}: FloatingNovaButtonProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth 3-D mouse-follow tilt
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const rotateY   = useSpring(rawMouseX, { stiffness: 120, damping: 16 });
  const rotateX   = useSpring(rawMouseY, { stiffness: 120, damping: 16 });

  // Delay render until paint is stable
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
          {/* Tooltip — desktop only */}
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

          {/* Ambient sparkles — 6 at organic positions */}
          <Sparkle left="110%"  top="16%"  delay={0}    color={C} size={6} />
          <Sparkle left="-22%"  top="36%"  delay={1.05} color={P} size={5} />
          <Sparkle left="114%"  top="60%"  delay={1.85} color={C} size={4} />
          <Sparkle left="-16%"  top="78%"  delay={0.50} color={P} size={5} />
          <Sparkle left="54%"   top="-8%"  delay={2.30} color={C} size={4} />
          <Sparkle left="-10%"  top="55%"  delay={3.10} color={C} size={3} />

          {/* ── Robot ──
              Dual-axis Lissajous float:
              y (3.4 s) + x (5.7 s) at coprime periods = organic non-repeating path.
              rotateX / rotateY add 3-D mouse-follow tilt on top. */}
          <motion.div
            className="relative w-[60px] h-[97px] sm:w-[76px] sm:h-[124px]"
            animate={{
              y: [0, -10, 0, -7, 0],
              x: [0,   3, 0, -3, 0],
            }}
            transition={{
              y: { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 5.7, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ rotateX, rotateY, transformPerspective: 550 }}
          >
            <FullBodyNovaRobot glowing={hovered} />

            {/* Unread badge */}
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

          {/* Ground shadow — tracks the y-bob */}
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
