"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const tNav = useTranslations("navigation");
  const tHeader = useTranslations("header");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/products", label: tNav("products") },
    { href: "/about", label: tNav("about") },
    { href: "/partners", label: tNav("partners") },
    { href: "/press", label: tNav("press") },
    { href: "/careers", label: tNav("careers") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-brand-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Aurasea home">
          <Logo size="header" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-brand-body transition-colors hover:text-brand-navy"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageToggle />
          <Button href="/partners" size="md">
            {tHeader("cta")}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6H21M3 12H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 lg:hidden">
          <nav className="mx-auto flex max-w-content flex-col gap-1 px-6 py-4 lg:px-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-2 text-base font-medium text-brand-body hover:text-brand-navy"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between">
              <LanguageToggle />
              <Button href="/partners" size="md">
                {tHeader("cta")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
