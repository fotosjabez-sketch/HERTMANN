"use client";

import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CrystalMark } from "@/components/brand/Marks";

/* ============================================================================
   10 — CHAMADA FINAL
   ----------------------------------------------------------------------------
   Quase nada. Muito espaço, uma frase, um caminho.
   ========================================================================== */

export function FinalCta() {
  return (
    <section className="section-lg" aria-labelledby="chamada-final">
      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <CrystalMark className="h-[clamp(3.5rem,7vw,6rem)] w-auto text-[var(--color-ink)] opacity-60" />
        </Reveal>

        <RevealLines
          as="h2"
          id="chamada-final"
          lines={["Encontre a peça", "que fica."]}
          className="t-h1 mt-[clamp(2.5rem,6vw,4.5rem)]"
          delay={0.12}
        />

        <Reveal delay={0.4} className="mt-[clamp(2.5rem,5vw,4rem)]">
          <ButtonLink href="/joias" variant="solid" arrow>
            Explorar a coleção
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="t-label-sm muted mt-8">
            Ou marque uma visita privada à boutique
          </p>
        </Reveal>
      </div>
    </section>
  );
}
