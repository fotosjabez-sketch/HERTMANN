"use client";

import { RevealGroup } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { ordinal } from "@/lib/format";
import type { Piece } from "@/lib/data/catalogue";
import { cn } from "@/lib/utils";

export function ProductGrid({
  pieces,
  className,
  columns = 3,
  withIndex = false,
}: {
  pieces: Piece[];
  className?: string;
  columns?: 2 | 3 | 4;
  withIndex?: boolean;
}) {
  const cols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <RevealGroup
      className={cn("grid gap-x-[clamp(0.75rem,2vw,2rem)] gap-y-[clamp(3rem,5vw,5.5rem)]", cols, className)}
      stagger={0.07}
      y={26}
    >
      {pieces.map((piece, i) => (
        <ProductCard
          key={piece.slug}
          piece={piece}
          index={withIndex ? ordinal(i) : undefined}
          sizes={
            columns === 4
              ? "(max-width: 640px) 50vw, 24vw"
              : columns === 3
                ? "(max-width: 1024px) 50vw, 31vw"
                : "(max-width: 640px) 100vw, 46vw"
          }
        />
      ))}
    </RevealGroup>
  );
}
