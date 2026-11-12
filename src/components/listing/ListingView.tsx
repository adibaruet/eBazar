import Link from "next/link";
import { ChevronRight, PackageSearch } from "lucide-react";
import type { ProductCardData } from "@/lib/catalog";
import type { ListingFilters } from "@/lib/listing";
import ProductGrid, { ProductGridSkeleton } from "@/components/product/ProductGrid";
import PriceFilter from "./PriceFilter";
import SortSelect from "./SortSelect";
import FilterSheet from "./FilterSheet";

export type Crumb = { label: string; href?: string };
export type Chip = { label: string; href: string; active?: boolean };

type Props = {
  title: string;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  chips?: Chip[];
  /** Links shown in the desktop sidebar above the price filter */
  sideLinks?: { title: string; links: Chip[] };
  basePath: string;
  /** Params to keep when filters change, e.g. { q: "earbuds" } */
  keep?: Record<string, string>;
  filters: ListingFilters;
  total: number;
  priceRange: { min: number; max: number } | null;
  products: ProductCardData[];
  empty?: React.ReactNode;
};

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-ink-3">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
            {c.href ? (
              <Link href={c.href} className="hover:text-paan-700">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-2">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Chips({ chips }: { chips: Chip[] }) {
  return (
    <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
      {chips.map((c) => (
        <li key={c.href} className="shrink-0">
          <Link
            href={c.href}
            aria-current={c.active ? "page" : undefined}
            className={`block rounded-full px-4 py-2 text-sm font-medium ring-1 ${
              c.active
                ? "bg-ink text-white ring-ink"
                : "bg-white text-ink-2 ring-line hover:ring-line-strong"
            }`}
          >
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ListingView({
  title,
  intro,
  crumbs,
  chips,
  sideLinks,
  basePath,
  keep = {},
  filters,
  total,
  priceRange,
  products,
  empty,
}: Props) {
  const keepWithSort = filters.sort && filters.sort !== "popular" ? { ...keep, sort: filters.sort } : keep;
  const activeFilters = Number(filters.min !== undefined || filters.max !== undefined);
  const filtered = products.length !== total;

  const filterPanel = (
    <PriceFilter basePath={basePath} filters={filters} keep={keepWithSort} range={priceRange} />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-6 lg:pt-6">
      {crumbs && <Breadcrumbs crumbs={crumbs} />}
      <h1 className="mt-2 font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-ink md:text-4xl">
        {title}
      </h1>
      {intro && <div className="mt-1 text-[15px] text-ink-2">{intro}</div>}
      {chips && chips.length > 0 && (
        <div className="mt-4">
          <Chips chips={chips} />
        </div>
      )}

      <div className="mt-5 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden space-y-6 lg:block">
          {sideLinks && sideLinks.links.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-ink">{sideLinks.title}</h3>
              <ul className="mt-2 space-y-0.5">
                {sideLinks.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={l.active ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm ${
                        l.active
                          ? "bg-paan-50 font-semibold text-paan-800"
                          : "text-ink-2 hover:bg-white hover:text-ink"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-panel bg-white p-4 ring-1 ring-line">{filterPanel}</div>
        </aside>

        <div>
          <div className="sticky top-[118px] z-20 -mx-4 mb-3 flex items-center gap-2 bg-canvas/95 px-4 py-2 backdrop-blur md:top-[113px] lg:static lg:mx-0 lg:mb-4 lg:bg-transparent lg:px-0 lg:py-0">
            <p className="mr-auto text-sm text-ink-2">
              <span className="font-semibold text-ink">{products.length}</span>
              {filtered ? ` of ${total}` : ""} {products.length === 1 ? "product" : "products"}
            </p>
            <FilterSheet count={activeFilters}>{filterPanel}</FilterSheet>
            <SortSelect value={filters.sort ?? "popular"} />
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} layout="sidebar" />
          ) : (
            (empty ?? (
              <EmptyState
                title="Nothing in this price range"
                body="Try a wider range, or clear the price filter to see everything here."
                action={{ label: "Clear filters", href: basePath + (keep.q ? `?q=${encodeURIComponent(keep.q)}` : "") }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
  children,
}: {
  title: string;
  body: string;
  action?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-panel bg-white px-6 py-12 text-center ring-1 ring-line">
      <PackageSearch aria-hidden className="mx-auto size-12 text-ink-3" strokeWidth={1.4} />
      <h2 className="mt-4 font-display text-xl font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm text-sm text-ink-2">{body}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-5 inline-flex h-10 items-center rounded-full bg-paan-600 px-5 text-sm font-semibold text-white hover:bg-paan-700"
        >
          {action.label}
        </Link>
      )}
      {children}
    </div>
  );
}

export function ListingSkeleton({ title }: { title?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-6 lg:pt-6">
      <div className="skeleton h-3.5 w-40 rounded" />
      {title ? (
        <h1 className="mt-2 font-display text-[28px] font-extrabold leading-tight text-ink md:text-4xl">
          {title}
        </h1>
      ) : (
        <div className="skeleton mt-3 h-9 w-64 rounded-lg" />
      )}
      <div className="mt-5 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="skeleton hidden h-72 rounded-panel lg:block" />
        <div>
          <div className="mb-4 flex justify-between">
            <div className="skeleton h-5 w-28 rounded" />
            <div className="skeleton h-10 w-40 rounded-full" />
          </div>
          <ProductGridSkeleton count={8} layout="sidebar" />
        </div>
      </div>
    </div>
  );
}
