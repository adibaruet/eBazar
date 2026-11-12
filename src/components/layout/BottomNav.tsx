"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, Heart, House, LayoutGrid, ShoppingCart } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: House, match: (p: string) => p === "/" },
  {
    href: "/categories",
    label: "Categories",
    icon: LayoutGrid,
    match: (p: string) => p.startsWith("/categories") || p.startsWith("/c/"),
  },
  { href: "/wishlist", label: "Wishlist", icon: Heart, match: (p: string) => p.startsWith("/wishlist") },
  { href: "/cart", label: "Cart", icon: ShoppingCart, match: (p: string) => p.startsWith("/cart") },
  {
    href: "/account",
    label: "Account",
    icon: CircleUser,
    match: (p: string) => ["/account", "/orders", "/login", "/signup"].some((r) => p.startsWith(r)),
  },
];

function Bar({ pathname }: { pathname: string | null }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-bar md:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map(({ href, label, icon: Icon, match }) => {
          const active = pathname ? match(pathname) : false;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                  active ? "text-paan-700" : "text-ink-3"
                }`}
              >
                <span
                  className={`grid h-7 w-12 place-items-center rounded-full ${active ? "bg-paan-50" : ""}`}
                >
                  <Icon className="size-[21px]" strokeWidth={active ? 2.3 : 1.9} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile tab bar. Rendered without a highlight until the path is known. */
export function BottomNavFallback() {
  return <Bar pathname={null} />;
}

export default function BottomNav() {
  const pathname = usePathname();
  // Product pages swap the tab bar for their own Add to cart / Buy now bar.
  if (pathname.startsWith("/p/")) return null;
  return <Bar pathname={pathname} />;
}
