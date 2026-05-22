import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  LineChart,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Store,
  Target
} from "../ui/icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const proofPoints = [
  "Amazon marketplace execution",
  "Shopify and WordPress builds",
  "Performance marketing systems",
  "AI-assisted ecommerce reporting"
];

const dashboardStats = [
  { label: "Revenue influenced", value: "₹10.8Cr", change: "+214%", icon: CircleDollarSign },
  { label: "Blended ROAS", value: "3.8x", change: "+41%", icon: LineChart },
  { label: "Conversion lift", value: "40%", change: "+18 pts", icon: Target }
];

const channelRows = [
  ["Amazon", "Listing visibility", "82%", "bg-emerald-500"],
  ["Shopify", "Checkout health", "91%", "bg-brand-gold"],
  ["Meta Ads", "ROAS control", "3.4x", "bg-brand-navy"],
  ["Catalog", "Content score", "76%", "bg-slate-400"]
];

export function Hero() {
  return (
    <section id="home" className="premium-grid relative overflow-hidden px-3 pt-28 md:pt-32">
      <div className="container relative grid grid-cols-1 gap-12 pb-16 pt-10 md:pt-14 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:items-center lg:gap-14 lg:pb-24 lg:pt-20">
        <div className="w-full min-w-0 max-w-full sm:max-w-3xl">
          <Badge variant="outline" className="mb-5 border-brand-line bg-white/80 px-3 py-1.5 text-brand-navy shadow-sm">
            Ecommerce growth agency for Indian brands
          </Badge>
          <h1 className="max-w-full break-words text-[2.45rem] font-bold leading-[1.04] tracking-tight text-brand-deep sm:text-5xl sm:leading-[1.02] md:text-6xl lg:text-[4.65rem] lg:leading-[0.98]">
            <span className="block sm:inline">Scale ecommerce </span>
            <span className="block sm:inline">growth with </span>
            <span className="block sm:inline">marketplace </span>
            <span className="block sm:inline">execution and AI </span>
            <span className="block sm:inline">systems.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
            Seller Rocket helps brands grow across Amazon, Shopify, WordPress, and marketplaces with conversion-focused storefronts, ads, catalog operations, and practical automation.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="gold" size="lg" className="w-full rounded-full sm:w-auto" asChild>
              <a href="#lead-form">
                Book a Free Growth Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="subtle" size="lg" className="w-full rounded-full sm:w-auto" asChild>
              <a href="#results">
                View Growth Results
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            {proofPoints.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <CheckCircle2 className="h-4 w-4 flex-none text-brand-mutedGold" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full min-w-0 max-w-full sm:max-w-none">
          <div className="absolute -left-8 top-8 h-40 w-40 rounded-full bg-brand-gold/18 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-8 bottom-8 h-52 w-52 rounded-full bg-brand-navy/14 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-full overflow-hidden rounded-[1.5rem] border border-white bg-white/88 p-3 shadow-brand-lift backdrop-blur sm:hidden">
            <div className="rounded-[1.15rem] border border-brand-line bg-brand-deep p-4 text-white">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Seller Rocket OS</p>
                  <h2 className="mt-2 text-lg font-bold">Growth command center</h2>
                </div>
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-gold text-brand-deep">
                  <BarChart3 className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {dashboardStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3">
                    <div className="min-w-0">
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="mt-0.5 text-xs font-medium text-white/56">{stat.label}</p>
                    </div>
                    <span className="flex-none rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold text-emerald-200">{stat.change}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.07] p-3">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white/80">Amazon visibility</span>
                  <span className="font-bold text-brand-gold">82%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden max-w-full overflow-hidden rounded-[2rem] border border-white bg-white/88 p-4 shadow-brand-lift backdrop-blur sm:block">
            <div className="rounded-[1.45rem] border border-brand-line bg-brand-deep p-4 text-white shadow-navy-glow">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">Seller Rocket OS</p>
                  <h2 className="mt-2 text-xl font-bold">Growth command center</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Live opportunities
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {dashboardStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <stat.icon className="h-4 w-4 text-brand-gold" />
                      <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[11px] font-bold text-emerald-200">{stat.change}</span>
                    </div>
                    <p className="mt-5 text-2xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium text-white/56">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.74fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Channel performance</p>
                      <p className="text-xs text-white/48">Marketplace, store, ads, catalog</p>
                    </div>
                    <BarChart3 className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div className="space-y-4">
                    {channelRows.map(([name, detail, value, tone]) => (
                      <div key={name}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                          <span className="font-semibold text-white/82">{name}</span>
                          <span className="text-white/48">{detail}</span>
                          <span className="font-bold text-brand-gold">{value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className={`${tone} h-full rounded-full`} style={{ width: value.includes("x") ? "68%" : value }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    { label: "Catalog health", value: "312 SKUs cleaned", icon: PackageCheck },
                    { label: "Storefront CRO", value: "Checkout leaks fixed", icon: Store },
                    { label: "AI reporting", value: "Weekly action map", icon: Sparkles },
                    { label: "Trust controls", value: "Transparent KPIs", icon: ShieldCheck }
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-gold">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-bold">{item.label}</p>
                          <p className="text-xs text-white/50">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
