"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lockup } from "@/components/brand/Logo";
import { IconAccount, IconBag, IconMenu, IconSearch } from "@/components/brand/Icons";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { BagDrawer } from "@/components/commerce/BagDrawer";
import { useStore } from "@/components/commerce/StoreProvider";
import { useScrolled } from "@/components/layout/useScrolled";
import { nav } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/* ============================================================================
   Cabeçalho — quase invisível. A marca ao centro, a navegação à esquerda,
   os acessos à direita. Ao rolar, a altura reduz-se e o fundo torna-se
   sólido; nada mais muda.
   ========================================================================== */

export function Header() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { bagCount, setBagOpen, ready } = useStore();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-[background-color,border-color,height] duration-[600ms]",
          "[transition-timing-function:var(--ease-editorial)]",
          scrolled
            ? "border-b border-[var(--color-rule-soft)] bg-[var(--color-paper)]"
            : "border-b border-transparent bg-transparent",
        )}
        style={{ height: "var(--header-h)" }}
        data-condensed={scrolled}
      >
        <div className="shell-wide flex h-full items-center">
          {/* — Navegação (desktop) / Menu (móvel) — */}
          <div className="flex flex-1 items-center justify-start">
            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {nav.primary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="t-label-sm link-nav"
                      data-active={isActive(item.href)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="tap relative -ml-1 grid h-11 w-11 place-items-center lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
            >
              <IconMenu size={22} />
            </button>
          </div>

          {/* — Marca — */}
          <Link
            href="/"
            className="tap relative shrink-0"
            aria-label="HERTMANN — página inicial"
          >
            <Lockup
              className={cn(
                "transition-[font-size] duration-[600ms]",
                "[transition-timing-function:var(--ease-editorial)]",
                scrolled
                  ? "text-[0.85rem] sm:text-[0.95rem]"
                  : "text-[0.95rem] sm:text-[1.15rem]",
              )}
            />
          </Link>

          {/* — Acessos — */}
          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="tap relative grid h-11 w-11 place-items-center"
              aria-label="Procurar"
            >
              <IconSearch size={19} />
            </button>

            <Link
              href="/contato"
              className="tap relative hidden h-11 w-11 place-items-center sm:grid"
              aria-label="Conta"
            >
              <IconAccount size={19} />
            </Link>

            <button
              type="button"
              onClick={() => setBagOpen(true)}
              className="tap relative grid h-11 w-11 place-items-center"
              aria-label={
                ready && bagCount > 0
                  ? `Sacola, ${bagCount} ${bagCount === 1 ? "peça" : "peças"}`
                  : "Sacola, vazia"
              }
            >
              <IconBag size={19} />
              {ready && bagCount > 0 && (
                <span className="t-num absolute right-1 top-1.5 text-[0.5625rem] leading-none">
                  {bagCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <BagDrawer />
    </>
  );
}
