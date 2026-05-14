"use client";

import {
  useState, useRef, useEffect, useCallback, FormEvent, RefObject,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceAgent } from "./VoiceAgent/useVoiceAgent";
import { FloatingNovaButton } from "./ui/FloatingNovaButton";
import { track } from "@/lib/posthog";

// ── Types ─────────────────────────────────────────────────────────────────────

type NovaState = "idle" | "listening" | "thinking" | "speaking";

// ── Real waveform visualizer (Web Audio API + canvas) ─────────────────────────

function WaveformVisualizer({
  isListening,
  isSpeaking,
  analyserRef,
}: {
  isListening: boolean;
  isSpeaking: boolean;
  analyserRef: RefObject<AnalyserNode | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const tRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W     = canvas.width;
    const H     = canvas.height;
    const COUNT = 26;
    const gap   = 2.5;
    const barW  = (W - gap * (COUNT - 1)) / COUNT;

    const drawRoundedRect = (
      x: number, y: number, w: number, h: number, r: number,
    ) => {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.lineTo(x + w - rr, y);
      ctx.arcTo(x + w, y, x + w, y + rr, rr);
      ctx.lineTo(x + w, y + h - rr);
      ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
      ctx.lineTo(x + rr, y + h);
      ctx.arcTo(x, y + h, x, y + h - rr, rr);
      ctx.lineTo(x, y + rr);
      ctx.arcTo(x, y, x + rr, y, rr);
      ctx.closePath();
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tRef.current += 0.055;
      const t = tRef.current;

      let heights: number[];

      if (isListening && analyserRef.current) {
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        const step = Math.floor(data.length / COUNT);
        heights = Array.from({ length: COUNT }, (_, i) =>
          Math.max(0.05, data[Math.min(i * step, data.length - 1)] / 255),
        );
      } else if (isSpeaking) {
        heights = Array.from({ length: COUNT }, (_, i) => {
          const p = (i / COUNT) * Math.PI * 4;
          return Math.min(
            0.95,
            0.08 +
            0.28 * Math.abs(Math.sin(t * 1.9 + p)) +
            0.18 * Math.abs(Math.sin(t * 3.3 + p * 0.8)) +
            0.10 * Math.abs(Math.sin(t * 5.9 + p * 1.4)),
          );
        });
      } else {
        heights = Array.from({ length: COUNT }, () => 0.04 + Math.random() * 0.03);
      }

      const color = isListening ? "#FF8C00" : "#00F5FF";

      heights.forEach((h, i) => {
        const x    = i * (barW + gap);
        const barH = Math.max(2, h * H);
        const y    = (H - barH) / 2;
        ctx.globalAlpha = 0.35 + h * 0.65;
        ctx.fillStyle   = color;
        drawRoundedRect(x, y, barW, barH, barW / 2);
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [isListening, isSpeaking, analyserRef]);

  return (
    <canvas
      ref={canvasRef}
      width={292}
      height={44}
      style={{ width: "100%", height: 44, display: "block" }}
      aria-hidden
    />
  );
}

// ── Thinking dots ─────────────────────────────────────────────────────────────

function ThinkingDots() {
  return (
    <div className="flex gap-1.5 justify-center py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

// ── Message feedback thumbs ───────────────────────────────────────────────────

function MessageFeedback({
  messageId,
  feedback,
  onFeedback,
}: {
  messageId: string | null | undefined;
  feedback?: boolean;
  onFeedback: (id: string, helpful: boolean) => void;
}) {
  if (!messageId) return null;
  return (
    <div className="flex gap-1 mt-1.5">
      <button
        aria-label="Helpful"
        onClick={() => onFeedback(messageId, true)}
        className={`p-1 rounded transition-colors ${
          feedback === true ? "text-[#00F5FF]" : "text-white/25 hover:text-white/60"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 20h2a1 1 0 000-2H2v2zm18-9c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 7.59 6.59C7.22 6.95 7 7.45 7 8v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
        </svg>
      </button>
      <button
        aria-label="Not helpful"
        onClick={() => onFeedback(messageId, false)}
        className={`p-1 rounded transition-colors ${
          feedback === false ? "text-red-400" : "text-white/25 hover:text-white/60"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 4h-2a1 1 0 000 2h2V4zM6 9c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06l1.06 1.05 5.58-5.59C18.78 14.05 19 13.55 19 13V3c0-1.1-.9-2-2-2H8C7.17 1 6.46 1.5 6.16 2.22L3.14 9.27A2 2 0 003 10v2h3z" />
        </svg>
      </button>
    </div>
  );
}

// ── Chat message bubble ───────────────────────────────────────────────────────

type NovaMessage = {
  role: string;
  text: string;
  id: string;
  messageId?: string | null;
  feedback?: boolean;
};

function MessageBubble({
  msg,
  onFeedback,
}: {
  msg: NovaMessage;
  onFeedback: (id: string, helpful: boolean) => void;
}) {
  const isNova = msg.role === "nova";
  return (
    <motion.div
      className={`flex ${isNova ? "justify-start" : "justify-end"} mb-2`}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22 }}
    >
      <div className="max-w-[85%]">
        <div
          className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${
            isNova
              ? "bg-[rgba(0,245,255,0.07)] text-white/90 rounded-tl-sm border border-[#00F5FF]/12"
              : "bg-[rgba(139,92,246,0.2)] text-white rounded-tr-sm border border-[#8B5CF6]/25"
          }`}
        >
          {msg.text}
        </div>
        {isNova && (
          <MessageFeedback
            messageId={msg.messageId}
            feedback={msg.feedback}
            onFeedback={onFeedback}
          />
        )}
      </div>
    </motion.div>
  );
}

// ── Proactive booking nudge card ──────────────────────────────────────────────

function BookingNudgeCard({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="mb-3 rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(139,92,246,0.06))",
        border: "1px solid rgba(0,245,255,0.18)",
      }}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-xs text-white/80 leading-relaxed font-medium">
            Ready to see this in action?
          </p>
          <button
            onClick={onClose}
            aria-label="Dismiss"
            className="text-white/25 hover:text-white/60 shrink-0 mt-0.5 transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-[11px] text-white/45 mb-3 leading-relaxed">
          A 30-min engineer call shows exactly how we'd deploy for your use case — no sales, no pitch.
        </p>
        <a
          href="/book"
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold text-black transition-opacity hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #00F5FF, #0088BB)" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
          </svg>
          Book a Discovery Call
        </a>
      </div>
    </motion.div>
  );
}

// ── Nova avatar icon per state ────────────────────────────────────────────────

function NovaAvatarIcon({ state }: { state: NovaState }) {
  const COLOR: Record<NovaState, string> = {
    idle:      "#00F5FF",
    listening: "#FF8C00",
    thinking:  "#8B5CF6",
    speaking:  "#00F5FF",
  };
  const c  = COLOR[state];
  const id = `ng-${state}`;

  return (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" aria-label="Nova AI assistant">
      <defs>
        <radialGradient id={id} cx="45%" cy="30%" r="65%">
          <stop offset="0%"   stopColor={c} stopOpacity="0.22" />
          <stop offset="100%" stopColor="#050510" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <line x1="32" y1="4" x2="32" y2="13" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      <circle cx="32" cy="3" r="2.5" fill={c} opacity="0.9" />
      <rect x="9" y="13" width="46" height="38" rx="16" fill={`url(#${id})`} stroke={c} strokeWidth="1.4" opacity="0.9" />
      <ellipse cx="22" cy="29" rx="6" ry="6.5" fill={`${c}22`} stroke={c} strokeWidth="1.2" />
      <circle  cx="22" cy="29" r="3" fill={c} opacity="0.95" />
      <circle  cx="23.5" cy="27.5" r="1" fill="white" opacity="0.6" />
      <ellipse cx="42" cy="29" rx="6" ry="6.5" fill={`${c}22`} stroke={c} strokeWidth="1.2" />
      <circle  cx="42" cy="29" r="3" fill={c} opacity="0.95" />
      <circle  cx="43.5" cy="27.5" r="1" fill="white" opacity="0.6" />
      <path d="M23 41 Q32 48 41 41" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.9" />
      <ellipse cx="13" cy="36" rx="4" ry="2.5" fill="rgba(255,100,180,0.18)" />
      <ellipse cx="51" cy="36" rx="4" ry="2.5" fill="rgba(255,100,180,0.18)" />
      {state === "speaking" && (
        <circle cx="32" cy="32" r="28" fill="none" stroke={c} strokeWidth="0.6" opacity="0.2" />
      )}
    </svg>
  );
}

// ── Main hub ──────────────────────────────────────────────────────────────────

export default function MascotVoiceHub() {
  const {
    isOpen, isSpeaking, isListening, isMuted, isThinking,
    messages: rawMessages, visitorName, stage,
    open, close, toggleMute,
    startListening, stopListening,
    submitText, submitMessageFeedback, interruptSpeech,
  } = useVoiceAgent();

  const messages = rawMessages as NovaMessage[];

  const [inputText,        setInputText]        = useState("");
  const [nudgeDismissed,   setNudgeDismissed]   = useState(false);
  const messagesEndRef                           = useRef<HTMLDivElement>(null);

  // Web Audio API refs for real waveform data on mic input
  const analyserRef   = useRef<AnalyserNode | null>(null);
  const audioCtxRef   = useRef<AudioContext | null>(null);
  const micStreamRef  = useRef<MediaStream | null>(null);

  // Derive visual state
  const novaState: NovaState = isListening
    ? "listening"
    : isThinking
    ? "thinking"
    : isSpeaking
    ? "speaking"
    : "idle";

  const STATE_COLOR: Record<NovaState, string> = {
    idle:      "#00F5FF",
    listening: "#FF8C00",
    thinking:  "#8B5CF6",
    speaking:  "#00F5FF",
  };
  const stateColor = STATE_COLOR[novaState];

  // ── Web Audio API: tap microphone when listening ───────────────────────────

  useEffect(() => {
    if (!isListening) {
      // Tear down mic capture
      micStreamRef.current?.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
      analyserRef.current  = null;
      audioCtxRef.current?.close().catch(() => {});
      audioCtxRef.current  = null;
      return;
    }

    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        micStreamRef.current = stream;
        const ctx            = new AudioContext();
        audioCtxRef.current  = ctx;
        const source         = ctx.createMediaStreamSource(stream);
        const analyser       = ctx.createAnalyser();
        analyser.fftSize     = 256;
        source.connect(analyser);
        analyserRef.current  = analyser;
      })
      .catch(() => {
        // Mic permission denied — waveform falls back to simulated animation
      });

    return () => {
      cancelled = true;
      micStreamRef.current?.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
      analyserRef.current  = null;
      audioCtxRef.current?.close().catch(() => {});
      audioCtxRef.current  = null;
    };
  }, [isListening]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Count unread (nova messages since chat was closed)
  const [unreadCount, setUnreadCount] = useState(0);
  const lastSeenCountRef = useRef(0);
  useEffect(() => {
    if (isOpen) {
      lastSeenCountRef.current = messages.length;
      setUnreadCount(0);
    } else {
      const novaCount = messages.filter((m) => m.role === "nova").length;
      setUnreadCount(Math.max(0, novaCount - lastSeenCountRef.current));
    }
  }, [messages, isOpen]);

  // Show booking nudge after 3 user messages (reset dismiss on close)
  useEffect(() => {
    if (!isOpen) setNudgeDismissed(false);
  }, [isOpen]);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showBookingNudge = userMessageCount >= 3 && !nudgeDismissed;

  // Track nova opened
  useEffect(() => {
    if (isOpen) track("nova_opened");
  }, [isOpen]);

  // Track booking nudge shown (fires once when nudge first appears)
  useEffect(() => {
    if (showBookingNudge) track("nova_booking_suggested", { user_messages: userMessageCount });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBookingNudge]);

  // Listen for external nova:open events (CTAs around the page)
  useEffect(() => {
    const handler = () => open();
    document.addEventListener("nova:open", handler);
    return () => document.removeEventListener("nova:open", handler);
  }, [open]);

  // Proactive auto-open: 12–18 s after first visit this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem("nova_has_interacted") === "1") return;
    } catch { /* ignore */ }
    const delay = 12_000 + Math.random() * 6_000;
    const t = setTimeout(() => {
      try { sessionStorage.setItem("nova_has_interacted", "1"); } catch { /* ignore */ }
      open();
    }, delay);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      const text = inputText.trim();
      if (!text) return;
      setInputText("");
      await submitText(text);
    },
    [inputText, submitText],
  );

  const handleMicClick = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      if (isSpeaking) interruptSpeech();
      startListening();
    }
  }, [isListening, isSpeaking, stopListening, startListening, interruptSpeech]);

  return (
    <>
      {/* ── Floating FAB ── */}
      <FloatingNovaButton
        onOpen={open}
        unreadCount={unreadCount}
        isOpen={isOpen}
      />

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[99] flex flex-col w-[340px] max-w-[calc(100vw-24px)]"
            style={{
              maxHeight:          "calc(100dvh - 90px)",
              background:         "rgba(8,8,20,0.97)",
              border:             `1px solid ${stateColor}30`,
              borderRadius:       "20px",
              backdropFilter:     "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow:          `0 0 40px ${stateColor}18, 0 20px 60px rgba(0,0,0,0.7)`,
            }}
            initial={{ opacity: 0, scale: 0.88, y: 20, originY: 1, originX: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ borderBottom: `1px solid ${stateColor}15` }}
            >
              <div className="relative shrink-0">
                <motion.div
                  animate={novaState !== "idle" ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <NovaAvatarIcon state={novaState} />
                </motion.div>
                {(isListening || isSpeaking) && (
                  <motion.span
                    className="absolute inset-0 rounded-full border pointer-events-none"
                    style={{ borderColor: stateColor }}
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-semibold text-sm">Nova</span>
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: novaState === "idle" ? "#22c55e" : stateColor }}
                  />
                  {visitorName && (
                    <span className="text-[10px] text-white/30 truncate">· {visitorName}</span>
                  )}
                </div>
                <p className="text-[10px] text-white/40 leading-tight truncate">
                  {novaState === "idle"      && "SupraCloud AI · Online"}
                  {novaState === "listening" && "Listening…"}
                  {novaState === "thinking"  && "Thinking…"}
                  {novaState === "speaking"  && "Speaking…"}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute Nova" : "Mute Nova"}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-colors"
                >
                  {isMuted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>
                <button
                  onClick={close}
                  aria-label="Close Nova"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Waveform / thinking indicator ── */}
            <AnimatePresence>
              {novaState !== "idle" && (
                <motion.div
                  className="px-3 shrink-0"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {novaState === "thinking" ? (
                    <ThinkingDots />
                  ) : (
                    <WaveformVisualizer
                      isListening={isListening}
                      isSpeaking={isSpeaking}
                      analyserRef={analyserRef}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 min-h-[120px] max-h-[320px]">
              {messages.length === 0 && (
                <p className="text-white/25 text-xs text-center pt-6">
                  Nova is ready to help…
                </p>
              )}
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  onFeedback={submitMessageFeedback}
                />
              ))}

              {/* Proactive booking nudge — appears after 3 user messages */}
              <AnimatePresence>
                {showBookingNudge && (
                  <BookingNudgeCard onClose={() => setNudgeDismissed(true)} />
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* ── Action buttons (Book Call + End Chat) ── */}
            <div
              className="flex gap-2 px-3 pt-2 pb-1 shrink-0"
              style={{ borderTop: `1px solid ${stateColor}10` }}
            >
              <a
                href="/book"
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-[11px] font-bold text-black transition-opacity hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg, #00F5FF, #0088BB)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                </svg>
                Book a Call
              </a>
              <button
                onClick={close}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-[11px] font-semibold transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                End Chat
              </button>
            </div>

            {/* ── Input row ── */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 shrink-0"
            >
              {/* Mic button */}
              <motion.button
                type="button"
                onClick={handleMicClick}
                aria-label={isListening ? "Stop listening" : "Start speaking"}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors"
                style={{
                  background: isListening ? "rgba(255,140,0,0.2)"  : "rgba(0,245,255,0.08)",
                  border:     `1px solid ${isListening ? "#FF8C00" : "#00F5FF"}30`,
                  color:      isListening ? "#FF8C00" : "#00F5FF",
                }}
                whileTap={{ scale: 0.92 }}
              >
                {isListening ? (
                  <motion.span
                    className="w-3 h-3 rounded-sm bg-[#FF8C00]"
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M5 11a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </motion.button>

              {/* Text input */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  stage === "ask_name"     ? "Type your name…"    :
                  stage === "lead_capture" ? "Type your answer…"  :
                  "Ask Nova anything…"
                }
                className="flex-1 min-w-0 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00F5FF]/40 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />

              {/* Send button */}
              <motion.button
                type="submit"
                disabled={!inputText.trim()}
                aria-label="Send message"
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 disabled:opacity-30 transition-opacity"
                style={{
                  background:  "linear-gradient(135deg, #00F5FF, #0088BB)",
                  boxShadow:   inputText.trim() ? "0 0 12px rgba(0,245,255,0.35)" : "none",
                }}
                whileTap={{ scale: 0.92 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
              </motion.button>
            </form>

            {/* Powered by */}
            <div className="px-4 pb-3 text-center">
              <span className="text-[9px] text-white/15">Powered by Nova AI · SupraCloud</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
