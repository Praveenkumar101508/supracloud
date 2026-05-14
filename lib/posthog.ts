import posthog from "posthog-js";

let initialised = false;

export function initPostHog() {
  if (initialised || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    capture_pageview: false,   // manual pageviews via PostHogProvider
    persistence: "localStorage+cookie",
    autocapture: false,        // manual events only — reduces noise
  });
  initialised = true;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    posthog.capture(event, properties);
  } catch {
    // PostHog not initialised yet — silently skip
  }
}

export { posthog };
