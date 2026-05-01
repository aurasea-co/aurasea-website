import type { ReactNode } from "react";
import { Link } from "@/navigation";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green";

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-green text-white hover:bg-brand-green-dark",
  secondary:
    "border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
  ghost: "text-brand-navy hover:bg-brand-card",
};

type ButtonProps = {
  href?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function Button({
  href,
  external,
  type = "button",
  variant = "primary",
  size = "md",
  children,
  className = "",
}: ButtonProps) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (!external && isInternalHref(href)) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    const isWeb = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isWeb
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
