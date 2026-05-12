"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { useAIState } from "../context/AIState";

const BOOT_LINES = [
  "> Establishing encrypted connection [TLS 1.3]...",
  "> Loading Nova AI agent runtime...",
  "> Connecting to knowledge base [FCA · GDPR · ISO 27001]...",
  "> Verifying compliance controls + RAG pipeline...",
  "> Prompt injection hardening active...",
  "> All systems operational. Nova is ready. ✓",
];

export function BootOverlay() {
  const { setBooted } = useAIState();
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("sc_booted");
      if (seen) { setBooted(true); return; }
    } catch {}

    setVisible(true);
    BOOT_LINES.forEach((_, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, BOOT_LINES[i]]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setReady(true), 500);
        }
      }, 400 + i * 550);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function initialize() {
    setDismissed(true);
    try { sessionStorage.setItem("sc_booted", "1"); } catch {}
    setTimeout(() => setBooted(true), 700);
  }

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#020202",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Radial glow background */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,112,255,0.06) 0%, transparent 70%)",
          }} />

          <div style={{ textAlign: "center", maxWidth: 460, width: "100%", padding: "0 24px", position: "relative" }}>
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40 }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, #00F5FF, #00C8E0)",
                boxShadow: "0 0 40px rgba(0,112,255,0.6), 0 0 80px rgba(0,112,255,0.2)",
              }}>
                <Bot size={28} color="#fff" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                Supra<span style={{ color: "#00F5FF" }}>Cloud</span>
              </span>
            </motion.div>

            {/* Terminal window */}
            <div style={{
              background: "#080808",
              border: "1px solid rgba(0,112,255,0.2)",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 20,
            }}>
              {/* Terminal bar */}
              <div style={{
                height: 36, background: "#0d0d0d",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", padding: "0 14px", gap: 6,
              }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
                <span style={{ marginLeft: 10, fontSize: 11, color: "#4B5563", fontFamily: "monospace" }}>supracloud-agent-runtime</span>
              </div>

              {/* Boot lines */}
              <div style={{ padding: "16px 20px", minHeight: 160, textAlign: "left" }}>
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: "monospace",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: i === lines.length - 1 && i === BOOT_LINES.length - 1
                        ? "#22C55E"
                        : "#00C8E0",
                      marginBottom: 4,
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
                {lines.length < BOOT_LINES.length && (
                  <span style={{ fontFamily: "monospace", fontSize: 13, color: "#00C8E0" }}>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >▋</motion.span>
                  </span>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              background: "rgba(0,112,255,0.08)",
              borderRadius: 4, height: 3, marginBottom: 32,
              border: "1px solid rgba(0,112,255,0.1)",
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(90deg, #00F5FF, #00C8E0)", borderRadius: 4 }}
              />
            </div>

            {/* Initialize button */}
            <AnimatePresence>
              {ready && (
                <motion.button
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={initialize}
                  style={{
                    background: "#00F5FF",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px 44px",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: "0 0 32px rgba(0,112,255,0.5)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 48px rgba(0,112,255,0.7)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Initialise Nova →
                </motion.button>
              )}
            </AnimatePresence>

            <p style={{ marginTop: 20, fontSize: 11, color: "#374151", letterSpacing: "0.05em" }}>
              Powered by Nova AI · Enterprise Platform · UK-Based · FCA Aligned
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
