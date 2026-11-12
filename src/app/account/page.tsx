import Link from "next/link";
import type { Metadata } from "next";
import {
  Bell,
  ChevronRight,
  CircleUser,
  Heart,
  KeyRound,
  LocationEdit,
  Package,
  RotateCcw,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = { title: "Account" };

/*
  Guest view of the Account tab. Day 2 adds the signed-in version with the
  person's name, and the profile, address and password screens behind it.
*/
const groups: { title: string; items: [LucideIcon, string, string][] }[] = [
  {
    title: "Orders",
    items: [
      [Package, "My orders", "/orders"],
      [Truck, "Track your order", "/track"],
      [RotateCcw, "Cancellations and refunds", "/orders"],
    ],
  },
  {
    title: "Shopping",
    items: [
      [Heart, "Wishlist", "/wishlist"],
      [Bell, "Notifications", "/notifications"],
    ],
  },
  {
    title: "Settings",
    items: [
      [CircleUser, "Profile", "/login"],
      [LocationEdit, "Saved addresses", "/login"],
      [KeyRound, "Change password", "/login"],
    ],
  },
  {
    title: "Business",
    items: [[Store, "Sell on E-Bazar", "/sell"]],
  },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-4 md:pt-8">
      <section className="rounded-panel bg-paan-700 p-5 text-white">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-full bg-white/15">
            <CircleUser className="size-8" strokeWidth={1.5} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold">Welcome to E-Bazar</h1>
            <p className="text-sm text-paan-100">Log in to see your orders, wishlist and addresses.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/login"
            className="flex h-11 items-center justify-center rounded-full bg-white text-sm font-bold text-paan-800 hover:bg-paan-50"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="flex h-11 items-center justify-center rounded-full text-sm font-bold text-white ring-1 ring-white/50 hover:bg-white/10"
          >
            Sign up
          </Link>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.title} className="mt-5" aria-labelledby={`acc-${g.title}`}>
          <h2 id={`acc-${g.title}`} className="mb-2 px-1 text-sm font-semibold text-ink-3">
            {g.title}
          </h2>
          <ul className="divide-y divide-line overflow-hidden rounded-panel bg-white ring-1 ring-line">
            {g.items.map(([Icon, label, href]) => (
              <li key={label}>
                <Link href={href} className="flex items-center gap-3 px-4 py-3.5 hover:bg-canvas/60">
                  <Icon className="size-5 text-paan-600" strokeWidth={1.8} />
                  <span className="flex-1 text-[15px] text-ink">{label}</span>
                  <ChevronRight className="size-4 text-ink-3" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
