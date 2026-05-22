import { cn } from "../../lib/utils";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  showTagline?: boolean;
};

export function BrandLogo({ className, markClassName, textClassName, showTagline = false }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-line",
          markClassName
        )}
        aria-hidden="true"
      >
        <svg className="h-9 w-9" viewBox="0 0 64 64" fill="none" role="presentation">
          <path d="M9 43.5C21.8 35.6 35.1 28.1 50 19.8" stroke="#F5C518" strokeWidth="5.7" strokeLinecap="round" />
          <path d="M13.5 47.4C25.5 41.2 38.1 35.9 51.5 31.4" stroke="#D92D20" strokeWidth="4.6" strokeLinecap="round" />
          <path d="M38.4 16.2 55 8.9l-5.1 17.2-9.7 3.3-5.1-5.1 3.3-8.1Z" fill="#313747" />
          <path d="m35.1 24.3-5.9 5.9 6.6 1.6 4.4-2.4-5.1-5.1Z" fill="#F5C518" />
          <path d="m49.9 26.1-2.1 6.7-5.9-3.4 8-3.3Z" fill="#D92D20" />
        </svg>
      </span>
      <span className={cn("leading-none", textClassName)}>
        <span className="block text-[1.15rem] font-bold tracking-tight text-brand-deep">
          Seller <span className="text-brand-mutedGold">Rocket</span>
        </span>
        {showTagline ? (
          <span className="mt-1 block text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Bringing smart business online
          </span>
        ) : null}
      </span>
    </span>
  );
}
