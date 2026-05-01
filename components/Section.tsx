import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  background?: "white" | "card";
  size?: "default" | "compact";
};

export function Section({
  children,
  className = "",
  containerClassName = "",
  background = "white",
  size = "default",
}: SectionProps) {
  const bg = background === "card" ? "bg-brand-card" : "bg-brand-white";
  const padding =
    size === "compact"
      ? "py-12 md:py-16 lg:py-20"
      : "py-16 md:py-24 lg:py-32";
  return (
    <section className={`${bg} ${padding} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
