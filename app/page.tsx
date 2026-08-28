import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { Campaign } from "@/components/sections/Campaign";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandUniverse } from "@/components/sections/BrandUniverse";
import { Atelier } from "@/components/sections/Atelier";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "HERTMANN — Alta joalheria desde 1948",
  description:
    "Joias executadas à mão em ateliê próprio, em Curitiba. Ouro 18k, pedras seleccionadas uma a uma, peças desenhadas para atravessar gerações.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedCollection />
      <Campaign />
      <Categories />
      <FeaturedProducts />
      <BrandUniverse />
      <Atelier />
      <FinalCta />
    </>
  );
}
