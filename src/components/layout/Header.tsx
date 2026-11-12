import Link from "next/link";
import { Suspense } from "react";
import { Bell, CircleUser, Heart, ShoppingCart, Zap } from "lucide-react";
import { getCategoryTree } from "@/lib/catalog";
import Logo from "./Logo";
import SearchBar, { SearchForm } from "./SearchBar";
import CategoryMenu from "./CategoryMenu";

function IconLink({
  href,
  label,
  children,
  className = "",
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`relative flex items-center gap-2 rounded-full p-2 text-ink-2 hover:bg-paan-50 hover:text-paan-800 ${className}`}
    >
      {children}
    </Link>
  );
}

export default async function Header() {
  const tree = await getCategoryTree();

  return (
    <>
      <div className="hidden bg-paan-800 text-[12.5px] text-paan-100 md:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center gap-6 px-4 lg:px-6">
          <p>Cash on Delivery on every order</p>
          <nav aria-label="Utility" className="ml-auto flex items-center gap-5">
            <Link href="/sell" className="hover:text-white">
              Sell on E-Bazar
            </Link>
            <Link href="/track" className="hover:text-white">
              Track your order
            </Link>
            <Link href="/help" className="hover:text-white">
              Help
            </Link>
          </nav>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pb-2 pt-3 md:gap-6 md:py-3 lg:px-6">
          <Logo />

          <Suspense fallback={<SearchForm className="hidden flex-1 md:block" />}>
            <SearchBar className="hidden max-w-2xl flex-1 md:block" />
          </Suspense>

          <nav aria-label="Your account" className="ml-auto flex items-center gap-0.5 md:gap-1">
            <IconLink href="/wishlist" label="Wishlist" className="hidden md:flex">
              <Heart className="size-[22px]" />
            </IconLink>
            <IconLink href="/notifications" label="Notifications">
              <Bell className="size-[22px]" />
            </IconLink>
            <Link
              href="/account"
              className="hidden items-center gap-2 rounded-full py-2 pl-2 pr-3 text-sm font-medium text-ink-2 hover:bg-paan-50 hover:text-paan-800 md:flex"
            >
              <CircleUser className="size-[22px]" />
              Log in
            </Link>
            <IconLink href="/cart" label="Cart">
              <ShoppingCart className="size-[22px]" />
              <span className="hidden text-sm font-medium md:inline">Cart</span>
            </IconLink>
          </nav>
        </div>

        {/* Mobile: search gets its own full-width row, like every shopping app */}
        <div className="px-4 pb-3 md:hidden">
          <Suspense fallback={<SearchForm />}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="hidden border-t border-line/70 md:block">
          <nav
            aria-label="Departments"
            className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-1.5 lg:px-6"
          >
            <CategoryMenu tree={tree} />
            <ul className="ml-2 flex items-center gap-1 text-sm">
              {tree.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/c/${c.slug}`}
                    className="rounded-full px-3 py-2 text-ink-2 hover:bg-canvas hover:text-ink"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/deals"
                className="rounded-full px-3 py-2 text-sm font-medium text-lal-600 hover:bg-lal-50"
              >
                Deals
              </Link>
              <Link
                href="/flash-sale"
                className="flex items-center gap-1.5 rounded-full bg-haldi-400 px-4 py-2 text-sm font-bold text-haldi-800 hover:bg-haldi-300"
              >
                <Zap className="size-4 fill-current" />
                Flash Sale
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
