import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryFilter } from "@/components/product/CategoryFilter";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories, categoryBySlug, piecesByCategory, type CategorySlug } from "@/lib/data/catalogue";

type Params = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categoria } = await params;
  const category = categoryBySlug(categoria);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/joias/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { categoria } = await params;
  const category = categoryBySlug(categoria);
  if (!category) notFound();

  const items = piecesByCategory(category.slug as CategorySlug);

  return (
    <>
      <PageHeader
        label={`Categoria ${category.index}`}
        title={[category.name]}
        lead={category.description}
      />

      <div className="shell pb-[var(--spacing-section)]">
        <CategoryFilter />
        <ProductGrid pieces={items} columns={3} withIndex className="mt-[clamp(2.5rem,5vw,4.5rem)]" />
      </div>
    </>
  );
}
