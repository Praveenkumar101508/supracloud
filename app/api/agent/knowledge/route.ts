/**
 * RAG knowledge base search.
 * Embeds the query using Anthropic, searches nova_knowledge via pgvector,
 * and returns the top-3 most relevant chunks for context injection.
 *
 * Falls back to empty results gracefully if Supabase or embedding is unavailable.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sanitiseText } from "@/lib/sanitize";

const RequestSchema = z.object({
  query: z.string().min(1).max(500),
});

// ── Embedding (Anthropic-compatible via OpenAI embedding API) ─────────────────
// We use Voyage AI (Anthropic-backed) or fallback to OpenAI text-embedding-3-small
// Both produce 1536-dim vectors matching the Supabase column.
async function embed(text: string): Promise<number[] | null> {
  const voyageKey = process.env.VOYAGE_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (voyageKey) {
    try {
      const res = await fetch("https://api.voyageai.com/v1/embeddings", {
        method:  "POST",
        headers: {
          "Authorization": `Bearer ${voyageKey}`,
          "Content-Type":  "application/json",
        },
        body: JSON.stringify({ input: text, model: "voyage-2" }),
      });
      if (!res.ok) throw new Error(`Voyage error: ${res.status}`);
      const data: { data: Array<{ embedding: number[] }> } = await res.json();
      return data.data[0]?.embedding ?? null;
    } catch (err) {
      console.error("[RAG] Voyage embed error:", err);
    }
  }

  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/embeddings", {
        method:  "POST",
        headers: {
          "Authorization": `Bearer ${openaiKey}`,
          "Content-Type":  "application/json",
        },
        body: JSON.stringify({ input: text, model: "text-embedding-3-small" }),
      });
      if (!res.ok) throw new Error(`OpenAI embed error: ${res.status}`);
      const data: { data: Array<{ embedding: number[] }> } = await res.json();
      return data.data[0]?.embedding ?? null;
    } catch (err) {
      console.error("[RAG] OpenAI embed error:", err);
    }
  }

  return null;
}

// ── Vector search ─────────────────────────────────────────────────────────────
async function vectorSearch(
  embedding: number[],
  topK = 3
): Promise<string[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    const { data, error } = await supabase.rpc("match_nova_knowledge", {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count:     topK,
    });

    if (error) {
      console.error("[RAG] pgvector search error:", error.message);
      return [];
    }

    return (data as Array<{ content: string }>).map((row) => row.content);
  } catch (err) {
    console.error("[RAG] Supabase error:", err);
    return [];
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ chunks: [] }, { status: 200 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ chunks: [] }, { status: 200 });
  }

  const query = sanitiseText(parsed.data.query, 500);

  const embedding = await embed(query);
  if (!embedding) {
    // Embedding unavailable — return empty, respond/route handles gracefully
    return NextResponse.json({ chunks: [] }, { status: 200 });
  }

  const chunks = await vectorSearch(embedding);
  return NextResponse.json({ chunks }, { status: 200 });
}
