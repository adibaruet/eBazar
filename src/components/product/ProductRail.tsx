import type { ProductCardData } from "@/lib/catalog";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

/** Horizontally scrolling row of cards that snaps, the way shopping apps scroll. */
export default function ProductRail({ products }: { products: ProductCardData[] }) {
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 lg:-mx-6 lg:scroll-px-6 lg:px-6">
      {products.map((p) => (
        <li key={p.id} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[22%] lg:w-[15.5%]">
          <ProductCard product={p} className="h-full" />
        </li>
      ))}
    </ul>
  );
}

export function ProductRailSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="-mx-4 flex gap-3 overflow-hidden px-4 lg:-mx-6 lg:px-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="w-[44%] shrink-0 sm:w-[30%] md:w-[22%] lg:w-[15.5%]">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
