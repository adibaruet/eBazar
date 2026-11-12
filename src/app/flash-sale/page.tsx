import { Suspense } from "react";
import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { listDiscounted } from "@/lib/catalog";
import { parseFilters } from "@/lib/listing";
import ListingView, { ListingSkeleton } from "@/components/listing/ListingView";
import Countdown from "@/components/home/Countdown";
import Bunting from "@/components/home/Bunting";

export const metadata: Metadata = { title: "Flash Sale" };

async function Sale({ searchParams }: PageProps<"/flash-sale">) {
  const filters = parseFilters(await searchParams);
  const data = await listDiscounted(filters);

  return (
    <ListingView
      title="Today's prices"
      crumbs={[{ label: "Home", href: "/" }, { label: "Flash Sale" }]}
      basePath="/flash-sale"
      filters={filters}
      total={data.total}
      priceRange={data.priceRange}
      products={data.products}
    />
  );
}

export default function FlashSalePage(props: PageProps<"/flash-sale">) {
  return (
    <>
      <div className="relative overflow-hidden bg-haldi-400 text-haldi-800">
        <Bunting className="absolute inset-x-0 top-0 h-[26px] w-full" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 pb-6 pt-11 lg:px-6">
          <h1 className="flex items-center gap-2 font-display text-[34px] font-extrabold leading-none tracking-[-0.02em] text-ink md:text-5xl">
            <Zap className="size-9 fill-lal-500 text-lal-500 md:size-11" />
            Flash Sale
          </h1>
          <Countdown label="Prices reset in" />
        </div>
      </div>
      <Suspense fallback={<ListingSkeleton title="Today's prices" />}>
        <Sale {...props} />
      </Suspense>
    </>
  );
}
