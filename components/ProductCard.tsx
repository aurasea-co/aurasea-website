import type { ReactNode } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";

type ProductCardProps = {
  title: ReactNode;
  description: ReactNode;
  cta: string;
  href: string;
  external?: boolean;
  badge?: string;
};

export function ProductCard({
  title,
  description,
  cta,
  href,
  external,
  badge,
}: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {badge && <Badge variant="amber">{badge}</Badge>}
      </div>
      <p className="mb-6 flex-grow text-brand-muted">{description}</p>
      <Button
        href={href}
        external={external}
        variant="ghost"
        className="self-start !px-0"
      >
        {cta} →
      </Button>
    </Card>
  );
}
