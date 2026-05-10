"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StickyBookingBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyDismissed = sessionStorage.getItem("stickyBarDismissed") === "1";
      if (alreadyDismissed) {
        setDismissed(true);
        return;
      }
    }

    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("stickyBarDismissed", "1");
    }
  }

  if (dismissed || pathname === "/book") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#0A192F",
        borderTop: "1px solid rgba(16,185,129,0.2)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <p style={{ color: "#cbd5e1", fontSize: "14px", fontWeight: 500, margin: 0 }}>
          Ready to deploy production AI?
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: "8px",
              backgroundColor: "#10B981",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Book a Discovery Call
          </Link>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              fontSize: "18px",
              padding: "4px 8px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
