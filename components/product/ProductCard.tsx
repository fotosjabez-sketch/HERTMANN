"use client";

import Link from "next/link";
import { useStore } from "@/components/commerce/StoreProvider";
import { PieceFigure } from "@/components/product/PieceFigure";
import { IconHeart } from "@/components/brand/Icons";
import { categoryName, type Piece } from "@/lib/data/catalogue";
import { price } from "@/lib/format";
import { cn } from "@/lib/utils";

/* ============================================================================
   Cartão de peça — sem moldura, sem sombra, sem botão.
   Uma prancha, um nome, uma categoria, um preço. O acesso rápido revela-se
   ao passar o cursor; o favorito vive no canto e não pede atenção.
   ========================================================================== */

export function ProductCard({
  piece,
  className,
  sizes,
  ratio = "4 / 5",
  priority,
  index,
}: {
  piece: Piece;
  className?: string;
  sizes?: string;
  ratio?: string;
  priority?: boolean;
  index?: string;
}) {
  const { toggleFavourite, isFavourite, ready } = useStore();
  const favourite = ready && isFavourite(piece.slug);

  return (
    <article className={cn("group relative", className)}>
      <Link
        href={`/produto/${piece.slug}`}
        className="block"
        aria-label={`${piece.name} — ${piece.line}, ${price(piece.price)}`}
      >
        <div className="relative">
          <PieceFigure piece={piece} sizes={sizes} ratio={ratio} priority={priority} />

          {/* Acesso rápido — um fio que sobe da base da prancha */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 hidden justify-center pb-5 md:flex",
              "translate-y-3 opacity-0 transition-[opacity,transform] duration-[650ms]",
              "[transition-timing-function:var(--ease-editorial)]",
              "group-hover:translate-y-0 group-hover:opacity-100",
              "group-focus-within:translate-y-0 group-focus-within:opacity-100",
            )}
          >
            <span className="t-label-sm bg-[var(--color-paper)] px-5 py-3 text-[var(--color-ink)]">
              Ver detalhes
            </span>
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="t-h4 min-w-0">{piece.name}</h3>
          <p className="t-num whitespace-nowrap tabular-nums">{price(piece.price)}</p>
        </div>

        <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="t-label-sm muted">
            {index && <span className="mr-2 opacity-60">{index}</span>}
            {categoryName(piece.category)}
          </p>
          <p className="t-label-sm muted hidden lg:block">{piece.line}</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavourite(piece.slug)}
        aria-pressed={favourite}
        aria-label={
          favourite
            ? `Remover ${piece.name} dos favoritos`
            : `Guardar ${piece.name} nos favoritos`
        }
        className={cn(
          "tap absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center",
          "text-[var(--color-ink)] transition-opacity duration-500",
          "[transition-timing-function:var(--ease-editorial)]",
          favourite
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-60 focus-visible:opacity-100 hover:!opacity-100 md:opacity-0",
        )}
      >
        <IconHeart size={17} filled={favourite} />
      </button>
    </article>
  );
}
