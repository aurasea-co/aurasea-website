import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n";

type InboxKey =
  | "general"
  | "partnerships"
  | "press"
  | "careers"
  | "billing"
  | "support";

const inboxKeys: InboxKey[] = [
  "general",
  "partnerships",
  "press",
  "careers",
  "billing",
  "support",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: t("contact.hero.title"),
    description: t("metadata.description"),
  });
}

function InboxCard({ inboxKey }: { inboxKey: InboxKey }) {
  const t = useTranslations(`contact.emails.${inboxKey}`);
  return (
    <Card className="!p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
        {t("label")}
      </p>
      <a
        href={`mailto:${t("email")}`}
        className="text-base font-medium text-brand-green-dark hover:text-brand-green"
      >
        {t("email")}
      </a>
    </Card>
  );
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tHero = useTranslations("contact.hero");
  const tEmails = useTranslations("contact.emails");
  const tOffice = useTranslations("contact.office");
  const tForm = useTranslations("contact.form");

  return (
    <>
      <Hero title={tHero("title")} />

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold">{tEmails("title")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {inboxKeys.map((key) => (
              <InboxCard key={key} inboxKey={key} />
            ))}
          </div>
        </div>
      </Section>

      <Section background="card">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">{tOffice("title")}</h2>
          <div className="space-y-2 text-lg text-brand-body">
            <p>{tOffice("headquarters")}</p>
            <p>{tOffice("designPartner")}</p>
          </div>
          <p className="mt-6 text-brand-body">{tOffice("description")}</p>
          <p className="mt-4 text-brand-body">
            {tOffice("meetingCta")}{" "}
            <a
              href={`mailto:${tOffice("meetingEmail")}`}
              className="font-medium text-brand-green-dark hover:text-brand-green"
            >
              {tOffice("meetingEmail")}
            </a>
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-2xl font-bold">{tForm("title")}</h2>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
