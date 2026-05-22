import { motion } from "framer-motion";

const metrics = [
  ["₹10Cr+", "marketplace revenue influenced"],
  ["120+", "ecommerce projects delivered"],
  ["3.8x", "average ROAS improvement"],
  ["40%", "average conversion lift"]
];

const platforms = ["Amazon", "Shopify", "WordPress", "WooCommerce", "Flipkart", "Meesho", "Meta Ads", "Google Ads"];

export function MarketplaceStrip() {
  return (
    <section className="border-y border-brand-line bg-white">
      <div className="container py-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="border-l border-brand-line pl-5"
            >
              <p className="text-3xl font-bold tracking-tight text-brand-deep md:text-4xl">{value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-brand-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-md text-sm font-semibold leading-6 text-slate-600">
            Built for the platforms Indian ecommerce brands actually grow on.
          </p>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <span key={platform} className="rounded-full border border-brand-line bg-brand-cream px-3 py-2 text-xs font-bold text-slate-600 shadow-sm">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
