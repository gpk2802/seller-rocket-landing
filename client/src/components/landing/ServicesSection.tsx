import { motion } from "framer-motion";
import { ArrowRight, Code2, DatabaseZap, Globe2, Megaphone, PackageCheck, Store } from "../ui/icons";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

const services = [
  {
    title: "Amazon Management",
    description: "Listing, catalog, pricing, ads, and account execution for brands that need marketplace discipline.",
    icon: PackageCheck,
    tag: "Marketplace",
    points: ["Ranking clarity", "Catalog hygiene", "Ad efficiency"]
  },
  {
    title: "Shopify Store Setup",
    description: "Premium storefronts built around conversion paths, analytics, speed, and clean merchandising.",
    icon: Store,
    tag: "Storefront",
    points: ["Conversion UX", "Checkout flow", "Performance setup"]
  },
  {
    title: "WordPress Development",
    description: "Trust-building brand sites and WooCommerce systems with clear lead capture and content structure.",
    icon: Code2,
    tag: "Development",
    points: ["Fast pages", "Lead forms", "CMS control"]
  },
  {
    title: "Marketplace Growth",
    description: "Expansion systems for Flipkart, Meesho, and category marketplaces with reporting discipline.",
    icon: Globe2,
    tag: "Scale",
    points: ["Platform launch", "Catalog mapping", "Visibility lift"]
  },
  {
    title: "AI Ecommerce Systems",
    description: "Operational AI workflows for reporting, catalog intelligence, ad analysis, and decision speed.",
    icon: DatabaseZap,
    tag: "Automation",
    points: ["Auto reports", "SKU insights", "Faster decisions"]
  },
  {
    title: "Performance Marketing",
    description: "Meta, Google, and marketplace campaigns managed around ROAS, funnel health, and contribution margin.",
    icon: Megaphone,
    tag: "Acquisition",
    points: ["ROAS control", "Creative testing", "Funnel tracking"]
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-brand-cream py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_0.65fr] lg:items-end lg:justify-between">
          <div>
            <Badge variant="outline" className="mb-4 bg-white text-brand-navy">Services</Badge>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">
              Growth systems for every serious ecommerce bottleneck.
            </h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            Every service is shaped around outcomes that matter: visibility, conversion, ad efficiency, operational clarity, and repeatable growth.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className={cn(
                "group relative min-h-[292px] overflow-hidden rounded-2xl border border-brand-line bg-white p-6 shadow-sm transition duration-300",
                "hover:-translate-y-1 hover:border-brand-gold/80 hover:shadow-brand-lift"
              )}
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-line bg-brand-cream text-brand-navy transition duration-300 group-hover:border-brand-gold group-hover:text-brand-mutedGold">
                  <service.icon className="h-6 w-6" />
                </span>
                <Badge variant="outline" className="bg-white text-slate-500">{service.tag}</Badge>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold tracking-tight text-brand-deep">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <span key={point} className="rounded-full border border-brand-line bg-brand-cream px-3 py-1.5 text-xs font-bold text-slate-600">
                      {point}
                    </span>
                  ))}
                </div>
                <a href="#lead-form" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition hover:text-brand-mutedGold">
                  Explore service
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
