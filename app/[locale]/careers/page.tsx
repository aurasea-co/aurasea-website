import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
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
    path: "/careers",
    title: t("careers.hero.title"),
    description: t("careers.current.p2"),
  });
}

export default function CareersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tHero = useTranslations("careers.hero");
  const tCurrent = useTranslations("careers.current");
  const tReach = useTranslations("careers.reach");

  return (
    <>
      <Hero title={tHero("title")} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {tCurrent("title")}
          </h2>
          <div className="space-y-4 text-lg text-brand-body">
            <p>{tCurrent("p1")}</p>
            <p>{tCurrent("p2")}</p>
          </div>
        </div>
      </Section>

      <Section background="card" size="compact">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold">{tReach("title")}</h2>
          <p className="mb-8 text-lg text-brand-muted">
            {tReach("description")}
          </p>
          <Button href={`mailto:${tReach("email")}`} size="lg">
            {tReach("email")}
          </Button>
        </div>
      </Section>
    </>
  );
}
