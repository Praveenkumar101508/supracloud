"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── CVA definitions ───────────────────────────────────────────────────────────
const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center gap-2 font-bold select-none transition-colors duration-200",
  {
    variants: {
      variant: {
        cyan:    "bg-[var(--cyan)] text-black shadow-[0_0_20px_var(--cyan-glow),0_4px_15px_rgba(0,0,0,0.3)]",
        purple:  "bg-[var(--purple)] text-white shadow-[0_0_20px_var(--purple-glow),0_4px_15px_rgba(0,0,0,0.3)]",
        outline: "bg-transparent text-[var(--cyan)] border border-[var(--cyan)]/40 shadow-[0_0_12px_var(--cyan-glow-lg)]",
      },
      size: {
        sm: "px-4  py-2   text-xs  rounded-lg  min-h-[36px]",
        md: "px-6  py-3   text-sm  rounded-xl  min-h-[44px]",
        lg: "px-8  py-4   text-sm  rounded-xl  min-h-[52px]",
      },
    },
    defaultVariants: { variant: "cyan", size: "md" },
  }
);

// Hover shimmer overlay colour per variant
const SHIMMER_COLOR: Record<string, string> = {
  cyan:    "rgba(0,245,255,0.3)",
  purple:  "rgba(139,92,246,0.3)",
  outline: "rgba(0,245,255,0.08)",
};

const HOVER_GLOW: Record<string, string> = {
  cyan:    "0 0 30px rgba(0,245,255,0.6), 0 6px 20px rgba(0,0,0,0.4)",
  purple:  "0 0 30px rgba(139,92,246,0.6), 0 6px 20px rgba(0,0,0,0.4)",
  outline: "0 0 20px rgba(0,245,255,0.25), 0 4px 12px rgba(0,0,0,0.3)",
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface GlowButtonProps extends VariantProps<typeof buttonVariants> {
  children:   ReactNode;
  href?:      string;
  onClick?:   () => void | Promise<void>;
  disabled?:  boolean;
  className?: string;
  type?:      "button" | "submit" | "reset";
  fullWidth?: boolean;
  icon?:      ReactNode;
}

// ── Shared inner content ──────────────────────────────────────────────────────
function ButtonInner({
  variant = "cyan",
  size = "md",
  disabled,
  className,
  loading,
  success,
  particles,
  children,
  icon,
  motionProps,
  onClickHandler,
  type,
  fullWidth,
}: {
  variant?:        GlowButtonProps["variant"];
  size?:           GlowButtonProps["size"];
  disabled?:       boolean;
  className?:      string;
  loading:         boolean;
  success:         boolean;
  particles:       number[];
  children:        ReactNode;
  icon?:           ReactNode;
  motionProps:     Record<string, unknown>;
  onClickHandler?: () => void;
  type?:           "button" | "submit" | "reset";
  fullWidth?:      boolean;
}) {
  const vKey = variant ?? "cyan";

  return (
    <>
      <AnimatePresence>
        {particles.map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-50"
            style={{
              background: i % 2 === 0 ? "var(--cyan)" : "var(--purple)",
              top: "50%", left: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((i / 8) * Math.PI * 2) * 60,
              y: Math.sin((i / 8) * Math.PI * 2) * 60 - 20,
              opacity: 0, scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      <motion.button
        type={type ?? "button"}
        disabled={disabled || loading}
        onClick={onClickHandler}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth ? "w-full" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}
        {...motionProps}
      >
        {/* Hover shimmer sweep */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(90deg,transparent,${SHIMMER_COLOR[vKey]},transparent)` }}
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span key="loading" className="flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Processing...
            </motion.span>
          ) : success ? (
            <motion.span key="success" className="flex items-center gap-2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }} />
              </svg>
              Done!
            </motion.span>
          ) : (
            <motion.span key="idle" className="flex items-center gap-2 relative z-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {icon && <span className="shrink-0">{icon}</span>}
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function GlowButton({
  children,
  href,
  onClick,
  variant = "cyan",
  size    = "md",
  disabled,
  className,
  type,
  fullWidth,
  icon,
}: GlowButtonProps) {
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const vKey = variant ?? "cyan";

  const motionProps = {
    whileHover:  disabled ? {} : { scale: 1.03, boxShadow: HOVER_GLOW[vKey] },
    whileTap:    disabled ? {} : { scale: 0.97 },
    transition:  { duration: 0.15 },
  };

  const handleClick = async () => {
    if (!onClick || loading || disabled) return;
    setLoading(true);
    try {
      await onClick();
      setSuccess(true);
      setParticles(Array.from({ length: 8 }, (_, i) => i));
      setTimeout(() => { setParticles([]); setSuccess(false); }, 1500);
    } finally {
      setLoading(false);
    }
  };

  // Link mode — wrap in Next.js Link, button handles only non-navigation actions
  if (href) {
    return (
      <Link href={href} className={cn("relative", fullWidth ? "w-full block" : "inline-flex")}>
        <ButtonInner
          variant={variant} size={size} disabled={disabled} className={className}
          loading={loading} success={success} particles={particles}
          icon={icon} motionProps={motionProps} fullWidth={fullWidth}
        >
          {children}
        </ButtonInner>
      </Link>
    );
  }

  return (
    <div className={cn("relative", fullWidth ? "w-full" : "inline-flex")}>
      <ButtonInner
        variant={variant} size={size} disabled={disabled} className={className}
        loading={loading} success={success} particles={particles}
        icon={icon} motionProps={motionProps} onClickHandler={handleClick}
        type={type} fullWidth={fullWidth}
      >
        {children}
      </ButtonInner>
    </div>
  );
}

export default GlowButton;
