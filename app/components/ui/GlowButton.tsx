"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: "cyan" | "purple" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  icon?: ReactNode;
}

const VARIANT_STYLES = {
  cyan: {
    base:  "bg-[#00F5FF] text-black font-bold",
    glow:  "rgba(0,245,255,0.5)",
    hover: "rgba(0,245,255,0.3)",
    shadow:"0 0 20px rgba(0,245,255,0.4), 0 4px 15px rgba(0,0,0,0.3)",
  },
  purple: {
    base:  "bg-[#8B5CF6] text-white font-bold",
    glow:  "rgba(139,92,246,0.5)",
    hover: "rgba(139,92,246,0.3)",
    shadow:"0 0 20px rgba(139,92,246,0.4), 0 4px 15px rgba(0,0,0,0.3)",
  },
  outline: {
    base:  "bg-transparent text-[#00F5FF] font-semibold border border-[#00F5FF]/40",
    glow:  "rgba(0,245,255,0.15)",
    hover: "rgba(0,245,255,0.08)",
    shadow:"0 0 12px rgba(0,245,255,0.2), inset 0 0 12px rgba(0,245,255,0.05)",
  },
};

const SIZE_STYLES = {
  sm: "px-4 py-2 text-sm rounded-lg min-h-[36px]",
  md: "px-6 py-3 text-base rounded-xl min-h-[44px]",
  lg: "px-8 py-4 text-lg rounded-xl min-h-[52px]",
};

export function GlowButton({
  children,
  onClick,
  variant = "cyan",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
  icon,
}: GlowButtonProps) {
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [particles, setParticles] = useState<number[]>([]);
  const v = VARIANT_STYLES[variant];

  const handleClick = async () => {
    if (!onClick || loading || disabled) return;
    setLoading(true);
    try {
      await onClick();
      setSuccess(true);
      // Micro-confetti burst
      setParticles(Array.from({ length: 8 }, (_, i) => i));
      setTimeout(() => {
        setParticles([]);
        setSuccess(false);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : "inline-flex"}`}>
      {/* Confetti particles */}
      <AnimatePresence>
        {particles.map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-50"
            style={{
              background: i % 2 === 0 ? "#00F5FF" : "#8B5CF6",
              top: "50%",
              left: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: (Math.cos((i / 8) * Math.PI * 2) * 60),
              y: (Math.sin((i / 8) * Math.PI * 2) * 60) - 20,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      <motion.button
        type={type}
        disabled={disabled || loading}
        onClick={handleClick}
        className={[
          "relative overflow-hidden flex items-center justify-center gap-2 transition-all duration-200 select-none",
          v.base,
          SIZE_STYLES[size],
          fullWidth ? "w-full" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className,
        ].join(" ")}
        style={{ boxShadow: disabled ? "none" : v.shadow }}
        whileHover={disabled ? {} : { scale: 1.03, boxShadow: `0 0 30px ${v.glow}, 0 6px 20px rgba(0,0,0,0.4)` }}
        whileTap={disabled ? {} : { scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        {/* Hover shimmer */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${v.hover}, transparent)` }}
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loading"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Processing...
            </motion.span>
          ) : success ? (
            <motion.span
              key="success"
              className="flex items-center gap-2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </svg>
              Done!
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="flex items-center gap-2 relative z-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {icon && <span className="shrink-0">{icon}</span>}
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default GlowButton;
