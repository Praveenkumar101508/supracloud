"use client";

export default function BankingROISidebar() {
  return (
    <aside
      style={{
        position: "sticky",
        top: "100px",
        width: "300px",
        flexShrink: 0,
      }}
      className="hidden md:block"
    >
      <div
        style={{
          backgroundColor: "#112240",
          border: "1px solid rgba(16,185,129,0.2)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#10B981",
            marginBottom: "16px",
          }}
        >
          Quick ROI Estimate
        </p>

        {/* Stat pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {[
            { value: "60%+", label: "L1 deflection (target)" },
            { value: "<400ms", label: "Response time" },
            { value: "6 weeks", label: "To production" },
          ].map((stat) => (
            <div
              key={stat.value}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.15)",
                borderRadius: "10px",
                padding: "12px 16px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#34d399",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  textAlign: "right",
                  maxWidth: "120px",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/book"
          style={{
            display: "block",
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            backgroundColor: "#10B981",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 700,
            textAlign: "center",
            textDecoration: "none",
            boxSizing: "border-box",
          }}
        >
          Book a Banking Demo
        </a>

        <p
          style={{
            fontSize: "11px",
            color: "#475569",
            marginTop: "12px",
            textAlign: "center",
          }}
        >
          30-minute session · No commitment
        </p>
      </div>
    </aside>
  );
}
