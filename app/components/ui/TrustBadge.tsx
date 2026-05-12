"use client";

import { motion } from "framer-motion";

interface TrustBadgeProps {
  label: string;
  icon?: string; // emoji or short text
  className?: string;
}

const BADGES: TrustBadgeProps[] = [
  { label: "FCA Aligned",     icon: "🏛" },
  { label: "GDPR Ready",      icon: "🔒" },
  { label: "ISO 27001",       icon: "✓"  },
  { label: "SOC 2",           icon: "⚙"  },
  { label: "UK Based",        icon: "🇬🇧" },
  { label: "OWASP Top 10",    icon: "🛡"  },
];

function Badge({ label, icon, className = "" }: TrustBadgeProps) {
  return (
    <motion.div
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
        "border border-[#00F5FF]/25 bg-[#00F5FF]/05 text-[#00F5FF]/80",
        "backdrop-blur-sm whitespace-nowrap",
        className,
      ].join(" ")}
      whileHover={{
        borderColor: "rgba(0,245,255,0.6)",
        backgroundColor: "rgba(0,245,255,0.12)",
        color: "#00F5FF",
        scale: 1.04,
      }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span aria-hidden className="text-sm leading-none">{icon}</span>}
      {label}
    </motion.div>
  );
}

interface TrustBadgeRowProps {
  badges?: TrustBadgeProps[];
  className?: string;
  animate?: boolean;
}

export function TrustBadgeRow({
  badges = BADGES,
  className = "",
  animate = true,
}: TrustBadgeRowProps) {
  return (
    <motion.div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      initial={animate ? { opacity: 0, y: 10 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.5, staggerChildren: 0.06 }}
    >
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          initial={animate ? { opacity: 0, scale: 0.85 } : undefined}
          whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
        >
          <Badge {...b} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Export individual badge for standalone use
export { Badge as TrustBadge };
export default TrustBadgeRow;
