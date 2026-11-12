import Link from "next/link";
import { getCategoryTree } from "@/lib/catalog";
import { LogoMark } from "./Logo";

const groups = [
  {
    title: "Your account",
    links: [
      ["My orders", "/orders"],
      ["Track your order", "/track"],
      ["Wishlist", "/wishlist"],
      ["Notifications", "/notifications"],
    ],
  },
  {
    title: "Sell",
    links: [
      ["Sell on E-Bazar", "/sell"],
      ["Seller dashboard", "/seller"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Help centre", "/help"],
      ["Cancellations and refunds", "/help"],
      ["Delivery charges", "/help"],
    ],
  },
] as const;

export default async function Footer() {
  const tree = await getCategoryTree();

  return (
    <footer className="mt-16 bg-paan-900 pb-24 text-paan-100 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:px-6">
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <LogoMark className="size-9 rounded-lg bg-white p-0.5" />
            <span className="font-display text-xl font-extrabold text-white">E-Bazar</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-paan-200">
            Shops from across Bangladesh in one bazar. Pay on delivery or online, track every
            parcel to your door.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold" aria-label="Payment methods">
            {["Cash on Delivery", "bKash", "Nagad", "Visa", "Mastercard"].map((m) => (
              <li key={m} className="rounded-md bg-white/10 px-2.5 py-1.5 text-white">
                {m}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Shop">
          <h2 className="font-display text-base font-bold text-white">Shop</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {tree.map((c) => (
              <li key={c.id}>
                <Link href={`/c/${c.slug}`} className="text-paan-200 hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="font-display text-base font-bold text-white">{g.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {g.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-paan-200 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-paan-200 lg:px-6">
          © E-Bazar. All prices in Bangladeshi taka.
        </p>
      </div>
    </footer>
  );
}
