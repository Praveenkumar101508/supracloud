"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "sc_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "false");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] px-4 py-4"
      style={{ backgroundColor: "#0A192F", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          We use cookies to improve your experience. By continuing to use SupraCloud, you agree to our use of cookies.{" "}
          <a href="/privacy" className="underline text-emerald-400 hover:text-emerald-300">
            Learn more
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600 rounded-md hover:border-slate-400 hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-semibold text-white rounded-md bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
