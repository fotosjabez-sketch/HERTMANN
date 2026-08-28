import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { PieceFigure } from "@/components/product/PieceFigure";
import { IconArrow } from "@/components/brand/Icons";
import { collectionPieces, collections } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Coleções",
  description:
    "Arquétipo, Vertente, Noturno e Solstício — as quatro coleções da HERTMANN, entre peças permanentes e alta joalheria sob encomenda.",
  alternates: { canonical: "/colecoes" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        label="Coleções"
        title={["Quatro", "coleções"]}
        lead="A casa não trabalha por estações. Cada coleção é uma família de peças com uma construção comum — e todas continuam em produção."
      />

      <div className="shell pb-[var(--spacing-section)]">
        <RevealGroup className="flex flex-col" stagger={0.1} y={26}>
          {collections.map((collection, i) => {
            const items = collectionPieces(collection).slice(0, 3);
            return (
              <Link
                key={collection.slug}
                href={`/colecoes/${collection.slug}`}
                className="group block border-t border-[var(--color-rule)] py-[clamp(2.5rem,5vw,4rem)] last:border-b"
              >
                <div className="grid12 items-center gap-y-8">
                  <div className="col-span-6 md:col-span-5">
                    <p className="t-num opacity-45">
                      {String(i + 1).padStart(2, "0")} — {collection.year}
                    </p>
                    <h2 className="t-h1 mt-4">{collection.name}</h2>
                    <p className="t-label-sm muted mt-4">{collection.line}</p>
                  </div>

                  <p className="t-body col-span-6 md:col-span-3 md:col-start-6">
                    {collection.note}
                  </p>

                  {/* Três miniaturas, como as provas de contacto de uma sessão */}
                  <div className="col-span-6 flex items-center justify-start gap-3 md:col-span-3 md:col-start-10 md:justify-end">
                    {items.map((piece) => (
                      <span key={piece.slug} className="block w-[6.5rem] shrink-0">
                        <PieceFigure
                          piece={piece}
                          sizes="104px"
                          still
                          ratio="1 / 1"
                          showReference={false}
                        />
                      </span>
                    ))}
                    <IconArrow
                      size={18}
                      className="ml-2 shrink-0 transition-transform duration-[650ms] [transition-timing-function:var(--ease-editorial)] group-hover:translate-x-1.5"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="t-body mt-[clamp(2.5rem,5vw,4rem)] max-w-[52ch]">
            As peças de alta joalheria são executadas sob encomenda, a partir de
            pedras seleccionadas com o cliente. O prazo médio é de catorze semanas.
          </p>
        </Reveal>
      </div>
    </>
  );
}
