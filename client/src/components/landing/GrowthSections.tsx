import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  DatabaseZap,
  Gauge,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Workflow
} from "../ui/icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const caseStudies = [
  {
    title: "Amazon Growth",
    brand: "D2C wellness brand",
    metrics: [["214%", "revenue growth"], ["3.2x", "ROAS"], ["46%", "listing conversion lift"]],
    challenge: "Strong product, weak search visibility, inconsistent content, and ad spend leaking into low-intent keywords.",
    execution: "Rebuilt listing architecture, cleaned catalog issues, tightened sponsored ads, and introduced weekly keyword decisions."
  },
  {
    title: "Shopify Conversion",
    brand: "Premium lifestyle store",
    metrics: [["38%", "checkout conversion increase"], ["27%", "bounce reduction"], ["1.6s", "faster product pages"]],
    challenge: "Traffic was healthy, but product pages lacked hierarchy and the checkout path created unnecessary hesitation.",
    execution: "Redesigned product templates, simplified offer presentation, improved speed, and added funnel analytics."
  },
  {
    title: "Marketplace Scaling",
    brand: "Home category operator",
    metrics: [["5", "marketplaces launched"], ["62%", "catalog visibility lift"], ["18h", "weekly reporting saved"]],
    challenge: "The team was expanding channels without a single operating view for SKUs, inventory, and channel performance.",
    execution: "Mapped catalog priorities, created marketplace scorecards, and automated reporting for sharper weekly decisions."
  }
];

const reasons = [
  ["Marketplace-first expertise", "Execution shaped around Amazon, Flipkart, Meesho, Shopify, and WooCommerce realities."],
  ["AI-assisted operations", "Practical automation for reporting, catalog intelligence, and performance analysis."],
  ["Conversion-focused design", "Stores and pages are built to reduce hesitation and make buying easier."],
  ["Performance discipline", "Campaigns are judged by ROAS, funnel quality, and commercial contribution."],
  ["India-specific understanding", "Marketplace behavior, catalog expectations, and buyer trust signals are handled locally."],
  ["Transparent reporting", "Clear dashboards, accountable KPIs, and weekly decisions instead of vague activity reports."]
];

const process = [
  ["Audit", "Analyze marketplace, website, ads, catalog, analytics, and conversion leaks."],
  ["Strategy", "Define platform priorities, growth roadmap, offer structure, and measurable KPIs."],
  ["Build", "Improve listings, store UX, landing pages, tracking, automations, and campaigns."],
  ["Scale", "Optimize ads, content, catalog performance, reporting, and marketplace expansion."],
  ["Report", "Share weekly dashboards, decision notes, and next actions tied to growth metrics."]
];

const aiSystems = [
  ["Automated marketplace reporting", BarChart3],
  ["Catalog intelligence", DatabaseZap],
  ["Ad performance analysis", LineChart],
  ["Product listing optimization", Target],
  ["Inventory and sales visibility", Activity],
  ["Customer behavior insights", Users]
];

const testimonials = [
  {
    quote: "Seller Rocket gave us the first clear view of where our Amazon growth was blocked. The work felt structured, commercial, and fast.",
    name: "Ananya Rao",
    role: "Founder, skincare brand",
    result: "3.1x ROAS after catalog cleanup"
  },
  {
    quote: "The Shopify rebuild made the store feel premium without making it complicated. We finally had analytics we could act on.",
    name: "Rohit Menon",
    role: "Operator, lifestyle ecommerce",
    result: "34% lift in product-page conversion"
  },
  {
    quote: "Their reporting changed our weekly decisions. We stopped guessing across marketplaces and started scaling the right SKUs.",
    name: "Nisha Mehta",
    role: "Director, home goods brand",
    result: "5-channel marketplace rollout"
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.36, ease: "easeOut" }
} as const;

export function ResultsSection() {
  return (
    <section id="results" className="bg-white py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.78fr_0.58fr] lg:items-end lg:justify-between">
          <div>
            <Badge variant="outline" className="mb-4 bg-brand-cream text-brand-navy">Results</Badge>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">
              Proof built around commercial outcomes, not vanity activity.
            </h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            Metrics are framed the way ecommerce leaders evaluate work: revenue growth, ROAS, conversion quality, operational speed, and scalable visibility.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              {...fadeUp}
              transition={{ duration: 0.36, delay: index * 0.06, ease: "easeOut" }}
              className="rounded-2xl border border-brand-line bg-brand-cream p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-brand-mutedGold">{study.brand}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-brand-deep">{study.title}</h3>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-navy shadow-sm">
                  <BadgeCheck className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {study.metrics.map(([value, label]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border border-brand-line bg-white px-4 py-3">
                    <span className="text-2xl font-bold text-brand-deep">{value}</span>
                    <span className="text-right text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
                <p><span className="font-bold text-brand-deep">Challenge:</span> {study.challenge}</p>
                <p><span className="font-bold text-brand-deep">Execution:</span> {study.execution}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="bg-brand-cream py-20 lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
        <motion.div {...fadeUp} className="lg:sticky lg:top-28">
          <Badge variant="outline" className="mb-4 bg-white text-brand-navy">Why Seller Rocket</Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">
            Built for brands that need execution, not theory.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Seller Rocket connects marketplace operations, storefront quality, advertising, analytics, and automation into one growth workflow.
          </p>
          <Button variant="navy" size="lg" className="mt-8 rounded-full" asChild>
            <a href="#lead-form">
              Talk to Seller Rocket
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map(([title, description], index) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ duration: 0.36, delay: index * 0.04, ease: "easeOut" }}
              className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm"
            >
              <ShieldCheck className="h-6 w-6 text-brand-mutedGold" />
              <h3 className="mt-5 text-xl font-bold tracking-tight text-brand-deep">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="bg-white py-20 lg:py-28">
      <div className="container">
        <motion.div {...fadeUp} className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 bg-brand-cream text-brand-navy">Workflow</Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">
            A clear growth workflow from audit to scale.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            The process is designed to remove ambiguity quickly and keep every week tied to a measurable commercial decision.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-5">
          {process.map(([title, description], index) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ duration: 0.36, delay: index * 0.05, ease: "easeOut" }}
              className="relative rounded-2xl border border-brand-line bg-brand-cream p-5"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-deep text-sm font-bold text-white">
                  {index + 1}
                </span>
                <Workflow className="h-5 w-5 text-brand-mutedGold" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-brand-deep">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IntelligenceSection() {
  return (
    <section className="bg-brand-deep py-20 text-white lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
        <motion.div {...fadeUp}>
          <Badge variant="glass" className="mb-4">AI systems</Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            AI-powered systems for faster ecommerce decisions.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/68">
            AI is used as an operational layer: cleaner reporting, sharper catalog decisions, faster ad analysis, and fewer blind spots across channels.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {aiSystems.map(([label, Icon], index) => (
            <motion.div
              key={label as string}
              {...fadeUp}
              transition={{ duration: 0.36, delay: index * 0.04, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/[0.07] p-5"
            >
              <Icon className="h-6 w-6 text-brand-gold" />
              <p className="mt-5 text-lg font-bold">{label as string}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-20 lg:py-28">
      <div className="container">
        <motion.div {...fadeUp} className="mb-12 max-w-3xl">
          <Badge variant="outline" className="mb-4 bg-brand-cream text-brand-navy">Testimonials</Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">
            Trusted by operators who care about measurable progress.
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              {...fadeUp}
              transition={{ duration: 0.36, delay: index * 0.06, ease: "easeOut" }}
              className="rounded-2xl border border-brand-line bg-brand-cream p-6 shadow-sm"
            >
              <div className="flex gap-1 text-brand-mutedGold" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-6 text-lg font-semibold leading-8 text-brand-deep">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-brand-line pt-5">
                <p className="font-bold text-brand-deep">{testimonial.name}</p>
                <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
                <p className="mt-4 inline-flex rounded-full border border-brand-line bg-white px-3 py-1.5 text-xs font-bold text-brand-navy">
                  {testimonial.result}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="bg-brand-cream py-16">
      <div className="container">
        <motion.div
          {...fadeUp}
          className="overflow-hidden rounded-[2rem] bg-brand-deep p-8 text-white shadow-navy-glow md:p-12 lg:p-14"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge variant="glass" className="mb-4">Growth audit</Badge>
              <h2 className="max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Ready to find your next ecommerce growth opportunity?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
                Get a focused audit of your marketplace, website, ads, catalog, and conversion funnel.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button variant="gold" size="lg" className="rounded-full" asChild>
                <a href="#lead-form">
                  Book Free Growth Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="glass" size="lg" className="rounded-full" asChild>
                <a href="tel:+919944331949">Talk to Seller Rocket</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function GrowthSections() {
  return (
    <>
      <ResultsSection />
      <WhyChooseSection />
      <ProcessSection />
      <IntelligenceSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
