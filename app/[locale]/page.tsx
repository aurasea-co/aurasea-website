import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { FoundersBio } from "@/components/FoundersBio";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Locale } from "@/i18n";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "homepage.hero" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/",
    title: t("headline"),
    description: t("subheadline"),
  });
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tHero = useTranslations("homepage.hero");
  const tProblem = useTranslations("homepage.problem");
  const tProducts = useTranslations("homepage.products");
  const tRegional = useTranslations("homepage.regional");
  const tCta = useTranslations("homepage.footerCta");

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    founder: {
      "@type": "Person",
      name: "Bovorn Vichiansin",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      <Hero title={tHero("headline")} subtitle={tHero("subheadline")}>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/products" size="lg">
            {tHero("ctaPrimary")}
          </Button>
          <Button href="/partners" variant="secondary" size="lg">
            {tHero("ctaSecondary")}
          </Button>
        </div>
      </Hero>

      <Section background="card">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">
            {tProblem("title")}
          </h2>
          <div className="space-y-4 text-lg text-brand-body">
            <p>{tProblem("p1")}</p>
            <p>{tProblem("p2")}</p>
            <p>{tProblem("p3")}</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {tProducts("title")}
          </h2>
          <p className="text-lg text-brand-muted">{tProducts("subtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <ProductCard
            title={tProducts("auraseaos.title")}
            description={tProducts("auraseaos.description")}
            cta={tProducts("auraseaos.cta")}
            href="https://auraseaos.com"
            external
            plan={tProducts("auraseaos.plan")}
          />
          <ProductCard
            title={tProducts("ratedesk.title")}
            description={tProducts("ratedesk.description")}
            cta={tProducts("ratedesk.cta")}
            href="https://ratedesk.ai"
            external
            plan={tProducts("ratedesk.plan")}
            planNote={tProducts("ratedesk.planNote")}
          />
          <ProductCard
            title={tProducts("menudesk.title")}
            description={tProducts("menudesk.description")}
            cta={tProducts("menudesk.cta")}
            href="/products"
            badge={tProducts("menudesk.badge")}
          />
        </div>
      </Section>

      <Section background="card">
        <FoundersBio />
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {tRegional("title")}
          </h2>
          <div className="space-y-4 text-lg text-brand-body">
            <p>{tRegional("p1")}</p>
            <p>{tRegional("p2")}</p>
          </div>
        </div>
      </Section>

      <Section background="card" size="compact">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {tCta("title")}
          </h2>
          <p className="mb-8 text-lg text-brand-muted">{tCta("subtitle")}</p>
          <Button href="/products" size="lg">
            {tCta("cta")}
          </Button>
        </div>
      </Section>
    </>
  );
}
