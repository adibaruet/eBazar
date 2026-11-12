import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getCategoryTree, searchProducts } from "@/lib/catalog";
import { firstParam, parseFilters } from "@/lib/listing";
import ListingView, { EmptyState, ListingSkeleton } from "@/components/listing/ListingView";

export const metadata: Metadata = { title: "Search" };

async function Results({ searchParams }: PageProps<"/search">) {
  const sp = await searchParams;
  const q = firstParam(sp.q).trim().slice(0, 80);
  const filters = parseFilters(sp);
  const tree = await getCategoryTree();

  const browse = (
    <ul className="mt-6 flex flex-wrap justify-center gap-2">
      {tree.map((c) => (
        <li key={c.id}>
          <Link
            href={`/c/${c.slug}`}
            className="block rounded-full bg-canvas px-4 py-2 text-sm font-medium text-ink-2 hover:bg-paan-50 hover:text-paan-800"
          >
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  if (!q) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-8 lg:px-6">
        <EmptyState
          title="What are you looking for?"
          body="Search by product name, like panjabi, earbuds or kettle. Or start from a category."
        >
          {browse}
        </EmptyState>
      </div>
    );
  }

  const data = await searchProducts(q, filters);

  return (
    <ListingView
      title={`Results for “${q}”`}
      crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      basePath="/search"
      keep={{ q }}
      filters={filters}
      total={data.total}
      priceRange={data.priceRange}
      products={data.products}
      empty={
        data.total === 0 ? (
          <EmptyState
            title={`No products match “${q}”`}
            body="Check the spelling, try a shorter word, or browse a category instead."
          >
            {browse}
          </EmptyState>
        ) : undefined
      }
    />
  );
}

export default function SearchPage(props: PageProps<"/search">) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <Results {...props} />
    </Suspense>
  );
}
