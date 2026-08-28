"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealLines, RevealVeil, Parallax } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";
import { ButtonLink } from "@/components/ui/Button";
import { PieceFigure } from "@/components/product/PieceFigure";
import { categoryName, collectionBySlug, pieceBySlug } from "@/lib/data/catalogue";
import { price } from "@/lib/format";

/* ============================================================================
   04 — COLEÇÃO EM DESTAQUE
   ----------------------------------------------------------------------------
   Uma dupla página de revista. Três movimentos, alturas desencontradas,
   nenhuma linha de cartões iguais. As peças são apresentadas como objectos,
   com legendas de catálogo — nome, categoria, preço, e nada mais.
   ========================================================================== */

const collection = collectionBySlug("vertente")!;
const meridiano = pieceBySlug("colar-meridiano")!;
const vertente = pieceBySlug("par-vertente")!;

function PieceCaption({ slug }: { slug: string }) {
  const piece = pieceBySlug(slug)!;
  return (
    <div className="mt-4">
      <hr className="rule-soft rule" />
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="t-label-sm">{piece.name}</span>
        <span className="t-num">{price(piece.price)}</span>
      </div>
      <p className="t-label-sm muted mt-1">{categoryName(piece.category)}</p>
    </div>
  );
}

export function FeaturedCollection() {
  return (
    <section className="section" aria-labelledby="colecao-destaque">
      <div className="shell">
        {/* — Movimento I — abertura — */}
        <div className="grid12 items-end">
          <div className="col-span-6 md:col-span-5">
            <Reveal>
              <SectionLabel index="02">Coleção em destaque</SectionLabel>
            </Reveal>

            <RevealLines
              as="h2"
              id="colecao-destaque"
              lines={[collection.name]}
              className="t-h1 mt-[clamp(1.5rem,3vw,2.5rem)]"
              delay={0.1}
            />

            <Reveal delay={0.3}>
              <p className="t-label-sm muted mt-4">
                {collection.year} · {collection.line}
              </p>
              <p className="t-lead mt-8 max-w-[38ch]">{collection.description}</p>
              <ButtonLink
                href={`/colecoes/${collection.slug}`}
                variant="line"
                arrow
                className="mt-9"
              >
                Percorrer a coleção
              </ButtonLink>
            </Reveal>
          </div>

          <div className="col-span-6 md:col-span-6 md:col-start-7">
            <Parallax distance={26}>
              <figure>
                <RevealVeil>
                  <div className="plate relative aspect-[4/5] w-full">
                    <Image
                      src="/images/campaign-portrait.png"
                      alt="Retrato de campanha: brincos, colar e anéis HERTMANN em ouro amarelo"
                      fill
                      sizes="(max-width: 900px) 100vw, 46vw"
                      className="object-cover"
                    />
                  </div>
                </RevealVeil>
                <Reveal delay={0.2}>
                  <figcaption className="t-label-sm muted mt-5">
                    Campanha {collection.year} — fotografada no ateliê
                  </figcaption>
                </Reveal>
              </figure>
            </Parallax>
          </div>
        </div>

        {/* — Movimento II — a peça isolada e a mesa de trabalho — */}
        <div className="grid12 mt-[clamp(4.5rem,11vw,11rem)] items-start">
          <div className="col-span-6 md:col-span-3 md:col-start-2">
            <Reveal>
              <Link href={`/produto/${meridiano.slug}`} className="group block">
                <PieceFigure
                  piece={meridiano}
                  ratio="3 / 4"
                  sizes="(max-width: 900px) 45vw, 22vw"
                  surface="paper"
                />
                <PieceCaption slug={meridiano.slug} />
              </Link>
            </Reveal>
          </div>

          <div className="col-span-6 md:col-span-6 md:col-start-6 md:mt-[clamp(3rem,9vw,9rem)]">
            <Parallax distance={20}>
              <figure>
                <RevealVeil delay={0.12}>
                  <div className="plate plate-studio relative aspect-[5/4] w-full">
                    <Image
                      src="/images/set-packaging.png"
                      alt="Conjunto HERTMANN: estojo, bolsa de veludo, sacola e cartão da casa"
                      fill
                      sizes="(max-width: 900px) 45vw, 46vw"
                      className="object-contain p-[6%]"
                    />
                  </div>
                </RevealVeil>
                <Reveal delay={0.2}>
                  <figcaption className="t-label-sm muted mt-5 max-w-[40ch]">
                    Toda a peça sai da casa no estojo lacado, com a bolsa de veludo
                    e o certificado do artesão que a executou.
                  </figcaption>
                </Reveal>
              </figure>
            </Parallax>
          </div>
        </div>

        {/* — Movimento III — nota e fecho — */}
        <div className="grid12 mt-[clamp(4rem,9vw,9rem)] items-end">
          <Reveal className="col-span-6 md:col-span-4 md:col-start-2">
            <p className="t-body max-w-[38ch]">{collection.note}</p>
          </Reveal>

          <div className="col-span-6 md:col-span-3 md:col-start-9">
            <Reveal delay={0.12}>
              <Link href={`/produto/${vertente.slug}`} className="group block">
                <PieceFigure
                  piece={vertente}
                  ratio="1 / 1"
                  sizes="(max-width: 900px) 45vw, 22vw"
                  surface="paper"
                />
                <PieceCaption slug={vertente.slug} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
