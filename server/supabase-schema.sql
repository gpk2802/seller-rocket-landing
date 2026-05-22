create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null check (phone ~ '^[0-9]{10}$'),
  email text not null,
  platform text not null,
  message text not null default '',
  status text not null default 'New',
  created_at timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'leads' and column_name = 'website'
  ) then
    alter table public.leads drop column website;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'leads' and column_name = 'revenue_range'
  ) then
    alter table public.leads drop column revenue_range;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'leads' and column_name = 'service_interest'
  ) then
    alter table public.leads drop column service_interest;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'leads_platform_check' and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads drop constraint leads_platform_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'leads_status_check' and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads drop constraint leads_status_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'leads_revenue_range_check' and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads drop constraint leads_revenue_range_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'leads_service_interest_check' and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads drop constraint leads_service_interest_check;
  end if;
end $$;

update public.leads
set platform = 'Amazon'
where platform not in ('Amazon', 'Flipkart', 'Shopify', 'WordPress');

update public.leads
set status = 'New'
where status not in ('New', 'Contacted', 'Converted', 'Rejected');

alter table public.leads
  add constraint leads_platform_check
  check (platform in ('Amazon', 'Flipkart', 'Shopify', 'WordPress'));

alter table public.leads
  add constraint leads_status_check
  check (status in ('New', 'Contacted', 'Converted', 'Rejected'));

create index if not exists leads_platform_idx on public.leads (platform);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
