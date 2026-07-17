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
  plan?: string;
  planNote?: string;
};

export function ProductCard({
  title,
  description,
  cta,
  href,
  external,
  badge,
  plan,
  planNote,
}: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {badge && <Badge variant="amber">{badge}</Badge>}
      </div>
      <p className="mb-4 flex-grow text-brand-muted">{description}</p>
      {plan && (
        <div className="mb-4 border-t border-brand-border pt-4">
          <span className="inline-block rounded-full bg-brand-green-light px-3 py-1 text-xs font-semibold text-brand-green-dark">
            {plan}
          </span>
          {planNote && (
            <p className="mt-2 text-xs text-brand-muted">{planNote}</p>
          )}
        </div>
      )}
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
