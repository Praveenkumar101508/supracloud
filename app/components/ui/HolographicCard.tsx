"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "cyan" | "purple";
  tilt?: boolean; // enable 3D mouse tilt (desktop only)
  glowOnHover?: boolean;
}

const VARIANTS = {
  default: {
    border:  "rgba(0,245,255,0.2)",
    glow:    "rgba(0,245,255,0.08)",
    shimmer: "linear-gradient(135deg, rgba(0,245,255,0.05) 0%, rgba(139,92,246,0.05) 50%, rgba(0,245,255,0.05) 100%)",
  },
  cyan: {
    border:  "rgba(0,245,255,0.35)",
    glow:    "rgba(0,245,255,0.15)",
    shimmer: "linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(0,191,255,0.05) 100%)",
  },
  purple: {
    border:  "rgba(139,92,246,0.35)",
    glow:    "rgba(139,92,246,0.15)",
    shimmer: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(109,40,217,0.05) 100%)",
  },
};

export function HolographicCard({
  children,
  className = "",
  variant = "default",
  tilt = true,
  glowOnHover = true,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const v = VARIANTS[variant];

  // Mouse tilt values
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const glowX   = useMotionValue(50);
  const glowY   = useMotionValue(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);

    rotateY.set(dx * 8);
    rotateX.set(-dy * 8);
    glowX.set(((e.clientX - rect.left) / rect.width)  * 100);
    glowY.set(((e.clientY - rect.top)  / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${v.glow} 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        background: "rgba(10,10,20,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${v.border}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={glowOnHover ? { scale: 1.015 } : undefined}
      transition={{ scale: { duration: 0.2 } }}
    >
      {/* Dynamic glow overlay */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: glowBackground }}
        />
      )}

      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: v.shimmer }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `inset 0 0 30px ${v.glow}, 0 0 0 1px ${v.border}`,
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default HolographicCard;
