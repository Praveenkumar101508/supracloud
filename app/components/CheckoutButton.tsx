"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  tier: "foundation" | "application_engine" | "full_accelerator";
  label: string;
  highlight?: boolean;
}

export default function CheckoutButton({ tier, label, highlight }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError("Could not start checkout. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full py-3 rounded-md text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
          highlight
            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
            : "border border-slate-300 hover:border-slate-500 text-gray-800"
        }`}
      >
        {loading ? "Redirecting to checkout…" : label}
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
