import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { CrystalMark } from "@/components/brand/Marks";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      className="shell flex min-h-[70svh] flex-col items-center justify-center text-center"
      style={{ paddingTop: "var(--header-h)" }}
    >
      <CrystalMark className="h-[clamp(3rem,5vw,4.5rem)] w-auto opacity-50" />
      <p className="t-num mt-10 opacity-45">404</p>
      <h1 className="t-h1 mt-5">Esta página não existe.</h1>
      <p className="t-lead mt-6 max-w-[38ch]">
        O endereço mudou, ou a peça que procurava saiu de exposição. O catálogo
        continua aqui.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/joias" variant="solid" arrow>
          Ver as joias
        </ButtonLink>
        <ButtonLink href="/" variant="line">
          Página inicial
        </ButtonLink>
      </div>
    </section>
  );
}
