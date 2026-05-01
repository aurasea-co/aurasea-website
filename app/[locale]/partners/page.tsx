import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "partners.hero" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/partners",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default function PartnersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tHero = useTranslations("partners.hero");
  const tWhy = useTranslations("partners.why");
  const tTypes = useTranslations("partners.types");
  const tCta = useTranslations("partners.cta");

  const partnershipTypes = [
    "integration",
    "distribution",
    "technology",
  ] as const;

  return (
    <>
      <Hero title={tHero("title")} subtitle={tHero("subtitle")} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {tWhy("title")}
          </h2>
          <div className="space-y-4 text-lg text-brand-body">
            <p>{tWhy("p1")}</p>
            <p>{tWhy("p2")}</p>
          </div>
        </div>
      </Section>

      <Section background="card">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {tTypes("title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {partnershipTypes.map((type) => (
            <Card key={type} className="flex h-full flex-col">
              <h3 className="mb-3 text-xl font-semibold">
                {tTypes(`${type}.title`)}
              </h3>
              <p className="text-brand-muted">{tTypes(`${type}.description`)}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section size="compact">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">{tCta("title")}</h2>
          <p className="mb-8 text-lg text-brand-muted">{tCta("subtitle")}</p>
          <Button href={`mailto:${tCta("email")}`} size="lg">
            {tCta("email")}
          </Button>
        </div>
      </Section>
    </>
  );
}
