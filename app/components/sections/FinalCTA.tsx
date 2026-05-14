"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { Calendar, MessageSquare, ArrowRight } from "lucide-react";

const TRUST_POINTS = [
  "30-minute engineer call — no sales deck",
  "Realistic estimate on the first call",
  "NDA before any technical discussion",
  "No obligation to proceed",
];

export function FinalCTA() {
  return (
    <section className="relative py-36 px-4 overflow-hidden">
      {/* Rich ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,255,0.07) 0%, transparent 65%), " +
              "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 60%), " +
              "radial-gradient(ellipse 40% 30% at 10% 80%, rgba(0,245,255,0.05) 0%, transparent 60%)",
          }}
        />
        {/* Animated grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: "rgba(0,245,255,0.06)",
              color:      "#00F5FF",
              border:     "1px solid rgba(0,245,255,0.2)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Engineers Available Now
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6">
            Ready to Transform
            <br />
            <span
              style={{
                background:           "linear-gradient(135deg, #00F5FF 0%, #8B5CF6 60%, #00F5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
              }}
            >
              Your Operations?
            </span>
          </h2>
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="text-white/45 text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your first AI agent can be live in 6 weeks — built inside your cloud
          tenant, FCA-compliant, and improving from day one.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlowButton
            variant="cyan"
            size="lg"
            href="/book"
            className="flex items-center gap-2"
          >
            <Calendar size={16} />
            Book a Discovery Call
          </GlowButton>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("nova:open"))}
            className="flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold transition-all"
            style={{
              background: "rgba(139,92,246,0.1)",
              border:     "1px solid rgba(139,92,246,0.3)",
              color:      "#8B5CF6",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(139,92,246,0.18)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(139,92,246,0.1)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
            }}
          >
            <MessageSquare size={16} />
            Ask Nova First
          </button>
        </motion.div>

        {/* Trust points */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          {TRUST_POINTS.map((point) => (
            <span key={point} className="flex items-center gap-1.5 text-xs text-white/30">
              <ArrowRight size={10} className="text-[#00F5FF]/60 shrink-0" />
              {point}
            </span>
          ))}
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          className="mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[10px] font-bold tracking-wider uppercase text-white/20 mb-5">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold text-white/20">
            {["HSBC", "Barclays", "Lloyds", "Monzo", "Tesco", "Sainsbury's", "Starling", "Revolut"].map((name) => (
              <span key={name} className="hover:text-white/40 transition-colors">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
