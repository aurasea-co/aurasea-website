import type { ReactNode, ElementType } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`rounded-xl bg-brand-white p-6 shadow-sm ring-1 ring-black/5 md:p-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
