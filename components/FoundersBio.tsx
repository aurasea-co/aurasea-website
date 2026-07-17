import { useTranslations } from "next-intl";

export function FoundersBio() {
  const t = useTranslations("homepage.founder");
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
      <p className="mb-4 text-lg text-brand-muted">{t("intro")}</p>
      <p className="text-brand-body">{t("bio")}</p>
    </div>
  );
}
