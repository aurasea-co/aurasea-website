import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const paths = [
  "/",
  "/about",
  "/products",
  "/partners",
  "/press",
  "/careers",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((path) => {
    const suffix = path === "/" ? "" : path;
    const thUrl = `${SITE_URL}${suffix}`;
    const enUrl = `${SITE_URL}/en${suffix}`;
    return {
      url: thUrl,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1.0 : 0.8,
      alternates: {
        languages: {
          th: thUrl,
          en: enUrl,
          "x-default": thUrl,
        },
      },
    };
  });
}
