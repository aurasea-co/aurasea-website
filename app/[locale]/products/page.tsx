import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n";

type ProductKey = "auraseaos" | "ratedesk" | "menudesk";

const productLinks: Record<ProductKey, string> = {
  auraseaos: "https://auraseaos.com",
  ratedesk: "https://ratedesk.ai",
  menudesk: "https://menudesk.ai",
};

const upcomingProducts: ProductKey[] = ["menudesk"];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "products.hero" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/products",
    title: t("title"),
    description: t("subtitle"),
  });
}

const pricedProducts: ProductKey[] = ["auraseaos", "ratedesk"];

function ProductBlock({ productKey }: { productKey: ProductKey }) {
  const t = useTranslations(`products.${productKey}`);
  const isUpcoming = upcomingProducts.includes(productKey);
  const hasPlan = pricedProducts.includes(productKey);
  return (
    <Card className="md:p-10">
      <div className="mb-2 flex items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-green-dark">
          {t("tagline")}
        </p>
        {isUpcoming && <Badge variant="amber">{t("badge")}</Badge>}
      </div>
      <h2 className="mb-4 text-3xl font-bold">{t("title")}</h2>
      <p className="mb-4 text-lg text-brand-body">{t("description")}</p>
      <p className="mb-6 text-sm text-brand-muted">{t("audience")}</p>
      {hasPlan && (
        <div className="mb-6 flex flex-wrap items-center gap-3 border-t border-brand-border pt-6">
          <span className="inline-block rounded-full bg-brand-green-light px-4 py-1.5 text-sm font-semibold text-brand-green-dark">
            {t("plan")}
          </span>
          {productKey === "ratedesk" && (
            <p className="text-sm text-brand-muted">{t("planNote")}</p>
          )}
        </div>
      )}
      <Button href={productLinks[productKey]} variant="primary" external>
        {t("cta")} →
      </Button>
    </Card>
  );
}

export default function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tHero = useTranslations("products.hero");

  return (
    <>
      <Hero title={tHero("title")} subtitle={tHero("subtitle")} />

      <Section>
        <div className="space-y-8">
          <ProductBlock productKey="auraseaos" />
          <ProductBlock productKey="ratedesk" />
          <ProductBlock productKey="menudesk" />
        </div>
      </Section>
    </>
  );
}
