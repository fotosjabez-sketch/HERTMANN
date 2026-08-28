import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryFilter } from "@/components/product/CategoryFilter";
import { ProductGrid } from "@/components/product/ProductGrid";
import { pieces } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Joias",
  description:
    "O catálogo completo da HERTMANN: anéis, colares, brincos e pulseiras em ouro 18k, executados à mão em ateliê próprio.",
  alternates: { canonical: "/joias" },
};

export default function JewelleryPage() {
  return (
    <>
      <PageHeader
        label="Catálogo"
        title={["Todas as joias"]}
        lead="Doze peças em produção contínua. Cada uma dimensionada à mão, e cada uma passível de ser refeita, redimensionada ou reparada — sem limite de tempo."
      />

      <div className="shell pb-[var(--spacing-section)]">
        <CategoryFilter />
        <ProductGrid pieces={pieces} columns={3} withIndex className="mt-[clamp(2.5rem,5vw,4.5rem)]" />
      </div>
    </>
  );
}
