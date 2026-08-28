"use client";

import Image from "next/image";
import { Reveal, RevealLines, RevealVeil, Parallax } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Label";
import { ButtonLink } from "@/components/ui/Button";
import { CrystalMark } from "@/components/brand/Marks";
import { collectionBySlug } from "@/lib/data/catalogue";

/* ============================================================================
   05 — EDITORIAL / CAMPANHA
   ----------------------------------------------------------------------------
   O único bloco em azul-marinho da página. A tipografia atravessa a coluna
   e entra no território da imagem — a quebra de grelha é deliberada e
   acontece uma só vez em todo o site.
   ========================================================================== */

const noturno = collectionBySlug("noturno")!;

export function Campaign() {
  return (
    <section className="on-ink relative overflow-hidden" aria-labelledby="campanha">
      <div className="shell section relative">
        <div className="grid12 items-center gap-y-[clamp(3rem,7vw,5rem)]">
          {/* — Texto — */}
          <div className="col-span-6 md:col-span-5 md:col-start-1">
            <Reveal>
              <SectionLabel index="03">Campanha {noturno.year}</SectionLabel>
            </Reveal>

            {/* O título ultrapassa a sua coluna: 5 colunas de conteúdo,
                largura de 7. É a quebra de grelha da página. */}
            <RevealLines
              as="h2"
              id="campanha"
              lines={[noturno.name]}
              className="t-h1 relative z-10 mt-[clamp(1.5rem,3vw,2.5rem)] md:w-[145%]"
              delay={0.1}
            />

            <Reveal delay={0.28}>
              <p className="t-label-sm muted mt-5">{noturno.line}</p>
              <p className="t-lead mt-8 max-w-[36ch]">{noturno.description}</p>
              <ButtonLink
                href={`/colecoes/${noturno.slug}`}
                variant="line"
                arrow
                className="mt-9"
              >
                Explorar
              </ButtonLink>
            </Reveal>
          </div>

          {/* — Imagem — */}
          <div className="col-span-6 md:col-span-6 md:col-start-7">
            <Parallax distance={34}>
              <RevealVeil duration={1.5}>
                <figure className="plate plate-studio relative aspect-[4/5] w-full md:aspect-[5/6]">
                  <Image
                    src="/images/piece-pouch.png"
                    alt="Colar Noturno na bolsa de veludo HERTMANN, com pendente em ouro"
                    fill
                    sizes="(max-width: 900px) 100vw, 46vw"
                    className="object-contain p-[8%]"
                  />
                </figure>
              </RevealVeil>
            </Parallax>
          </div>
        </div>

        {/* — Marca de água: o cristal da casa desenha-se ao entrar — */}
        <CrystalMark className="pointer-events-none absolute bottom-[8%] left-[3%] hidden h-[26vh] w-auto opacity-[0.14] lg:block" />
      </div>
    </section>
  );
}
