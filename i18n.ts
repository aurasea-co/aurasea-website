import { getRequestConfig } from "next-intl/server";
import { showPricing } from "@/lib/pricing-visibility";

/**
 * Remove the two plan lines that carry a price.
 *
 * Both read "฿575 / branch / month (billed annually)" — homepage.products
 * .ratedesk.plan and products.ratedesk.plan. Stripping them here rather than
 * only where they render, because next-intl serialises the whole message tree
 * into the page: on the sister site, correctly gated components still left
 * the figures in view-source.
 *
 * ⚠️ ฿575 IS ALSO STALE, independently of this flag. It appears nowhere in
 * lib/billing/catalogue.ts (890 / 199 / 399 / 99, bundle 990) — a retired
 * annual price still advertised. Turning the flag back on will restore a
 * number that needs correcting first.
 */
function withoutPlanPrices<T>(messages: T): T {
  const m = JSON.parse(JSON.stringify(messages)) as Record<string, any>;
  delete m?.homepage?.products?.ratedesk?.plan;
  delete m?.products?.ratedesk?.plan;
  return m as T;
}

export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && locales.includes(requested as Locale)
      ? (requested as Locale)
      : defaultLocale;

  return {
    locale,
    messages: showPricing()
      ? (await import(`./messages/${locale}.json`)).default
      : withoutPlanPrices((await import(`./messages/${locale}.json`)).default),
  };
});
