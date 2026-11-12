import { Suspense } from "react";
import type { Metadata } from "next";
import { listDiscounted } from "@/lib/catalog";
import { parseFilters } from "@/lib/listing";
import ListingView, { ListingSkeleton } from "@/components/listing/ListingView";

export const metadata: Metadata = { title: "Deals" };

async function Deals({ searchParams }: PageProps<"/deals">) {
  const filters = parseFilters(await searchParams);
  const data = await listDiscounted(filters);

  return (
    <ListingView
      title="Deals"
      intro="Everything on discount right now, biggest savings first."
      crumbs={[{ label: "Home", href: "/" }, { label: "Deals" }]}
      basePath="/deals"
      filters={filters}
      total={data.total}
      priceRange={data.priceRange}
      products={data.products}
    />
  );
}

export default function DealsPage(props: PageProps<"/deals">) {
  return (
    <Suspense fallback={<ListingSkeleton title="Deals" />}>
      <Deals {...props} />
    </Suspense>
  );
}
