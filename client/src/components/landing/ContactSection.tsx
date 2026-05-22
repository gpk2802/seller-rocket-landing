import { motion } from "framer-motion";
import { CheckCircle2, Mail, PhoneCall, ShieldCheck } from "../ui/icons";
import { Badge } from "../ui/badge";
import { LeadForm } from "./LeadForm";

const auditIncludes = [
  "Marketplace and catalog review",
  "Storefront conversion notes",
  "Ad and funnel priority map",
  "Reporting and AI workflow opportunities"
];

export function ContactSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
          className="lg:sticky lg:top-28"
        >
          <Badge variant="outline" className="mb-4 bg-brand-cream text-brand-navy">Contact</Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">
            Start with a focused growth audit.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Send the details that matter. Seller Rocket will identify where growth is leaking and what should be fixed first.
          </p>

          <div className="mt-8 grid gap-3">
            {auditIncludes.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-brand-line bg-brand-cream p-4 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-5 w-5 flex-none text-brand-mutedGold" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-line bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-brand-mutedGold" />
              <p className="font-bold text-brand-deep">Direct contact</p>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <a href="mailto:ceo@sellerrocket.in" className="flex items-center gap-2 transition hover:text-brand-navy">
                <Mail className="h-4 w-4" />
                ceo@sellerrocket.in
              </a>
              <a href="tel:+919944331949" className="flex items-center gap-2 transition hover:text-brand-navy">
                <PhoneCall className="h-4 w-4" />
                +91 99443 31949
              </a>
            </div>
          </div>
        </motion.div>

        <LeadForm />
      </div>
    </section>
  );
}
