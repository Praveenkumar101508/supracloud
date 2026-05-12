import { FileText, GitBranch, Star, Download } from "lucide-react";

const resources = [
  {
    category: "CV & Profile",
    icon: <FileText size={20} className="text-emerald-500" />,
    items: [
      { title: "ATS-Optimised CV Template (Data Engineer)", type: "DOCX" },
      { title: "ATS-Optimised CV Template (ML Engineer)", type: "DOCX" },
      { title: "ATS-Optimised CV Template (Cloud Engineer)", type: "DOCX" },
      { title: "LinkedIn Optimisation Checklist", type: "PDF" },
    ],
  },
  {
    category: "GitHub & Portfolio",
    icon: <GitBranch size={20} className="text-emerald-500" />,
    items: [
      { title: "GitHub Profile README Template", type: "MD" },
      { title: "Project README Template (with architecture section)", type: "MD" },
      { title: "GitHub Profile Checklist", type: "PDF" },
      { title: "Portfolio Page HTML Template", type: "ZIP" },
    ],
  },
  {
    category: "Interview Preparation",
    icon: <Star size={20} className="text-emerald-500" />,
    items: [
      { title: "STAR Framework Guide & Worked Examples", type: "PDF" },
      { title: "SQL Interview Question Bank (50 questions)", type: "PDF" },
      { title: "Python for Data Engineering — Interview Cheatsheet", type: "PDF" },
      { title: "System Design Primer for Data Roles", type: "PDF" },
      { title: "Azure / AWS Service Map for Interviews", type: "PDF" },
      { title: "Behavioural Question Bank (30 questions)", type: "PDF" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-500 text-sm mt-1">
          Templates, checklists, and guides — everything you need to execute the programme.
        </p>
      </div>

      {resources.map((section) => (
        <div key={section.category} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
            {section.icon}
            <h2 className="font-semibold text-gray-900">{section.category}</h2>
          </div>
          <ul className="divide-y divide-slate-50">
            {section.items.map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                  <span className="text-sm text-gray-700">{item.title}</span>
                </div>
                <button
                  className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  aria-label={`Download ${item.title}`}
                >
                  <Download size={14} />
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="text-xs text-slate-400 text-center pb-4">
        Resources are updated each week. Check back after your Monday session for new materials.
      </p>
    </div>
  );
}
