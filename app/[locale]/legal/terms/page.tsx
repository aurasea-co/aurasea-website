import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n";

const sectionKeys = [
  "acceptance",
  "services",
  "limitations",
  "termination",
  "law",
] as const;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/legal/terms",
    title: t("title"),
    description: t("draftNotice"),
  });
}

export default function TermsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("legal.terms");

  return (
    <>
      <Hero title={t("title")} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Card className="mb-10 border-l-4 border-brand-amber bg-brand-amber/5">
            <p className="text-brand-body">{t("draftNotice")}</p>
          </Card>

          <div className="space-y-8">
            {sectionKeys.map((key) => (
              <div key={key}>
                <h2 className="mb-3 text-2xl font-bold">
                  {t(`sections.${key}`)}
                </h2>
                <p className="text-brand-muted">[Content to be drafted]</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
