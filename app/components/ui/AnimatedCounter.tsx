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
  suffix = "",
  prefix = "",
  duration = 2000,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref     = useRef<HTMLSpanElement>(null);
  const firedRef = useRef(false);
  const rafRef   = useRef<number | null>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    function startAnimation() {
      if (firedRef.current) return;
      firedRef.current = true;

      const startTime = performance.now();

      function tick(now: number) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic — fast start, gentle finish
        const eased    = 1 - Math.pow(1 - progress, 3);
        setDisplay((value * eased).toFixed(decimals));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(value.toFixed(decimals)); // snap to exact final value
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    // Use a native IntersectionObserver — more reliable than framer useInView
    // when the counter lives inside motion.div initial={{ opacity:0 }} containers.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          startAnimation();
        }
      },
      {
        // Fire as soon as any pixel of the element enters the viewport
        threshold: 0,
        rootMargin: "0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
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
