import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-brand-soft hover:bg-brand-deep",
        gold: "bg-brand-gold text-brand-deep shadow-gold-glow hover:bg-[#E7B80F]",
        navy: "bg-brand-deep text-white shadow-navy-glow hover:bg-brand-navy",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-white/80 text-brand-deep hover:border-brand-gold hover:bg-brand-cream",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        ghost: "hover:bg-muted hover:text-foreground",
        glass: "border border-white/18 bg-white/8 text-white hover:border-brand-gold/70 hover:bg-white/14",
        subtle: "border border-brand-line bg-white text-brand-deep shadow-sm hover:border-brand-gold hover:bg-brand-cream",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-10 px-3",
        lg: "h-12 px-6",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
