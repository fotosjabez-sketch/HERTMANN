import { cn } from "@/lib/utils";

/**
 * Rótulo de secção — o fio institucional que percorre todo o site.
 * Índice numérico, um traço curto e o nome da secção.
 */
export function SectionLabel({
  index,
  children,
  className,
  align = "start",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <p
      className={cn(
        "t-label-sm flex items-center gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      {index && <span className="t-num opacity-45">{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-30" />
      <span>{children}</span>
    </p>
  );
}

/** Rótulo simples entre parênteses, à maneira de uma legenda de catálogo. */
export function Caption({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("t-label-sm muted", className)}>{children}</p>;
}
