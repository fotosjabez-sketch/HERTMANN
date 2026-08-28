"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { pieceBySlug, type Piece } from "@/lib/data/catalogue";

/* ============================================================================
   Estado de loja — sacola e favoritos.
   Persistido no dispositivo de quem visita; nunca sai do navegador.
   ========================================================================== */

export type BagLine = {
  slug: string;
  option?: string;
  quantity: number;
};

export type BagEntry = BagLine & { piece: Piece };

type State = {
  bag: BagLine[];
  favourites: string[];
};

type Action =
  | { type: "hydrate"; state: State }
  | { type: "add"; line: BagLine }
  | { type: "remove"; slug: string; option?: string }
  | { type: "quantity"; slug: string; option?: string; quantity: number }
  | { type: "favourite"; slug: string }
  | { type: "clear" };

const KEY = "hertmann:store:v1";

const same = (a: BagLine, slug: string, option?: string) =>
  a.slug === slug && (a.option ?? "") === (option ?? "");

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return action.state;

    case "add": {
      const existing = state.bag.find((l) => same(l, action.line.slug, action.line.option));
      if (existing) {
        return {
          ...state,
          bag: state.bag.map((l) =>
            same(l, action.line.slug, action.line.option)
              ? { ...l, quantity: Math.min(9, l.quantity + action.line.quantity) }
              : l,
          ),
        };
      }
      return { ...state, bag: [...state.bag, action.line] };
    }

    case "remove":
      return { ...state, bag: state.bag.filter((l) => !same(l, action.slug, action.option)) };

    case "quantity":
      return {
        ...state,
        bag: state.bag
          .map((l) =>
            same(l, action.slug, action.option)
              ? { ...l, quantity: Math.max(0, Math.min(9, action.quantity)) }
              : l,
          )
          .filter((l) => l.quantity > 0),
      };

    case "favourite":
      return {
        ...state,
        favourites: state.favourites.includes(action.slug)
          ? state.favourites.filter((s) => s !== action.slug)
          : [...state.favourites, action.slug],
      };

    case "clear":
      return { ...state, bag: [] };

    default:
      return state;
  }
}

type StoreContext = {
  /** Linhas resolvidas com a peça correspondente. */
  bag: BagEntry[];
  bagCount: number;
  bagTotal: number;
  favourites: string[];
  favouriteCount: number;
  ready: boolean;
  addToBag: (slug: string, option?: string, quantity?: number) => void;
  removeFromBag: (slug: string, option?: string) => void;
  setQuantity: (slug: string, quantity: number, option?: string) => void;
  clearBag: () => void;
  toggleFavourite: (slug: string) => void;
  isFavourite: (slug: string) => boolean;
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
};

const Ctx = createContext<StoreContext | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { bag: [], favourites: [] });
  const [ready, setReady] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        dispatch({
          type: "hydrate",
          state: {
            bag: Array.isArray(parsed.bag) ? parsed.bag : [],
            favourites: Array.isArray(parsed.favourites) ? parsed.favourites : [],
          },
        });
      }
    } catch {
      /* armazenamento indisponível — a loja funciona à mesma nesta sessão */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* sem persistência: seguimos em memória */
    }
  }, [state, ready]);

  const bag = useMemo<BagEntry[]>(
    () =>
      state.bag
        .map((line) => {
          const piece = pieceBySlug(line.slug);
          return piece ? { ...line, piece } : null;
        })
        .filter((l): l is BagEntry => Boolean(l)),
    [state.bag],
  );

  const value = useMemo<StoreContext>(() => {
    return {
      bag,
      bagCount: bag.reduce((n, l) => n + l.quantity, 0),
      bagTotal: bag.reduce((n, l) => n + l.quantity * l.piece.price, 0),
      favourites: state.favourites,
      favouriteCount: state.favourites.length,
      ready,
      addToBag: (slug, option, quantity = 1) =>
        dispatch({ type: "add", line: { slug, option, quantity } }),
      removeFromBag: (slug, option) => dispatch({ type: "remove", slug, option }),
      setQuantity: (slug, quantity, option) =>
        dispatch({ type: "quantity", slug, option, quantity }),
      clearBag: () => dispatch({ type: "clear" }),
      toggleFavourite: (slug) => dispatch({ type: "favourite", slug }),
      isFavourite: (slug) => state.favourites.includes(slug),
      bagOpen,
      setBagOpen,
    };
  }, [bag, state.favourites, ready, bagOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): StoreContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore precisa de estar dentro de <StoreProvider>");
  return ctx;
}
