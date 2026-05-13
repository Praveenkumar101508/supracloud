"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  KNOWLEDGE_BASE, PAGE_SCRIPTS, DEFAULT_PAGE_SCRIPT,
  ASK_NAME_SCRIPT, GREET_BY_NAME, GREET_RETURNING,
  LEAD_CAPTURE_INTRO, LEAD_QUESTIONS, LEAD_CONFIRM, LEAD_CONFIRM_NO_EMAIL,
  PROACTIVE_CTA, INACTIVITY_REMINDER, DEMO_INTENT_TAGS,
  PRICING_DATA, calculateRoiResult,
} from "./agentPersonality";

const SESSION_ID_KEY = "nova_session_id";
const NAME_KEY       = "nova_visitor_name";
const INTERACTED_KEY = "nova_has_interacted";
const INACTIVITY_MS  = 45_000;
const CLOSE_MS       = 30_000;

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
  const cleaned = t
    .replace(/^(hello|hi|hey|good morning|good afternoon|good evening)[,!\s]+/i, "")
    .replace(/^(my name is|i'm|i am|call me|it's|its|this is|myself|my self|the name is|name's|its)\s+/i, "")
    .replace(/[.,!?]+$/, "")
    .trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 1 && parts.length <= 3) {
    return parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  }
  return null;
}

function normalizeTranscript(text) {
  return text
    .replace(/\babam\b/gi, "IBM")
    .replace(/\bi\.b\.m\.?\b/gi, "IBM")
    .replace(/\bI be m\b/gi, "IBM")
    .replace(/\bsupracloud\b/gi, "SupraCloud")
    .replace(/\bsupra cloud\b/gi, "SupraCloud")
    .replace(/\blang graph\b/gi, "LangGraph")
    .replace(/\brag\b/gi, "RAG")
    .trim();
}

// ── Session ID: stable UUID per browser ───────────────────────────────────────

function getOrCreateSessionId() {
  try {
    let id = localStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

// ── Supabase session API ───────────────────────────────────────────────────────

async function restoreSession(sessionId) {
  try {
    const res = await fetch(`/api/nova/session?sessionId=${encodeURIComponent(sessionId)}`);
    if (!res.ok) return null;
    return await res.json(); // { visitor_name, messages: [{role, content, id}] }
  } catch {
    return null;
  }
}

async function persistMessage(sessionId, visitorName, role, content) {
  try {
    const res = await fetch("/api/nova/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, visitorName, role, content }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.messageId || null;
  } catch {
    return null;
  }
}

async function submitFeedback(messageId, helpful) {
  if (!messageId) return;
  try {
    await fetch("/api/nova/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, helpful }),
    });
  } catch {}
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

// ── AI + TTS ──────────────────────────────────────────────────────────────────

async function fetchAIResponse(question, pathname, name, history = []) {
  try {
    const res = await fetch("/api/agent/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, pathname, visitorName: name, history }),
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    // Handle tool calls returned by Claude
    if (data.tool_call) {
      return { answer: data.answer, tool_call: data.tool_call };
    }
    return { answer: data.answer || "I'm not sure about that — please book a discovery call and one of our engineers will answer directly." };
  } catch {
    return { answer: "I'm having a little trouble right now. Please try again or use the Contact page to reach us." };
  }
}

async function speakText(text, abortRef) {
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
      if (abortRef) abortRef.current = () => { audio.pause(); audio.src = ""; URL.revokeObjectURL(url); };
      return new Promise((resolve) => {
        audio.onended = () => { if (abortRef) abortRef.current = null; URL.revokeObjectURL(url); resolve(); };
        audio.onerror = () => { if (abortRef) abortRef.current = null; URL.revokeObjectURL(url); resolve(); };
        audio.play().catch(resolve);
      });
    }
  } catch {}

  // Web Speech API fallback
  if (typeof window !== "undefined" && window.speechSynthesis) {
    return new Promise((resolve) => {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = (typeof navigator !== "undefined" && navigator.language) || "en-GB";
      utt.rate = 1.0;
      utt.pitch = 1.05;
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ||
        voices.find((v) => v.lang.startsWith("en-GB")) ||
        voices[0];
      if (preferred) utt.voice = preferred;
      if (abortRef) abortRef.current = () => { window.speechSynthesis.cancel(); };
      utt.onend  = () => { if (abortRef) abortRef.current = null; resolve(); };
      utt.onerror = () => { if (abortRef) abortRef.current = null; resolve(); };
      window.speechSynthesis.speak(utt);
    });
  }
}

// ── Tool execution (client-side) ───────────────────────────────────────────────

function executeTool(toolName, toolInput) {
  if (toolName === "calculate_roi") {
    const result = calculateRoiResult(toolInput);
    return `Based on your volume, here's a quick estimate: ${result.estimated_annual_saving} annual saving at ${result.deflection_rate} deflection rate, with a ${result.payback_months}-month payback. Want me to walk through how we'd implement this?`;
  }
  if (toolName === "get_pricing") {
    const tier = toolInput.tier;
    if (tier && PRICING_DATA[tier]) {
      const p = PRICING_DATA[tier];
      return `The ${p.name} tier is ${p.price} — ${p.description}. Would you like to know what's included, or shall I book a call to discuss your specific needs?`;
    }
    return `Our programmes range from £2,500 for Foundation through to £25,000 for the Full Accelerator, with custom Enterprise pricing. Which tier sounds most relevant for your team?`;
  }
  if (toolName === "qualify_lead") {
    return "TRIGGER_LEAD_CAPTURE";
  }
  return null;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useVoiceAgent() {
  const [isOpen,      setIsOpen]      = useState(false);
  const [isSpeaking,  setIsSpeaking]  = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted,     setIsMuted]     = useState(false);
  const [isThinking,  setIsThinking]  = useState(false);
  const [messages,    setMessages]    = useState([]); // {role, text, id, messageId}

  const [visitorName, setVisitorName] = useState(() => {
    try { return localStorage.getItem(NAME_KEY) || ""; } catch { return ""; }
  });
  // stage: "ask_name" | "chatting" | "lead_capture" | "done"
  const [stage,    setStage]    = useState("ask_name");
  const [leadStep, setLeadStep] = useState(0);

  const leadRef    = useRef({});
  const stepRef    = useRef(0);
  const sessionId  = useRef(null);

  const exchangeCountRef = useRef(0);
  const ctaFiredRef      = useRef(false);

  const inactivityTimer  = useRef(null);
  const closeTimer       = useRef(null);

  const mutedRef       = useRef(false);
  const nameRef        = useRef(visitorName);
  const stageRef       = useRef(stage);
  const isOpenRef      = useRef(false);
  const recognitionRef = useRef(null);
  const messagesRef    = useRef([]);
  const abortSpeechRef = useRef(null);
  const msgIdCounter   = useRef(0);

  useEffect(() => { mutedRef.current    = isMuted;     }, [isMuted]);
  useEffect(() => { nameRef.current     = visitorName; }, [visitorName]);
  useEffect(() => { stageRef.current    = stage;       }, [stage]);
  useEffect(() => { isOpenRef.current   = isOpen;      }, [isOpen]);
  useEffect(() => { messagesRef.current = messages;    }, [messages]);

  // ── Inactivity ─────────────────────────────────────────────────────────────

  const clearInactivity = useCallback(() => {
    clearTimeout(inactivityTimer.current);
    clearTimeout(closeTimer.current);
  }, []);

  const resetInactivity = useCallback((speakFn) => {
    clearInactivity();
    inactivityTimer.current = setTimeout(() => {
      if (!isOpenRef.current) return;
      const name = nameRef.current || "there";
      speakFn(INACTIVITY_REMINDER(name), true);
      closeTimer.current = setTimeout(() => setIsOpen(false), CLOSE_MS);
    }, INACTIVITY_MS);
  }, [clearInactivity]);

  // ── Unique local message ID ────────────────────────────────────────────────

  const nextLocalId = () => `local-${++msgIdCounter.current}`;

  // ── Core speak ─────────────────────────────────────────────────────────────

  const speak = useCallback(async (text, { skipPersist = false } = {}) => {
    const localId = nextLocalId();
    let dbMessageId = null;

    if (!skipPersist && sessionId.current) {
      dbMessageId = await persistMessage(
        sessionId.current, nameRef.current, "nova", text
      );
    }

    const msgObj = { role: "nova", text, id: localId, messageId: dbMessageId };

    if (mutedRef.current) {
      setMessages((prev) => [...prev, msgObj]);
      return localId;
    }
    setIsSpeaking(true);
    setMessages((prev) => [...prev, msgObj]);
    await speakText(text, abortSpeechRef);
    setIsSpeaking(false);
    return localId;
  }, []);

  const speakAndResetTimer = useCallback(async (text, skipReset = false, opts = {}) => {
    const id = await speak(text, opts);
    if (!skipReset) resetInactivity(speakAndResetTimer);
    return id;
  }, [speak, resetInactivity]);

  // ── Submit feedback ────────────────────────────────────────────────────────

  const submitMessageFeedback = useCallback(async (messageId, helpful) => {
    await submitFeedback(messageId, helpful);
    setMessages((prev) =>
      prev.map((m) =>
        m.messageId === messageId ? { ...m, feedback: helpful } : m
      )
    );
  }, []);

  // ── Name capture ───────────────────────────────────────────────────────────

  const saveName = useCallback((name) => {
    setVisitorName(name);
    nameRef.current = name;
    try { localStorage.setItem(NAME_KEY, name); } catch {}
  }, []);

  // ── Lead capture step ──────────────────────────────────────────────────────

  const processLeadAnswer = useCallback(async (answer) => {
    const step    = stepRef.current;
    const fieldDef = LEAD_QUESTIONS[step];
    if (!fieldDef) return;

    leadRef.current[fieldDef.field] = answer;
    const nextStep = step + 1;
    stepRef.current = nextStep;
    setLeadStep(nextStep);

    if (nextStep < LEAD_QUESTIONS.length) {
      await speakAndResetTimer(LEAD_QUESTIONS[nextStep - 1].question);
    } else {
      const lead = {
        ...leadRef.current,
        name:      nameRef.current,
        timestamp: new Date().toISOString(),
        source:    typeof window !== "undefined" ? window.location.href : "",
      };
      await submitLead(lead);
      setStage("done");
      const email = lead.email;
      const confirmation = email?.includes("@")
        ? LEAD_CONFIRM(nameRef.current || "there", email)
        : LEAD_CONFIRM_NO_EMAIL(nameRef.current || "there");
      await speakAndResetTimer(confirmation);
    }
  }, [speakAndResetTimer]);

  // ── Handle transcript ──────────────────────────────────────────────────────

  const handleTranscript = useCallback(async (rawText) => {
    const text = normalizeTranscript(rawText);
    const localId = nextLocalId();
    let userDbId = null;

    if (sessionId.current) {
      userDbId = await persistMessage(sessionId.current, nameRef.current, "user", text);
    }

    setMessages((prev) => [...prev, { role: "user", text, id: localId, messageId: userDbId }]);
    clearInactivity();

    const currentStage = stageRef.current;
    const name = nameRef.current;

    if (currentStage === "ask_name") {
      const extracted = extractName(text);
      if (extracted) {
        saveName(extracted);
        setStage("chatting");
        stageRef.current = "chatting";
        await speakAndResetTimer(GREET_BY_NAME(extracted));
        return;
      }
      // No name detected — gracefully move to chatting and answer the actual question
      setStage("chatting");
      stageRef.current = "chatting";
      // falls through to normal response handling below
    }

    if (currentStage === "lead_capture") {
      await processLeadAnswer(text);
      return;
    }

    exchangeCountRef.current += 1;

    if (hasDemoIntent(text) && currentStage !== "done") {
      setStage("lead_capture");
      stepRef.current = 0;
      setLeadStep(0);
      leadRef.current = {};
      await speakAndResetTimer(LEAD_CAPTURE_INTRO(name || "there"));
      return;
    }

    const localAnswer = matchKnowledge(text, name);
    if (localAnswer) {
      await speakAndResetTimer(localAnswer);
      if (exchangeCountRef.current >= 3 && !ctaFiredRef.current) {
        ctaFiredRef.current = true;
        setTimeout(async () => {
          await speakAndResetTimer(PROACTIVE_CTA(name || "there"));
        }, 1500);
      }
      return;
    }

    // Claude AI with tool calling
    setIsThinking(true);
    const { answer, tool_call } = await fetchAIResponse(
      text,
      typeof window !== "undefined" ? window.location.pathname : "/",
      name,
      messagesRef.current,
    );
    setIsThinking(false);

    // Handle tool call if returned
    if (tool_call) {
      const toolResult = executeTool(tool_call.name, tool_call.input || {});
      if (toolResult === "TRIGGER_LEAD_CAPTURE" && currentStage !== "done") {
        setStage("lead_capture");
        stepRef.current = 0;
        setLeadStep(0);
        leadRef.current = {};
        await speakAndResetTimer(LEAD_CAPTURE_INTRO(name || "there"));
        return;
      }
      if (toolResult) {
        await speakAndResetTimer(toolResult);
        return;
      }
    }

    await speakAndResetTimer(answer);

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

    // Ensure session ID
    if (!sessionId.current) {
      sessionId.current = getOrCreateSessionId();
    }

    // Try to restore from Supabase
    const restored = await restoreSession(sessionId.current);
    const alreadyInteracted = (() => {
      try { return localStorage.getItem(INTERACTED_KEY) === "1"; } catch { return false; }
    })();
    try { localStorage.setItem(INTERACTED_KEY, "1"); } catch {}

    if (restored?.visitor_name) {
      saveName(restored.visitor_name);
      setStage("chatting");
      // Restore last 6 messages for continuity display
      if (restored.messages?.length) {
        const mapped = restored.messages.slice(-6).map((m, i) => ({
          role:      m.role === "nova" ? "nova" : "user",
          text:      m.content,
          id:        `restored-${i}`,
          messageId: m.id,
        }));
        setMessages(mapped);
      } else {
        setMessages([]);
      }
      await speakAndResetTimer(GREET_RETURNING(restored.visitor_name), false, { skipPersist: true });
    } else {
      const name = (() => { try { return localStorage.getItem(NAME_KEY) || ""; } catch { return ""; } })();
      if (name) {
        saveName(name);
        setStage("chatting");
        setMessages([]);
        await speakAndResetTimer(
          alreadyInteracted ? GREET_RETURNING(name) : GREET_BY_NAME(name),
          false, { skipPersist: true }
        );
      } else {
        setStage("ask_name");
        setMessages([]);
        await speakAndResetTimer(ASK_NAME_SCRIPT, false, { skipPersist: true });
      }
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
    rec.lang = (typeof navigator !== "undefined" && navigator.language) || "en-GB";
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

  // ── Text input submit ─────────────────────────────────────────────────────

  const submitText = useCallback(async (text) => {
    if (!text.trim()) return;
    await handleTranscript(text.trim());
  }, [handleTranscript]);

  const submitEmailFromText = useCallback(async (email) => {
    await processLeadAnswer(email.trim());
  }, [processLeadAnswer]);

  const interruptSpeech = useCallback(() => {
    if (abortSpeechRef.current) { abortSpeechRef.current(); abortSpeechRef.current = null; }
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    isOpen, isSpeaking, isListening, isMuted, isThinking,
    messages, visitorName, stage, leadStep,
    open, close, toggleMute,
    startListening, stopListening,
    announceRoute, submitEmailFromText, interruptSpeech,
    submitText, submitMessageFeedback,
  };
}
