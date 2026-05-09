"use client";

import { useState } from "react";
import Link from "next/link";

export default function ROICalculator() {
  const [contacts, setContacts] = useState(100000);
  const [costPerContact, setCostPerContact] = useState(8.5);
  const [humanHandling, setHumanHandling] = useState(80);

  const monthlySaving = contacts * (humanHandling / 100) * 0.6 * costPerContact;
  const annualSaving = monthlySaving * 12;
  const hasStrongROI = annualSaving > 150000;

  function formatCurrency(v) {
    if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `£${(v / 1000).toFixed(0)}k`;
    return `£${v.toFixed(0)}`;
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700/60 p-8 shadow-2xl">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">ROI Estimate</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Calculate Your Potential ROI</h2>
        <p className="text-slate-400 text-sm mt-2">Adjust the sliders to estimate your annual AI support savings.</p>
      </div>

      <div className="space-y-7">
        {/* Slider 1 */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">Monthly L1 support contacts</label>
            <span className="text-sm font-bold text-emerald-400">{contacts.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={10000}
            max={1000000}
            step={10000}
            value={contacts}
            onChange={(e) => setContacts(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>10,000</span>
            <span>1,000,000</span>
          </div>
        </div>

        {/* Number input 2 */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">Average cost per L1 contact (£)</label>
            <span className="text-sm font-bold text-emerald-400">£{Number(costPerContact).toFixed(2)}</span>
          </div>
          <input
            type="number"
            min={1}
            max={100}
            step={0.5}
            value={costPerContact}
            onChange={(e) => setCostPerContact(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Slider 3 */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">Current L1 human handling (%)</label>
            <span className="text-sm font-bold text-emerald-400">{humanHandling}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={100}
            step={1}
            value={humanHandling}
            onChange={(e) => setHumanHandling(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/40 text-center">
          <p className="text-xs text-slate-400 mb-1">Monthly Saving</p>
          <p className="text-2xl font-extrabold text-emerald-400">{formatCurrency(monthlySaving)}</p>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/40 text-center">
          <p className="text-xs text-slate-400 mb-1">Annual Saving</p>
          <p className="text-2xl font-extrabold text-emerald-400">{formatCurrency(annualSaving)}</p>
        </div>
        <div className={`rounded-xl p-5 border text-center ${hasStrongROI ? "bg-emerald-500/10 border-emerald-500/30" : "bg-slate-800/60 border-slate-700/40"}`}>
          <p className="text-xs text-slate-400 mb-1">Payback</p>
          <p className={`text-sm font-bold leading-tight ${hasStrongROI ? "text-emerald-300" : "text-slate-300"}`}>
            {hasStrongROI ? "Yes — strong ROI case" : "Discuss with us"}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500 mb-4">Based on a 60% target L1 deflection rate (target SLA). Estimates are illustrative — actual results depend on query mix and deployment scope.</p>
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
        >
          Book a Discovery Call to validate this estimate
        </Link>
      </div>
    </div>
  );
}
