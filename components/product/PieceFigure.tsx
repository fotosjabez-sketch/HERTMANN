"use client";

import Image from "next/image";
import { PieceDrawing } from "@/components/brand/Marks";
import type { Piece } from "@/lib/data/catalogue";
import { cn } from "@/lib/utils";

/* ============================================================================
   A prancha da peça.
   ----------------------------------------------------------------------------
   Com fotografia, a peça é fotografada. Sem fotografia, é desenhada — no
   estilo Fine Line do manual, sobre a mesma superfície de estúdio. O
   catálogo mantém-se coerente enquanto a produção fotográfica decorre;
   basta preencher `image` no catálogo para a fotografia tomar o lugar.
   ========================================================================== */

export function PieceFigure({
  piece,
  className,
  sizes = "(max-width: 900px) 50vw, 30vw",
  priority = false,
  ratio = "4 / 5",
  surface = "mist",
  still,
  showReference = true,
}: {
  piece: Piece;
  className?: string;
  sizes?: string;
  priority?: boolean;
  ratio?: string;
  surface?: "mist" | "paper";
  still?: boolean;
  /** A referência de catálogo só faz sentido em pranchas grandes. */
  showReference?: boolean;
}) {
  const image = piece.image;

  return (
    <div
      className={cn(
        "plate relative w-full",
        surface === "mist" ? "plate-studio" : "plate-studio-paper",
        className,
      )}
      style={{ aspectRatio: ratio }}
      data-drawn={image ? undefined : "true"}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "zoom",
            image.cutout ? "object-contain p-[7%]" : "object-cover",
          )}
        />
      ) : (
        <>
          <div className="absolute inset-0 grid place-items-center">
            <PieceDrawing
              variant={piece.drawing}
              still={still}
              className="zoom h-[70%] w-auto text-[var(--color-ink)] opacity-[0.55]"
            />
          </div>
          {showReference && (
            <span className="t-num absolute bottom-4 left-4 opacity-30">{piece.reference}</span>
          )}
        </>
      )}
    </div>
  );
}
