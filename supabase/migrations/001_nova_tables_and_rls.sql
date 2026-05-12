-- ============================================================
-- SupraCloud Nova AI — Database Migration 001
-- Run this in the Supabase Dashboard → SQL Editor
--
-- PREREQUISITES:
--   1. Enable the pgvector extension first:
--      CREATE EXTENSION IF NOT EXISTS vector;
--   2. This migration is idempotent (safe to run multiple times)
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Drop existing tables if re-running (dev only) ─────────────────────────────
-- Uncomment these lines ONLY in development to reset:
-- DROP TABLE IF EXISTS nova_feedback CASCADE;
-- DROP TABLE IF EXISTS nova_messages CASCADE;
-- DROP TABLE IF EXISTS nova_sessions CASCADE;
-- DROP TABLE IF EXISTS nova_leads CASCADE;
-- DROP TABLE IF EXISTS nova_knowledge CASCADE;
-- DROP TABLE IF EXISTS audit_log CASCADE;

-- ── nova_sessions ─────────────────────────────────────────────────────────────
-- One row per visitor browser session. Keyed by a UUID stored in localStorage.

CREATE TABLE IF NOT EXISTS nova_sessions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   text UNIQUE NOT NULL,
  visitor_name text,
  visitor_email text,
  page_count   int  DEFAULT 0,
  created_at   timestamptz DEFAULT now(),
  last_seen_at timestamptz DEFAULT now()
);

-- ── nova_messages ─────────────────────────────────────────────────────────────
-- Every turn in every conversation, keyed to the session.

CREATE TABLE IF NOT EXISTS nova_messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  text NOT NULL REFERENCES nova_sessions(session_id) ON DELETE CASCADE,
  role        text NOT NULL CHECK (role IN ('user', 'nova')),
  content     text NOT NULL CHECK (char_length(content) <= 3000),
  tokens_used int,
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS nova_messages_session_idx
  ON nova_messages (session_id, created_at DESC);

-- ── nova_feedback ─────────────────────────────────────────────────────────────
-- Thumbs up / down per message. Unique so user can change their mind.

CREATE TABLE IF NOT EXISTS nova_feedback (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid UNIQUE NOT NULL REFERENCES nova_messages(id) ON DELETE CASCADE,
  helpful    boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ── nova_leads ────────────────────────────────────────────────────────────────
-- Qualified leads captured via Nova's lead-capture flow.

CREATE TABLE IF NOT EXISTS nova_leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  text REFERENCES nova_sessions(session_id) ON DELETE SET NULL,
  name        text CHECK (char_length(name) <= 100),
  email       text CHECK (char_length(email) <= 200),
  company     text CHECK (char_length(company) <= 200),
  role        text CHECK (char_length(role) <= 200),
  challenge   text CHECK (char_length(challenge) <= 1000),
  volume      text CHECK (char_length(volume) <= 200),
  timeframe   text CHECK (char_length(timeframe) <= 200),
  source_url  text CHECK (char_length(source_url) <= 500),
  score       int  DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  created_at  timestamptz DEFAULT now()
);

-- ── nova_knowledge ────────────────────────────────────────────────────────────
-- RAG knowledge base. Embeddings are 1536-dim (text-embedding-3-small / Voyage-2).

CREATE TABLE IF NOT EXISTS nova_knowledge (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_id   text UNIQUE NOT NULL,
  content    text NOT NULL,
  metadata   jsonb,
  embedding  vector(1536),
  created_at timestamptz DEFAULT now()
);

-- IVFFlat index for fast approximate nearest-neighbour search
-- Run AFTER inserting data (requires at least 1 row):
-- CREATE INDEX nova_knowledge_embedding_idx
--   ON nova_knowledge USING ivfflat (embedding vector_cosine_ops)
--   WITH (lists = 100);

-- ── audit_log ─────────────────────────────────────────────────────────────────
-- Security events: rate limit violations, injection attempts, lead captures.

CREATE TABLE IF NOT EXISTS audit_log (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action     text NOT NULL,
  ip_hash    text,
  metadata   jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_log_action_idx ON audit_log (action, created_at DESC);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- All tables: ONLY the service_role (server-side API routes) can access.
-- The anon key (used by Next.js client) has NO access to any Nova table.

ALTER TABLE nova_sessions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE nova_messages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE nova_feedback  ENABLE ROW LEVEL SECURITY;
ALTER TABLE nova_leads     ENABLE ROW LEVEL SECURITY;
ALTER TABLE nova_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log      ENABLE ROW LEVEL SECURITY;

-- Drop policies if re-running
DROP POLICY IF EXISTS "service_role_only" ON nova_sessions;
DROP POLICY IF EXISTS "service_role_only" ON nova_messages;
DROP POLICY IF EXISTS "service_role_only" ON nova_feedback;
DROP POLICY IF EXISTS "service_role_only" ON nova_leads;
DROP POLICY IF EXISTS "service_role_only" ON nova_knowledge;
DROP POLICY IF EXISTS "service_role_only" ON audit_log;

-- Only service_role bypass RLS (set in Supabase client with service_role key)
CREATE POLICY "service_role_only" ON nova_sessions  USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON nova_messages  USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON nova_feedback  USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON nova_leads     USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON nova_knowledge USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON audit_log      USING (auth.role() = 'service_role');

-- ── match_nova_knowledge RPC function ────────────────────────────────────────
-- Called by /api/agent/knowledge for vector similarity search.

CREATE OR REPLACE FUNCTION match_nova_knowledge(
  query_embedding vector(1536),
  match_threshold float  DEFAULT 0.7,
  match_count     int    DEFAULT 3
)
RETURNS TABLE (
  id         uuid,
  chunk_id   text,
  content    text,
  metadata   jsonb,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    nk.id,
    nk.chunk_id,
    nk.content,
    nk.metadata,
    1 - (nk.embedding <=> query_embedding) AS similarity
  FROM nova_knowledge nk
  WHERE 1 - (nk.embedding <=> query_embedding) > match_threshold
  ORDER BY nk.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ── Verification ──────────────────────────────────────────────────────────────
-- After running this migration, verify with:
--   SELECT tablename, rowsecurity FROM pg_tables
--   WHERE tablename IN ('nova_sessions','nova_messages','nova_feedback','nova_leads','nova_knowledge','audit_log');
-- All rows should show rowsecurity = true.
