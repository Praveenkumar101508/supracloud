"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingDetails {
  date: string;      // ISO string
  duration: number;  // minutes
  title: string;
  description?: string;
  location?: string;
}

interface BookingSuccessModalProps {
  open: boolean;
  onClose: () => void;
  booking?: BookingDetails;
}

// ─── Confetti particle ────────────────────────────────────────────────────────
const CONFETTI_COLORS = ["#00F5FF", "#8B5CF6", "#FF8C00", "#00FF9F", "#FF4488"];

function Particle({ i }: { i: number }) {
  const angle    = (i / 40) * 360;
  const distance = 80 + Math.random() * 120;
  const color    = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
  const delay    = Math.random() * 0.3;
  const size     = 4 + Math.random() * 6;

  return (
    <motion.div
      className="absolute pointer-events-none rounded-sm"
      style={{
        width: size,
        height: size,
        background: color,
        top: "50%",
        left: "50%",
        marginTop: -size / 2,
        marginLeft: -size / 2,
        originX: "50%",
        originY: "50%",
      }}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance - 60,
        opacity: 0,
        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
        scale: 0.2,
      }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

// ─── Generate .ics calendar content ──────────────────────────────────────────
function generateIcs(b: BookingDetails): string {
  const start = new Date(b.date);
  const end   = new Date(start.getTime() + b.duration * 60 * 1000);
  const fmt   = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SupraCloud//Nova//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@supracloud.co.uk`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${b.title}`,
    b.description ? `DESCRIPTION:${b.description}` : "",
    b.location    ? `LOCATION:${b.location}`    : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

function downloadIcs(b: BookingDetails) {
  const blob = new Blob([generateIcs(b)], { type: "text/calendar;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "supracloud-booking.ics";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export function BookingSuccessModal({ open, onClose, booking }: BookingSuccessModalProps) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (open) {
      setShowParticles(true);
      const t = setTimeout(() => setShowParticles(false), 1500);
      return () => clearTimeout(t);
    }
  }, [open]);

  const formattedDate = booking
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit", timeZone: "Europe/London",
      }).format(new Date(booking.date))
    : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden text-center"
            style={{
              background: "rgba(8,8,20,0.95)",
              border: "1px solid rgba(0,245,255,0.3)",
              boxShadow: "0 0 60px rgba(0,245,255,0.2), 0 30px 80px rgba(0,0,0,0.6)",
            }}
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            {/* Confetti origin */}
            <div className="relative h-0">
              <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <AnimatePresence>
                  {showParticles &&
                    Array.from({ length: 40 }).map((_, i) => (
                      <Particle key={i} i={i} />
                    ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="px-8 pt-12 pb-8">
              {/* Holographic checkmark */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: "radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)",
                      border: "2px solid rgba(0,245,255,0.4)",
                      boxShadow: "0 0 40px rgba(0,245,255,0.3)",
                    }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <motion.path
                        d="M10 25L20 35L38 14"
                        stroke="#00F5FF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </svg>
                  </motion.div>
                  {/* Orbit ring */}
                  <motion.div
                    className="absolute inset-[-8px] rounded-full border border-[#8B5CF6]/40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-[#00F5FF]/80 text-sm mb-6">
                Your AI strategy session is locked in. Nova will brief the team.
              </p>

              {/* Booking details */}
              {booking && (
                <div
                  className="rounded-xl p-4 mb-6 text-left"
                  style={{
                    background: "rgba(0,245,255,0.05)",
                    border: "1px solid rgba(0,245,255,0.15)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[#00F5FF] text-lg mt-0.5">📅</span>
                    <div>
                      <p className="text-white font-medium text-sm">{booking.title}</p>
                      <p className="text-white/60 text-xs mt-0.5">{formattedDate}</p>
                      <p className="text-white/40 text-xs">{booking.duration} minutes · London (BST)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar buttons */}
              <div className="flex flex-col gap-3 mb-6">
                {booking && (
                  <button
                    onClick={() => downloadIcs(booking)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-[#00F5FF] border border-[#00F5FF]/30 bg-[#00F5FF]/05 hover:bg-[#00F5FF]/12 transition-colors"
                  >
                    📥 Add to Calendar (.ics)
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

              <p className="text-white/30 text-xs">
                A confirmation has been sent to your email.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BookingSuccessModal;
