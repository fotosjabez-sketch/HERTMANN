"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Overlay } from "@/components/layout/Overlay";
import { PieceFigure } from "@/components/product/PieceFigure";
import { categories, categoryName, collections, pieces } from "@/lib/data/catalogue";
import { price } from "@/lib/format";

/* ============================================================================
   Busca — uma linha, um fio, e o catálogo que responde enquanto se escreve.
   ========================================================================== */

const strip = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const term = strip(query);

  const results = useMemo(() => {
    if (term.length < 2) return [];
    return pieces
      .filter((p) =>
        [p.name, p.line, p.material, p.stone ?? "", categoryName(p.category), p.reference]
          .map(strip)
          .some((field) => field.includes(term)),
      )
      .slice(0, 6);
  }, [term]);

  return (
    <Overlay
      open={open}
      onClose={onClose}
      from="top"
      label="Procurar no catálogo"
      panelClassName="inset-x-0 top-0 w-full bg-[var(--color-paper)] max-h-[100dvh] overflow-y-auto"
    >
      <div className="shell pb-[clamp(2.5rem,6vw,4.5rem)] pt-[clamp(2.5rem,6vw,5rem)]">
        <label className="block">
          <span className="t-label-sm muted">Procurar</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Peça, coleção, material ou referência"
            autoComplete="off"
            className="mt-4 w-full appearance-none border-0 border-b border-[var(--color-rule)] bg-transparent pb-4 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none font-[family-name:var(--font-display)] text-[clamp(1.6rem,4.5vw,3.25rem)] leading-none outline-none transition-colors duration-500 placeholder:text-[var(--color-ink-30)] focus:border-[var(--color-ink)]"
            style={{ transitionTimingFunction: "var(--ease-editorial)" }}
          />
        </label>

        <div className="mt-10" aria-live="polite">
          {term.length < 2 ? (
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="t-label-sm muted">Coleções</p>
                <ul className="mt-4 space-y-2">
                  {collections.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/colecoes/${c.slug}`} onClick={onClose} className="t-h4 link-nav">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-label-sm muted">Categorias</p>
                <ul className="mt-4 space-y-2">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/joias/${c.slug}`} onClick={onClose} className="t-h4 link-nav">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="t-body">
              Nada encontrado para <span className="text-[var(--color-ink)]">“{query}”</span>.
              Escreva-nos e procuramos por si — {" "}
              <Link href="/contato" onClick={onClose} className="link-underline text-[var(--color-ink)]">
                contato
              </Link>
              .
            </p>
          ) : (
            <>
              <p className="t-label-sm muted">
                {results.length} {results.length === 1 ? "peça" : "peças"}
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
                {results.map((piece) => (
                  <li key={piece.slug}>
                    <Link href={`/produto/${piece.slug}`} onClick={onClose} className="group block">
                      <PieceFigure piece={piece} sizes="(max-width: 640px) 45vw, 16vw" still showReference={false} />
                      <p className="t-h4 mt-3">{piece.name}</p>
                      <p className="t-label-sm muted mt-1">{price(piece.price)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Overlay>
  );
}
