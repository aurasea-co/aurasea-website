import type { Metadata } from "next";
import type { Locale } from "../i18n";

export const SITE_URL = "https://aurasea.ai";
export const SITE_NAME = "Aurasea";

const localeToOgLocale: Record<Locale, string> = {
  th: "th_TH",
  en: "en_US",
};

export function localizedPath(path: string, locale: Locale): string {
  if (locale === "th") return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

export function buildAlternates(path: string) {
  return {
    canonical: localizedPath(path, "th"),
    languages: {
      th: localizedPath(path, "th"),
      en: localizedPath(path, "en"),
      "x-default": localizedPath(path, "th"),
    },
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = localizedPath(path, locale);
  const otherLocale: Locale = locale === "th" ? "en" : "th";
  return {
    title,
    description,
    alternates: buildAlternates(path),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: localeToOgLocale[locale],
      alternateLocale: localeToOgLocale[otherLocale],
      type: "website",
      images: [
        { url: "/logo.svg", width: 240, height: 40, alt: SITE_NAME },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo.svg"],
    },
  };
}
