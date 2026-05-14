-- SupraCloud — initial database schema
-- Run this in Supabase: SQL Editor → paste → Run

-- ── 1. nova_sessions ─────────────────────────────────────────────────────────
-- Stores one row per Nova chat session (browser tab / visitor)

create table if not exists nova_sessions (
  id            uuid primary key default gen_random_uuid(),
  session_id    text unique not null,
  visitor_name  text,
  last_seen_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create index if not exists nova_sessions_session_id_idx on nova_sessions (session_id);
create index if not exists nova_sessions_last_seen_idx  on nova_sessions (last_seen_at desc);


-- ── 2. nova_messages ─────────────────────────────────────────────────────────
-- Stores every individual message in a Nova conversation

create table if not exists nova_messages (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null references nova_sessions (session_id) on delete cascade,
  role        text not null check (role in ('user', 'nova')),
  content     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists nova_messages_session_idx    on nova_messages (session_id);
create index if not exists nova_messages_created_at_idx on nova_messages (created_at desc);


-- ── 3. nova_leads ────────────────────────────────────────────────────────────
-- Stores qualified leads captured by Nova during conversations

create table if not exists nova_leads (
  id          uuid primary key default gen_random_uuid(),
  session_id  text,
  name        text,
  email       text,
  company     text,
  role        text,
  challenge   text,
  volume      text,
  timeframe   text,
  source_url  text,
  score       integer default 0,
  created_at  timestamptz not null default now()
);

create index if not exists nova_leads_email_idx      on nova_leads (email);
create index if not exists nova_leads_score_idx      on nova_leads (score desc);
create index if not exists nova_leads_created_at_idx on nova_leads (created_at desc);


-- ── 4. audit_log ─────────────────────────────────────────────────────────────
-- Security audit trail — hashed IPs, actions, metadata (GDPR compliant)

create table if not exists audit_log (
  id         uuid primary key default gen_random_uuid(),
  action     text not null,
  ip_hash    text,
  metadata   jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_action_idx     on audit_log (action);
create index if not exists audit_log_created_at_idx on audit_log (created_at desc);


-- ── 5. sc_bookings ───────────────────────────────────────────────────────────
-- Discovery call bookings from the /book page

create table if not exists sc_bookings (
  id            uuid primary key default gen_random_uuid(),
  name          text,
  email         text,
  company       text,
  role          text,
  challenge     text,
  slot_start    timestamptz,
  slot_end      timestamptz,
  calendar_id   text,
  meet_link     text,
  status        text default 'confirmed',
  created_at    timestamptz not null default now()
);

create index if not exists sc_bookings_email_idx      on sc_bookings (email);
create index if not exists sc_bookings_slot_start_idx on sc_bookings (slot_start);


-- ── Row Level Security ────────────────────────────────────────────────────────
-- All tables are private — only accessible via service_role key (server-side)
-- The anon key cannot read or write any of these tables

alter table nova_sessions enable row level security;
alter table nova_messages  enable row level security;
alter table nova_leads     enable row level security;
alter table audit_log      enable row level security;
alter table sc_bookings    enable row level security;

-- No public policies — service_role bypasses RLS automatically
-- This means: your API routes (server-side) can read/write freely
-- But no browser code using the anon key can access any data
