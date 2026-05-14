import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title    = searchParams.get("title")    || "Enterprise AI Agents for Banking & Retail";
  const subtitle = searchParams.get("subtitle") || "Production-grade. FCA-compliant. Deployed in 6 weeks.";
  const tag      = searchParams.get("tag")      || "SupraCloud";

  return new ImageResponse(
    (
      <div
        style={{
          width:      "100%",
          height:     "100%",
          display:    "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050510",
          fontFamily: "sans-serif",
          position:   "relative",
          overflow:   "hidden",
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position:     "absolute",
            top:          "-10%",
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        800,
            height:       500,
            borderRadius: "50%",
            background:   "radial-gradient(ellipse, rgba(0,245,255,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position:     "absolute",
            bottom:       "-20%",
            right:        "10%",
            width:        500,
            height:       400,
            borderRadius: "50%",
            background:   "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top tag */}
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          8,
            padding:      "6px 16px",
            borderRadius: 100,
            border:       "1px solid rgba(0,245,255,0.3)",
            background:   "rgba(0,245,255,0.08)",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width:        8,
              height:       8,
              borderRadius: "50%",
              background:   "#00F5FF",
            }}
          />
          <span style={{ color: "#00F5FF", fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {tag}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize:   56,
            fontWeight: 900,
            color:      "white",
            textAlign:  "center",
            lineHeight: 1.15,
            maxWidth:   900,
            marginBottom: 20,
            padding:    "0 40px",
          }}
        >
          {title}
        </div>

        {/* Gradient divider */}
        <div
          style={{
            width:        120,
            height:       3,
            borderRadius: 2,
            background:   "linear-gradient(90deg, #00F5FF, #8B5CF6)",
            marginBottom: 24,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize:   22,
            color:      "rgba(255,255,255,0.5)",
            textAlign:  "center",
            maxWidth:   680,
            lineHeight: 1.5,
            padding:    "0 40px",
            marginBottom: 48,
          }}
        >
          {subtitle}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
          {[
            { v: "72%",  l: "Query Deflection" },
            { v: "6wk",  l: "To Production" },
            { v: "99.9%", l: "Uptime SLA" },
          ].map((s) => (
            <div key={s.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#00F5FF" }}>{s.v}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>{s.l}</span>
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom:   28,
            right:    40,
            fontSize: 14,
            color:    "rgba(255,255,255,0.2)",
            letterSpacing: "0.05em",
          }}
        >
          supracloud.co.uk
        </div>
      </div>
    ),
    {
      width:  1200,
      height: 630,
    },
  );
}
