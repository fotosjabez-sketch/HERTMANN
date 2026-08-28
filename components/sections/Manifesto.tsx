"use client";

import { RevealLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";

/* ============================================================================
   03 — MANIFESTO
   ----------------------------------------------------------------------------
   Muito ar em volta de poucas palavras. A frase constrói-se linha a linha
   quando a secção entra em cena; o rótulo permanece imóvel. O efeito está
   no conteúdo, não no título.
   ========================================================================== */

const LINES = [
  "Não fazemos joias para uma estação.",
  "Fazemos peças que atravessam",
  "gerações inteiras sem pedir licença",
  "ao tempo que passa por elas.",
];

export function Manifesto() {
  return (
    <section className="section-lg relative" aria-labelledby="manifesto">
      <div className="shell">
        <Reveal>
          <SectionLabel index="01" align="center">
            Manifesto
          </SectionLabel>
        </Reveal>

        <RevealLines
          as="h2"
          id="manifesto"
          lines={LINES}
          className="t-manifesto mx-auto mt-[clamp(2.5rem,6vw,4.5rem)] max-w-[46ch] text-center"
          stagger={0.09}
          duration={1.1}
        />

        <div className="grid12 mt-[clamp(3.5rem,8vw,6.5rem)]">
          <Reveal delay={0.15} className="col-span-6 md:col-span-3 md:col-start-5">
            <p className="t-body">
              Cada peça começa num desenho a lápis e termina numa bancada de
              Curitiba, sob a mesma mão que a começou. Entre os dois momentos
              passam, em média, catorze semanas.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="col-span-6 md:col-span-3 md:col-start-9">
            <p className="t-body">
              Não trabalhamos por colecções sazonais nem retiramos peças de
              produção. O que entra no catálogo da HERTMANN fica — e continua a
              poder ser reparado, redimensionado e refeito, décadas depois.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
