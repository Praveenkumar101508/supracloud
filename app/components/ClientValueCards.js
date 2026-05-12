"use client";

export default function ClientValueCards() {
  const cards = [
    {
      title: "Engineers who ship from week one — no ramp-up overhead",
    },
    {
      title: "Transparent resourcing — you always know who is building your system",
    },
    {
      title: "Vetted for production environments, not just CV keywords",
    },
  ];

  return (
    <section
      style={{ backgroundColor: "#0A192F", padding: "64px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#10B981",
            marginBottom: "12px",
          }}
        >
          What our clients tell us
        </p>
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "40px",
          }}
        >
          Why Engineering Teams Trust SupraCloud
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#112240",
                border: "1px solid rgba(16,185,129,0.15)",
                borderRadius: "16px",
                padding: "32px 28px",
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "15px",
                  fontWeight: 500,
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
