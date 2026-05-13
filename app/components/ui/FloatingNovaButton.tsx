"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

interface FloatingNovaButtonProps {
  onOpen: () => void;
  unreadCount?: number;
  isOpen?: boolean;
}

// ── Full-body female robot SVG ─────────────────────────────────────────────────

function FullBodyNovaRobot({ glowing = false }: { glowing?: boolean }) {
  const c = "#00F5FF";
  const p = "#8B5CF6";

  return (
    <svg
      width="54"
      height="88"
      viewBox="0 0 54 90"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="fab-head" cx="38%" cy="28%" r="65%">
          <stop offset="0%" stopColor={c} stopOpacity="0.28" />
          <stop offset="100%" stopColor="#030312" stopOpacity="0.98" />
        </radialGradient>
        <radialGradient id="fab-body" cx="38%" cy="25%" r="70%">
          <stop offset="0%" stopColor={p} stopOpacity="0.22" />
          <stop offset="100%" stopColor="#030312" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="fab-leg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0.2" />
          <stop offset="100%" stopColor="#030312" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="fab-arm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c} stopOpacity="0.18" />
          <stop offset="100%" stopColor={c} stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Antenna */}
      <line x1="27" y1="2" x2="27" y2="9" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
      <circle cx="27" cy="1.5" r="2.3" fill={c} opacity={glowing ? 1 : 0.8} />

      {/* Head */}
      <ellipse cx="27" cy="19" rx="14" ry="15" fill="url(#fab-head)" stroke={c} strokeWidth="1.3" opacity="0.97" />

      {/* Left eye */}
      <ellipse cx="21" cy="17" rx="5" ry="5.5" fill={`${c}1A`} stroke={c} strokeWidth="1.1" />
      <circle cx="21" cy="17" r="2.8" fill={c} opacity="0.95" />
      <circle cx="22.3" cy="15.2" r="1.1" fill="white" opacity="0.75" />

      {/* Right eye */}
      <ellipse cx="33" cy="17" rx="5" ry="5.5" fill={`${c}1A`} stroke={c} strokeWidth="1.1" />
      <circle cx="33" cy="17" r="2.8" fill={c} opacity="0.95" />
      <circle cx="34.3" cy="15.2" r="1.1" fill="white" opacity="0.75" />

      {/* Smile */}
      <path d="M19.5 26 Q27 31.5 34.5 26" stroke={c} strokeWidth="1.7" strokeLinecap="round" fill="none" opacity="0.9" />

      {/* Blush cheeks */}
      <ellipse cx="12" cy="21" rx="4.5" ry="2.8" fill="rgba(255,110,190,0.28)" />
      <ellipse cx="42" cy="21" rx="4.5" ry="2.8" fill="rgba(255,110,190,0.28)" />

      {/* Neck */}
      <rect x="23" y="33.5" width="8" height="5.5" rx="2.5" fill={`${c}30`} stroke={c} strokeWidth="0.7" opacity="0.9" />

      {/* Body — feminine silhouette */}
      <path
        d="M11 39 Q8 50 10 62 Q19 66 27 66 Q35 66 44 62 Q46 50 43 39 Q36 34 27 34 Q18 34 11 39 Z"
        fill="url(#fab-body)"
        stroke={p}
        strokeWidth="1.1"
        opacity="0.97"
      />

      {/* Chest gem */}
      <circle cx="27" cy="46" r="5" fill={`${p}2A`} stroke={p} strokeWidth="0.9" />
      <circle cx="27" cy="46" r="2.4" fill={p} opacity="0.75" />
      <circle cx="28.2" cy="44.6" r="0.9" fill="white" opacity="0.55" />

      {/* Waist line detail */}
      <path d="M13 58 Q27 61 41 58" stroke={`${c}55`} strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Body dots */}
      <circle cx="22" cy="55" r="1.3" fill={`${c}60`} />
      <circle cx="27" cy="55" r="1.3" fill={`${c}60`} />
      <circle cx="32" cy="55" r="1.3" fill={`${c}60`} />

      {/* Left arm */}
      <rect x="2" y="39" width="8" height="22" rx="4" fill="url(#fab-arm)" stroke={c} strokeWidth="0.9" opacity="0.88" />
      <ellipse cx="6" cy="62" rx="4.5" ry="3.2" fill={`${c}22`} stroke={c} strokeWidth="0.8" opacity="0.85" />

      {/* Right arm */}
      <rect x="44" y="39" width="8" height="22" rx="4" fill="url(#fab-arm)" stroke={c} strokeWidth="0.9" opacity="0.88" />
      <ellipse cx="48" cy="62" rx="4.5" ry="3.2" fill={`${c}22`} stroke={c} strokeWidth="0.8" opacity="0.85" />

      {/* Cape / soft ribbon trails */}
      <path d="M11 44 Q4 58 8 73" stroke={p} strokeWidth="2" fill="none" opacity="0.28" strokeLinecap="round" />
      <path d="M43 44 Q50 58 46 73" stroke={p} strokeWidth="2" fill="none" opacity="0.28" strokeLinecap="round" />

      {/* Left leg */}
      <rect x="16" y="66" width="10" height="19" rx="5" fill="url(#fab-leg)" stroke={c} strokeWidth="0.9" opacity="0.95" />
      <ellipse cx="21" cy="85" rx="7.5" ry="4" fill={`${c}2A`} stroke={c} strokeWidth="0.8" />

      {/* Right leg */}
      <rect x="28" y="66" width="10" height="19" rx="5" fill="url(#fab-leg)" stroke={c} strokeWidth="0.9" opacity="0.95" />
      <ellipse cx="33" cy="85" rx="7.5" ry="4" fill={`${c}2A`} stroke={c} strokeWidth="0.8" />

      {/* Outer glow ring (visible when glowing) */}
      {glowing && (
        <ellipse cx="27" cy="45" rx="22" ry="30" fill="none" stroke={c} strokeWidth="0.5" opacity="0.15" />
      )}
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function FloatingNovaButton({
  onOpen,
  unreadCount = 0,
  isOpen = false,
}: FloatingNovaButtonProps) {
  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const containerRef            = useRef<HTMLDivElement>(null);

  // Smooth mouse-follow tilt via MotionValues + springs
  const rawMouseX  = useMotionValue(0);
  const rawMouseY  = useMotionValue(0);
  const rotateY    = useSpring(rawMouseX, { stiffness: 140, damping: 18 });
  const rotateX    = useSpring(rawMouseY, { stiffness: 140, damping: 18 });

  // Fade in after page load settles
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Global mouse-follow when hovered (desktop only)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    rawMouseX.set((e.clientX - cx) / 14);   // rotateY
    rawMouseY.set((e.clientY - cy) / -14);  // rotateX (inverted)
  }, [rawMouseX, rawMouseY]);

  useEffect(() => {
    if (!hovered) {
      rawMouseX.set(0);
      rawMouseY.set(0);
      return;
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hovered, handleMouseMove, rawMouseX, rawMouseY]);

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          ref={containerRef}
          className="fixed bottom-4 right-5 z-[100] flex flex-col items-center cursor-pointer select-none"
          initial={{ opacity: 0, scale: 0.5, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 32 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
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
          {/* Tooltip — desktop only, appears to the left */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 hidden sm:flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold text-black bg-[#00F5FF] whitespace-nowrap pointer-events-none z-10"
                style={{ boxShadow: "0 0 18px rgba(0,245,255,0.55)" }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.16 }}
              >
                Talk to Nova
                <span
                  className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-[#00F5FF]"
                  aria-hidden
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating robot — bobs up/down + mouse-follow tilt */}
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ rotateX, rotateY, transformPerspective: 500 }}
          >
            <FullBodyNovaRobot glowing={hovered} />
          </motion.div>

          {/* Ground glow shadow — pulses in sync with bob */}
          <motion.div
            className="w-10 h-2.5 rounded-full -mt-1"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,245,255,0.42) 0%, transparent 70%)",
            }}
            animate={{ scaleX: [1, 0.68, 1], opacity: [0.65, 0.22, 0.65] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Unread badge */}
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                className="absolute top-0 right-0 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1 pointer-events-none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                aria-label={`${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingNovaButton;
