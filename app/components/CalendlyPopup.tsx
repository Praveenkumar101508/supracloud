"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/supracloud/discovery";

export function CalendlyPopup({ isOpen, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const iframeSrc = `${CALENDLY_URL}?embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{
            position: "fixed", inset: 0, zIndex: 9998,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#0d0d0d",
              borderRadius: 16,
              border: "1px solid rgba(0,112,255,0.2)",
              boxShadow: "0 0 80px rgba(0,112,255,0.15)",
              width: "100%", maxWidth: 820,
              height: "min(85vh, 700px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header bar */}
            <div style={{
              height: 48, background: "#111",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#9CA3AF" }}>
                Book a Discovery Call · 30 min · SupraCloud
              </span>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8, padding: "6px 10px",
                  cursor: "pointer", color: "#9CA3AF",
                  display: "flex", alignItems: "center", gap: 4,
                  fontSize: 12,
                }}
              >
                <X size={14} /> Close
              </button>
            </div>

            <iframe
              src={iframeSrc}
              style={{ width: "100%", height: "calc(100% - 48px)", border: "none" }}
              title="Book a Discovery Call with SupraCloud"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
