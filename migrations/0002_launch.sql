create table if not exists businesses (
  id text primary key,
  owner_user_id text not null,
  name text not null,
  slug text not null unique,
  path text not null,
  autonomy text not null,
  readiness integer not null default 0,
  profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists businesses_owner_idx on businesses (owner_user_id);

create table if not exists business_members (
  business_id text not null references businesses (id) on delete cascade,
  user_id text not null,
  role text not null,
  primary key (business_id, user_id)
);

create index if not exists business_members_user_idx on business_members (user_id);

create table if not exists user_prefs (
  user_id text primary key,
  active_business_id text
);

create table if not exists setup_drafts (
  user_id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists pages (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  kind text not null,
  title text not null,
  slug text not null unique,
  status text not null,
  direction text not null default 'paper',
  sections jsonb not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pages_business_idx on pages (business_id);

create table if not exists leads (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  name text not null,
  email text not null,
  source text not null,
  status text not null,
  note text not null default '',
  summary text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists leads_business_idx on leads (business_id);

create table if not exists workflows (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  template_id text not null,
  name text not null,
  summary text not null,
  trigger_label text not null,
  mode text not null,
  status text not null,
  steps jsonb not null,
  estimate integer not null,
  created_at timestamptz not null default now()
);

create index if not exists workflows_business_idx on workflows (business_id);

create table if not exists approvals (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  title text not null,
  summary text not null,
  why text not null,
  risk text not null,
  estimate integer not null,
  external_cost text not null,
  status text not null,
  kind text not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

create index if not exists approvals_business_idx on approvals (business_id);

create table if not exists executions (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  label text not null,
  units integer not null,
  status text not null,
  created_at timestamptz not null default now()
);

create index if not exists executions_business_idx on executions (business_id);

create table if not exists balances (
  business_id text primary key references businesses (id) on delete cascade,
  plan text not null,
  included integer not null,
  used integer not null default 0,
  topup integer not null default 0
);

create table if not exists usage_transactions (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  kind text not null,
  label text not null,
  units integer not null,
  created_at timestamptz not null default now()
);

create table if not exists activity (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  message text not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists activity_business_idx on activity (business_id, created_at desc);

create table if not exists campaigns (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  name text not null,
  goal text not null,
  audience text not null,
  offer text not null,
  channels text not null,
  budget text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists content_items (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  title text not null,
  body text not null,
  channel text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  title text not null,
  detail text not null default '',
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  label text not null,
  amount_cents integer not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists integrations (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  name text not null,
  status text not null,
  note text not null default ''
);

create table if not exists experiments (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  hypothesis text not null,
  status text not null,
  result text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists briefs (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists conversations (
  id text primary key,
  business_id text not null references businesses (id) on delete cascade,
  lead_id text,
  subject text not null,
  body text not null,
  status text not null,
  created_at timestamptz not null default now()
);
