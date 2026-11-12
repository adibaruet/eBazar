import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HandCoins, RotateCcw, Store, Truck } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { percentOff, taka } from "@/lib/format";
import ProductArt from "@/components/product/ProductArt";
import Price from "@/components/product/Price";
import DiscountTag from "@/components/product/DiscountTag";
import PurchaseBox from "@/components/product/PurchaseBox";
import ProductRail from "@/components/product/ProductRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/listing/ListingView";

export async function generateMetadata({ params }: PageProps<"/p/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) return { title: "Product not found" };
  return { title: data.product.name, description: data.product.description ?? undefined };
}

async function ProductView({ params }: PageProps<"/p/[slug]">) {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) notFound();

  const { product: p, related } = data;
  const off = percentOff(p.price, p.discountPrice);
  const now = off ? p.discountPrice! : p.price;
  const cat = p.category;

  const stockLine =
    p.stock <= 0 ? (
      <span className="font-semibold text-lal-600">Out of stock</span>
    ) : p.stock <= 10 ? (
      <span className="font-semibold text-lal-600">Only {p.stock} left in stock</span>
    ) : (
      <span className="font-semibold text-paan-700">In stock</span>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-6 lg:pt-6">
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          ...(cat.parent ? [{ label: cat.parent.name, href: `/c/${cat.parent.slug}` }] : []),
          { label: cat.name, href: `/c/${cat.slug}` },
          { label: p.name },
        ]}
      />

      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
        {/* Day 4 turns this into a swipeable gallery with thumbnails */}
        <div className="md:sticky md:top-32 md:self-start">
          <div className="relative overflow-hidden rounded-panel ring-1 ring-line">
            <ProductArt
              name={p.name}
              slug={p.slug}
              imageUrl={p.imageUrl}
              categorySlug={cat.slug}
              parentSlug={cat.parent?.slug}
              iconSize="34%"
            />
            <DiscountTag price={p.price} discountPrice={p.discountPrice} className="absolute left-0 top-4 h-7 text-[15px]" />
          </div>
        </div>

        <div className="min-w-0">
          <h1 className="font-display text-[26px] font-bold leading-[1.15] tracking-[-0.015em] text-ink md:text-[32px]">
            {p.name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-2">
            <Store className="size-4 text-ink-3" />
            Sold by <span className="font-medium text-ink">E-Bazar</span>
          </p>

          <div className="mt-5 rounded-panel bg-white p-5 ring-1 ring-line">
            <Price price={p.price} discountPrice={p.discountPrice} size="lg" />
            {off > 0 && (
              <p className="mt-2 text-sm font-medium text-lal-600">
                You save {taka(p.price - now)} ({off}%)
              </p>
            )}
            <p className="mt-3 text-sm">{stockLine}</p>

            <div className="mt-5 border-t border-line pt-5">
              <PurchaseBox stock={p.stock} price={now} name={p.name} />
            </div>
          </div>

          <ul className="mt-4 divide-y divide-line rounded-panel bg-white ring-1 ring-line">
            {[
              { icon: HandCoins, title: "Cash on Delivery available", body: "Pay in cash when the parcel reaches you." },
              { icon: Truck, title: "Delivery across Bangladesh", body: "Delivery charge and date are shown at checkout." },
              { icon: RotateCcw, title: "Cancel before it ships", body: "Change your mind? Cancel from My orders until it is shipped." },
            ].map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3 p-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-paan-600" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="text-[13px] text-ink-3">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          {p.description && (
            <section className="mt-6" aria-labelledby="about">
              <h2 id="about" className="font-display text-lg font-bold text-ink">
                About this product
              </h2>
              <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-2">{p.description}</p>
            </section>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12" aria-label="You may also like">
          <SectionHeader title="You may also like" href={`/c/${cat.parent?.slug ?? cat.slug}`} />
          <ProductRail products={related} />
        </section>
      )}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-6 lg:pt-6">
      <div className="skeleton h-3.5 w-56 rounded" />
      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:gap-10">
        <div className="skeleton aspect-square rounded-panel" />
        <div className="space-y-4">
          <div className="skeleton h-9 w-3/4 rounded-lg" />
          <div className="skeleton h-4 w-40 rounded" />
          <div className="skeleton h-64 rounded-panel" />
        </div>
      </div>
    </div>
  );
}

export default function ProductPage(props: PageProps<"/p/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductView {...props} />
    </Suspense>
  );
}
