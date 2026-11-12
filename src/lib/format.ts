// Bangladesh groups digits the South Asian way: ৳1,25,000, not ৳125,000.
const grouping = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export function taka(amount: number) {
  return `৳${grouping.format(amount)}`;
}

/** Whole-number percentage off, or 0 when there is no real discount. */
export function percentOff(price: number, salePrice: number | null | undefined) {
  if (!salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}
