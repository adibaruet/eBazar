import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import type { ProductCardData } from "@/lib/catalog";
import ProductRail from "@/components/product/ProductRail";
import Countdown from "./Countdown";
import Bunting from "./Bunting";

export default function FlashSale({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null;
  return (
    <section
      aria-labelledby="flash-sale-title"
      className="relative overflow-hidden rounded-panel bg-haldi-400 px-4 pb-4 pt-9 text-haldi-800 lg:px-6 lg:pb-6 lg:pt-11"
    >
      <Bunting className="absolute inset-x-0 top-0 h-[26px] w-full" />
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <h2
          id="flash-sale-title"
          className="flex items-center gap-1.5 font-display text-[26px] font-extrabold leading-none tracking-[-0.02em] text-ink md:text-[30px]"
        >
          <Zap className="size-7 fill-lal-500 text-lal-500" />
          Flash Sale
        </h2>
        <Countdown />
        <Link
          href="/flash-sale"
          className="ml-auto flex items-center text-sm font-bold text-ink hover:underline"
        >
          See all
          <ChevronRight className="size-4" />
        </Link>
      </div>
      <ProductRail products={products} />
    </section>
  );
}
