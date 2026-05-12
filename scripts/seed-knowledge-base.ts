/**
 * Seed the nova_knowledge table with embedded website content chunks.
 *
 * Usage:
 *   npx tsx scripts/seed-knowledge-base.ts
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - VOYAGE_API_KEY or OPENAI_API_KEY (for embeddings)
 */

// Load .env.local manually (avoids dotenv dependency)
import * as fs from "fs";
import * as path from "path";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

// ── Knowledge chunks ──────────────────────────────────────────────────────────

const CHUNKS: Array<{ chunk_id: string; content: string; metadata: Record<string, string> }> = [
  // ── Homepage / overview
  {
    chunk_id: "overview-001",
    content:  "SupraCloud is an engineer-led enterprise AI and IT firm based in the UK. We build production-grade autonomous AI agents for banking and retail, provide engineer-screened IT staffing, and run enterprise IT consultation engagements. All engineer-led, not sales-led.",
    metadata: { source: "/", category: "overview" },
  },
  {
    chunk_id: "overview-002",
    content:  "SupraCloud's AI agents are deployed exclusively within the client's cloud tenant (AWS or Azure). Client data never flows through SupraCloud's infrastructure. This ensures FCA compliance and data sovereignty.",
    metadata: { source: "/", category: "security" },
  },

  // ── Banking AI Agents
  {
    chunk_id: "banking-001",
    content:  "SupraCloud's Banking AI Agents handle customer queries (L1/L2 support), fraud triage, and back-office workflow automation. They integrate into existing core banking systems via REST APIs and webhooks.",
    metadata: { source: "/solutions/banking", category: "product" },
  },
  {
    chunk_id: "banking-002",
    content:  "Banking agents include audit trails, explainability layers, and role-based access controls from day one. We understand FCA SYSC requirements and design agents to satisfy risk and compliance teams.",
    metadata: { source: "/solutions/banking", category: "compliance" },
  },
  {
    chunk_id: "banking-003",
    content:  "Typical banking AI agent deployments achieve 65–75% query deflection within 90 days, processing hundreds of thousands of queries monthly. Implementation takes 6–10 weeks from discovery to production.",
    metadata: { source: "/solutions/banking", category: "results" },
  },

  // ── Retail AI Agents
  {
    chunk_id: "retail-001",
    content:  "SupraCloud's Retail AI Agents handle customer support, inventory processing, personalisation, and back-office automation. They integrate with existing ERP, CRM, and ecommerce platforms — no rip-and-replace required.",
    metadata: { source: "/solutions/retail", category: "product" },
  },
  {
    chunk_id: "retail-002",
    content:  "Retail deployments achieve 68% query deflection on average, reducing support team workload significantly while improving CSAT scores. The agents learn from interaction patterns and improve over time.",
    metadata: { source: "/solutions/retail", category: "results" },
  },

  // ── Technology stack
  {
    chunk_id: "tech-001",
    content:  "SupraCloud builds with LangGraph for agent orchestration and RAG (Retrieval-Augmented Generation) pipelines for enterprise knowledge retrieval. We are model-agnostic — we recommend the right LLM for each client's latency, cost, and compliance requirements.",
    metadata: { source: "/", category: "technology" },
  },
  {
    chunk_id: "tech-002",
    content:  "Nova, SupraCloud's AI assistant, uses Claude claude-sonnet-4-6 as the primary model with prompt caching for cost efficiency. RAG context is retrieved via pgvector similarity search. All AI API calls are server-side only — no keys are exposed to the browser.",
    metadata: { source: "/", category: "technology" },
  },

  // ── Pricing / Talent Programmes
  {
    chunk_id: "pricing-001",
    content:  "SupraCloud's Talent Programme has three tiers: Foundation (£2,500, 8 weeks), Application Engine (£15,000, 12 weeks), and Full Accelerator (£25,000, custom). Enterprise cohorts for 4+ engineers are scoped individually.",
    metadata: { source: "/pricing", category: "pricing" },
  },
  {
    chunk_id: "pricing-002",
    content:  "All talent programme cohorts run with a maximum of 8 engineers, ensuring high mentor-to-student ratios. Programmes involve real enterprise project briefs, not tutorials. Weekly 1:1 mentorship with senior SupraCloud engineers is included.",
    metadata: { source: "/talent/programs", category: "product" },
  },
  {
    chunk_id: "pricing-003",
    content:  "AI agent development project pricing is scoped on a discovery call based on data requirements, infrastructure complexity, and desired outcomes. Clients receive a realistic ballpark estimate on the same discovery call — no follow-up deck required.",
    metadata: { source: "/contact", category: "pricing" },
  },

  // ── IT Staffing
  {
    chunk_id: "staffing-001",
    content:  "SupraCloud IT Staffing provides engineer-screened, not recruiter-sourced candidates. Every candidate is technically assessed by SupraCloud's own engineers for the specific role. We place AI engineers, data architects, ML engineers, DevOps specialists, and backend engineers.",
    metadata: { source: "/services/staffing", category: "product" },
  },

  // ── Consultation
  {
    chunk_id: "consultation-001",
    content:  "SupraCloud Enterprise IT Consultation engagements run 4–12 weeks and produce a concrete technical blueprint. Clients can execute the blueprint themselves or engage SupraCloud to execute it. We specialise in regulated industries including banking and retail.",
    metadata: { source: "/services/consultation", category: "product" },
  },

  // ── Security & compliance
  {
    chunk_id: "security-001",
    content:  "SupraCloud's platform uses Supabase Row Level Security (RLS) on all tables — only the service_role key (server-side) can access data. Upstash Redis rate limiting is applied at the edge. All inputs are validated with Zod schemas. Security headers include HSTS, CSP, X-Frame-Options DENY, and Permissions-Policy.",
    metadata: { source: "/security", category: "security" },
  },
  {
    chunk_id: "security-002",
    content:  "All SupraCloud project work is covered by NDA before the discovery call. Agents operate within the client's existing data perimeter and do not exfiltrate data to SupraCloud's infrastructure. GDPR compliance is designed in from day one. IPs in audit logs are one-way hashed (SHA-256).",
    metadata: { source: "/security", category: "compliance" },
  },

  // ── Support & SLA
  {
    chunk_id: "support-001",
    content:  "Post-delivery, SupraCloud offers retainer-based support and maintenance with agreed SLA terms. Most clients retain SupraCloud for ongoing iteration as agent usage grows and new use cases emerge.",
    metadata: { source: "/services/consultation", category: "support" },
  },

  // ── Book / Contact
  {
    chunk_id: "book-001",
    content:  "Book a 30-minute discovery call with a SupraCloud engineer. No sales deck — just a technical conversation about your data, infrastructure, and desired outcomes. We give a realistic estimate on the same call. Book at supracloud.co.uk/book.",
    metadata: { source: "/book", category: "cta" },
  },
  {
    chunk_id: "contact-001",
    content:  "Contact SupraCloud at rk@supracloud.co.uk or via WhatsApp at +44 7776 456694. Security disclosures: security@supracloud.co.uk. GDPR/DPO: dpo@supracloud.co.uk.",
    metadata: { source: "/contact", category: "contact" },
  },
];

// ── Embedding function ────────────────────────────────────────────────────────

async function embed(text: string): Promise<number[]> {
  // Try Voyage AI first (best quality for RAG)
  if (process.env.VOYAGE_API_KEY) {
    const res = await fetch("https://api.voyageai.com/v1/embeddings", {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({ model: "voyage-2", input: [text] }),
    });
    if (res.ok) {
      const data = await res.json() as { data: Array<{ embedding: number[] }> };
      return data.data[0].embedding;
    }
    console.warn("[embed] Voyage AI error, falling back to OpenAI");
  }

  // OpenAI fallback (text-embedding-3-small, 1536 dims)
  if (process.env.OPENAI_API_KEY) {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ model: "text-embedding-3-small", input: text }),
    });
    if (!res.ok) throw new Error(`OpenAI embedding error: ${res.status}`);
    const data = await res.json() as { data: Array<{ embedding: number[] }> };
    return data.data[0].embedding;
  }

  throw new Error("No embedding key configured. Set VOYAGE_API_KEY or OPENAI_API_KEY in .env.local");
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log(`\nSeeding ${CHUNKS.length} knowledge chunks into nova_knowledge...\n`);

  let inserted = 0;
  let skipped  = 0;

  for (const chunk of CHUNKS) {
    try {
      const embedding = await embed(chunk.content);

      const { error } = await supabase
        .from("nova_knowledge")
        .upsert(
          [{
            chunk_id:  chunk.chunk_id,
            content:   chunk.content,
            metadata:  chunk.metadata,
            embedding: embedding,
          }],
          { onConflict: "chunk_id" }
        );

      if (error) {
        console.error(`  ✗ ${chunk.chunk_id}: ${error.message}`);
        skipped++;
      } else {
        console.log(`  ✓ ${chunk.chunk_id}`);
        inserted++;
      }

      // Rate limit: 1 req/s for free Voyage tier
      await new Promise((r) => setTimeout(r, 1100));
    } catch (err) {
      console.error(`  ✗ ${chunk.chunk_id}:`, err);
      skipped++;
    }
  }

  console.log(`\nDone. ${inserted} inserted/updated, ${skipped} failed.\n`);

  // Optionally create IVFFlat index (requires at least 1 row)
  if (inserted > 0) {
    console.log("Note: If this is the first seed, create the vector index in Supabase SQL Editor:");
    console.log(`
  CREATE INDEX nova_knowledge_embedding_idx
    ON nova_knowledge USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
    `);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
