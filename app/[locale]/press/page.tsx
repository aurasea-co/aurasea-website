import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/press",
    title: t("press.hero.title"),
    description: t("press.inquiries.description"),
  });
}

export default function PressPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tHero = useTranslations("press.hero");
  const tInq = useTranslations("press.inquiries");
  const tFacts = useTranslations("press.facts");
  const tAssets = useTranslations("press.assets");
  const tRecent = useTranslations("press.recent");

  return (
    <>
      <Hero title={tHero("title")} />

      <Section background="card">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold">{tInq("title")}</h2>
          <p className="mb-2 text-lg text-brand-body">{tInq("description")}</p>
          <a
            href={`mailto:${tInq("email")}`}
            className="text-lg font-medium text-brand-green-dark hover:text-brand-green"
          >
            {tInq("email")}
          </a>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">{tFacts("title")}</h2>
          <ul className="space-y-2 text-lg text-brand-body">
            <li>{tFacts("founded")}</li>
            <li>{tFacts("headquarters")}</li>
            <li>{tFacts("operations")}</li>
            <li>{tFacts("founder")}</li>
            <li>{tFacts("products")}</li>
            <li>{tFacts("market")}</li>
          </ul>
        </div>
      </Section>

      <Section background="card">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">{tAssets("title")}</h2>
          <p className="mb-4 text-brand-body">{tAssets("description")}</p>
          <p className="text-brand-muted">{tAssets("comingSoon")}</p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">{tRecent("title")}</h2>
          <Card>
            <p className="text-brand-muted">{tRecent("empty")}</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
