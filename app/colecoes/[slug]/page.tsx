import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CrystalMark } from "@/components/brand/Marks";
import { collectionBySlug, collectionPieces, collections } from "@/lib/data/catalogue";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) return {};
  return {
    title: `Coleção ${collection.name}`,
    description: collection.description,
    alternates: { canonical: `/colecoes/${collection.slug}` },
  };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();

  const items = collectionPieces(collection);

  return (
    <>
      <PageHeader
        label={`Coleção · ${collection.year}`}
        title={[collection.name]}
        lead={collection.description}
      />

      <div className="shell pb-[var(--spacing-section)]">
        <Reveal>
          <hr className="rule" />
          <div className="grid12 items-baseline py-5">
            <p className="t-label-sm col-span-6 md:col-span-4">{collection.line}</p>
            <p className="t-label-sm muted col-span-6 md:col-span-4 md:col-start-9 md:text-right">
              {items.length} {items.length === 1 ? "peça" : "peças"}
            </p>
          </div>
          <hr className="rule" />
        </Reveal>

        <ProductGrid pieces={items} columns={3} withIndex className="mt-[clamp(2.5rem,5vw,4.5rem)]" />

        <Reveal delay={0.1}>
          <div className="mt-[clamp(4rem,9vw,8rem)] flex flex-col items-center text-center">
            <CrystalMark className="h-[clamp(3rem,5vw,4.5rem)] w-auto opacity-50" />
            <p className="t-body mt-8 max-w-[46ch]">{collection.note}</p>
            <ButtonLink href="/contato" variant="line" arrow className="mt-8">
              Falar com a casa
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
