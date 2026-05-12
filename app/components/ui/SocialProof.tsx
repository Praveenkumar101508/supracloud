"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LOGOS = [
  { name: "HSBC",        abbr: "HSBC",     color: "#DB0011" },
  { name: "Barclays",    abbr: "BARC",     color: "#00AEEF" },
  { name: "Lloyds",      abbr: "LLOY",     color: "#006A4D" },
  { name: "Monzo",       abbr: "MNZO",     color: "#FF4F64" },
  { name: "Tesco",       abbr: "TSCO",     color: "#EE1C2E" },
  { name: "Sainsbury's", abbr: "SBRY",     color: "#FF6600" },
  { name: "Starling",    abbr: "STAR",     color: "#6935D3" },
  { name: "Revolut",     abbr: "RVLT",     color: "#0075EB" },
];

// Duplicate for seamless loop
const TRACK = [...LOGOS, ...LOGOS];

interface SocialProofProps {
  className?: string;
}

export function SocialProof({ className }: SocialProofProps) {
  return (
    <section className={cn("relative py-16 px-4 overflow-hidden", className)}>
      {/* Subtle horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.12)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.12)] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-center text-[11px] font-semibold tracking-[0.18em] uppercase text-white/25 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by UK Fintechs &amp; Retail Leaders
        </motion.p>

        {/* Marquee */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {TRACK.map((logo, i) => (
              <LogoChip key={`${logo.abbr}-${i}`} logo={logo} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LogoChip({ logo }: { logo: (typeof LOGOS)[number] }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(0,245,255,0.15)] hover:bg-[rgba(0,245,255,0.03)] transition-colors cursor-default select-none whitespace-nowrap group">
      {/* Colour dot */}
      <span
        className="w-2.5 h-2.5 rounded-full opacity-50 group-hover:opacity-80 transition-opacity"
        style={{ background: logo.color }}
      />
      {/* Ticker */}
      <span className="text-xs font-bold text-white/30 group-hover:text-white/55 transition-colors font-mono tracking-wider">
        {logo.abbr}
      </span>
      {/* Full name */}
      <span className="text-xs text-white/20 group-hover:text-white/40 transition-colors">
        {logo.name}
      </span>
    </div>
  );
}

export default SocialProof;
