"use client";

import { useState, useCallback } from "react";

type MascotState = "idle" | "listening" | "thinking" | "speaking";

const BUBBLE_TEXT: Record<MascotState, string> = {
  idle:      "Hi! I'm Nova — your AI career guide. Click 'Ask Nova' to get started!",
  listening: "I'm listening… go ahead and ask!",
  thinking:  "Analysing your query…",
  speaking:  "The Full Accelerator is our most popular path to senior Data & AI roles!",
};

export default function MascotVoiceHub() {
  const [state, setState] = useState<MascotState>("idle");
  const [open, setOpen]   = useState(false);

  const handleActivate = useCallback(() => {
    if (state !== "idle") return;
    setState("listening");
    setTimeout(() => setState("thinking"),  2800);
    setTimeout(() => setState("speaking"),  5000);
    setTimeout(() => setState("idle"),      8500);
  }, [state]);

  const borderColor = state === "listening" ? "#FF6B35" : "#00F5FF";
  const glowColor   = state === "listening"
    ? "0 0 20px rgba(255,107,53,0.5)"
    : "0 0 16px rgba(0,245,255,0.35)";

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 select-none">

      {/* ── Speech Bubble ── */}
      {open && (
        <div
          className="animate-slide-up rounded-2xl p-4 max-w-[230px] text-sm leading-relaxed"
          style={{
            background:     "rgba(11,14,20,0.96)",
            border:         "1px solid rgba(0,245,255,0.22)",
            backdropFilter: "blur(18px)",
            color:          "#e2e8f0",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="float-right ml-2 -mt-0.5 text-slate-500 hover:text-white transition-colors text-xs leading-none"
            aria-label="Close assistant"
          >
            ✕
          </button>

          {/* Message */}
          <p className="pr-4">{BUBBLE_TEXT[state]}</p>

          {/* Soundwave — listening */}
          {state === "listening" && <SoundwaveBar color="#FF6B35" bars={14} />}

          {/* Thinking dots */}
          {state === "thinking" && (
            <div className="flex gap-1 mt-3 justify-center">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  style={{
                    animation:      "soundbar 0.7s ease-in-out infinite",
                    animationDelay: `${i * 0.18}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Soundwave — speaking */}
          {state === "speaking" && <SoundwaveBar color="#00F5FF" bars={14} />}

          {/* CTA — idle only */}
          {state === "idle" && (
            <button
              onClick={handleActivate}
              className="mt-3 w-full py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-110"
              style={{
                background:  "rgba(0,245,255,0.12)",
                color:       "#00F5FF",
                border:      "1px solid rgba(0,245,255,0.28)",
              }}
            >
              Ask Nova ↗
            </button>
          )}
        </div>
      )}

      {/* ── Mascot Button ── */}
      <button
        onClick={() => { setOpen(o => !o); if (!open) return; handleActivate(); }}
        aria-label="Open AI assistant Nova"
        className="relative w-[68px] h-[68px] rounded-full transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{
          background:  "#0B0E14",
          border:      `2px solid ${borderColor}`,
          boxShadow:   glowColor,
          transition:  "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <NovaSVG state={state} />

        {/* Listening ping ring */}
        {state === "listening" && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              border:    "2px solid #FF6B35",
              animation: "ping-ring 1.4s ease-out infinite",
            }}
          />
        )}
      </button>
    </div>
  );
}

/* ── Soundwave bars ───────────────────────────────────── */
function SoundwaveBar({ color, bars }: { color: string; bars: number }) {
  return (
    <div className="flex items-center gap-px h-6 mt-3 justify-center">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={{
            display:        "block",
            width:          "2px",
            height:         "100%",
            background:     color,
            borderRadius:   "2px",
            transform:      "scaleY(0.2)",
            animation:      "soundbar 0.6s ease-in-out infinite",
            animationDelay: `${(i * 40) % 300}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Nova SVG Mascot ──────────────────────────────────── */
function NovaSVG({ state }: { state: MascotState }) {
  const isListening = state === "listening";
  const isThinking  = state === "thinking";
  const isSpeaking  = state === "speaking";

  const mouthD = {
    idle:      "M 23 43 Q 32 50 41 43",
    listening: "M 26 41 Q 32 49 38 41",
    thinking:  "M 25 44 L 39 44",
    speaking:  "M 22 42 Q 32 52 42 42",
  }[state];

  return (
    <svg viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full p-1 ${state === "idle" ? "animate-float" : ""}`}
    >
      {/* State glow halo */}
      {(isListening || isSpeaking) && (
        <circle cx="32" cy="34" r="30"
          fill={isListening ? "rgba(255,107,53,0.08)" : "rgba(0,245,255,0.08)"}
          style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }}
        />
      )}
      {isThinking && (
        <circle cx="32" cy="34" r="30" fill="rgba(0,245,255,0.05)"
          style={{ animation: "orange-pulse 1.8s ease-in-out infinite" }}
        />
      )}

      {/* Antenna stem */}
      <line x1="32" y1="6" x2="32" y2="15"
        stroke="#00F5FF" strokeWidth="1.5" strokeLinecap="round" />
      {/* Antenna tip */}
      <circle cx="32" cy="4" r="3.5" fill="#FF6B35" className="antenna-blink" />
      <circle cx="32" cy="4" r="1.5" fill="white" className="antenna-blink" />

      {/* Head */}
      <circle cx="32" cy="32" r="20" fill="#161B27" stroke="#00F5FF" strokeWidth="1.5" />

      {/* Eyes — normal (idle / listening / speaking) */}
      {!isThinking && (
        <>
          {/* Left eye */}
          <circle cx="23" cy="30" r="6" fill="white"
            style={{ animation: "blink-eyes 5s ease-in-out infinite" }} />
          <circle cx="24.5" cy="29" r="3" fill="#0B0E14" />
          <circle cx="25.5" cy="28" r="1" fill="white" />
          {/* Iris glow */}
          <circle cx="23" cy="30" r="6" fill="none"
            stroke={isListening ? "#FF6B35" : "#00F5FF"} strokeWidth="0.5" opacity="0.5" />

          {/* Right eye */}
          <circle cx="41" cy="30" r="6" fill="white"
            style={{ animation: "blink-eyes 5s ease-in-out infinite", animationDelay: "0.12s" }} />
          <circle cx="42.5" cy="29" r="3" fill="#0B0E14" />
          <circle cx="43.5" cy="28" r="1" fill="white" />
          <circle cx="41" cy="30" r="6" fill="none"
            stroke={isListening ? "#FF6B35" : "#00F5FF"} strokeWidth="0.5" opacity="0.5" />
        </>
      )}

      {/* Eyes — thinking (X shape) */}
      {isThinking && (
        <>
          <line x1="18" y1="25" x2="28" y2="35" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round"
            style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }} />
          <line x1="28" y1="25" x2="18" y2="35" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round"
            style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }} />
          <line x1="36" y1="25" x2="46" y2="35" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round"
            style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }} />
          <line x1="46" y1="25" x2="36" y2="35" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round"
            style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }} />
        </>
      )}

      {/* Mouth */}
      <path d={mouthD}
        stroke={isListening ? "#FF6B35" : "#00F5FF"}
        strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="32" cy="62" rx="13" ry="8" fill="#161B27" stroke="#00F5FF" strokeWidth="1.2" />

      {/* Left arm — waves when idle */}
      <g style={{ transformOrigin: "22px 56px",
                  animation: state === "idle" ? "mascot-wave 2.2s ease-in-out infinite" : "none" }}>
        <path d="M 22 56 Q 13 50 10 43"
          stroke="#00F5FF" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="9" cy="42" r="3" fill="#161B27" stroke="#00F5FF" strokeWidth="1.2" />
      </g>

      {/* Right arm */}
      <path d="M 42 56 Q 51 50 54 43"
        stroke="#00F5FF" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="55" cy="42" r="3" fill="#161B27" stroke="#00F5FF" strokeWidth="1.2" />
    </svg>
  );
}
