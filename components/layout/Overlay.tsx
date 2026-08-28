"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { IconClose } from "@/components/brand/Icons";
import { useScrollLock } from "@/components/layout/useScrolled";
import { EASE, EASE_VEIL } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ============================================================================
   Camada modal — véu, foco preso, Escape fecha, rolagem bloqueada.
   Serve o menu móvel, a busca e a sacola.
   ========================================================================== */

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Overlay({
  open,
  onClose,
  children,
  from = "right",
  label,
  className,
  panelClassName,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  from?: "right" | "top";
  label: string;
  className?: string;
  panelClassName?: string;
}) {
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const restore = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    restore.current = document.activeElement as HTMLElement | null;

    const node = panel.current;
    const first = node?.querySelector<HTMLElement>(FOCUSABLE);
    window.setTimeout(() => first?.focus(), 60);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !node) return;

      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      restore.current?.focus?.();
    };
  }, [open, onClose]);

  const panelMotion =
    from === "right"
      ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
      : { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } };

  return (
    <AnimatePresence>
      {open && (
        <div className={cn("fixed inset-0 z-[90]", className)} role="dialog" aria-modal="true" aria-label={label}>
          <motion.button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-[var(--color-ink)]/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
          />

          <motion.div
            ref={panel}
            className={cn("absolute", panelClassName)}
            initial={reduced ? false : panelMotion.initial}
            animate={panelMotion.animate}
            exit={reduced ? undefined : panelMotion.exit}
            transition={{ duration: reduced ? 0 : 0.72, ease: EASE_VEIL }}
          >
            <button
              type="button"
              onClick={onClose}
              className="tap absolute right-[clamp(1rem,3vw,2.5rem)] top-[clamp(1rem,2.4vw,2rem)] z-10 grid h-11 w-11 place-items-center"
              aria-label="Fechar"
            >
              <IconClose size={20} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
