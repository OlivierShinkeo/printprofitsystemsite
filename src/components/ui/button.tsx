import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "gold" | "secondary" | "ghost" | "dark-outline";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border-[1.5px] font-sans text-xs font-semibold uppercase tracking-wider leading-none transition-all duration-[220ms] ease-out disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-5 text-[11px]",
  md: "h-11 px-7",
  lg: "h-13 px-9 text-xs",
};

const variants: Record<ButtonVariant, string> = {
  primary: "border-navy-800 bg-navy-800 text-white hover:border-gold-400 hover:bg-navy-700",
  gold: "border-gold-400 bg-gold-400 text-navy-900 hover:border-gold-300 hover:bg-gold-300",
  secondary: "border-navy-800 bg-transparent text-navy-800 hover:bg-navy-800 hover:text-white",
  ghost: "border-transparent bg-transparent text-gold-600 hover:text-gold-400",
  "dark-outline": "border-white/40 bg-transparent text-white hover:border-gold-400 hover:text-gold-400",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

type ButtonAsButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

export type ButtonProps = LinkProps | ButtonAsButtonProps;

const OWN_PROP_KEYS = ["variant", "size", "fullWidth", "className", "children", "href"] as const;

/** Strips the styling props so only real DOM attributes reach the <a>/<button>. */
function domProps<T extends object>(props: T): Record<string, unknown> {
  const rest: Record<string, unknown> = { ...(props as Record<string, unknown>) };
  for (const key of OWN_PROP_KEYS) delete rest[key];
  return rest;
}

/**
 * CTA button — mirrors the design system's Button.jsx (5 variants x 3 sizes).
 * Renders an <a> (internal Link or external anchor) when `href` is given,
 * otherwise a native <button>.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", fullWidth = false, className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], fullWidth && "w-full", className);

  if ("href" in props && props.href) {
    const { href } = props;
    const rest = domProps(props);
    if (href.startsWith("http")) {
      // Genuine external link — open in a new tab and prevent the opened
      // page from accessing `window.opener` (reverse tabnabbing).
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      );
    }
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const rest = domProps(props) as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={rest.type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
