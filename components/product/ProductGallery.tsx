"use client";

import Image from "next/image";
import { PieceDrawing } from "@/components/brand/Marks";
import { RevealVeil } from "@/components/motion/Reveal";
import type { Piece } from "@/lib/data/catalogue";

/* ============================================================================
   Galeria da peça — três vistas, sempre as mesmas: a peça, o desenho de
   ateliê que lhe deu origem, e o modo como chega a casa.
   ========================================================================== */

export function ProductGallery({ piece }: { piece: Piece }) {
  return (
    <div className="flex flex-col gap-[clamp(0.75rem,1.6vw,1.25rem)]">
      {/* I — a peça */}
      <figure className="plate plate-studio relative aspect-[4/5] w-full">
        {piece.image ? (
          <Image
            src={piece.image.src}
            alt={piece.image.alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
            className={piece.image.cutout ? "object-contain p-[8%]" : "object-cover"}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <PieceDrawing
              variant={piece.drawing}
              className="h-[64%] w-auto text-[var(--color-ink)] opacity-[0.6]"
            />
          </div>
        )}
        <figcaption className="t-num absolute bottom-4 left-4 opacity-40">
          {piece.reference}
        </figcaption>
      </figure>

      <div className="grid grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.25rem)]">
        {/* II — o desenho */}
        <figure className="plate plate-studio-paper relative aspect-square w-full">
          <div className="absolute inset-0 grid place-items-center">
            <PieceDrawing
              variant={piece.drawing}
              className="h-[62%] w-auto text-[var(--color-ink)] opacity-[0.55]"
            />
          </div>
          <figcaption className="t-label-sm muted absolute bottom-4 left-4">
            Desenho de ateliê
          </figcaption>
        </figure>

        {/* III — como chega */}
        <RevealVeil>
          <figure className="plate plate-studio relative aspect-square w-full">
            <Image
              src="/images/piece-bag.png"
              alt="Sacola e cartão HERTMANN, tal como a peça é entregue"
              fill
              sizes="(max-width: 900px) 50vw, 28vw"
              className="object-contain p-[8%]"
            />
            <figcaption className="t-label-sm muted absolute bottom-4 left-4">
              Como chega
            </figcaption>
          </figure>
        </RevealVeil>
      </div>
    </div>
  );
}
