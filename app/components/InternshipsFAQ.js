"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need a visa to work in the UK?",
    a: "Yes — we currently accept applicants with existing UK work authorisation. We are exploring sponsorship for exceptional candidates on the Graduate Visa route.",
  },
  {
    q: "Is it remote or in-person?",
    a: "AI Engineering and Platform SRE tracks are remote-EU. Solutions Engineering is London-based with 2–3 days per week in-person.",
  },
  {
    q: "Can I use this as a university placement year?",
    a: "Yes — we work with universities to provide formal placement year documentation. See our Placement Year Partnerships page.",
  },
  {
    q: "What does the take-home exercise involve?",
    a: "A 3-hour timeboxed task relevant to your track — typically a small RAG or agent implementation for AI Engineering, or a solutions scoping brief for Solutions Engineering. No leetcode.",
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            color: "#e2e8f0",
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: "1.5",
          }}
        >
          {faq.q}
        </span>
        <span
          style={{
            color: "#10B981",
            fontSize: "20px",
            lineHeight: 1,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 0 20px 0",
            color: "#94a3b8",
            fontSize: "14px",
            lineHeight: "1.7",
          }}
        >
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function InternshipsFAQ() {
  return (
    <section
      style={{
        backgroundColor: "#0A192F",
        padding: "64px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#10B981",
            marginBottom: "12px",
          }}
        >
          FAQ
        </p>
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "40px",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
