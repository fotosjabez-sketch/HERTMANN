const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Preços em joalheria não pedem centavos — pedem clareza. */
export function price(value: number): string {
  return brl.format(value);
}

export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
