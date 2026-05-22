import { ArrowRight, Mail, MapPin, PhoneCall, Rocket } from "../ui/icons";
import { Button } from "../ui/button";

const serviceLinks = ["Amazon Management", "Shopify Store Setup", "WordPress Development", "Marketplace Growth", "AI Ecommerce Systems"];
const platformLinks = ["Amazon", "Shopify", "WordPress", "WooCommerce", "Flipkart", "Meesho"];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-deep py-12 text-white">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-deep">
                <Rocket className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold">Seller Rocket</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/64">
              Ecommerce growth agency helping Indian brands scale through marketplace execution, premium storefronts, performance marketing, and AI-powered operations.
            </p>
            <Button variant="gold" className="mt-6 rounded-full" asChild>
              <a href="#lead-form">
                Book Growth Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white/42">Services</p>
            <div className="mt-4 grid gap-3 text-sm text-white/68">
              {serviceLinks.map((link) => (
                <a key={link} href="#services" className="transition hover:text-brand-gold">{link}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white/42">Platforms</p>
            <div className="mt-4 grid gap-3 text-sm text-white/68">
              {platformLinks.map((link) => (
                <a key={link} href="#services" className="transition hover:text-brand-gold">{link}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white/42">Contact</p>
            <div className="mt-4 grid gap-3 text-sm text-white/72">
              <a href="mailto:ceo@sellerrocket.in" className="flex items-center gap-2 transition hover:text-brand-gold">
                <Mail className="h-4 w-4" />
                ceo@sellerrocket.in
              </a>
              <a href="tel:+919944331949" className="flex items-center gap-2 transition hover:text-brand-gold">
                <PhoneCall className="h-4 w-4" />
                +91 99443 31949
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Thanjavur, Tamil Nadu
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/42 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Seller Rocket. All rights reserved.</p>
          <p>Marketplace growth, storefront systems, and performance execution.</p>
        </div>
      </div>
    </footer>
  );
}
