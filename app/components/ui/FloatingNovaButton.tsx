"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingNovaButtonProps {
  onOpen: () => void;
  unreadCount?: number;
  isOpen?: boolean;
}

export function FloatingNovaButton({
  onOpen,
  unreadCount = 0,
  isOpen = false,
}: FloatingNovaButtonProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Fade in after a short delay so it doesn't clash with page load animations
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {/* Tooltip label — hidden on mobile (sm:flex) */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="hidden sm:flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-black bg-[#00F5FF] shadow-lg whitespace-nowrap"
                style={{ boxShadow: "0 0 20px rgba(0,245,255,0.5)" }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.18 }}
              >
                Talk to Nova
                {/* Arrow */}
                <span
                  className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-[#00F5FF]"
                  aria-hidden
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB button */}
          <motion.button
            onClick={onOpen}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            aria-label="Talk to Nova — SupraCloud AI assistant"
            className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00F5FF] focus-visible:outline-offset-2"
            style={{
              background: "radial-gradient(circle at 35% 35%, #00F5FF, #0088BB)",
              boxShadow: "0 0 24px rgba(0,245,255,0.5), 0 4px 20px rgba(0,0,0,0.4)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Pulse rings */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#00F5FF]/50 pointer-events-none"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#00F5FF]/30 pointer-events-none"
              animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
            />

            {/* Nova neural orb icon */}
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
              <circle cx="16" cy="16" r="8"  fill="rgba(0,0,0,0.35)" />
              <circle cx="16" cy="16" r="4"  fill="rgba(0,0,0,0.6)" />
              <circle cx="16" cy="16" r="2"  fill="black" />
              <circle cx="16" cy="8"  r="2"  fill="black" opacity="0.8" />
              <circle cx="16" cy="24" r="2"  fill="black" opacity="0.8" />
              <circle cx="8"  cy="16" r="2"  fill="black" opacity="0.8" />
              <circle cx="24" cy="16" r="2"  fill="black" opacity="0.8" />
              <line x1="16" y1="13" x2="16" y2="10" stroke="black" strokeWidth="1.5" opacity="0.7" />
              <line x1="16" y1="22" x2="16" y2="19" stroke="black" strokeWidth="1.5" opacity="0.7" />
              <line x1="10" y1="16" x2="13" y2="16" stroke="black" strokeWidth="1.5" opacity="0.7" />
              <line x1="19" y1="16" x2="22" y2="16" stroke="black" strokeWidth="1.5" opacity="0.7" />
            </svg>

            {/* Unread badge */}
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  aria-label={`${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingNovaButton;
