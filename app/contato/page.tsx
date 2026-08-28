import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Parallax, Reveal, RevealVeil } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a HERTMANN: atendimento privado na boutique do Batel, em Curitiba, por WhatsApp ou por e-mail.",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Atendimento"
        title={["Fale connosco."]}
        lead="Respondemos em até um dia útil. Para ver uma peça, experimentar medidas ou encomendar um projecto, marque uma visita — o atendimento é sempre privado."
      />

      <div className="shell pb-[var(--spacing-section)]">
        <div className="grid12 gap-y-[clamp(3rem,6vw,5rem)]">
          <div className="col-span-6 md:col-span-6">
            <ContactForm />
          </div>

          <Reveal delay={0.12} className="col-span-6 md:col-span-4 md:col-start-9">
            <div className="border-t border-[var(--color-rule)] pt-6">
              <p className="t-label-sm muted">Boutique</p>
              <p className="t-label mt-3">{site.contact.address}</p>
              <p className="t-body mt-3">{site.contact.hours}</p>
            </div>

            <div className="mt-10 border-t border-[var(--color-rule)] pt-6">
              <p className="t-label-sm muted">Directo</p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <a
                    href={site.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="t-label link-nav"
                  >
                    WhatsApp {site.contact.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="t-label link-nav">
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className="t-label link-nav break-all">
                    {site.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-10 border-t border-[var(--color-rule)] pt-6">
              <p className="t-label-sm muted">Ateliê</p>
              <p className="t-body mt-3">
                Visitas ao ateliê são feitas mediante marcação, de terça a
                quinta, às 15h.
              </p>
            </div>

            <Parallax distance={18} className="mt-10">
              <figure>
                <RevealVeil>
                  <div className="plate relative aspect-[4/5] w-full">
                    <Image
                      src="/images/boutique-tall.jpg"
                      alt="Vitrina da boutique HERTMANN, no Batel, em Curitiba"
                      fill
                      sizes="(max-width: 900px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                </RevealVeil>
                <figcaption className="t-label-sm muted mt-5">
                  A boutique, ao nível da rua. O ateliê ocupa o piso acima.
                </figcaption>
              </figure>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </>
  );
}
