import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { NewsletterSignup } from "./NewsletterSignup";

export function Footer() {
  const t = useTranslations("footer");
  const tLinks = useTranslations("footer.links");

  const company = [
    { href: "/about", key: "about" },
    { href: "/careers", key: "careers" },
    { href: "/contact", key: "contact" },
  ] as const;

  const products = [{ href: "/products", key: "products" }] as const;

  const resources = [
    { href: "/partners", key: "partners" },
    { href: "/press", key: "press" },
  ] as const;

  const legal = [
    { href: "/legal/privacy", key: "privacy" },
    { href: "/legal/terms", key: "terms" },
  ] as const;

  return (
    <footer className="border-t border-black/5 bg-brand-card">
      <div className="mx-auto max-w-content px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="inline-block" aria-label="Aurasea home">
              <Logo size="footer" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-brand-muted">
              {t("tagline")}
            </p>
            <div className="mt-4 space-y-1 text-sm text-brand-muted">
              <p className="font-semibold text-brand-navy">
                {t("address.companyName")}
              </p>
              <p>{t("address.headquarters")}</p>
              <p>{t("address.operations")}</p>
            </div>
            <div className="mt-6">
              <NewsletterSignup />
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-brand-navy">
              {t("company")}
            </h4>
            <ul className="space-y-2">
              {company.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-muted hover:text-brand-navy"
                  >
                    {tLinks(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-brand-navy">
              {t("products")}
            </h4>
            <ul className="space-y-2">
              {products.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-muted hover:text-brand-navy"
                  >
                    {tLinks(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-brand-navy">
              {t("resources")}
            </h4>
            <ul className="space-y-2">
              {resources.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-muted hover:text-brand-navy"
                  >
                    {tLinks(key)}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mb-3 mt-6 text-sm font-semibold text-brand-navy">
              {t("legal")}
            </h4>
            <ul className="space-y-2">
              {legal.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-muted hover:text-brand-navy"
                  >
                    {tLinks(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-brand-muted">{t("copyright")}</p>
          <LanguageToggle />
        </div>
      </div>
    </footer>
  );
}
