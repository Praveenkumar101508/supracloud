"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { track } from "@/lib/posthog";

const SESSION_KEY = "nova_exit_shown";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 10 || firedRef.current) return;
      firedRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      track("exit_intent_shown");
      setTimeout(() => setOpen(true), 200);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,8,20,0.98)",
                border: "1px solid rgba(0,245,255,0.2)",
                boxShadow: "0 0 80px rgba(0,245,255,0.08), 0 40px 80px rgba(0,0,0,0.8)",
              }}
              initial={{ scale: 0.9, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
            >
              {/* Gradient header bar */}
              <div
                className="h-1"
                style={{
                  background: "linear-gradient(90deg, #00F5FF, #8B5CF6, #0070FF)",
                }}
              />

              {/* Dismiss */}
              <button
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
                           text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors z-10"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="px-8 py-7">
                {/* Nova badge */}
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(0,245,255,0.08)",
                      border: "1px solid rgba(0,245,255,0.22)",
                    }}
                  >
                    <NovaMiniOrb />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#00F5FF]">Nova AI</div>
                    <div className="text-[10px] text-white/30">SupraCloud AI Assistant · Online</div>
                  </div>
                  <span
                    className="ml-auto text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase"
                    style={{
                      background: "rgba(0,245,255,0.08)",
                      color: "#00F5FF",
                      border: "1px solid rgba(0,245,255,0.18)",
                    }}
                  >
                    Live
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-xl font-bold text-white leading-snug mb-2">
                  Before you go — ask Nova
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #00F5FF 0%, #8B5CF6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    one question, free.
                  </span>
                </h2>
                <p className="text-white/45 text-sm leading-relaxed mb-6">
                  No sign-up. No sales call. Just 30 seconds with Nova — ask about deployment
                  timelines, FCA compliance, or what we'd build for your use case.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { v: "72%", l: "Deflection rate" },
                    { v: "6wk", l: "Avg deployment" },
                    { v: "99.9%", l: "Uptime SLA" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="text-center py-3 rounded-xl"
                      style={{
                        background: "rgba(0,245,255,0.04)",
                        border: "1px solid rgba(0,245,255,0.10)",
                      }}
                    >
                      <div className="text-base font-black text-[#00F5FF]">{s.v}</div>
                      <div className="text-[10px] text-white/30 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      close();
                      setTimeout(() => document.dispatchEvent(new CustomEvent("nova:open")), 100);
                    }}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-black transition-all duration-200"
                    style={{
                      background: "#00F5FF",
                      boxShadow: "0 0 24px rgba(0,245,255,0.4)",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 40px rgba(0,245,255,0.65)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 24px rgba(0,245,255,0.4)";
                    }}
                  >
                    Talk to Nova Now — It's Free
                  </button>
                  <Link
                    href="/book"
                    onClick={close}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white/60
                               hover:text-white text-center transition-colors"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    Book a 30-min Discovery Call Instead
                  </Link>
                </div>

                <p className="text-center text-[10px] text-white/20 mt-4">
                  Engineer-led · UK-based · NDA before call · No pressure
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NovaMiniOrb() {
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="url(#eo-g)" />
      <circle cx="16" cy="16" r="6" fill="rgba(0,245,255,0.25)" />
      <circle cx="16" cy="16" r="3" fill="#00F5FF" />
      <defs>
        <radialGradient id="eo-g" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#050510" stopOpacity="0.98" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default ExitIntentModal;
