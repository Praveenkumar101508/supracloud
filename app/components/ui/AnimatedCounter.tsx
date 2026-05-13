"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix   = "",
  prefix   = "",
  duration = 2000,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Initialise display to the correctly-formatted zero so there is no flicker
  // (e.g. decimals=1 → "0.0", not "0")
  const [display, setDisplay] = useState(() => (0).toFixed(decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip animation when the user has requested reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    // `alive` is a closure-local flag so that:
    //  • RAF callbacks from a previous (cleaned-up) effect do nothing
    //  • React Strict Mode's double-invocation doesn't double-count
    let alive = true;

    function runAnimation() {
      const startTime = performance.now();

      function tick(now: number) {
        if (!alive) return;

        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic: fast start → gentle landing
        const eased    = 1 - Math.pow(1 - progress, 3);

        setDisplay((value * eased).toFixed(decimals));

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          // Snap to the exact final value to eliminate floating-point drift
          setDisplay(value.toFixed(decimals));
        }
      }

      requestAnimationFrame(tick);
    }

    // Native IntersectionObserver — unaffected by framer-motion's scheduler.
    // threshold: 0   → fire as soon as ANY pixel of the element is visible.
    // rootMargin "0px 0px 0px 0px" → exact viewport boundary (no early trigger).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !alive) return;
        // Disconnect first, then animate — prevents double-fire on re-observe
        observer.disconnect();
        runAnimation();
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(el);

    return () => {
      alive = false;      // stop any in-flight RAF ticks
      observer.disconnect();
    };
  }, [value, duration, decimals]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}{display}{suffix}
    </span>
  );
}

export default AnimatedCounter;
