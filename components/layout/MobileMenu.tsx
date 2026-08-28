"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Overlay } from "@/components/layout/Overlay";
import { Wordmark } from "@/components/brand/Logo";
import { CrystalMark } from "@/components/brand/Marks";
import { EASE } from "@/components/motion/Reveal";
import { categories, collections } from "@/lib/data/catalogue";
import { nav, site } from "@/lib/data/site";

/* ============================================================================
   Menu móvel — uma página inteira em azul-marinho. Os destinos entram um a
   um, de baixo para cima, como uma frase que se compõe.
   ========================================================================== */

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();

  const rise = (i: number) =>
    reduced
      ? {}
      : {
          initial: { y: "110%", opacity: 0 },
          animate: { y: "0%", opacity: 1 },
          transition: { duration: 0.85, ease: EASE, delay: 0.22 + i * 0.055 },
        };

  return (
    <Overlay
      open={open}
      onClose={onClose}
      from="top"
      label="Menu"
      panelClassName="on-ink inset-x-0 top-0 h-[100dvh] w-full overflow-y-auto"
    >
      <div className="shell flex min-h-full flex-col justify-between pb-12 pt-[clamp(1.4rem,3vw,2.4rem)]">
        <div>
          <Link href="/" onClick={onClose} className="inline-block" aria-label="HERTMANN — página inicial">
            <Wordmark className="text-[1.05rem]" />
          </Link>

          <nav aria-label="Navegação principal" className="mt-[clamp(3rem,9vw,5rem)]">
            <ul>
              {nav.primary.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div {...rise(i)}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="t-h1 block py-[0.09em]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-[clamp(2.5rem,7vw,4rem)] grid grid-cols-2 gap-8">
            <div className="overflow-hidden">
              <motion.div {...rise(4)}>
                <p className="t-label-sm muted">Coleções</p>
                <ul className="mt-4 space-y-2.5">
                  {collections.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/colecoes/${c.slug}`}
                        onClick={onClose}
                        className="t-label link-nav"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div {...rise(5)}>
                <p className="t-label-sm muted">Categorias</p>
                <ul className="mt-4 space-y-2.5">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/joias/${c.slug}`}
                        onClick={onClose}
                        className="t-label link-nav"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(3rem,8vw,5rem)]">
          <hr className="rule rule-invert" />
          <div className="mt-6 flex items-end justify-between gap-6">
            <div>
              <ul className="space-y-2">
                {nav.service.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="t-label-sm muted link-nav">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="t-label-sm muted mt-5">{site.social[0].label}</p>
            </div>
            <CrystalMark className="h-16 w-auto shrink-0 opacity-30" />
          </div>
        </div>
      </div>
    </Overlay>
  );
}
