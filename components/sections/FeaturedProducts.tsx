"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";
import { ButtonLink } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { featuredPieces } from "@/lib/data/catalogue";

/* ============================================================================
   07 — PEÇAS EM DESTAQUE
   ========================================================================== */

export function FeaturedProducts() {
  return (
    <section className="section" aria-labelledby="destaques">
      <div className="shell">
        <div className="grid12 items-end">
          <Reveal className="col-span-6 md:col-span-6">
            <SectionLabel index="05">Peças em destaque</SectionLabel>
            <h2 id="destaques" className="t-h2 mt-[clamp(1.25rem,2.5vw,2rem)]">
              Uma selecção
            </h2>
          </Reveal>
          <Reveal
            delay={0.12}
            className="col-span-6 flex md:col-span-3 md:col-start-10 md:justify-end"
          >
            <ButtonLink href="/joias" variant="line" arrow>
              Todas as joias
            </ButtonLink>
          </Reveal>
        </div>

        <hr className="rule mt-[clamp(2rem,4vw,3rem)]" />

        <ProductGrid
          pieces={featuredPieces()}
          columns={3}
          withIndex
          className="mt-[clamp(2.5rem,5vw,4.5rem)]"
        />

        <Reveal delay={0.1}>
          <p className="t-body mt-[clamp(2.5rem,5vw,4rem)] max-w-[56ch]">
            As peças ainda não fotografadas são apresentadas pelo desenho de
            ateliê que lhes deu origem — o mesmo traço que segue para a bancada.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
