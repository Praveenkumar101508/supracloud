import type { Metadata } from "next";
import { GitBranch, Box, BarChart2, Cloud, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio Projects | SupraCloud",
  description: "Production-ready portfolio projects built by SupraCloud talent programme participants — RAG chatbots, data pipelines, ML deployments, and cloud architecture.",
  openGraph: {
    title: "Portfolio Projects | SupraCloud",
    description: "Projects built during SupraCloud's training programme: RAG pipelines, Azure data engineering, BI dashboards, and ML deployments.",
    url: "https://supracloud.co.uk/projects",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/projects" },
};

const projects = [
  {
    icon: <Bot size={28} className="text-emerald-500" />,
    title: "Production RAG Chatbot",
    subtitle: "Retrieval-Augmented Generation · NLP · Vector Search",
    tools: ["Python", "LangChain", "OpenAI API", "Pinecone / FAISS", "FastAPI", "Docker"],
    builds: [
      "End-to-end RAG pipeline ingesting PDFs and web content",
      "Vector store indexing with chunking and embedding strategies",
      "FastAPI backend with streaming response support",
      "Dockerised deployment with CI/CD pipeline",
    ],
    deliverables: ["GitHub repo with full README", "Architecture diagram (data flow + component map)", "Live demo endpoint"],
    skills: ["LLM application design", "Prompt engineering", "Vector databases", "API development", "Containerisation"],
  },
  {
    icon: <Cloud size={28} className="text-emerald-500" />,
    title: "Azure Data Engineering Pipeline",
    subtitle: "Data Engineering · Cloud · ETL/ELT · Orchestration",
    tools: ["Azure Data Factory", "Azure Databricks", "PySpark", "Delta Lake", "Azure Blob Storage", "dbt", "Airflow"],
    builds: [
      "Medallion architecture (Bronze → Silver → Gold) on Azure",
      "Incremental data ingestion from REST APIs and flat files",
      "PySpark transformations with data quality checks",
      "dbt models for Gold layer with documentation",
    ],
    deliverables: ["GitHub repo with IaC scripts", "Architecture diagram (Azure components)", "dbt docs site screenshot"],
    skills: ["Cloud data architecture", "Spark processing", "Pipeline orchestration", "Data modelling", "Azure ecosystem"],
  },
  {
    icon: <Box size={28} className="text-emerald-500" />,
    title: "AWS ML Model Deployment",
    subtitle: "MLOps · Model Serving · Cloud Infrastructure",
    tools: ["Python", "Scikit-learn / XGBoost", "MLflow", "AWS SageMaker", "S3", "Lambda", "Terraform"],
    builds: [
      "End-to-end ML training pipeline with experiment tracking via MLflow",
      "Model packaging and registration in SageMaker Model Registry",
      "Real-time inference endpoint with API Gateway + Lambda",
      "Infrastructure-as-Code with Terraform",
    ],
    deliverables: ["GitHub repo with model + IaC", "Architecture diagram (AWS services)", "Load-tested endpoint screenshot"],
    skills: ["MLOps", "Model deployment", "AWS services", "Infrastructure as Code", "API design"],
  },
  {
    icon: <BarChart2 size={28} className="text-emerald-500" />,
    title: "BI Analytics Dashboard",
    subtitle: "Data Analytics · Visualisation · SQL · Reporting",
    tools: ["SQL", "dbt", "Power BI / Tableau", "Python (pandas)", "PostgreSQL / BigQuery"],
    builds: [
      "Star schema data model optimised for BI consumption",
      "dbt transformations with tests and documentation",
      "Executive-level dashboard with KPIs, trends, and drill-downs",
      "Automated data refresh pipeline",
    ],
    deliverables: ["GitHub repo (dbt project + SQL models)", "Dashboard screenshots", "Data model diagram"],
    skills: ["Dimensional modelling", "SQL optimisation", "BI tooling", "Stakeholder reporting", "dbt"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            Real Industry Projects
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Projects That Prove Your Skills
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            Every project is designed to mirror production-grade work at UK data and tech companies —
            not classroom exercises.
          </p>
        </div>
      </section>

      {/* Project Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {projects.map((project) => (
            <div key={project.title} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Card Header */}
              <div className="p-8 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{project.icon}</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                    <p className="text-sm text-emerald-600 font-medium mt-0.5">{project.subtitle}</p>
                  </div>
                </div>
                {/* Tools */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">What You Build</p>
                  <ul className="space-y-2">
                    {project.builds.map((b) => (
                      <li key={b} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-emerald-400 mt-1"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Deliverables</p>
                  <ul className="space-y-2">
                    {project.deliverables.map((d) => (
                      <li key={d} className="text-sm text-gray-600 flex items-start gap-2">
                        <GitBranch size={14} className="text-slate-400 mt-0.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Skills Employers Assess</p>
                  <ul className="space-y-2">
                    {project.skills.map((s) => (
                      <li key={s} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-emerald-400 mt-1"></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Start Building Your Portfolio
          </h2>
          <p className="text-slate-300 mb-8">
            These projects are built inside the programme — with guidance, code reviews, and your name on every commit.
          </p>
          <a
            href="/apply"
            className="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
