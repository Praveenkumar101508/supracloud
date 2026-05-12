"use client";

import { useId } from "react";

interface LogoProps {
  /**
   * "light" → white wordmark  (Navbar, Footer — dark backgrounds)
   * "dark"  → navy wordmark   (light-background pages / print)
   */
  variant?: "light" | "dark";
  /** Scale of the geometric mark */
  size?: "sm" | "md" | "lg";
  /** Show the "SupraCloud" wordmark beside the mark */
  showWordmark?: boolean;
  className?: string;
}

const MARK_PX: Record<string, number> = { sm: 28, md: 36, lg: 48 };
const TEXT_CLS: Record<string, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
};

/**
 * SupraCloud — Brand Mark + Wordmark
 *
 * Mark concept: Three ascending rounded data-layer bars rising from
 * bottom-left to top-right, joined by transitional nodes.
 *
 * Symbolism:
 *    Ascending layers  → "Supra" (above & beyond)
 *    Gradient bars     → Cloud architecture tiers (Infra → Platform → Intelligence)
 *    Connecting nodes  → Interconnected services / founding trio S · P · U
 *    Cyan → Emerald    → From established depth to active growth
 */
export default function Logo({
  variant = "light",
  size = "md",
  showWordmark = true,
  className = "",
}: LogoProps) {
  // Unique IDs prevent gradient conflicts when multiple <Logo /> instances share the DOM
  const uid      = useId();
  const gradMain = `sc-gm-${uid}`;
  const gradDim  = `sc-gd-${uid}`;

  const markPx   = MARK_PX[size];
  const wordCls  = variant === "light" ? "text-white" : "text-[#0A192F]";

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>

      {/*  GEOMETRIC MARK  */}
      {/*
        ViewBox 40  40
        
                               Bar 3 (y=5)  — brightest
                                            Node 2 (y=14.5)
                              Bar 2 (y=17) — mid
                                            Node 1 (y=26.5)
                              Bar 1 (y=29)  — receded
        
        Each bar is 22 px wide, 7 px tall, rx 3.5 (fully rounded ends).
        Each bar shifts 9 px right and 12 px up → staircase rising S-path.
      */}
      <svg
        width={markPx}
        height={markPx}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Primary: Cyan → Emerald, left → right */}
          <linearGradient id={gradMain} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Receded: dim teal for the bottom bar */}
          <linearGradient id={gradDim} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#0891B2" stopOpacity="0.50" />
            <stop offset="100%" stopColor="#0891B2" stopOpacity="0.78" />
          </linearGradient>
        </defs>

        {/* Bar 1 — bottom, receded */}
        <rect x="0"  y="29" width="22" height="7" rx="3.5"
          fill={`url(#${gradDim})`} />

        {/* Bar 2 — middle */}
        <rect x="9"  y="17" width="22" height="7" rx="3.5"
          fill={`url(#${gradMain})`} opacity="0.84" />

        {/* Bar 3 — top, most prominent */}
        <rect x="18" y="5"  width="22" height="7" rx="3.5"
          fill={`url(#${gradMain})`} />

        {/* Node 1 — transition point between Bar 1 ↔ Bar 2 */}
        <circle cx="15" cy="26.5" r="2.2"
          fill="#06B6D4" opacity="0.58" />

        {/* Node 2 — transition point between Bar 2 ↔ Bar 3 */}
        <circle cx="24" cy="14.5" r="2.2"
          fill="#10B981" opacity="0.80" />
      </svg>

      {/*  WORDMARK  */}
      {showWordmark && (
        <span
          className={`font-bold tracking-tight leading-none ${TEXT_CLS[size]}`}
          aria-label="SupraCloud"
        >
          {/* "Supra" — white on dark backgrounds, navy on light */}
          <span className={wordCls}>Supra</span>
          {/* "Cloud" — electric cyan accent, consistent with the mark */}
          <span className="text-[#22D3EE]">Cloud</span>
        </span>
      )}
    </div>
  );
}
