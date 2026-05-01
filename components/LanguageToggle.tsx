"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "th" ? "en" : "th";
  const label = otherLocale === "th" ? "TH" : "EN";

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-navy"
      aria-label={`Switch to ${otherLocale.toUpperCase()}`}
    >
      {label}
    </Link>
  );
}
