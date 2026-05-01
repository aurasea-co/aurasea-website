import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "green" | "amber";
  className?: string;
};

const variantClasses = {
  default: "bg-brand-card text-brand-muted",
  green: "bg-brand-green/10 text-brand-green-dark",
  amber: "bg-brand-amber/10 text-brand-amber",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
