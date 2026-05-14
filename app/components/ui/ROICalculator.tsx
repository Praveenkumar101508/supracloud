"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HolographicCard } from "./HolographicCard";
import { GlowButton } from "./GlowButton";
import { track } from "@/lib/posthog";

const INDUSTRIES = [
  { id: "banking",    label: "Banking / Fintech",  multiplier: 1.0,  avgCost: 3.5 },
  { id: "retail",     label: "Retail / E-commerce", multiplier: 0.85, avgCost: 2.0 },
  { id: "insurance",  label: "Insurance",           multiplier: 1.1,  avgCost: 4.0 },
  { id: "healthcare", label: "Healthcare / NHS",    multiplier: 0.9,  avgCost: 3.0 },
  { id: "other",      label: "Other Enterprise",    multiplier: 0.8,  avgCost: 2.5 },
];

const DEFLECTION = 0.72;

function formatGBP(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `£${(n / 1_000).toFixed(0)}k`;
  return `£${n.toLocaleString()}`;
}

function SliderField({
  label,
  min,
  max,
  step,
  value,
  onChange,
  display,
  color = "#00F5FF",
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  display: string;
  color?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-white/50">{label}</span>
        <span className="font-bold" style={{ color }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
        }}
        aria-label={label}
      />
    </div>
  );
}

export function ROICalculator() {
  const [volume, setVolume]   = useState(10_000);
  const [costPer, setCostPer] = useState(3.5);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [shared, setShared]   = useState(false);

  const deflected    = Math.round(volume * DEFLECTION * industry.multiplier);
  const monthlySave  = Math.round(deflected * costPer);
  const annualSave   = monthlySave * 12;
  const paybackWks   = monthlySave > 0 ? Math.max(4, Math.round(24_000 / monthlySave)) : 0;

  const bars = [
    { label: "Current Cost",   value: volume * costPer,  color: "rgba(255,255,255,0.15)", max: volume * costPer },
    { label: "After SupraCloud", value: (volume - deflected) * costPer, color: "#00F5FF", max: volume * costPer },
  ];

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("roi_vol", String(volume));
    url.searchParams.set("roi_cost", String(costPer));
    url.searchParams.set("roi_ind", industry.id);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    });
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HolographicCard variant="cyan" className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[10px] font-bold tracking-wider uppercase"
                style={{
                  background: "rgba(0,245,255,0.08)",
                  color: "#00F5FF",
                  border: "1px solid rgba(0,245,255,0.18)",
                }}
              >
                ROI Estimator
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Your Savings, Calculated
              </h2>
              <p className="text-white/40 text-sm">
                Adjust the inputs below — we update in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* ── Left: Inputs ── */}
              <div className="space-y-7">
                {/* Industry selector */}
                <div>
                  <p className="text-sm text-white/50 mb-3">Industry</p>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <button
                        key={ind.id}
                        onClick={() => {
                          setIndustry(ind);
                          setCostPer(ind.avgCost);
                          track("roi_calculator_changed", { field: "industry", value: ind.id });
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                        style={{
                          background:
                            industry.id === ind.id
                              ? "rgba(0,245,255,0.15)"
                              : "rgba(255,255,255,0.04)",
                          border:
                            industry.id === ind.id
                              ? "1px solid rgba(0,245,255,0.45)"
                              : "1px solid rgba(255,255,255,0.08)",
                          color: industry.id === ind.id ? "#00F5FF" : "rgba(255,255,255,0.45)",
                        }}
                      >
                        {ind.label}
                      </button>
                    ))}
                  </div>
                </div>

                <SliderField
                  label="Monthly queries / transactions"
                  min={500}
                  max={500_000}
                  step={500}
                  value={volume}
                  onChange={(v) => { setVolume(v); track("roi_calculator_changed", { field: "volume", value: v }); }}
                  display={volume.toLocaleString()}
                />

                <SliderField
                  label="Average cost per query (£)"
                  min={0.5}
                  max={12}
                  step={0.5}
                  value={costPer}
                  onChange={(v) => { setCostPer(v); track("roi_calculator_changed", { field: "cost_per_query", value: v }); }}
                  display={`£${costPer.toFixed(2)}`}
                  color="#8B5CF6"
                />

                {/* Small print */}
                <p className="text-[10px] text-white/20 leading-relaxed">
                  Based on {Math.round(DEFLECTION * industry.multiplier * 100)}% deflection
                  rate for {industry.label}. Estimates are conservative.
                  Book a call for a precise, project-specific ROI model.
                </p>
              </div>

              {/* ── Right: Output ── */}
              <div className="flex flex-col gap-5">
                {/* Bar chart */}
                <div
                  className="rounded-xl p-5 space-y-4"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-[10px] font-bold tracking-wider uppercase text-white/25">
                    Monthly query cost comparison
                  </p>
                  {bars.map((bar) => (
                    <div key={bar.label} className="space-y-1.5">
                      <div className="flex justify-between text-xs text-white/40">
                        <span>{bar.label}</span>
                        <span className="font-mono" style={{ color: bar.color }}>
                          {formatGBP(bar.value)}
                        </span>
                      </div>
                      <div
                        className="h-2.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: bar.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(bar.value / bars[0].value) * 100}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Monthly saving",   value: formatGBP(monthlySave),  color: "#00F5FF" },
                    { label: "Annual saving",     value: formatGBP(annualSave),   color: "#8B5CF6" },
                    { label: "Queries deflected", value: deflected.toLocaleString(), color: "#10B981" },
                    { label: "Payback period",    value: `~${paybackWks} wks`,    color: "#F97316" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="text-center rounded-xl py-4 px-2"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={m.value}
                          className="text-xl font-black"
                          style={{ color: m.color }}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {m.value}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-[10px] text-white/30 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Action row */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <GlowButton variant="cyan" size="md" href="/book" fullWidth>
                    Book a Discovery Call — Get My Precise ROI
                  </GlowButton>
                  <button
                    onClick={handleShare}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: shared ? "#00F5FF" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {shared ? "Link copied to clipboard ✓" : "Share this estimate"}
                  </button>
                </div>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}

export default ROICalculator;
