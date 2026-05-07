import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function MarketingNav() {
  return (
    <nav className="sc-nav">
      <div className="container nav-row">
        <Link className="brand" href="/">
          <Logo size="sm" variant="light" showWordmark={true} />
        </Link>
        <div className="nav-links">
          <div className="nav-item">
            <span className="nav-link">AI Solutions <i data-lucide="chevron-down" style={{width:12,height:12}}></i></span>
            <div className="dd">
              <Link className="dd-item" href="/solutions/banking"><i data-lucide="landmark" className="ic"></i><div><div className="lab">Banking AI</div><div className="desc">Autonomous L1 / L2 agents for financial ops.</div></div></Link>
              <Link className="dd-item" href="/solutions/supermarket"><i data-lucide="shopping-cart" className="ic"></i><div><div className="lab">Supermarket AI</div><div className="desc">Retail automation &amp; inventory intel.</div></div></Link>
            </div>
          </div>
          <div className="nav-item">
            <span className="nav-link">Enterprise Services <i data-lucide="chevron-down" style={{width:12,height:12}}></i></span>
            <div className="dd">
              <Link className="dd-item" href="/services/it-staffing"><i data-lucide="users" className="ic"></i><div><div className="lab">IT Staffing</div><div className="desc">Pre-vetted engineering resources.</div></div></Link>
              <Link className="dd-item" href="/services/consultation"><i data-lucide="briefcase" className="ic"></i><div><div className="lab">Consultation</div><div className="desc">Solutions engineering &amp; architecture strategy.</div></div></Link>
            </div>
          </div>
          <div className="nav-item">
            <span className="nav-link">Talent Hub <i data-lucide="chevron-down" style={{width:12,height:12}}></i></span>
            <div className="dd">
              <Link className="dd-item" href="/careers/internships"><i data-lucide="graduation-cap" className="ic"></i><div><div className="lab">Internships</div><div className="desc">Graduate career accelerators.</div></div></Link>
              <Link className="dd-item" href="/careers/training"><i data-lucide="book-open" className="ic"></i><div><div className="lab">Training</div><div className="desc">Industry-standard upskilling programs.</div></div></Link>
            </div>
          </div>
          <Link className="nav-link plain" href="/portal">Client Portal</Link>
        </div>
        <div className="nav-actions">
          <Link className="btn-ghost" href="/portal"><i data-lucide="layout-dashboard" style={{width:14,height:14}}></i> Portal</Link>
          <Link className="btn-primary" href="/book">Book a Demo</Link>
        </div>
      </div>
    </nav>
  );
}
