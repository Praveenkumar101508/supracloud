"use client";

import { useState } from "react";

export default function PortalLoginForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      style={{
        backgroundColor: "#112240",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "32px",
      }}
    >
      <h2
        style={{
          color: "#fff",
          fontSize: "20px",
          fontWeight: 700,
          marginBottom: "8px",
        }}
      >
        Sign in to your portal
      </h2>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "13px",
          marginBottom: "28px",
        }}
      >
        Access is provisioned per engagement.
      </p>

      {submitted ? (
        <div
          style={{
            backgroundColor: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: "12px",
            padding: "20px",
            color: "#6ee7b7",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          Portal access is provisioned per engagement. Contact{" "}
          <a
            href="mailto:rk@supracloud.co.uk"
            style={{ color: "#10B981", fontWeight: 600 }}
          >
            rk@supracloud.co.uk
          </a>{" "}
          to request access.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              htmlFor="portal-email"
              style={{ display: "block", color: "#94a3b8", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}
            >
              Email
            </label>
            <input
              id="portal-email"
              type="email"
              placeholder="you@company.com"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="portal-password"
              style={{ display: "block", color: "#94a3b8", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}
            >
              Password
            </label>
            <input
              id="portal-password"
              type="password"
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#10B981",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              marginTop: "4px",
            }}
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
}
