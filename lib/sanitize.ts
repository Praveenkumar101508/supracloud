/**
 * Input sanitization and prompt injection detection.
 * All user-supplied strings must pass through here before being sent to any AI model.
 */

import { createHash } from "crypto";

// ── HTML / script stripping ────────────────────────────────────────────────────

/** Strip HTML tags and decode common HTML entities. */
export function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .trim();
}

/** Truncate a string to a maximum byte-safe length. */
export function truncate(input: string, maxChars: number): string {
  if (input.length <= maxChars) return input;
  return input.slice(0, maxChars).trim() + "…";
}

/** Normalise whitespace — collapse runs of spaces/newlines into single space. */
export function normaliseWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

/** Full pipeline: strip HTML → collapse whitespace → truncate. */
export function sanitiseText(input: string, maxChars = 2000): string {
  return truncate(normaliseWhitespace(stripHtml(input)), maxChars);
}

// ── Prompt injection detection ─────────────────────────────────────────────────

const INJECTION_PATTERNS: RegExp[] = [
  // Classic instruction overrides
  /ignore\s+(all\s+)?(previous|above|prior)\s+instructions?/i,
  /forget\s+(all\s+)?(previous|above|prior|your)\s+instructions?/i,
  /disregard\s+(all\s+)?(your\s+)?(previous\s+)?(instructions?|rules?|guidelines?)/i,
  /override\s+(your\s+)?(safety|system|previous)\s+/i,
  /bypass\s+(your\s+)?(safety|restrictions?|filters?|guidelines?)/i,

  // Role / identity reassignment
  /you\s+are\s+now\s+/i,
  /new\s+(persona|personality|role|instructions?)\s*:/i,
  /pretend\s+(to\s+be|you\s+are)/i,
  /roleplay\s+as/i,
  /act\s+as\s+(if\s+you\s+are\s+)?(?!a\s+customer|an?\s+engineer|a\s+banker|a\s+developer)/i,
  /impersonate\s+/i,
  /simulate\s+(being|a|an)\s+/i,
  /from\s+now\s+on\s+(you|your|act|behave)/i,

  // Jailbreaks
  /jailbreak/i,
  /developer\s+mode/i,
  /\bDAN\b/,
  /do\s+anything\s+now/i,
  /grandma\s+(exploit|trick|jailbreak)/i,
  /opposite\s+(mode|day)/i,
  /evil\s+(mode|twin|version)/i,
  /unrestricted\s+(mode|ai|version)/i,
  /\bAIM\b.*Machiavelli/,
  /\bSTAN\b.*strive\s+to\s+avoid/i,

  // System prompt probing / extraction
  /reveal\s+(your\s+)?(system\s+)?(prompt|instructions?|training)/i,
  /what\s+(is|are)\s+your\s+(system\s+)?(prompt|instructions?)/i,
  /repeat\s+.{0,30}(above|previous|system|prompt)/i,
  /print\s+.{0,20}(above|system|prompt|instruction)/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?(prompt|instructions?)/i,
  /output\s+(your\s+)?(system\s+)?(prompt|instructions?)/i,
  /tell\s+me\s+(your|the)\s+(system\s+)?(prompt|instructions?)/i,
  /what\s+were\s+you\s+(told|instructed|trained)/i,

  // Format injection attempts
  /\[INST\]/i,
  /<<SYS>>/i,
  /\[\/INST\]/i,
  /<\|im_start\|>/i,
  /<\|im_end\|>/i,
  /system\s*:\s*you\s+are/i,
  /assistant\s*:\s*sure[,!]?\s+here/i,

  // Indirect injection via context
  /the\s+following\s+(is\s+)?(a\s+new\s+)?(instruction|directive|command)/i,
  /###\s*(instruction|system|human|assistant)/i,
  /\*\*\*(instruction|system|override)\*\*\*/i,
];

const ANOMALY_PATTERNS: RegExp[] = [
  /(.)\1{8,}/,        // 9+ repeated characters (e.g. aaaaaaaaa)
  /<script/i,
  /javascript:/i,
  /on\w+\s*=/i,       // onerror=, onclick= etc.
  /\beval\s*\(/i,
  /\bexec\s*\(/i,
  /\$\{.*\}/,         // template injection ${...}
  /\{\{.*\}\}/,       // template injection {{...}}
  /`[^`]{0,200}`/,    // backtick template literals
  /\bbase64_decode\b/i,
  /\batob\s*\(/i,
  /data:text\/html/i,
  /vbscript:/i,
];

// Fintech / regulatory red-flags — these trigger softer handling (redirect, not block)
const REGULATORY_SENSITIVITY_PATTERNS: RegExp[] = [
  /account\s+(number|details|balance|statement)/i,
  /sort\s+code/i,
  /national\s+insurance/i,
  /social\s+security\s+number/i,
  /\bssn\b/i,
  /credit\s+card\s+(number|details|cvv)/i,
  /bank\s+login/i,
  /online\s+banking\s+(password|pin|credentials)/i,
  /transfer\s+funds?\s+to/i,
  /wire\s+transfer\s+(instructions?|to)/i,
];

export type SanitiseResult =
  | { safe: true;  text: string }
  | { safe: false; reason: string; regulatory?: boolean };

/**
 * Check a user message for prompt injection or anomalous content.
 * Returns { safe: true, text } or { safe: false, reason }.
 */
export function checkInjection(input: string): SanitiseResult {
  const lower = input.toLowerCase();

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      return {
        safe:   false,
        reason: "Message contains disallowed instruction-override patterns.",
      };
    }
  }

  for (const pattern of ANOMALY_PATTERNS) {
    if (pattern.test(input)) {
      return {
        safe:   false,
        reason: "Message contains disallowed content.",
      };
    }
  }

  // Check for regulatory-sensitive content — flag but don't hard-block
  for (const pattern of REGULATORY_SENSITIVITY_PATTERNS) {
    if (pattern.test(lower)) {
      return {
        safe:       false,
        reason:     "Message contains potentially sensitive regulated data.",
        regulatory: true,
      };
    }
  }

  return { safe: true, text: input };
}

/**
 * Combined pipeline: sanitise + injection check.
 * Use before passing any user input to an AI model.
 */
export function sanitiseAndCheck(
  raw: string,
  maxChars = 2000
): SanitiseResult {
  const cleaned = sanitiseText(raw, maxChars);
  return checkInjection(cleaned);
}

// ── Output validation ─────────────────────────────────────────────────────────

const OUTPUT_BLOCKLIST: RegExp[] = [
  // System prompt leakage
  /ignore\s+all\s+previous/i,
  /system\s+prompt\s+is/i,
  /my\s+(system\s+)?(prompt|instructions?)\s+(is|are|say)/i,
  /my\s+instructions\s+(say|include|tell)/i,

  // AI identity disclosure that signals prompt override
  /as\s+an?\s+AI\s+(language\s+)?model,?\s+I\s+(cannot|don't)/i,
  /i\s+am\s+(actually|really)\s+(GPT|ChatGPT|OpenAI|Gemini|Bard|LLaMA)/i,

  // Financial credential / account data in response
  /account\s+number\s*:\s*\d/i,
  /sort\s+code\s*:\s*\d/i,
  /cvv\s*:\s*\d{3}/i,

  // PII patterns that should never appear in responses
  /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/, // card-like numbers
  /\bSS?\d{7}\b/i, // NI / SSN-like
];

/**
 * Validate an AI model output before returning it to the user.
 * Returns the text if clean, or a fallback message if suspect.
 */
export function validateOutput(
  text: string,
  fallback = "I'm not able to help with that. If you have a genuine question about SupraCloud's services, I'm here — or you can reach our team directly via the Contact page."
): string {
  for (const pattern of OUTPUT_BLOCKLIST) {
    if (pattern.test(text)) return fallback;
  }
  // Hard cap on response length
  if (text.length > 3000) return truncate(text, 3000);
  return text;
}

// ── IP hashing for audit logs (privacy-preserving) ───────────────────────────

/** One-way hash of an IP address for audit logging. Not reversible. */
export function hashIp(ip: string): string {
  return createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT || "sc-default-salt"))
    .digest("hex")
    .slice(0, 16);
}
