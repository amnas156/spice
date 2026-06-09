import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-charcoal bg-charcoal text-white hover:border-gold hover:bg-gold hover:text-charcoal",
  secondary: "border-charcoal/20 bg-white text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white",
  ghost: "border-transparent bg-transparent text-charcoal/70 hover:text-gold",
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

interface CommonProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({ variant = "primary", className, children, ...props }: NativeButtonProps) {
  return (
    <button className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({ variant = "primary", className, children, ...props }: LinkButtonProps) {
  return (
    <a className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </a>
  );
}
