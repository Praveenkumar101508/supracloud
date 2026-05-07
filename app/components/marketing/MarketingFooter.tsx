import Link from "next/link";
import Image from "next/image";

export default function MarketingFooter() {
  return (
    <footer className="sc-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" href="/">
            <Image src="/design-system/assets/logo-mark.svg" width={24} height={24} alt="" />
            <span className="brand-text" style={{fontSize:16}}>Supra<span className="cyan">Cloud</span></span>
          </Link>
          <p className="foot-blurb">Premium UK-based IT solutions &amp; AI development firm. Engineer-led delivery for Banking and Retail.</p>
          <ul className="foot-contact">
            <li><i data-lucide="mail" style={{width:14,height:14,color:"#3B82F6"}}></i> rk@supracloud.co.uk</li>
            <li><i data-lucide="phone" style={{width:14,height:14,color:"#3B82F6"}}></i> +44 7776 456694</li>
          </ul>
        </div>
        <div><p className="foot-col-heading">AI Solutions</p><ul><li><Link href="/solutions/banking">Banking AI</Link></li><li><Link href="/solutions/supermarket">Supermarket AI</Link></li></ul></div>
        <div><p className="foot-col-heading">Enterprise</p><ul><li><Link href="/services/it-staffing">IT Staffing</Link></li><li><Link href="/services/consultation">Consultation</Link></li></ul></div>
        <div><p className="foot-col-heading">Talent Hub</p><ul><li><Link href="/careers/internships">Internships</Link></li><li><Link href="/careers/training">Training</Link></li></ul></div>
        <div><p className="foot-col-heading">Engagement</p><ul><li><Link href="/book">Book a Demo</Link></li><li><Link href="/portal">Client Portal</Link></li></ul></div>
      </div>
      <div className="container foot-base">© 2026 SupraCloud Ltd · Registered in England &amp; Wales</div>
    </footer>
  );
}
