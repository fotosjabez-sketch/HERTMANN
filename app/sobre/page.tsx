import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealGroup, RevealLines, RevealVeil, Parallax } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Três gerações de joalheria em Curitiba. A história da HERTMANN, desde a bancada de Otto Hertmann em 1948 até ao ateliê de hoje.",
  alternates: { canonical: "/sobre" },
};

const CHAPTERS = [
  {
    year: "1948",
    title: "Uma bancada",
    body:
      "Otto Hertmann chega a Curitiba com uma mala, uma bancada desmontada e três ferramentas. Abre a oficina no piso de cima de um edifício no Batel, e passa os primeiros anos a reparar as joias que a cidade já tinha.",
  },
  {
    year: "1971",
    title: "A primeira coleção",
    body:
      "A segunda geração assume o ateliê e desenha a primeira colecção da casa. As peças de Arquétipo nascem nesse ano — e continuam, sem alterações, em produção.",
  },
  {
    year: "1998",
    title: "A boutique",
    body:
      "A casa abre a boutique no piso térreo, sob o ateliê. Passa a ser possível ver quem executa a peça antes de a comprar. É uma decisão que nunca foi revista.",
  },
  {
    year: "Hoje",
    title: "Nove artesãos",
    body:
      "O ateliê emprega nove artesãos e continua a ocupar o mesmo piso. Cada peça é acompanhada por um só deles, do desenho ao polimento final, e o registo fica arquivado indefinidamente.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="Sobre a casa"
        title={["Três gerações,", "uma morada."]}
        lead="A HERTMANN nunca mudou de rua. O que mudou foram as mãos — e mesmo essas passaram o ofício umas às outras, na mesma bancada."
      />

      <div className="shell">
        <Parallax distance={30}>
          <RevealVeil duration={1.5}>
            <figure className="plate relative aspect-[16/10] w-full md:aspect-[16/8]">
              <Image
                src="/images/boutique-wide.jpg"
                alt="Interior da boutique HERTMANN, com vitrinas em latão e painel em azul-marinho"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </figure>
          </RevealVeil>
        </Parallax>
      </div>

      {/* — Cronologia — */}
      <section className="section" aria-labelledby="historia">
        <div className="shell">
          <Reveal>
            <SectionLabel index="01">História</SectionLabel>
          </Reveal>

          <RevealLines
            as="h2"
            id="historia"
            lines={["Setenta e sete anos", "na mesma bancada."]}
            className="t-h2 mt-[clamp(1.5rem,3vw,2.5rem)]"
            delay={0.08}
          />

          <RevealGroup className="mt-[clamp(3rem,7vw,6rem)] flex flex-col" stagger={0.1} y={24}>
            {CHAPTERS.map((chapter) => (
              <article
                key={chapter.year}
                className="grid12 border-t border-[var(--color-rule)] py-[clamp(2rem,4vw,3.5rem)] last:border-b"
              >
                <p className="t-num col-span-6 opacity-45 md:col-span-2">{chapter.year}</p>
                <h3 className="t-h3 col-span-6 mt-3 md:col-span-3 md:mt-0">{chapter.title}</h3>
                <p className="t-body col-span-6 mt-4 md:col-span-5 md:col-start-8 md:mt-0">
                  {chapter.body}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* — Retrato — */}
      <section className="section" aria-labelledby="hoje">
        <div className="shell">
          <div className="grid12 items-center gap-y-[clamp(2.5rem,5vw,4rem)]">
            <div className="col-span-6 md:col-span-5">
              <Parallax distance={24}>
                <RevealVeil>
                  <figure className="plate relative aspect-[4/5] w-full">
                    <Image
                      src="/images/campaign-hero.jpg"
                      alt="Campanha HERTMANN: peças em ouro 18k usadas em conjunto"
                      fill
                      sizes="(max-width: 900px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </figure>
                </RevealVeil>
              </Parallax>
            </div>

            <div className="col-span-6 md:col-span-5 md:col-start-8">
              <Reveal>
                <SectionLabel index="02">O que nos define</SectionLabel>
              </Reveal>
              <RevealLines
                as="h2"
                id="hoje"
                lines={["Uma joia não deve", "pedir uma ocasião."]}
                className="t-h2 mt-[clamp(1.25rem,2.5vw,2rem)]"
                delay={0.08}
              />
              <Reveal delay={0.3}>
                <p className="t-lead mt-8 max-w-[40ch]">
                  Trabalhamos para que as peças sejam usadas todos os dias, e não
                  guardadas para os dias importantes. Por isso o peso importa
                  tanto quanto o desenho, e o fecho tanto quanto a pedra.
                </p>
                <ButtonLink href="/atelie" variant="line" arrow className="mt-9">
                  Ver o ateliê
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* — Visita — */}
      <section className="section" aria-labelledby="visita">
        <div className="shell grid12 items-end">
          <Reveal className="col-span-6 md:col-span-5">
            <h2 id="visita" className="t-h2">
              Venha ver.
            </h2>
            <p className="t-body mt-6 max-w-[34ch]">
              A boutique está aberta {site.contact.hours.toLowerCase()}. O ateliê
              recebe visitas mediante marcação.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="t-label-sm muted">Morada</p>
            <p className="t-label mt-3">{site.contact.address}</p>
            <ButtonLink href="/contato" variant="line" arrow className="mt-8">
              Marcar visita
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
