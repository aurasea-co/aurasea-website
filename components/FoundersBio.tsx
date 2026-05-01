import { useTranslations } from "next-intl";

export function FoundersBio() {
  const t = useTranslations("homepage.founder");
  return (
    <div className="grid items-start gap-10 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-brand-card text-sm text-brand-muted">
          [Founder photo]
        </div>
      </div>
      <div className="md:col-span-2">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mb-4 text-lg text-brand-muted">{t("intro")}</p>
        <p className="text-brand-body">{t("bio")}</p>
      </div>
    </div>
  );
}
