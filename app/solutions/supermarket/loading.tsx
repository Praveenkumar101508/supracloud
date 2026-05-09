export default function SupermarketLoading() {
  return (
    <div style={{ backgroundColor: "#0A192F", minHeight: "100vh" }}>
      {/* Hero skeleton */}
      <div style={{ padding: "80px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "160px", height: "24px", borderRadius: "20px", backgroundColor: "rgba(255,255,255,0.06)", animation: "pulse 2s infinite" }} />
        <div style={{ width: "480px", maxWidth: "100%", height: "40px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.06)", animation: "pulse 2s infinite" }} />
        <div style={{ width: "360px", maxWidth: "100%", height: "40px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.06)", animation: "pulse 2s infinite" }} />
        <div style={{ width: "280px", maxWidth: "100%", height: "20px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.04)", animation: "pulse 2s infinite", marginTop: "8px" }} />
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <div style={{ width: "160px", height: "44px", borderRadius: "8px", backgroundColor: "rgba(16,185,129,0.15)", animation: "pulse 2s infinite" }} />
          <div style={{ width: "140px", height: "44px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.06)", animation: "pulse 2s infinite" }} />
        </div>
      </div>

      {/* Cards skeleton */}
      <div style={{ padding: "48px 24px", maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ backgroundColor: "#112240", borderRadius: "16px", padding: "32px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.06)", animation: "pulse 2s infinite" }} />
            <div style={{ width: "60%", height: "20px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.06)", animation: "pulse 2s infinite" }} />
            <div style={{ width: "100%", height: "14px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.04)", animation: "pulse 2s infinite" }} />
            <div style={{ width: "85%", height: "14px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.04)", animation: "pulse 2s infinite" }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
