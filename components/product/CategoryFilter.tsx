"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { categories } from "@/lib/data/catalogue";

/* ============================================================================
   Filtro de categorias — uma linha de texto sobre um fio. Sem separadores,
   sem cápsulas, sem menus.
   ========================================================================== */

export function CategoryFilter() {
  const pathname = usePathname();

  const items = [{ slug: "", name: "Tudo", href: "/joias" }].concat(
    categories.map((c) => ({ slug: c.slug, name: c.name, href: `/joias/${c.slug}` })),
  );

  return (
    <Reveal>
      <hr className="rule" />
      <nav aria-label="Filtrar por categoria">
        <ul className="no-scrollbar -mx-[var(--spacing-gutter)] flex gap-8 overflow-x-auto px-[var(--spacing-gutter)] py-5 sm:mx-0 sm:px-0">
          {items.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className="t-label-sm link-nav"
                data-active={pathname === item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr className="rule" />
    </Reveal>
  );
}
