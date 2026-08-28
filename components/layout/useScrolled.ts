"use client";

import { useEffect, useState } from "react";

/** `true` assim que a página sai do topo — usado para condensar o cabeçalho. */
export function useScrolled(threshold = 16): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return scrolled;
}

/** Bloqueia a rolagem do corpo enquanto uma camada está aberta. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.dataset.lock;
    document.body.dataset.lock = "true";
    return () => {
      if (previous) document.body.dataset.lock = previous;
      else delete document.body.dataset.lock;
    };
  }, [locked]);
}
