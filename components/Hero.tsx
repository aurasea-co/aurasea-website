import type { ReactNode } from "react";
import { Container } from "./Container";

type HeroProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
};

export function Hero({
  title,
  subtitle,
  children,
  align = "center",
}: HeroProps) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <section className="bg-brand-white pb-12 pt-24 md:pb-20 md:pt-32 lg:pb-24 lg:pt-40">
      <Container>
        <div className={`max-w-3xl ${alignClass}`}>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-brand-muted md:text-xl">{subtitle}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
