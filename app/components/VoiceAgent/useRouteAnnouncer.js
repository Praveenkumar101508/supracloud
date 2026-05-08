"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires onRouteChange(pathname) whenever the Next.js route changes.
 * Skips the very first mount to avoid double-announcing on page load.
 */
export function useRouteAnnouncer(onRouteChange) {
  const pathname = usePathname();
  const isFirstMount = useRef(true);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      onRouteChange(pathname);
    }
  }, [pathname, onRouteChange]);

  return pathname;
}
