import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { getAllProducts, getCategoryTree, getDiscounted, getUnderPrice } from "@/lib/catalog";
import { banners, featuredCoupon } from "@/lib/content";
import BannerCarousel from "@/components/home/BannerCarousel";
import CategoryRail from "@/components/home/CategoryRail";
import CouponCard from "@/components/home/CouponCard";
import Countdown from "@/components/home/Countdown";
import FlashSale from "@/components/home/FlashSale";
import TrustStrip from "@/components/home/TrustStrip";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductRail from "@/components/product/ProductRail";
import ProductGrid from "@/components/product/ProductGrid";

export default async function Home() {
  const [tree, flash, budget, everything] = await Promise.all([
    getCategoryTree(),
    getDiscounted(),
    getUnderPrice(1000),
    getAllProducts(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 pt-3 md:space-y-9 md:pt-5 lg:px-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <BannerCarousel banners={banners} />

        <aside className="hidden flex-col gap-4 lg:flex">
          <Link
            href="/flash-sale"
            className="relative flex flex-1 flex-col justify-between rounded-panel bg-ink p-5 text-white"
          >
            <div>
              <p className="flex items-center gap-1.5 font-display text-2xl font-extrabold">
                <Zap className="size-6 fill-haldi-400 text-haldi-400" />
                Flash Sale
              </p>
              <p className="mt-1 text-sm text-white/70">
                {flash.length} deals, prices reset at midnight.
              </p>
            </div>
            <Countdown size="sm" tone="light" />
            <span className="flex items-center text-sm font-semibold text-haldi-300">
              Shop the sale
              <ChevronRight className="size-4" />
            </span>
          </Link>
          <CouponCard {...featuredCoupon} stacked />
        </aside>
      </div>

      <CategoryRail tree={tree} />

      <CouponCard {...featuredCoupon} className="lg:hidden" />

      <FlashSale products={flash.slice(0, 10)} />

      {budget.length > 0 && (
        <section aria-label="Under ৳1,000">
          <SectionHeader title="Under ৳1,000" href="/products?max=1000&sort=price-asc" />
          <ProductRail products={budget} />
        </section>
      )}

      <section aria-label="Just for you">
        <SectionHeader title="Just for you" href="/products" />
        <ProductGrid products={everything} />
      </section>

      <TrustStrip />
    </div>
  );
}
