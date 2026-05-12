"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── CVA variant definitions ───────────────────────────────────────────────────
const cardVariants = cva("holo-base relative", {
  variants: {
    variant: {
      default: "holo-default",
      cyan:    "holo-cyan",
      purple:  "holo-purple",
    },
  },
  defaultVariants: { variant: "default" },
});

// ── Glow colours per variant (dynamic — must stay in JS) ─────────────────────
const GLOW: Record<string, { spot: string; shimmer: string; ring: string }> = {
  default: {
    spot:    "rgba(0,245,255,0.08)",
    shimmer: "linear-gradient(135deg,rgba(0,245,255,0.05) 0%,rgba(139,92,246,0.05) 50%,rgba(0,245,255,0.05) 100%)",
    ring:    "rgba(0,245,255,0.12)",
  },
  cyan: {
    spot:    "rgba(0,245,255,0.15)",
    shimmer: "linear-gradient(135deg,rgba(0,245,255,0.10) 0%,rgba(0,191,255,0.05) 100%)",
    ring:    "rgba(0,245,255,0.18)",
  },
  purple: {
    spot:    "rgba(139,92,246,0.15)",
    shimmer: "linear-gradient(135deg,rgba(139,92,246,0.10) 0%,rgba(109,40,217,0.05) 100%)",
    ring:    "rgba(139,92,246,0.18)",
  },
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface HolographicCardProps extends VariantProps<typeof cardVariants> {
  children:     ReactNode;
  className?:   string;
  tilt?:        boolean;
  glowOnHover?: boolean;
  style?:       React.CSSProperties;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function HolographicCard({
  children,
  className,
  variant = "default",
  tilt = true,
  glowOnHover = true,
  style,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const g = GLOW[variant ?? "default"];

  // 3D tilt — inherently dynamic, must be motion values
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const glowX   = useMotionValue(50);
  const glowY   = useMotionValue(50);

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${g.spot} 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    rotateY.set(dx *  8);
    rotateX.set(dy * -8);
    glowX.set(((e.clientX - rect.left) / rect.width)  * 100);
    glowY.set(((e.clientY - rect.top)  / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(cardVariants({ variant }), className)}
      // Only motion values here — no static colour strings
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={glowOnHover ? { scale: 1.015 } : undefined}
      transition={{ scale: { duration: 0.2 } }}
    >
      {/* Radial spot glow — position is dynamic, must be motion value */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: glowBackground }}
        />
      )}

      {/* Shimmer overlay — static gradient, driven by CSS hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: g.shimmer }}
      />

      {/* Pulsing inner ring */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 30px ${g.ring}` }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default HolographicCard;
