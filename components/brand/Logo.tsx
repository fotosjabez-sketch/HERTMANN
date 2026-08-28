import { cn } from "@/lib/utils";

/* ============================================================================
   Logotipo HERTMANN — símbolo (monograma HM) + assinatura tipográfica.
   O monograma é o desenho original da marca, servido como máscara para que
   herde a cor do contexto. A assinatura é composta em Cormorant SC, a fonte
   da marca — texto vivo, legível por leitores de ecrã e nítido em qualquer
   densidade de pixel.
   Restrições do manual (p.14): sem rotação, sem alteração de cor da marca,
   sem sombras, sem cortes, sem opacidade sobre o próprio logotipo.
   ========================================================================== */

const MASK: React.CSSProperties = {
  WebkitMaskImage: "url(/brand/monogram-white.png)",
  maskImage: "url(/brand/monogram-white.png)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  backgroundColor: "currentColor",
};

export function Monogram({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("block", className)}
      style={{ ...MASK, aspectRatio: "288 / 169", ...style }}
    />
  );
}

export function Wordmark({
  className,
  as: Tag = "span",
}: {
  className?: string;
  as?: "span" | "h1" | "div";
}) {
  return (
    <Tag
      className={cn("block font-[family-name:var(--font-display)] leading-none", className)}
      style={{ letterSpacing: "0.04em" }}
    >
      Hertmann
    </Tag>
  );
}

/**
 * Bloco completo: monograma sobre assinatura, com a margem de segurança
 * do manual preservada pelo espaçamento interno.
 */
export function Lockup({
  className,
  wordmarkClassName,
  monogramClassName,
  label,
}: {
  className?: string;
  wordmarkClassName?: string;
  monogramClassName?: string;
  /** Só necessário quando o bloco não vive dentro de um elemento já rotulado. */
  label?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center", className)}>
      {label && <span className="sr-only">{label}</span>}
      <Monogram className={cn("w-[2.1em]", monogramClassName)} />
      <Wordmark
        className={cn("mt-[0.28em] text-[1em]", wordmarkClassName)}
      />
    </span>
  );
}
