"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "@/app/components/ui/HolographicCard";
import { GlowButton } from "@/app/components/ui/GlowButton";
import { ArrowRight, Clock } from "lucide-react";

const POSTS = [
  {
    tag:     "Architecture",
    tagColor: "#00F5FF",
    title:   "How We Deploy FCA-Compliant AI Agents Inside Your AWS Tenant",
    excerpt: "A deep-dive into the VPC isolation, KMS key delegation, and audit-trail architecture that lets SupraCloud run autonomous agents without ever touching client data.",
    readTime: "8 min read",
    href:    "/blog/fca-compliant-ai-agents-aws",
    gradient: "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(0,245,255,0.01))",
    border:  "rgba(0,245,255,0.12)",
  },
  {
    tag:     "Case Study",
    tagColor: "#8B5CF6",
    title:   "From 68% to 91% Deflection: 12 Weeks with a Tier-1 Retail Bank",
    excerpt: "Anonymised case study. How a multi-agent LangGraph system cut L1 query volume by 41% and raised CSAT by 18 points without a single agent handoff failure.",
    readTime: "6 min read",
    href:    "/blog/banking-ai-deflection-case-study",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.06), rgba(139,92,246,0.01))",
    border:  "rgba(139,92,246,0.12)",
  },
  {
    tag:     "Engineering",
    tagColor: "#10B981",
    title:   "LangGraph vs AutoGen for Enterprise RAG: A Production Comparison",
    excerpt: "We've shipped both in regulated environments. Here's an honest comparison of latency, traceability, cost, and developer experience at enterprise scale.",
    readTime: "10 min read",
    href:    "/blog/langgraph-vs-autogen-enterprise-rag",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.01))",
    border:  "rgba(16,185,129,0.12)",
  },
];

export function ResourcesTeaser() {
  return (
    <section className="relative py-28 px-4" id="resources">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px]"
          style={{ background: "rgba(0,245,255,0.02)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[10px] font-bold tracking-wider uppercase"
              style={{
                background: "rgba(0,245,255,0.08)",
                color:      "#00F5FF",
                border:     "1px solid rgba(0,245,255,0.18)",
              }}
            >
              Resources
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Engineering Insights.
              <br />
              <span
                style={{
                  background:            "linear-gradient(135deg, #00F5FF 0%, #8B5CF6 100%)",
                  WebkitBackgroundClip:  "text",
                  WebkitTextFillColor:   "transparent",
                  backgroundClip:        "text",
                }}
              >
                No Fluff.
              </span>
            </h2>
          </div>
          <GlowButton variant="outline" size="md" href="/blog">
            View All Articles
          </GlowButton>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <a href={post.href} className="block h-full group">
                <HolographicCard
                  className="p-6 h-full flex flex-col"
                  style={{
                    background: post.gradient,
                    borderColor: post.border,
                  } as React.CSSProperties}
                >
                  {/* Tag + read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase"
                      style={{
                        background: `${post.tagColor}12`,
                        color:      post.tagColor,
                        border:     `1px solid ${post.tagColor}25`,
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-white/30">
                      <Clock size={9} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-white font-bold text-sm leading-snug mb-3 group-hover:text-[#00F5FF] transition-colors flex-1"
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/40 text-xs leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Read more */}
                  <div
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: `${post.tagColor}70` }}
                  >
                    Read article
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                      style={{ color: post.tagColor }}
                    />
                  </div>
                </HolographicCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResourcesTeaser;
