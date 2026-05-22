import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, PhoneCall, X } from "../ui/icons";
import { Button } from "../ui/button";
import { BrandLogo } from "../ui/brand-logo";
import { cn } from "../../lib/utils";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#lead-form" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [{ href: "#home" }, ...navItems]
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-24% 0px -56% 0px", threshold: [0.18, 0.44, 0.72] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3">
      <nav
        className={cn(
          "mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between rounded-full border px-4 transition duration-300 md:px-5",
          scrolled || open
            ? "border-brand-line bg-white/88 text-brand-deep shadow-brand-soft backdrop-blur-xl"
            : "border-transparent bg-white/55 text-brand-deep backdrop-blur-md"
        )}
      >
        <a href="#home" className="flex min-w-0 items-center font-bold" onClick={() => setOpen(false)} aria-label="Seller Rocket home">
          <BrandLogo markClassName="h-10 w-10 shadow-sm" textClassName="hidden sm:block" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-brand-mist hover:text-brand-deep",
                activeHref === item.href ? "bg-brand-mist text-brand-deep" : "text-slate-500"
              )}
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="subtle" size="sm" asChild>
            <a href="tel:+919944331949">
              <PhoneCall className="mr-2 h-4 w-4" />
              Call
            </a>
          </Button>
          <Button variant="gold" size="sm" asChild>
            <a href="#lead-form">Book Growth Audit</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto", y: 0 },
          closed: { opacity: 0, height: 0, y: -8 }
        }}
        className={cn("mx-auto mt-2 max-w-[1180px] overflow-hidden rounded-3xl border border-brand-line bg-white shadow-brand-soft md:hidden", !open && "pointer-events-none")}
        id="mobile-navigation"
      >
        <div className="flex flex-col gap-2 p-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-brand-mist",
                activeHref === item.href ? "text-brand-deep" : "text-slate-500"
              )}
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          <Button variant="gold" className="mt-2 rounded-2xl" asChild>
            <a href="#lead-form" onClick={() => setOpen(false)}>Book Growth Audit</a>
          </Button>
        </div>
      </motion.div>
    </header>
  );
}
