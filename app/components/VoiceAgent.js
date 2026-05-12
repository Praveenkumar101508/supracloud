"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./VoiceAgent.module.css";
import {
  PAGE_SCRIPTS,
  DEFAULT_PAGE_SCRIPT,
  KNOWLEDGE_BASE,
} from "./VoiceAgent/agentPersonality";

const INTENT_MAP = [
  { keywords: ["internship", "intern", "graduate intern"], path: "/careers/internships", response: "Taking you to our internship programme now." },
  { keywords: ["training programme", "training program", "talent programme", "upskill"], path: "/careers/training", response: "Opening our training programmes for you." },
  { keywords: ["university partner", "placement year partner", "partnership"], path: "/talent/partnerships", response: "Here's our placement year partnership page." },
  { keywords: ["banking", "financial services", "bank agent", "l1 deflection"], path: "/solutions/banking", response: "Showing you our banking AI agent solution." },
  { keywords: ["retail", "supermarket", "ecommerce agent", "e-commerce agent", "inventory agent"], path: "/solutions/supermarket", response: "Opening our supermarket AI agent solution." },
  { keywords: ["staffing", "hire engineers", "hiring", "contract staff", "recruit"], path: "/services/it-staffing", response: "Taking you to IT staffing." },
  { keywords: ["consultation", "consulting", "advisory", "architecture advice", "strategy session"], path: "/services/consultation", response: "Opening our consultation services." },
  { keywords: ["book", "booking", "discovery call", "arrange a call", "schedule a call", "demo"], path: "/book", response: "Let me take you to our booking page." },
  { keywords: ["about supracloud", "about you", "who are you", "the team", "founder", "praveen"], path: "/about", response: "Here's our about page." },
  { keywords: ["contact", "get in touch", "email you", "reach out"], path: "/contact", response: "Taking you to our contact page." },
];

const ORB_SIZE = 80;
const EDGE_MARGIN = 110;
const TOP_MARGIN = 90;
const BOTTOM_MARGIN = 70;
const DRIFT_MS = 9000;

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function randomPosition() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    x: clamp(Math.random() * (vw - EDGE_MARGIN * 2 - ORB_SIZE) + EDGE_MARGIN, EDGE_MARGIN, vw - ORB_SIZE - EDGE_MARGIN),
    y: clamp(Math.random() * (vh - TOP_MARGIN - BOTTOM_MARGIN - ORB_SIZE) + TOP_MARGIN, TOP_MARGIN, vh - ORB_SIZE - BOTTOM_MARGIN),
  };
}

function MicIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function MicOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export default function VoiceAgent() {
  const router = useRouter();
  const pathname = usePathname();

  const [pos, setPos] = useState({ x: -200, y: -200 }); // off-screen until mounted
  const [orbState, setOrbState] = useState("idle");
  const [tooltip, setTooltip] = useState("");
  const [mounted, setMounted] = useState(false);

  const recognitionRef = useRef(null);
  const orbStateRef = useRef("idle");
  const pathnameRef = useRef(pathname);
  const intentNavRef = useRef(false);
  const intentResolvedRef = useRef(false);
  const processingRef = useRef(false);
  const shouldRestartRef = useRef(false);
  const driftRef = useRef(null);
  const greetedRef = useRef(new Set());

  const setOrb = useCallback((state) => {
    orbStateRef.current = state;
    setOrbState(state);
  }, []);

  // ── speech synthesis ──────────────────────────────────────────────────────────

  const say = useCallback((text, onEnd) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.lang = "en-GB";

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      return (
        voices.find((v) => v.lang === "en-GB") ||
        voices.find((v) => v.lang.startsWith("en-")) ||
        null
      );
    };

    const assignAndSpeak = () => {
      const v = pickVoice();
      if (v) utter.voice = v;
      setTooltip(text.length > 90 ? text.slice(0, 88) + "…" : text);
      setOrb("speaking");
      utter.onend = () => { setTooltip(""); onEnd?.(); };
      utter.onerror = () => { setTooltip(""); onEnd?.(); };
      window.speechSynthesis.speak(utter);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      assignAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        assignAndSpeak();
      };
    }
  }, [setOrb]);

  const sayRef = useRef(say);
  useEffect(() => { sayRef.current = say; }, [say]);

  // ── recognition ──────────────────────────────────────────────────────────────

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (_) {}
    }

    const recog = new SR();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = "en-GB";

    recog.onstart = () => {
      if (orbStateRef.current !== "speaking") setOrb("listening");
    };

    recog.onresult = (e) => {
      const last = e.results[e.results.length - 1];
      if (!last.isFinal) return;
      const text = last[0].transcript.trim();
      if (text) handleSpeechRef.current(text);
    };

    recog.onerror = (e) => {
      if (e.error === "aborted") return;
      if (e.error !== "no-speech") setOrb("idle");
    };

    recog.onend = () => {
      if (shouldRestartRef.current && orbStateRef.current !== "muted") {
        try { recog.start(); } catch (_) {}
      }
    };

    recognitionRef.current = recog;
    shouldRestartRef.current = true;
    try { recog.start(); } catch (_) {}
  }, [setOrb]);

  const startListeningRef = useRef(startListening);
  useEffect(() => { startListeningRef.current = startListening; }, [startListening]);

  const stopListening = useCallback(() => {
    shouldRestartRef.current = false;
    try { recognitionRef.current?.stop(); } catch (_) {}
  }, []);

  const stopListeningRef = useRef(stopListening);
  useEffect(() => { stopListeningRef.current = stopListening; }, [stopListening]);

  // ── intent handler ────────────────────────────────────────────────────────────

  const handleSpeech = useCallback((text) => {
    if (processingRef.current) return;
    processingRef.current = true;
    const lower = text.toLowerCase();

    stopListeningRef.current();

    // Navigation intent
    for (const intent of INTENT_MAP) {
      if (intent.keywords.some((kw) => lower.includes(kw))) {
        if (pathnameRef.current !== intent.path) {
          intentNavRef.current = true;
          intentResolvedRef.current = true;
          sayRef.current(intent.response, () => {
            router.push(intent.path);
            setTimeout(() => {
              processingRef.current = false;
              startListeningRef.current();
            }, 600);
          });
        } else {
          const script = PAGE_SCRIPTS[intent.path]?.("") || DEFAULT_PAGE_SCRIPT("");
          sayRef.current(script, () => {
            processingRef.current = false;
            startListeningRef.current();
          });
        }
        return;
      }
    }

    // Knowledge base
    for (const entry of KNOWLEDGE_BASE) {
      if (entry.tags.some((tag) => lower.includes(tag))) {
        const response = entry.answer("");
        sayRef.current(response, () => {
          processingRef.current = false;
          startListeningRef.current();
        });
        return;
      }
    }

    // Fallback
    sayRef.current(DEFAULT_PAGE_SCRIPT(""), () => {
      processingRef.current = false;
      startListeningRef.current();
    });
  }, [router]);

  const handleSpeechRef = useRef(handleSpeech);
  useEffect(() => { handleSpeechRef.current = handleSpeech; }, [handleSpeech]);

  // ── mount: initial position + greet + drift ───────────────────────────────────

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPos({
      x: vw - ORB_SIZE - EDGE_MARGIN,
      y: vh - ORB_SIZE - BOTTOM_MARGIN - 20,
    });
    setMounted(true);

    const greetTimer = setTimeout(() => {
      const script = PAGE_SCRIPTS[pathname]?.("") || DEFAULT_PAGE_SCRIPT("");
      greetedRef.current.add(pathname);
      sayRef.current(script, () => {
        startListeningRef.current();
      });
    }, 900);

    driftRef.current = setInterval(() => {
      setPos(randomPosition());
    }, DRIFT_MS);

    return () => {
      clearTimeout(greetTimer);
      clearInterval(driftRef.current);
      shouldRestartRef.current = false;
      try { recognitionRef.current?.abort(); } catch (_) {}
      window.speechSynthesis?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── route change: re-greet on manual navigation ───────────────────────────────

  useEffect(() => {
    pathnameRef.current = pathname;

    if (intentNavRef.current) {
      intentNavRef.current = false;
      return;
    }
    if (!mounted) return;
    if (greetedRef.current.has(pathname)) return;
    greetedRef.current.add(pathname);

    window.speechSynthesis?.cancel();
    stopListeningRef.current();
    processingRef.current = false;

    const t = setTimeout(() => {
      const script = PAGE_SCRIPTS[pathname]?.("") || DEFAULT_PAGE_SCRIPT("");
      sayRef.current(script, () => {
        startListeningRef.current();
      });
    }, 500);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── click: toggle mute ────────────────────────────────────────────────────────

  const handleClick = useCallback(() => {
    if (orbStateRef.current === "muted") {
      setOrb("idle");
      startListeningRef.current();
    } else {
      setOrb("muted");
      window.speechSynthesis?.cancel();
      stopListeningRef.current();
      setTooltip("");
    }
  }, [setOrb]);

  if (!mounted) return null;

  const icon =
    orbState === "muted" ? <MicOffIcon /> :
    orbState === "speaking" ? <SpeakerIcon /> :
    <MicIcon />;

  return (
    <div
      className={`${styles.orb} ${styles[orbState]}`}
      style={{ left: pos.x, top: pos.y }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Aria voice assistant — ${orbState}. Click to ${orbState === "muted" ? "unmute" : "mute"}.`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
    >
      <span className={styles.icon}>{icon}</span>
      {tooltip && <div className={styles.tooltip}>{tooltip}</div>}
    </div>
  );
}
