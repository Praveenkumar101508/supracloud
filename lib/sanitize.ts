/**
 * Input sanitization and prompt injection detection.
 * All user-supplied strings must pass through here before being sent to any AI model.
 */

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
  /ignore\s+(all\s+)?(previous|above|prior)\s+instructions?/i,
  /forget\s+(all\s+)?(previous|above|prior|your)\s+instructions?/i,
  /you\s+are\s+now\s+/i,
  /new\s+(persona|personality|role|instructions?)\s*:/i,
  /pretend\s+(to\s+be|you\s+are)/i,
  /roleplay\s+as/i,
  /act\s+as\s+(if\s+you\s+are\s+)?(?!a\s+customer|an?\s+engineer|a\s+banker)/i,
  /disregard\s+(all\s+)?(your\s+)?(previous\s+)?(instructions?|rules?|guidelines?)/i,
  /override\s+(your\s+)?(safety|system|previous)\s+/i,
  /jailbreak/i,
  /developer\s+mode/i,
  /\bDAN\b/,
  /\[INST\]/i,
  /<<SYS>>/i,
  /system\s*:\s*you\s+are/i,
  /reveal\s+(your\s+)?(system\s+)?(prompt|instructions?|training)/i,
  /what\s+(is|are)\s+your\s+(system\s+)?(prompt|instructions?)/i,
  /repeat\s+.{0,30}(above|previous|system|prompt)/i,
  /print\s+.{0,20}(above|system|prompt|instruction)/i,
];

const ANOMALY_PATTERNS: RegExp[] = [
  /(.)\1{8,}/,        // 9+ repeated characters (e.g. aaaaaaaaa)
  /<script/i,
  /javascript:/i,
  /on\w+\s*=/i,       // onerror=, onclick= etc.
  /\beval\s*\(/i,
  /\bexec\s*\(/i,
  /\$\{.*\}/,         // template injection
  /\{\{.*\}\}/,       // template injection
];

export type SanitiseResult =
  | { safe: true;  text: string }
  | { safe: false; reason: string };

/**
 * Check a user message for prompt injection or anomalous content.
 * Returns { safe: true, text } or { safe: false, reason }.
 */
export function checkInjection(input: string): SanitiseResult {
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
  /ignore\s+all\s+previous/i,
  /system\s+prompt\s+is/i,
  /my\s+(system\s+)?(prompt|instructions?)\s+(is|are|say)/i,
  /as\s+an?\s+AI\s+(language\s+)?model,?\s+I\s+(cannot|don't)/i,
];

/**
 * Validate an AI model output before returning it to the user.
 * Returns the text if clean, or a fallback message if suspect.
 */
export function validateOutput(
  text: string,
  fallback = "I'm not able to help with that. Please book a discovery call and our engineers will assist directly."
): string {
  for (const pattern of OUTPUT_BLOCKLIST) {
    if (pattern.test(text)) return fallback;
  }
  // Hard cap on response length
  if (text.length > 3000) return truncate(text, 3000);
  return text;
}

// ── IP hashing for audit logs (privacy-preserving) ───────────────────────────

import { createHash } from "crypto";

/** One-way hash of an IP address for audit logging. Not reversible. */
export function hashIp(ip: string): string {
  return createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT || "sc-default-salt"))
    .digest("hex")
    .slice(0, 16);
}
