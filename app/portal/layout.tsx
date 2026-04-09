import Link from "next/link";
import { LayoutDashboard, Calendar, FolderKanban, Mic, FileText } from "lucide-react";

const sidebarLinks = [
  { href: "/portal", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/portal/schedule", label: "Schedule", icon: <Calendar size={18} /> },
  { href: "/portal/projects", label: "Projects", icon: <FolderKanban size={18} /> },
  { href: "/portal/mock-interviews", label: "Mock Interviews", icon: <Mic size={18} /> },
  { href: "/portal/resources", label: "Resources", icon: <FileText size={18} /> },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        style={{ backgroundColor: "#0A192F" }}
        className="hidden md:flex flex-col w-60 shrink-0 py-8 px-4"
      >
        <Link href="/" className="text-white text-lg font-bold tracking-tight mb-8 px-2">
          SupraCloud
        </Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 px-2 mb-3">Member Portal</p>
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div
          style={{ backgroundColor: "#0A192F" }}
          className="md:hidden flex items-center justify-between px-4 py-3"
        >
          <Link href="/" className="text-white text-base font-bold">SupraCloud</Link>
          <span className="text-slate-400 text-xs">Member Portal</span>
        </div>
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
