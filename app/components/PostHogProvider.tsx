"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPostHog, track } from "@/lib/posthog";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();
  }, []);

  // Manual pageview on route change
  useEffect(() => {
    track("$pageview", { $current_url: window.location.href });
  }, [pathname]);

  return <>{children}</>;
}
