"use client";

import Image from "next/image";
import { Reveal, RevealLines, RevealVeil, ScrollScale } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/data/site";

/* ============================================================================
   09 — ATELIÊ / LEGADO
   ----------------------------------------------------------------------------
   Uma imagem larga que respira em toda a largura do ecrã, e três números
   que dizem o que um parágrafo não diria.
   ========================================================================== */

const FACTS = [
  { value: String(new Date().getFullYear() - site.founded), label: "Anos de casa" },
  { value: "14", label: "Semanas por peça, em média" },
  { value: "09", label: "Artesãos no ateliê" },
];

export function Atelier() {
  return (
    <section className="section" aria-labelledby="atelie">
      <div className="shell">
        <div className="grid12 items-end">
          <Reveal className="col-span-6 md:col-span-5">
            <SectionLabel index="07">Ateliê e legado</SectionLabel>
            <RevealLines
              as="h2"
              lines={["Desde 1948,", "na mesma rua."]}
              className="t-h2 mt-[clamp(1.25rem,2.5vw,2rem)]"
              delay={0.1}
            />
          </Reveal>

          <Reveal delay={0.18} className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="t-body">
              A casa foi aberta por Otto Hertmann no ano em que chegou ao
              Brasil, com uma bancada e três ferramentas. Três gerações
              depois, o ateliê continua a ocupar o piso de cima da mesma
              morada — e o cliente continua a poder subir.
            </p>
            <ButtonLink href="/atelie" variant="line" arrow className="mt-8">
              Conhecer o ateliê
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      {/* Imagem em toda a largura — a casa vista de dentro */}
      <div className="mt-[clamp(3rem,7vw,6rem)]">
        <RevealVeil duration={1.5}>
          <ScrollScale from={1.1} to={1}>
            <figure className="plate relative aspect-[16/10] w-full md:aspect-[16/7]">
              <Image
                src="/images/boutique-wide.jpg"
                alt="Interior da boutique HERTMANN: vitrinas em latão, balcão de mármore e painel em azul-marinho"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </figure>
          </ScrollScale>
        </RevealVeil>
      </div>

      <div className="shell">
        <Reveal delay={0.1}>
          <p className="t-label-sm muted mt-5">
            Boutique HERTMANN — {site.contact.address}
          </p>
        </Reveal>

        <div className="grid12 mt-[clamp(3.5rem,7vw,6rem)]">
          <div className="col-span-6 grid grid-cols-3 gap-x-6 md:col-span-8 md:col-start-5">
            {FACTS.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.1}>
                <hr className="rule" />
                <p className="t-display mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-none">
                  {fact.value}
                </p>
                <p className="t-label-sm muted mt-3 max-w-[16ch]">{fact.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
