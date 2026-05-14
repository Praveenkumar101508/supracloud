"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { track } from "@/lib/posthog";

const STATS = ["72% query deflection", "6-week deployment", "Zero data exfiltration"];

export function StickyScrollCTA() {
  const [visible, setVisible] = useState(false);
  const [statIdx, setStatIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setStatIdx((i) => (i + 1) % STATS.length), 3000);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[80] flex items-center justify-between
                     gap-3 px-4 sm:px-8 py-3"
          style={{
            background: "rgba(5,5,16,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(0,245,255,0.12)",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
          }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        >
          {/* Live stat rotator */}
          <div className="hidden sm:flex items-center gap-2 min-w-0 flex-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={statIdx}
                className="text-xs font-semibold text-white/50 whitespace-nowrap"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                SupraCloud delivers&nbsp;
                <span className="text-[#00F5FF]">{STATS[statIdx]}</span>
              </motion.span>
            </AnimatePresence>
          </div>

          {/* CTA cluster */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => {
                track("sticky_cta_clicked", { cta: "try_nova" });
                document.dispatchEvent(new CustomEvent("nova:open"));
              }}
              className="text-xs font-semibold text-white/50 hover:text-[#00F5FF] transition-colors hidden sm:block"
            >
              Try Nova free
            </button>
            <Link
              href="/book"
              onClick={() => track("sticky_cta_clicked", { cta: "book_call" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black
                         transition-all duration-200"
              style={{
                background: "#00F5FF",
                boxShadow: "0 0 20px rgba(0,245,255,0.4)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
              Book Discovery Call
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyScrollCTA;
