// Shared by server pages and client controls, so it must not import Prisma.

export type SortKey = "popular" | "price-asc" | "price-desc" | "discount" | "newest";

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "discount", label: "Biggest discount" },
  { key: "newest", label: "Newest" },
];

export type ListingFilters = {
  sort?: SortKey;
  min?: number;
  max?: number;
};

export type SearchParams = Record<string, string | string[] | undefined>;

/** Turns ?sort=&min=&max= into safe filters, ignoring anything malformed. */
export function parseFilters(params: SearchParams): ListingFilters {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const num = (v: string | undefined) => {
    if (!v) return undefined;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : undefined;
  };
  const sort = one(params.sort);
  let min = num(one(params.min));
  let max = num(one(params.max));
  if (min !== undefined && max !== undefined && min > max) [min, max] = [max, min];
  return {
    sort: sortOptions.some((o) => o.key === sort) ? (sort as SortKey) : "popular",
    min,
    max,
  };
}

export function firstParam(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v) ?? "";
}
