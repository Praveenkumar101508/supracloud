import "./kit.css";
import MarketingNav from "./MarketingNav";
import MarketingFooter from "./MarketingFooter";
import LucideInit from "./LucideInit";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sc-marketing dark">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
      <LucideInit />
    </div>
  );
}
