"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
  }
}

/**
 * Loads the Lucide icon library once on the client and re-creates icons
 * after each page render so any <i data-lucide="..."> nodes are replaced.
 */
export default function LucideInit() {
  useEffect(() => {
    const ensure = () =>
      new Promise<void>((resolve) => {
        if (window.lucide) return resolve();
        const s = document.createElement("script");
        s.src = "https://unpkg.com/lucide@latest";
        s.async = true;
        s.onload = () => resolve();
        document.head.appendChild(s);
      });
    ensure().then(() => window.lucide?.createIcons());
  });
  return null;
}
