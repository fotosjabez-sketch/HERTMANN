import Link from "next/link";
import { Monogram, Wordmark } from "@/components/brand/Logo";
import { Newsletter } from "@/components/sections/Newsletter";
import { categories, collections } from "@/lib/data/catalogue";
import { nav, site } from "@/lib/data/site";

/* ============================================================================
   Rodapé — o fecho institucional. Azul-marinho, muito ar, quatro colunas
   que se recompõem em duas e depois em uma.
   ========================================================================== */

export function Footer() {
  return (
    <footer className="on-ink">
      <div className="shell pb-[clamp(2.5rem,4vw,3.5rem)] pt-[clamp(4.5rem,9vw,8rem)]">
        {/* — Assinatura — */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link href="/" className="inline-flex flex-col" aria-label="HERTMANN — página inicial">
            <Monogram className="w-[3.4rem]" />
            <Wordmark className="mt-4 text-[clamp(1.6rem,4.5vw,2.6rem)]" />
          </Link>
          <p className="t-label-sm muted md:text-right">
            {site.signature}
            <br />
            {site.city}, Brasil
          </p>
        </div>

        <hr className="rule mt-[clamp(3rem,6vw,5rem)]" />

        {/* — Colunas — */}
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          <nav aria-label="Navegação do rodapé">
            <p className="t-label-sm muted">Navegação</p>
            <ul className="mt-5 space-y-2.5">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="t-label link-nav">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="t-label-sm muted">Coleções</p>
            <ul className="mt-5 space-y-2.5">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link href={`/colecoes/${c.slug}`} className="t-label link-nav">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="t-label-sm muted mt-8">Categorias</p>
            <ul className="mt-5 space-y-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/joias/${c.slug}`} className="t-label link-nav">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-label-sm muted">Atendimento</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/contato" className="t-label link-nav">
                  Contato
                </Link>
              </li>
              <li>
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-label link-nav"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="t-label link-nav break-all">
                  {site.contact.email}
                </a>
              </li>
            </ul>

            <p className="t-label-sm muted mt-8">Redes</p>
            <ul className="mt-5 space-y-2.5">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="t-label link-nav"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Newsletter className="col-span-2 md:col-span-1" />
        </div>

        <hr className="rule mt-[clamp(3rem,6vw,5rem)]" />

        {/* — Legal — */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label-sm muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex gap-6">
            {nav.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="t-label-sm muted link-nav">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="t-label-sm muted">{site.contact.address}</p>
        </div>
      </div>
    </footer>
  );
}
