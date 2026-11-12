import { Suspense } from "react";
import type { Metadata } from "next";
import { getCategoryTree, listProducts } from "@/lib/catalog";
import { parseFilters } from "@/lib/listing";
import ListingView, { ListingSkeleton } from "@/components/listing/ListingView";

export const metadata: Metadata = { title: "All products" };

async function AllProducts({ searchParams }: PageProps<"/products">) {
  const filters = parseFilters(await searchParams);
  const [data, tree] = await Promise.all([listProducts(filters), getCategoryTree()]);

  return (
    <ListingView
      title="All products"
      crumbs={[{ label: "Home", href: "/" }, { label: "All products" }]}
      chips={tree.map((c) => ({ label: c.name, href: `/c/${c.slug}` }))}
      basePath="/products"
      filters={filters}
      total={data.total}
      priceRange={data.priceRange}
      products={data.products}
    />
  );
}

export default function ProductsPage(props: PageProps<"/products">) {
  return (
    <Suspense fallback={<ListingSkeleton title="All products" />}>
      <AllProducts {...props} />
    </Suspense>
  );
}
