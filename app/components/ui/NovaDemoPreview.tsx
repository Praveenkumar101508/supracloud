"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const MESSAGES = [
  {
    role: "customer" as const,
    text: "My card was declined at the till — can you check my account?",
    delay: 400,
  },
  {
    role: "nova" as const,
    text: "I can see your account is fine. Your card was flagged by our fraud engine — I'm lifting the block now.",
    delay: 1400,
  },
  {
    role: "tool" as const,
    text: "card_block_lifted · fraud_flag_cleared",
    delay: 2200,
  },
  {
    role: "nova" as const,
    text: "Done. Your card is active again. You can tap or chip straight away. Anything else I can sort?",
    delay: 3000,
  },
];

const BUBBLE: Record<"customer" | "nova" | "tool", string> = {
  customer: "ml-auto max-w-[72%] rounded-2xl rounded-br-sm px-3.5 py-2.5 bg-[rgba(0,245,255,0.10)] border border-[rgba(0,245,255,0.18)] text-white/85 text-xs leading-relaxed",
  nova:     "mr-auto max-w-[72%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.2)] text-white/85 text-xs leading-relaxed",
  tool:     "mx-auto text-[10px] font-mono text-[rgba(0,245,255,0.45)] bg-[rgba(0,245,255,0.04)] border border-[rgba(0,245,255,0.08)] rounded-full px-3 py-1",
};

const LABEL: Record<"customer" | "nova" | "tool", string> = {
  customer: "text-right text-[9px] text-white/30 mb-0.5",
  nova:     "text-[9px] text-[rgba(139,92,246,0.6)] mb-0.5",
  tool:     "hidden",
};

type Msg = (typeof MESSAGES)[number];

export function NovaDemoPreview({ className }: { className?: string }) {
  const [visible, setVisible] = useState<Msg[]>([]);
  const [typing,  setTyping]  = useState(false);
  const [started, setStarted] = useState(false);
  const ref   = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);

  const runNext = (msgs: Msg[]) => {
    const idx = idxRef.current;
    if (idx >= msgs.length) {
      // loop — restart after pause
      setTimeout(() => {
        idxRef.current = 0;
        setVisible([]);
        setTyping(false);
        runNext(msgs);
      }, 4000);
      return;
    }
    const msg = msgs[idx];
    setTyping(msg.role === "nova");
    setTimeout(() => {
      setTyping(false);
      setVisible((prev) => [...prev, msg]);
      idxRef.current = idx + 1;
      runNext(msgs);
    }, msg.role === "nova" ? 900 : msg.delay - (msgs[idx - 1]?.delay ?? 0));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          // sequence driven by index + fixed gaps
          let cumDelay = 0;
          MESSAGES.forEach((msg, i) => {
            const gap = i === 0 ? msg.delay : msg.delay - MESSAGES[i - 1].delay;
            const showTyping = msg.role === "nova";
            const typingDelay = cumDelay;
            const revealDelay = cumDelay + (showTyping ? 800 : 0);
            if (showTyping) {
              setTimeout(() => setTyping(true), typingDelay);
            }
            setTimeout(() => {
              setTyping(false);
              setVisible((prev) => [...prev, msg]);
            }, revealDelay + gap);
            cumDelay = revealDelay + gap;
          });
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <div ref={ref} className={cn("w-full max-w-sm mx-auto", className)}>
      {/* Window chrome */}
      <div className="rounded-2xl overflow-hidden border border-[rgba(0,245,255,0.12)] bg-[rgba(5,5,16,0.85)] backdrop-blur-xl shadow-[0_0_60px_rgba(0,245,255,0.06)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
          <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
          <span className="text-[11px] font-semibold text-white/60 tracking-wide">Nova · Live Demo</span>
          <span className="ml-auto text-[10px] text-[rgba(0,245,255,0.4)] font-mono">FCA-aware</span>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[220px]">
          <AnimatePresence>
            {visible.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={LABEL[msg.role]}>
                  {msg.role === "customer" ? "Customer" : msg.role === "nova" ? "Nova" : ""}
                </div>
                <div className={BUBBLE[msg.role]}>{msg.text}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 mr-auto px-3 py-2 rounded-2xl rounded-bl-sm bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.18)]"
              >
                {[0, 1, 2].map((j) => (
                  <motion.span
                    key={j}
                    className="w-1 h-1 rounded-full bg-[rgba(139,92,246,0.7)]"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.04)] flex items-center gap-2">
          <div className="flex-1 h-8 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center px-3">
            <span className="text-white/20 text-[11px]">Ask Nova anything…</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[rgba(0,245,255,0.12)] border border-[rgba(0,245,255,0.2)] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00F5FF" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovaDemoPreview;
