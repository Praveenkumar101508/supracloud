"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { Calendar, MessageSquare, Shield, CheckCircle } from "lucide-react";

const TRUST_POINTS = [
  "Engineer-led discovery — no sales deck, no pitch",
  "Tailored proposal prepared before second call",
  "NDA signed before any technical discussion",
  "No obligation or commitment to proceed",
];

const ASSURANCES = [
  { icon: Shield, text: "Zero data exfiltration" },
  { icon: Shield, text: "Full tenant isolation" },
  { icon: Shield, text: "FCA / GDPR-ready" },
];

export function FinalCTA() {
  return (
    <section className="relative py-36 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 65%), " +
              "radial-gradient(ellipse 50% 40% at 85% 15%, rgba(139,92,246,0.07) 0%, transparent 60%), " +
              "radial-gradient(ellipse 40% 30% at 10% 85%, rgba(0,245,255,0.04) 0%, transparent 60%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.6) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(0,245,255,0.6) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[10px] font-bold tracking-widest uppercase"
            style={{
              background: "rgba(0,245,255,0.05)",
              color:      "#00F5FF",
              border:     "1px solid rgba(0,245,255,0.18)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Solutions Team Available
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl md:text-[68px] font-black leading-[1.04] tracking-tight mb-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          Your Enterprise AI
          <br />
          <span
            style={{
              background:           "linear-gradient(135deg, #00F5FF 0%, #8B5CF6 55%, #00F5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
            }}
          >
            Starts Here.
          </span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-white/42 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          A 30-minute discovery call with a SupraCloud solutions engineer gives
          you a concrete assessment of how AI agents can be deployed inside your
          existing environment — with a tailored proposal prepared in advance.
        </motion.p>

        {/* Compliance assurances */}
        <motion.div
          className="inline-flex flex-wrap justify-center items-center gap-x-5 gap-y-2 px-5 py-2.5 rounded-xl mb-10"
          style={{
            background: "rgba(0,245,255,0.03)",
            border:     "1px solid rgba(0,245,255,0.1)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          {ASSURANCES.map(({ text }, i) => (
            <span key={text} className="flex items-center gap-1.5 text-xs text-white/50">
              {i > 0 && <span className="text-white/12 hidden sm:inline">·</span>}
              <CheckCircle size={10} className="text-[#00F5FF]/70 shrink-0" />
              {text}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlowButton variant="cyan" size="lg" href="/book">
            <Calendar size={15} />
            Book a Discovery Call
          </GlowButton>

          <button
            onClick={() => document.dispatchEvent(new CustomEvent("nova:open"))}
            className="flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold transition-all duration-200"
            style={{
              background:  "rgba(139,92,246,0.08)",
              border:      "1px solid rgba(139,92,246,0.25)",
              color:       "#8B5CF6",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background   = "rgba(139,92,246,0.15)";
              e.currentTarget.style.borderColor  = "rgba(139,92,246,0.45)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background   = "rgba(139,92,246,0.08)";
              e.currentTarget.style.borderColor  = "rgba(139,92,246,0.25)";
            }}
          >
            <MessageSquare size={15} />
            Speak with Nova
          </button>
        </motion.div>

        {/* Trust points */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-7 gap-y-2.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.42 }}
        >
          {TRUST_POINTS.map((point) => (
            <span key={point} className="flex items-center gap-1.5 text-xs text-white/28">
              <span className="w-1 h-1 rounded-full bg-[#00F5FF]/40 shrink-0" />
              {point}
            </span>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.52 }}
        >
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/18 mb-5">
            Trusted by leading financial institutions and retailers
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2.5">
            {["HSBC", "Barclays", "Lloyds", "Monzo", "Tesco", "Sainsbury's", "Starling", "Revolut"].map((name) => (
              <span
                key={name}
                className="text-[13px] font-semibold text-white/18 hover:text-white/38 transition-colors duration-300"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
