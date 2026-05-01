import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Locale } from "@/i18n";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/about",
    title: t("about.hero.title"),
    description: t("about.story.p1"),
  });
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tHero = useTranslations("about.hero");
  const tStory = useTranslations("about.story");
  const tMission = useTranslations("about.mission");
  const tName = useTranslations("about.name");
  const tTeam = useTranslations("about.team");
  const tLoc = useTranslations("about.location");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bovorn Vichiansin",
    jobTitle: "Founder & CEO",
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    affiliation: [
      {
        "@type": "EducationalOrganization",
        name: "Chulalongkorn University",
        department: "Master of Financial Engineering",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
  };

  return (
    <>
      <JsonLd data={personSchema} />

      <Hero title={tHero("title")} subtitle={tLoc("summary")} />

      <Section background="card">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {tStory("title")}
          </h2>
          <div className="space-y-4 text-lg text-brand-body">
            <p>{tStory("p1")}</p>
            <p>{tStory("p2")}</p>
            <p>{tStory("p3")}</p>
            <p>{tStory("p4")}</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {tMission("title")}
          </h2>
          <div className="space-y-4 text-lg text-brand-body">
            <p>{tMission("p1")}</p>
            <p>{tMission("p2")}</p>
          </div>
        </div>
      </Section>

      <Section background="card">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {tName("title")}
          </h2>
          <div className="space-y-4 text-lg text-brand-body">
            <p>{tName("p1")}</p>
            <p>{tName("p2")}</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">
            {tTeam("title")}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-xl bg-brand-card text-sm text-brand-muted">
                [Photo]
              </div>
              <h3 className="text-xl font-semibold">
                {tTeam("founder.name")}
              </h3>
              <p className="text-brand-muted">{tTeam("founder.role")}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="card">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {tLoc("title")}
          </h2>
          <div className="space-y-4 text-lg text-brand-body">
            <p>{tLoc("headquarters")}</p>
            <p>{tLoc("operations")}</p>
            <p className="pt-2">{tLoc("intent")}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
