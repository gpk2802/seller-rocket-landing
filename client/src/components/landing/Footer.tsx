import { Mail, PhoneCall } from "../ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-deep py-10 text-white">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-bold tracking-tight">Seller Rocket</p>
          <p className="mt-2 text-sm text-white/56">Ecommerce growth support for marketplace and storefront brands.</p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/72 sm:flex-row sm:items-center sm:gap-6">
          <a href="mailto:ceo@sellerrocket.in" className="flex items-center gap-2 transition hover:text-brand-gold">
            <Mail className="h-4 w-4" />
            ceo@sellerrocket.in
          </a>
          <a href="tel:+919944331949" className="flex items-center gap-2 transition hover:text-brand-gold">
            <PhoneCall className="h-4 w-4" />
            +91 99443 31949
          </a>
        </div>
      </div>
    </footer>
  );
}
