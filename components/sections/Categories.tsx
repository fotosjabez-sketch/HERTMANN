"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";
import { PieceDrawing, categoryDrawing } from "@/components/brand/Marks";
import { categories, type CategorySlug } from "@/lib/data/catalogue";
import { cn } from "@/lib/utils";

/* ============================================================================
   06 — CATEGORIAS
   ----------------------------------------------------------------------------
   Cada categoria é tratada como uma prancha em movimento — um vídeo curto,
   silencioso, em loop, que substitui o desenho de ateliê assim que a filmagem
   existe. As quatro pranchas assentam a alturas desencontradas para que a
   linha nunca leia como uma grelha de cartões.
   ========================================================================== */

const OFFSET = ["", "md:mt-[clamp(2rem,5vw,5rem)]", "", "md:mt-[clamp(2rem,5vw,5rem)]"];

const categoryVideo: Record<CategorySlug, string> = {
  aneis: "/images/video-forma-aneis.mp4",
  colares: "/images/video-forma-colares.mp4",
  brincos: "/images/video-forma-brincos.mp4",
  pulseiras: "/images/video-forma-pulseiras.mp4",
};

export function Categories() {
  const reduced = useReducedMotion();

  return (
    <section className="section" aria-labelledby="categorias">
      <div className="shell">
        <div className="grid12 items-end">
          <Reveal className="col-span-6 md:col-span-5">
            <SectionLabel index="04">Categorias</SectionLabel>
            <h2 id="categorias" className="t-h2 mt-[clamp(1.25rem,2.5vw,2rem)]">
              Quatro formas
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="t-body">
              Tudo o que a casa produz cabe em quatro famílias. Dentro de cada
              uma, cada peça é dimensionada ao corpo de quem a vai usar.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,2vw,2rem)] gap-y-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-4"
          stagger={0.08}
          y={28}
        >
          {categories.map((category, i) => (
              <Link
                key={category.slug}
                href={`/joias/${category.slug}`}
                className={cn("group block", OFFSET[i])}
              >
                <div className="plate plate-studio relative aspect-[3/4] w-full">
                  {reduced ? (
                    <div className="absolute inset-0 grid place-items-center">
                      <PieceDrawing
                        variant={categoryDrawing[category.slug]}
                        className="zoom h-[68%] w-auto text-[var(--color-ink)] opacity-[0.58]"
                      />
                    </div>
                  ) : (
                    <video
                      className="zoom absolute inset-0 h-full w-full object-cover"
                      src={categoryVideo[category.slug]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  )}
                  <span className="t-num absolute left-4 top-4 z-10 text-[var(--color-paper)] mix-blend-difference opacity-70">
                    {category.index}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="t-h3">{category.name}</h3>
                  <p className="t-label-sm muted mt-2.5">{category.line}</p>
                </div>
              </Link>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
