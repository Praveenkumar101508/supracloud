"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";

type Status = "yes" | "no" | "partial";

interface Row {
  feature: string;
  supra: Status;
  generic: Status;
  inhouse: Status;
  note?: string;
}

const ROWS: Row[] = [
  {
    feature: "UK deployment & data sovereignty",
    supra: "yes", generic: "partial", inhouse: "yes",
    note: "Your cloud tenant, your data — we never touch it",
  },
  {
    feature: "FCA-ready audit trails & explainability",
    supra: "yes", generic: "no", inhouse: "partial",
    note: "Built in from day one, not retrofitted",
  },
  {
    feature: "Production-ready in 4–6 weeks",
    supra: "yes", generic: "no", inhouse: "no",
    note: "Generic vendors need 6–18 months; in-house typically 12–24",
  },
  {
    feature: "Self-improving agents (no manual retraining)",
    supra: "yes", generic: "no", inhouse: "partial",
    note: "Continuous feedback loops baked into the architecture",
  },
  {
    feature: "Legacy system integration (no rip-and-replace)",
    supra: "yes", generic: "partial", inhouse: "partial",
    note: "API-first, connects to core banking, ERPs, CRMs",
  },
  {
    feature: "Engineer-led engagement (not sales-led)",
    supra: "yes", generic: "no", inhouse: "yes",
    note: "Technical estimate on first call — no discovery theatre",
  },
  {
    feature: "Fixed-scope delivery with defined SLAs",
    supra: "yes", generic: "partial", inhouse: "no",
    note: "Transparent pricing; no open-ended T&M engagements",
  },
  {
    feature: "Ongoing agent optimisation included",
    supra: "yes", generic: "no", inhouse: "partial",
    note: "Post-launch monitoring, deflection improvement, updates",
  },
];

const COLS = [
  { key: "supra",   label: "SupraCloud",      highlight: true  },
  { key: "generic", label: "Generic AI Vendor", highlight: false },
  { key: "inhouse", label: "In-house Build",    highlight: false },
] as const;

function StatusIcon({ status }: { status: Status }) {
  if (status === "yes")
    return <CheckCircle size={16} className="shrink-0" style={{ color: "#10B981" }} />;
  if (status === "no")
    return <XCircle size={16} className="shrink-0" style={{ color: "rgba(255,255,255,0.18)" }} />;
  return <MinusCircle size={16} className="shrink-0" style={{ color: "#F97316" }} />;
}

export function ComparisonTable() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: "rgba(0,245,255,0.08)",
              color: "#00F5FF",
              border: "1px solid rgba(0,245,255,0.18)",
            }}
          >
            Capability Comparison
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Why SupraCloud Wins
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            A clear-eyed comparison across the options regulated enterprises actually consider.
          </p>
        </motion.div>

        {/* Table card */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(8,8,20,0.7)",
            border: "1px solid rgba(0,245,255,0.12)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Column headers */}
          <div
            className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[1fr_140px_140px_140px]
                       gap-0 text-xs font-bold tracking-wider uppercase"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="px-5 py-4 text-white/20">Capability</div>
            {COLS.map((col) => (
              <div
                key={col.key}
                className="px-3 py-4 text-center"
                style={{
                  background: col.highlight ? "rgba(0,245,255,0.05)" : "transparent",
                  borderLeft: col.highlight
                    ? "1px solid rgba(0,245,255,0.12)"
                    : "1px solid rgba(255,255,255,0.04)",
                  color: col.highlight ? "#00F5FF" : "rgba(255,255,255,0.25)",
                }}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[1fr_140px_140px_140px]
                         gap-0 group"
              style={{
                borderBottom:
                  i < ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Feature label */}
              <div className="px-5 py-4">
                <p className="text-sm text-white/75 group-hover:text-white transition-colors">
                  {row.feature}
                </p>
                {row.note && (
                  <p className="text-[11px] text-white/25 mt-0.5 hidden sm:block">{row.note}</p>
                )}
              </div>

              {/* Status cells */}
              {COLS.map((col) => (
                <div
                  key={col.key}
                  className="flex items-center justify-center px-3 py-4"
                  style={{
                    background: col.highlight
                      ? "rgba(0,245,255,0.03)"
                      : "transparent",
                    borderLeft: col.highlight
                      ? "1px solid rgba(0,245,255,0.08)"
                      : "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  <StatusIcon status={row[col.key]} />
                </div>
              ))}
            </motion.div>
          ))}

          {/* Footer legend */}
          <div
            className="flex flex-wrap items-center gap-5 px-5 py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <span className="flex items-center gap-1.5 text-[10px] text-white/25">
              <CheckCircle size={12} style={{ color: "#10B981" }} /> Fully supported
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/25">
              <MinusCircle size={12} style={{ color: "#F97316" }} /> Partial / add-on
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/25">
              <XCircle size={12} style={{ color: "rgba(255,255,255,0.18)" }} /> Not available
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ComparisonTable;
