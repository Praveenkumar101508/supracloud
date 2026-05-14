-- ============================================================
-- SupraCloud — Migration 002: RLS Hardening & Data Retention
-- Run in Supabase Dashboard → SQL Editor
--
-- What this migration adds:
--   1. Explicit DENY policies for anon + authenticated roles
--      (belt-and-suspenders — even if RLS misconfiguration occurs,
--       anonymous users can NEVER read sensitive Nova data)
--   2. Data retention helper functions (call via cron / pg_cron)
--   3. Restricted EXECUTE grant on match_nova_knowledge RPC
--   4. Revoke public schema permissions from public role
--   5. Audit log index improvements
-- ============================================================

-- ── 1. Belt-and-suspenders: explicit DENY for anon + authenticated ────────────
-- These policies ensure that even if the service_role policy is accidentally
-- removed or modified, anon and authenticated users still cannot access data.

-- nova_sessions
DROP POLICY IF EXISTS "deny_anon_sessions"          ON nova_sessions;
DROP POLICY IF EXISTS "deny_authenticated_sessions"  ON nova_sessions;
CREATE POLICY "deny_anon_sessions"
  ON nova_sessions AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false);
CREATE POLICY "deny_authenticated_sessions"
  ON nova_sessions AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false);

-- nova_messages
DROP POLICY IF EXISTS "deny_anon_messages"          ON nova_messages;
DROP POLICY IF EXISTS "deny_authenticated_messages"  ON nova_messages;
CREATE POLICY "deny_anon_messages"
  ON nova_messages AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false);
CREATE POLICY "deny_authenticated_messages"
  ON nova_messages AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false);

-- nova_feedback
DROP POLICY IF EXISTS "deny_anon_feedback"          ON nova_feedback;
DROP POLICY IF EXISTS "deny_authenticated_feedback"  ON nova_feedback;
CREATE POLICY "deny_anon_feedback"
  ON nova_feedback AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false);
CREATE POLICY "deny_authenticated_feedback"
  ON nova_feedback AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false);

-- nova_leads
DROP POLICY IF EXISTS "deny_anon_leads"          ON nova_leads;
DROP POLICY IF EXISTS "deny_authenticated_leads"  ON nova_leads;
CREATE POLICY "deny_anon_leads"
  ON nova_leads AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false);
CREATE POLICY "deny_authenticated_leads"
  ON nova_leads AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false);

-- nova_knowledge
DROP POLICY IF EXISTS "deny_anon_knowledge"          ON nova_knowledge;
DROP POLICY IF EXISTS "deny_authenticated_knowledge"  ON nova_knowledge;
CREATE POLICY "deny_anon_knowledge"
  ON nova_knowledge AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false);
CREATE POLICY "deny_authenticated_knowledge"
  ON nova_knowledge AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false);

-- audit_log
DROP POLICY IF EXISTS "deny_anon_audit"          ON audit_log;
DROP POLICY IF EXISTS "deny_authenticated_audit"  ON audit_log;
CREATE POLICY "deny_anon_audit"
  ON audit_log AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false);
CREATE POLICY "deny_authenticated_audit"
  ON audit_log AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false);

-- ── 2. Data retention functions ───────────────────────────────────────────────
-- Call these via pg_cron or a scheduled Edge Function.

-- Purge conversation messages older than 90 days
CREATE OR REPLACE FUNCTION purge_old_nova_messages()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM nova_messages
  WHERE created_at < now() - interval '90 days';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- Purge audit log entries older than 30 days
CREATE OR REPLACE FUNCTION purge_old_audit_logs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM audit_log
  WHERE created_at < now() - interval '30 days';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- Purge orphaned sessions (no messages, no leads, last_seen > 7 days)
CREATE OR REPLACE FUNCTION purge_orphaned_sessions()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM nova_sessions s
  WHERE s.last_seen_at < now() - interval '7 days'
    AND NOT EXISTS (
      SELECT 1 FROM nova_messages m WHERE m.session_id = s.session_id
    )
    AND NOT EXISTS (
      SELECT 1 FROM nova_leads l WHERE l.session_id = s.session_id
    );
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- ── 3. Revoke EXECUTE on retention functions from public/anon ─────────────────
REVOKE ALL ON FUNCTION purge_old_nova_messages()  FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION purge_old_audit_logs()     FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION purge_orphaned_sessions()  FROM PUBLIC, anon, authenticated;

-- Only service_role can call these (it bypasses RLS so no separate grant needed)

-- ── 4. Restrict match_nova_knowledge RPC ─────────────────────────────────────
-- Remove public EXECUTE right; only service_role (bypasses RLS) can call it.
REVOKE ALL ON FUNCTION match_nova_knowledge(vector, float, int)
  FROM PUBLIC, anon, authenticated;

-- ── 5. Revoke dangerous public schema defaults ────────────────────────────────
-- Prevent anon/authenticated from creating objects in public schema
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- ── 6. Additional audit_log indexes ──────────────────────────────────────────
CREATE INDEX IF NOT EXISTS audit_log_created_at_idx
  ON audit_log (created_at DESC);

CREATE INDEX IF NOT EXISTS audit_log_ip_hash_idx
  ON audit_log (ip_hash, created_at DESC);

-- ── 7. Row-count guard: prevent runaway inserts ───────────────────────────────
-- Reject inserts into nova_messages if a single session exceeds 1000 messages
-- (protects against infinite-loop attacks / storage abuse).
CREATE OR REPLACE FUNCTION check_nova_message_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  msg_count integer;
BEGIN
  SELECT COUNT(*) INTO msg_count
  FROM nova_messages
  WHERE session_id = NEW.session_id;

  IF msg_count >= 1000 THEN
    RAISE EXCEPTION 'Message limit reached for this session';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_message_limit ON nova_messages;
CREATE TRIGGER enforce_message_limit
  BEFORE INSERT ON nova_messages
  FOR EACH ROW
  EXECUTE FUNCTION check_nova_message_count();

-- ── Verification ──────────────────────────────────────────────────────────────
-- Verify RLS is still enabled on all tables:
--   SELECT tablename, rowsecurity FROM pg_tables
--   WHERE tablename IN ('nova_sessions','nova_messages','nova_feedback','nova_leads','nova_knowledge','audit_log');
--
-- Verify RESTRICTIVE policies exist:
--   SELECT tablename, policyname, cmd, roles, qual FROM pg_policies
--   WHERE schemaname = 'public' ORDER BY tablename, policyname;
