"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useAIState } from "../context/AIState";

const BAR_COUNT = 28;

function makeBars(speaking: boolean, listening: boolean, tick: number): number[] {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    if (speaking) {
      const wave = Math.abs(Math.sin(i * 0.65 + tick * 0.12)) * 40;
      const noise = Math.abs(Math.sin(i * 1.8 + tick * 0.31)) * 18;
      return Math.max(4, wave + noise);
    }
    if (listening) {
      const wave = Math.abs(Math.sin(i * 0.5 + tick * 0.06)) * 22;
      return Math.max(3, wave + 4);
    }
    return 3 + Math.abs(Math.sin(i * 0.4 + tick * 0.02)) * 9;
  });
}

export function AIHub() {
  const { agentSpeaking, agentListening } = useAIState();
  const tickRef = useRef(0);
  const [bars, setBars] = useState(() => makeBars(false, false, 0));

  useEffect(() => {
    const ms = agentSpeaking ? 70 : agentListening ? 130 : 900;
    const id = setInterval(() => {
      tickRef.current += 1;
      setBars(makeBars(agentSpeaking, agentListening, tickRef.current));
    }, ms);
    return () => clearInterval(id);
  }, [agentSpeaking, agentListening]);

  const glow = agentSpeaking
    ? "0 0 60px rgba(0,112,255,0.9), 0 0 120px rgba(0,112,255,0.35)"
    : agentListening
    ? "0 0 40px rgba(0,112,255,0.65), 0 0 80px rgba(0,112,255,0.2)"
    : "0 0 24px rgba(0,112,255,0.4)";

  const pulseScale = agentSpeaking ? [1, 1.06, 1] : [1, 1.02, 1];
  const pulseDuration = agentSpeaking ? 0.45 : 2.5;

  const statusColor = agentSpeaking ? "#3B8EFF" : agentListening ? "#22C55E" : "#374151";
  const statusLabel = agentSpeaking ? "Speaking" : agentListening ? "Listening" : "Standby";
  const statusDot = agentSpeaking || agentListening ? "●" : "○";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
      {/* Central orb */}
      <div style={{ position: "relative" }}>
        {/* Pulse rings when speaking */}
        {agentSpeaking && [0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: 120, height: 120,
              marginLeft: -60, marginTop: -60,
              borderRadius: "50%",
              border: "1px solid rgba(0,112,255,0.5)",
            }}
            animate={{ scale: [1, 1.8 + i * 0.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
          />
        ))}

        {/* Listening ring */}
        {agentListening && (
          <motion.div
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: 120, height: 120,
              marginLeft: -60, marginTop: -60,
              borderRadius: "50%",
              border: "2px solid rgba(34,197,94,0.5)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Orb */}
        <motion.div
          animate={{ scale: pulseScale }}
          transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 120, height: 120, borderRadius: "50%",
            background: "linear-gradient(135deg, #0070FF 0%, #3B8EFF 60%, #60A5FA 100%)",
            boxShadow: glow,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Bot size={50} color="#fff" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Waveform bars */}
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 56, width: 280 }}>
        {bars.map((h, i) => {
          const mid = BAR_COUNT / 2;
          const dist = Math.abs(i - mid) / mid;
          const opacity = 0.3 + (1 - dist) * 0.65;
          return (
            <motion.div
              key={i}
              animate={{ height: Math.max(3, h) }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                flex: 1, borderRadius: 2,
                background: i % 3 === 0 ? "#0070FF" : i % 3 === 1 ? "#3B8EFF" : "#60A5FA",
                opacity,
                minWidth: 3,
              }}
            />
          );
        })}
      </div>

      {/* Status */}
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: statusColor,
        transition: "color 0.4s",
      }}>
        {statusDot} {statusLabel}
      </p>
    </div>
  );
}
