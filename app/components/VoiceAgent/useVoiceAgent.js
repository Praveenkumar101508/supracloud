"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  KNOWLEDGE_BASE, PAGE_SCRIPTS, DEFAULT_PAGE_SCRIPT,
  ASK_NAME_SCRIPT, GREET_BY_NAME,
  LEAD_CAPTURE_INTRO, LEAD_QUESTIONS, LEAD_CONFIRM, LEAD_CONFIRM_NO_EMAIL,
  PROACTIVE_CTA, INACTIVITY_REMINDER, DEMO_INTENT_TAGS,
} from "./agentPersonality";

const SESSION_KEY   = "aria_has_interacted";
const NAME_KEY      = "aria_visitor_name";
const INACTIVITY_MS = 45_000;  // 45s before reminder
const CLOSE_MS      = 30_000;  // 30s after reminder before auto-close

// ── Helpers ───────────────────────────────────────────────────────────────────

function hasDemoIntent(text) {
  const t = text.toLowerCase();
  return DEMO_INTENT_TAGS.some((tag) => t.includes(tag));
}

function matchKnowledge(text, name) {
  const t = text.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.tags.some((tag) => t.includes(tag))) {
      return typeof entry.answer === "function" ? entry.answer(name) : entry.answer;
    }
  }
  return null;
}

function extractName(text) {
  const t = text.trim();
  // Strip common phrases
  const cleaned = t
    .replace(/^(my name is|i'm|i am|call me|it's|its|this is)\s+/i, "")
    .replace(/[.,!?]+$/, "")
    .trim();
  // Accept 1-3 words, each starting with capital or just a single word
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 1 && parts.length <= 3) {
    // Capitalise first letter of each word
    return parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  }
  return null;
}

async function fetchAIResponse(question, pathname, name) {
  try {
    const res = await fetch("/api/agent/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, pathname, visitorName: name }),
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.answer || "I'm not sure about that - please book a discovery call and one of our engineers will answer directly.";
  } catch {
    return "I'm having a little trouble right now. Please try again or use the Contact page to reach us.";
  }
}

async function speakText(text) {
  try {
    const res = await fetch("/api/agent/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      return new Promise((resolve) => {
        audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
        audio.onerror = () => { URL.revokeObjectURL(url); resolve(); };
        audio.play().catch(resolve);
      });
    }
  } catch {}

  if (typeof window !== "undefined" && window.speechSynthesis) {
    return new Promise((resolve) => {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = "en-GB";
      utt.rate = 1.0;
      utt.pitch = 1.05;
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ||
        voices.find((v) => v.lang.startsWith("en-GB")) ||
        voices[0];
      if (preferred) utt.voice = preferred;
      utt.onend = resolve;
      utt.onerror = resolve;
      window.speechSynthesis.speak(utt);
    });
  }
}

async function submitLead(leadData) {
  try {
    await fetch("/api/agent/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });
  } catch {}
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useVoiceAgent() {
  // UI state
  const [isOpen,      setIsOpen]      = useState(false);
  const [isSpeaking,  setIsSpeaking]  = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted,     setIsMuted]     = useState(false);
  const [isThinking,  setIsThinking]  = useState(false);
  const [messages,    setMessages]    = useState([]);

  // Conversation state
  const [visitorName, setVisitorName] = useState(() => {
    try { return sessionStorage.getItem(NAME_KEY) || ""; } catch { return ""; }
  });
  // stage: "ask_name" | "chatting" | "lead_capture" | "done"
  const [stage,       setStage]       = useState("ask_name");

  // Lead capture
  const leadRef    = useRef({});     // accumulates field answers
  const stepRef    = useRef(0);      // current LEAD_QUESTIONS index

  // Conversation counters
  const exchangeCountRef = useRef(0);
  const ctaFiredRef      = useRef(false);

  // Inactivity
  const inactivityTimer  = useRef(null);
  const closeTimer       = useRef(null);

  // Refs for latest state in async callbacks
  const mutedRef       = useRef(false);
  const nameRef        = useRef(visitorName);
  const stageRef       = useRef(stage);
  const isOpenRef      = useRef(false);
  const recognitionRef = useRef(null);

  useEffect(() => { mutedRef.current  = isMuted;     }, [isMuted]);
  useEffect(() => { nameRef.current   = visitorName; }, [visitorName]);
  useEffect(() => { stageRef.current  = stage;       }, [stage]);
  useEffect(() => { isOpenRef.current = isOpen;      }, [isOpen]);

  // ── Inactivity timer management ────────────────────────────────────────────

  const clearInactivity = useCallback(() => {
    clearTimeout(inactivityTimer.current);
    clearTimeout(closeTimer.current);
  }, []);

  const resetInactivity = useCallback((speakFn) => {
    clearInactivity();
    inactivityTimer.current = setTimeout(() => {
      if (!isOpenRef.current) return;
      const name = nameRef.current || "there";
      speakFn(INACTIVITY_REMINDER(name), true /* skip inactivity reset */);
      closeTimer.current = setTimeout(() => {
        setIsOpen(false);
      }, CLOSE_MS);
    }, INACTIVITY_MS);
  }, [clearInactivity]);

  // ── Core speak ─────────────────────────────────────────────────────────────

  const speak = useCallback(async (text, skipInactivityReset = false) => {
    if (mutedRef.current) {
      setMessages((prev) => [...prev, { role: "aria", text }]);
      return;
    }
    setIsSpeaking(true);
    setMessages((prev) => [...prev, { role: "aria", text }]);
    await speakText(text);
    setIsSpeaking(false);
  }, []);

  // Wrap speak so inactivity resets after each Aria utterance
  const speakAndResetTimer = useCallback(async (text, skipReset = false) => {
    await speak(text);
    if (!skipReset) resetInactivity(speakAndResetTimer);
  }, [speak, resetInactivity]);

  // ── Name capture ───────────────────────────────────────────────────────────

  const saveName = useCallback((name) => {
    setVisitorName(name);
    nameRef.current = name;
    try { sessionStorage.setItem(NAME_KEY, name); } catch {}
  }, []);

  // ── Lead capture step ──────────────────────────────────────────────────────

  const processLeadAnswer = useCallback(async (answer) => {
    const step = stepRef.current;
    const fieldDef = LEAD_QUESTIONS[step];
    if (!fieldDef) return;

    leadRef.current[fieldDef.field] = answer;
    const nextStep = step + 1;
    stepRef.current = nextStep;

    if (nextStep < LEAD_QUESTIONS.length) {
      await speakAndResetTimer(LEAD_QUESTIONS[nextStep - 1].question);
    } else {
      // All questions answered
      const lead = {
        ...leadRef.current,
        name: nameRef.current,
        timestamp: new Date().toISOString(),
        source: typeof window !== "undefined" ? window.location.href : "",
      };
      await submitLead(lead);
      setStage("done");
      const email = lead.email;
      const confirmation = email && email.includes("@")
        ? LEAD_CONFIRM(nameRef.current || "there", email)
        : LEAD_CONFIRM_NO_EMAIL(nameRef.current || "there");
      await speakAndResetTimer(confirmation);
    }
  }, [speakAndResetTimer]);

  // ── Handle incoming speech transcript ─────────────────────────────────────

  const handleTranscript = useCallback(async (text) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
    clearInactivity();
    const currentStage = stageRef.current;
    const name = nameRef.current;

    // ── Stage: ask_name ──────────────────────────────────────────────────────
    if (currentStage === "ask_name") {
      const extracted = extractName(text);
      if (extracted) {
        saveName(extracted);
        setStage("chatting");
        await speakAndResetTimer(GREET_BY_NAME(extracted));
      } else {
        await speakAndResetTimer("Sorry, I didn't quite catch that - could you just tell me your first name?");
      }
      return;
    }

    // ── Stage: lead_capture ──────────────────────────────────────────────────
    if (currentStage === "lead_capture") {
      await processLeadAnswer(text);
      return;
    }

    // ── Stage: chatting / done ───────────────────────────────────────────────
    exchangeCountRef.current += 1;

    // Check for demo/call intent
    if (hasDemoIntent(text) && currentStage !== "done") {
      setStage("lead_capture");
      stepRef.current = 0;
      leadRef.current = {};
      await speakAndResetTimer(LEAD_CAPTURE_INTRO(name || "there"));
      return;
    }

    // Check local knowledge base
    const localAnswer = matchKnowledge(text, name);
    if (localAnswer) {
      await speakAndResetTimer(localAnswer);
      // Fire proactive CTA after 3 exchanges if not yet fired
      if (exchangeCountRef.current >= 3 && !ctaFiredRef.current) {
        ctaFiredRef.current = true;
        setTimeout(async () => {
          await speakAndResetTimer(PROACTIVE_CTA(name || "there"));
        }, 1500);
      }
      return;
    }

    // Fall back to Claude AI
    setIsThinking(true);
    const aiAnswer = await fetchAIResponse(text, typeof window !== "undefined" ? window.location.pathname : "/", name);
    setIsThinking(false);
    await speakAndResetTimer(aiAnswer);

    if (exchangeCountRef.current >= 3 && !ctaFiredRef.current) {
      ctaFiredRef.current = true;
      setTimeout(async () => {
        await speakAndResetTimer(PROACTIVE_CTA(name || "there"));
      }, 1500);
    }
  }, [clearInactivity, processLeadAnswer, saveName, speakAndResetTimer]);

  // ── Route change announcer ─────────────────────────────────────────────────

  const announceRoute = useCallback(async (pathname) => {
    if (!isOpenRef.current) return;
    const scriptFn = PAGE_SCRIPTS[pathname] || DEFAULT_PAGE_SCRIPT;
    const script = typeof scriptFn === "function" ? scriptFn(nameRef.current) : scriptFn;
    await speakAndResetTimer(script);
  }, [speakAndResetTimer]);

  // ── Open / close ───────────────────────────────────────────────────────────

  const open = useCallback(async () => {
    setIsOpen(true);

    // Restore name from session if returning visitor
    let name = "";
    try { name = sessionStorage.getItem(NAME_KEY) || ""; } catch {}

    const alreadyInteracted = (() => {
      try { return sessionStorage.getItem(SESSION_KEY) === "1"; } catch { return false; }
    })();

    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}

    if (name) {
      // Returning visitor within same session
      saveName(name);
      setStage("chatting");
      setMessages([]);
      await speakAndResetTimer(GREET_BY_NAME(name));
    } else {
      setStage("ask_name");
      setMessages([]);
      await speakAndResetTimer(ASK_NAME_SCRIPT);
    }
  }, [saveName, speakAndResetTimer]);

  const close = useCallback(() => {
    setIsOpen(false);
    clearInactivity();
    if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch {} }
    setIsListening(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [clearInactivity]);

  // ── Mute ──────────────────────────────────────────────────────────────────

  const toggleMute = useCallback(() => {
    setIsMuted((m) => {
      const next = !m;
      if (next && typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  // ── Microphone ────────────────────────────────────────────────────────────

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      speak("Microphone access isn't available in this browser. Try Chrome or Edge.");
      return;
    }

    const rec = new SR();
    rec.lang = "en-GB";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setIsListening(false);
      await handleTranscript(text);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend   = () => setIsListening(false);

    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
    clearInactivity();
  }, [handleTranscript, speak, clearInactivity]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch {} }
    setIsListening(false);
  }, []);

  return {
    isOpen, isSpeaking, isListening, isMuted, isThinking,
    messages, visitorName, stage,
    open, close, toggleMute,
    startListening, stopListening,
    announceRoute,
  };
}
