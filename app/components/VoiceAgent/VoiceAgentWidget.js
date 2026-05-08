"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useVoiceAgent } from "./useVoiceAgent";
import { useRouteAnnouncer } from "./useRouteAnnouncer";
import styles from "./VoiceAgentWidget.module.css";
import { AGENT_NAME } from "./agentPersonality";

const EMAIL_STEP = 5;
const TOTAL_LEAD_STEPS = 6;
const PROACTIVE_DELAY_MS = 35_000; // 35s on page before Aria auto-opens

function MicIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function MicOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SpeakerMutedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function WaveformIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h2" /><path d="M6 8v8" /><path d="M10 5v14" />
      <path d="M14 8v8" /><path d="M18 10v4" /><path d="M22 12h-2" />
    </svg>
  );
}

// Animated waveform bars shown while listening
function ListeningWave() {
  return (
    <span className={styles.listeningWave} aria-hidden>
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </span>
  );
}

export default function VoiceAgentWidget() {
  const {
    isOpen, isSpeaking, isListening, isMuted, isThinking,
    messages, visitorName, stage, leadStep,
    open, close, toggleMute,
    startListening, stopListening,
    announceRoute, submitEmailFromText, interruptSpeech,
  } = useVoiceAgent();

  const messagesEndRef  = useRef(null);
  const prevSpeakingRef = useRef(false);
  const proactiveRef    = useRef(null);
  const [emailDraft, setEmailDraft] = useState("");

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Jarvis mode: auto-listen after Aria finishes speaking
  useEffect(() => {
    const wasJustSpeaking = prevSpeakingRef.current && !isSpeaking;
    prevSpeakingRef.current = isSpeaking;
    if (!wasJustSpeaking) return;
    if (!isOpen || isMuted || isThinking || isListening || messages.length === 0) return;
    if (stage === "lead_capture" && leadStep === EMAIL_STEP) return;
    const t = setTimeout(() => startListening(), 500);
    return () => clearTimeout(t);
  }, [isSpeaking, isOpen, isMuted, isThinking, isListening, messages.length, stage, leadStep, startListening]);

  // Proactive trigger: auto-open after 35s if user hasn't interacted
  useEffect(() => {
    const alreadyInteracted = (() => {
      try { return sessionStorage.getItem("aria_has_interacted") === "1"; } catch { return false; }
    })();
    if (alreadyInteracted || isOpen) return;
    proactiveRef.current = setTimeout(() => {
      if (!isOpen) open();
    }, PROACTIVE_DELAY_MS);
    return () => clearTimeout(proactiveRef.current);
  }, []); // eslint-disable-line

  // Clear proactive timer once user manually opens
  useEffect(() => {
    if (isOpen) clearTimeout(proactiveRef.current);
  }, [isOpen]);

  // Keyboard shortcut: press 'a' to toggle Aria (when not typing in an input)
  useEffect(() => {
    function onKey(e) {
      if (e.key.toLowerCase() !== "a") return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable) return;
      isOpen ? close() : open();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, open, close]);

  // PostHog tracking
  useEffect(() => {
    if (typeof window === "undefined" || !window.posthog) return;
    if (isOpen) window.posthog.capture("aria_opened", { page: window.location.pathname });
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.posthog) return;
    if (stage === "lead_capture" && leadStep === 0) {
      window.posthog.capture("aria_lead_started", { name: visitorName });
    }
    if (stage === "done") {
      window.posthog.capture("aria_lead_completed", { name: visitorName });
    }
  }, [stage, leadStep, visitorName]);

  const handleRouteChange = useCallback((pathname) => { announceRoute(pathname); }, [announceRoute]);
  useRouteAnnouncer(handleRouteChange);

  const handleEmailSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!emailDraft.trim()) return;
    const email = emailDraft.trim();
    setEmailDraft("");
    await submitEmailFromText(email);
  }, [emailDraft, submitEmailFromText]);

  // Mic button click: interrupt if Aria is speaking, otherwise start/stop
  const handleMicClick = useCallback(() => {
    if (isSpeaking) {
      interruptSpeech();
      setTimeout(() => startListening(), 300);
      return;
    }
    isListening ? stopListening() : startListening();
  }, [isSpeaking, isListening, interruptSpeech, startListening, stopListening]);

  const progressPct = stage === "lead_capture"
    ? Math.round((leadStep / TOTAL_LEAD_STEPS) * 100)
    : 0;

  const statusText = isListening
    ? "Listening..."
    : isSpeaking
    ? "Speaking..."
    : isThinking
    ? "Thinking..."
    : stage === "ask_name"
    ? "Tell me your name"
    : stage === "lead_capture"
    ? `Step ${leadStep + 1} of ${TOTAL_LEAD_STEPS}`
    : visitorName
    ? `Here for you, ${visitorName}`
    : "Ask me anything";

  const micLabel = isSpeaking
    ? "Interrupt"
    : isListening
    ? "Tap to stop"
    : stage === "ask_name"
    ? "Say your name"
    : stage === "lead_capture"
    ? "Answer"
    : "Ask a question";

  return (
    <>
      <button
        className={`${styles.trigger} ${isSpeaking ? styles.speaking : ""} ${isListening ? styles.triggerListening : ""}`}
        onClick={isOpen ? close : open}
        aria-label={isOpen ? `Close ${AGENT_NAME}` : `Open ${AGENT_NAME} — press A`}
        aria-expanded={isOpen}
        title={isOpen ? "Close Aria" : "Open Aria (press A)"}
      >
        {isOpen ? <CloseIcon /> : <WaveformIcon />}
      </button>

      {isOpen && (
        <div className={styles.panel} role="dialog" aria-label={`${AGENT_NAME} voice assistant`}>

          {/* Progress bar for lead capture */}
          {stage === "lead_capture" && (
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} style={{ width: `${progressPct}%` }} />
            </div>
          )}

          <div className={styles.header}>
            <div className={styles.avatar} aria-hidden>
              {visitorName ? visitorName.charAt(0).toUpperCase() : "AI"}
            </div>
            <div className={styles.headerText}>
              <div className={styles.agentName}>
                {AGENT_NAME} &middot; SupraCloud AI
                {stage === "lead_capture" && (
                  <span className={styles.stageBadge}> Booking</span>
                )}
              </div>
              <div className={`${styles.agentStatus} ${(isSpeaking || isListening) ? styles.active : ""}`}>
                {statusText}
              </div>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.iconBtn} onClick={toggleMute}
                aria-label={isMuted ? "Unmute Aria" : "Mute Aria"}>
                {isMuted ? <SpeakerMutedIcon /> : <SpeakerIcon />}
              </button>
              <button className={styles.iconBtn} onClick={close} aria-label="Close assistant">
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className={styles.messages} aria-live="polite" aria-atomic="false">
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.bubble} ${styles[msg.role]}`}>
                {msg.role === "aria" && (
                  <span className={styles.bubbleSender}>{AGENT_NAME}</span>
                )}
                {msg.role === "user" && visitorName && (
                  <span className={styles.bubbleSender}>{visitorName}</span>
                )}
                {msg.text}
              </div>
            ))}
            {isThinking && (
              <div className={styles.thinking} aria-label="Aria is thinking">
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.footer}>
            {stage === "lead_capture" && leadStep === EMAIL_STEP ? (
              <form className={styles.emailForm} onSubmit={handleEmailSubmit}>
                <input
                  className={styles.emailInput}
                  type="email"
                  placeholder="your@email.com"
                  value={emailDraft}
                  onChange={(e) => setEmailDraft(e.target.value)}
                  autoFocus
                  aria-label="Enter your email address"
                />
                <button
                  className={styles.emailSend}
                  type="submit"
                  disabled={!emailDraft.trim()}
                  aria-label="Send email"
                >
                  Send
                </button>
              </form>
            ) : (
              <button
                className={`${styles.micBtn} ${isListening ? styles.listening : ""} ${isSpeaking ? styles.interrupt : ""}`}
                onClick={handleMicClick}
                aria-label={isSpeaking ? "Interrupt Aria" : isListening ? "Stop listening" : "Start speaking"}
              >
                {isListening ? <ListeningWave /> : <MicIcon />}
                {micLabel}
              </button>
            )}
          </div>

          <p className={styles.hint}>
            {stage === "lead_capture"
              ? "Your answers go securely to the SupraCloud team"
              : "Powered by SupraCloud AI · Press A to toggle"}
          </p>
        </div>
      )}
    </>
  );
}
