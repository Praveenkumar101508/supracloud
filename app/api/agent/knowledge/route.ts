/**
 * RAG knowledge retrieval — keyword-based matching against the built-in knowledge base.
 *
 * No external embedding service required. Scores each entry by how many of its tags
 * appear in the query, then returns the top-3 answers as context chunks.
 *
 * If Supabase is configured a full-text search is also attempted and merged in,
 * giving richer context for questions not covered by the static knowledge base.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sanitiseText } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rateLimiter";
import { KNOWLEDGE_BASE } from "@/app/components/VoiceAgent/agentPersonality";

const RequestSchema = z.object({
  query: z.string().min(1).max(500),
});

function keywordSearch(query: string, topK = 3): string[] {
  const q = query.toLowerCase();

  const scored = (KNOWLEDGE_BASE as Array<{ tags: string[]; answer: (name?: string) => string }>)
    .map((entry) => {
      const hits = entry.tags.filter((tag) => q.includes(tag)).length;
      return { hits, answer: entry.answer(undefined) };
    })
    .filter((e) => e.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, topK);

  return scored.map((e) => e.answer);
}

async function supabaseFullTextSearch(query: string, topK = 3): Promise<string[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from("nova_knowledge")
      .select("content")
      .textSearch("content", query, { type: "websearch", config: "english" })
      .limit(topK);

    if (error) return [];
    return (data as Array<{ content: string }>).map((r) => r.content);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const rl = await rateLimit(req);
  if (!rl.success) return rl.response!;

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

  const [kbChunks, dbChunks] = await Promise.all([
    Promise.resolve(keywordSearch(query)),
    supabaseFullTextSearch(query),
  ]);

  // Merge: KB results first (higher precision), then DB results, deduplicated
  const seen = new Set<string>();
  const chunks: string[] = [];
  for (const c of [...kbChunks, ...dbChunks]) {
    if (!seen.has(c)) { seen.add(c); chunks.push(c); }
    if (chunks.length >= 4) break;
  }

  return NextResponse.json({ chunks }, { status: 200 });
}
