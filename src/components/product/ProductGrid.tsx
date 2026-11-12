import type { ProductCardData } from "@/lib/catalog";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

const layouts = {
  // Full-width pages such as the home page
  wide: "grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 xl:grid-cols-5",
  // Listings that share the row with a filter sidebar from lg up
  sidebar: "grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4",
};

type Layout = keyof typeof layouts;

export default function ProductGrid({
  products,
  layout = "wide",
}: {
  products: ProductCardData[];
  layout?: Layout;
}) {
  return (
    <ul className={layouts[layout]}>
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} className="h-full" />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 10, layout = "wide" }: { count?: number; layout?: Layout }) {
  return (
    <div className={layouts[layout]}>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
