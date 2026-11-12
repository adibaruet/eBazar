import Link from "next/link";
import type { ProductCardData } from "@/lib/catalog";
import ProductArt from "./ProductArt";
import Price from "./Price";
import DiscountTag from "./DiscountTag";

export default function ProductCard({
  product: p,
  className = "",
}: {
  product: ProductCardData;
  className?: string;
}) {
  const soldOut = p.stock <= 0;
  const lowStock = !soldOut && p.stock <= 10;

  return (
    <Link
      href={`/p/${p.slug}`}
      className={`group relative flex flex-col rounded-tile bg-white p-2 ring-1 ring-line transition-colors hover:ring-line-strong ${className}`}
    >
      <div className="relative overflow-hidden rounded-[10px]">
        <ProductArt
          name={p.name}
          slug={p.slug}
          imageUrl={p.imageUrl}
          categorySlug={p.category.slug}
          parentSlug={p.category.parent?.slug}
          className={soldOut ? "opacity-50 grayscale" : ""}
        />
        <DiscountTag
          price={p.price}
          discountPrice={p.discountPrice}
          className="absolute left-0 top-2"
        />
        {soldOut && (
          <span className="absolute inset-x-2 bottom-2 rounded-md bg-ink/80 py-1 text-center text-xs font-semibold text-white">
            Sold out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-1 pb-1 pt-2.5">
        <h3 className="line-clamp-2 min-h-[2.5em] text-[13.5px] leading-[1.25] text-ink group-hover:text-paan-700">
          {p.name}
        </h3>
        <Price price={p.price} discountPrice={p.discountPrice} />
        {lowStock && <p className="text-xs font-medium text-lal-600">Only {p.stock} left</p>}
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-tile bg-white p-2 ring-1 ring-line">
      <div className="skeleton aspect-square rounded-[10px]" />
      <div className="space-y-2 px-1 pb-1 pt-3">
        <div className="skeleton h-3 w-11/12 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
      </div>
    </div>
  );
}
