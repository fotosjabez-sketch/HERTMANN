"use client";

import { Reveal, RevealGroup, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";
import { CrystalMark } from "@/components/brand/Marks";

/* ============================================================================
   08 — UNIVERSO HERTMANN
   ----------------------------------------------------------------------------
   Quatro princípios, quatro frases curtas. Sem parágrafos institucionais,
   sem ícones decorativos: o índice, o fio e a palavra.
   ========================================================================== */

const PRINCIPLES = [
  {
    index: "I",
    title: "Matéria",
    body:
      "Ouro 18k fundido na casa, a partir de liga própria. Pedras compradas em bruto e talhadas sob encomenda, nunca adquiridas já montadas.",
  },
  {
    index: "II",
    title: "Desenho",
    body:
      "Todas as peças nascem à mão, em papel. Só depois passam ao modelo tridimensional — e apenas para verificar o que o lápis já decidiu.",
  },
  {
    index: "III",
    title: "Execução",
    body:
      "Um artesão acompanha a peça do princípio ao fim. O nome de quem a executou vai no certificado, e a casa guarda o registo indefinidamente.",
  },
  {
    index: "IV",
    title: "Permanência",
    body:
      "Reparamos, redimensionamos e refazemos qualquer peça HERTMANN, sem limite de tempo. É a única garantia que sabemos dar.",
  },
];

export function BrandUniverse() {
  return (
    <section className="section-lg relative" aria-labelledby="universo">
      <div className="shell">
        <div className="grid12">
          <Reveal className="col-span-6 md:col-span-4">
            <SectionLabel index="06">Universo HERTMANN</SectionLabel>
          </Reveal>
        </div>

        <RevealLines
          as="h2"
          id="universo"
          lines={["O que fazemos", "não é segredo.", "É método."]}
          className="t-h1 mt-[clamp(2rem,4vw,3.5rem)] max-w-[16ch]"
          delay={0.08}
        />

        <div className="relative mt-[clamp(3.5rem,8vw,7rem)]">
          <CrystalMark className="pointer-events-none absolute -top-[6vh] right-0 hidden h-[38vh] w-auto text-[var(--color-ink)] opacity-[0.09] lg:block" />

          <RevealGroup
            className="relative grid gap-x-[clamp(1rem,3vw,3rem)] gap-y-[clamp(2.5rem,5vw,4rem)] sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.09}
          >
            {PRINCIPLES.map((principle) => (
              <article key={principle.index}>
                <hr className="rule" />
                <p className="t-num mt-4 opacity-45">{principle.index}</p>
                <h3 className="t-h3 mt-6">{principle.title}</h3>
                <p className="t-body mt-4 max-w-[34ch]">{principle.body}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
