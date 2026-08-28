import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealGroup, RevealLines, RevealVeil, Parallax } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";
import { ButtonLink } from "@/components/ui/Button";
import { CrystalMark, PieceDrawing } from "@/components/brand/Marks";

export const metadata: Metadata = {
  title: "Ateliê",
  description:
    "Do desenho a lápis ao polimento final: as sete etapas de execução de uma peça HERTMANN, no ateliê de Curitiba.",
  alternates: { canonical: "/atelie" },
};

const STEPS = [
  {
    index: "01",
    title: "Desenho",
    body: "A peça nasce a lápis, em escala real. Nenhum projecto avança sem que o desenho esteja resolvido no papel.",
  },
  {
    index: "02",
    title: "Modelo",
    body: "O desenho passa a cera ou a modelo tridimensional, apenas para confirmar proporções e tolerâncias.",
  },
  {
    index: "03",
    title: "Fundição",
    body: "O ouro é fundido na casa, a partir de liga própria. A composição é registada em cada lote.",
  },
  {
    index: "04",
    title: "Construção",
    body: "Aros, elos e galerias são soldados à mão. É a etapa mais longa e a que decide o comportamento da peça.",
  },
  {
    index: "05",
    title: "Cravação",
    body: "As pedras entram uma a uma. As garras são limadas até desaparecerem à vista, sem perderem força.",
  },
  {
    index: "06",
    title: "Acabamento",
    body: "Sete passagens de polimento, ou escovagem, conforme a superfície pedida pelo desenho.",
  },
  {
    index: "07",
    title: "Registo",
    body: "A peça é fotografada, numerada e arquivada. O nome do artesão que a executou vai no certificado.",
  },
];

export default function AtelierPage() {
  return (
    <>
      <PageHeader
        label="Ateliê"
        title={["Catorze semanas,", "uma peça."]}
        lead="Não há atalhos que se notem. Há atalhos que se notam — e é por isso que não os tomamos."
      />

      <div className="shell">
        <Parallax distance={28}>
          <RevealVeil duration={1.5}>
            <figure className="plate plate-studio relative aspect-[16/10] w-full md:aspect-[16/8]">
              <Image
                src="/images/set-packaging.png"
                alt="Conjunto HERTMANN: estojo lacado, bolsa de veludo, sacola, cartão e peças em ouro"
                fill
                priority
                sizes="100vw"
                className="object-contain p-[4%]"
              />
            </figure>
          </RevealVeil>
        </Parallax>
      </div>

      {/* — Etapas — */}
      <section className="section" aria-labelledby="processo">
        <div className="shell">
          <div className="grid12 items-end">
            <Reveal className="col-span-6 md:col-span-6">
              <SectionLabel index="01">Processo</SectionLabel>
              <RevealLines
                as="h2"
                id="processo"
                lines={["Sete etapas."]}
                className="t-h2 mt-[clamp(1.25rem,2.5vw,2rem)]"
                delay={0.08}
              />
            </Reveal>
            <Reveal delay={0.2} className="col-span-6 md:col-span-4 md:col-start-9">
              <p className="t-body">
                Um só artesão acompanha a peça do princípio ao fim. Não há linha
                de montagem: há uma bancada, e quem a ocupa responde por tudo o
                que dela sai.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-[clamp(3rem,7vw,6rem)] flex flex-col" stagger={0.07} y={22}>
            {STEPS.map((step) => (
              <article
                key={step.index}
                className="grid12 border-t border-[var(--color-rule)] py-[clamp(1.75rem,3.5vw,3rem)] last:border-b"
              >
                <p className="t-num col-span-6 opacity-45 md:col-span-1">{step.index}</p>
                <h3 className="t-h3 col-span-6 mt-3 md:col-span-3 md:col-start-3 md:mt-0">
                  {step.title}
                </h3>
                <p className="t-body col-span-6 mt-3 md:col-span-5 md:col-start-8 md:mt-0">
                  {step.body}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* — O desenho — */}
      <section className="on-ink" aria-labelledby="desenho">
        <div className="shell section">
          <div className="grid12 items-center gap-y-[clamp(3rem,6vw,4rem)]">
            <div className="col-span-6 md:col-span-5">
              <Reveal>
                <SectionLabel index="02">O traço</SectionLabel>
              </Reveal>
              <RevealLines
                as="h2"
                id="desenho"
                lines={["Antes da joia,", "há uma linha."]}
                className="t-h2 mt-[clamp(1.25rem,2.5vw,2rem)]"
                delay={0.08}
              />
              <Reveal delay={0.3}>
                <p className="t-lead mt-8 max-w-[38ch]">
                  Os desenhos técnicos da casa acompanham cada peça durante toda a
                  execução, e ficam arquivados com ela. São eles que permitem
                  refazer, décadas depois, uma peça que já não existe.
                </p>
                <ButtonLink href="/joias" variant="line" arrow className="mt-9">
                  Ver o catálogo
                </ButtonLink>
              </Reveal>
            </div>

            <div className="col-span-6 md:col-span-6 md:col-start-7">
              <div className="grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
                {(["solitaire", "pendantGem", "hoop", "links"] as const).map((variant) => (
                  <div
                    key={variant}
                    className="grid aspect-square place-items-center border border-[var(--color-rule-invert)]"
                  >
                    <PieceDrawing
                      variant={variant}
                      className="h-[62%] w-auto text-[var(--color-paper)] opacity-70"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Visita — */}
      <section className="section-lg" aria-labelledby="visita-atelie">
        <div className="shell flex flex-col items-center text-center">
          <Reveal>
            <CrystalMark className="h-[clamp(3rem,5vw,4.5rem)] w-auto opacity-55" />
          </Reveal>
          <RevealLines
            as="h2"
            id="visita-atelie"
            lines={["O ateliê recebe visitas."]}
            className="t-h2 mt-[clamp(2rem,4vw,3rem)]"
            delay={0.1}
          />
          <Reveal delay={0.3}>
            <p className="t-lead mt-8 max-w-[42ch]">
              Marque uma hora e suba. Verá a bancada onde a sua peça vai ser
              feita, e conhecerá quem a vai fazer.
            </p>
            <ButtonLink href="/contato" variant="solid" arrow className="mt-10">
              Marcar visita
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
