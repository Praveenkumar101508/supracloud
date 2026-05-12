import "./kit.css";
import LucideInit from "./LucideInit";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sc-marketing dark">
      {children}
      <LucideInit />
    </div>
  );
}
