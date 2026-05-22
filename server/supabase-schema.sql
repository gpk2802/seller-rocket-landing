create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null check (phone ~ '^[0-9]{10}$'),
  email text not null,
  website text not null default '',
  platform text not null,
  revenue_range text not null default 'Under ₹5L/month',
  service_interest text not null default 'Marketplace growth',
  message text not null default '',
  status text not null default 'New',
  created_at timestamptz not null default now()
);

alter table if exists public.leads add column if not exists website text not null default '';
alter table if exists public.leads add column if not exists revenue_range text not null default 'Under ₹5L/month';
alter table if exists public.leads add column if not exists service_interest text not null default 'Marketplace growth';

do $$
begin
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

alter table public.leads
  add constraint leads_platform_check
  check (platform in ('Amazon', 'Shopify', 'WordPress', 'Flipkart', 'Meesho', 'WooCommerce'));

alter table public.leads
  add constraint leads_status_check
  check (status in ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'));

alter table public.leads
  add constraint leads_revenue_range_check
  check (revenue_range in ('Under ₹5L/month', '₹5L–₹25L/month', '₹25L–₹1Cr/month', '₹1Cr+/month'));

alter table public.leads
  add constraint leads_service_interest_check
  check (service_interest in ('Amazon management', 'Shopify store', 'WordPress development', 'Marketplace growth', 'Performance marketing', 'AI ecommerce systems'));

create index if not exists leads_platform_idx on public.leads (platform);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
