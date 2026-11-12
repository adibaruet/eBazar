"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { taka } from "@/lib/format";

/*
  Quantity and the two buy buttons. Day 5 turns these links into server
  actions that add to the cart and start a Buy Now checkout.
*/
export default function PurchaseBox({
  stock,
  price,
  name,
}: {
  stock: number;
  price: number;
  name: string;
}) {
  const [qty, setQty] = useState(1);
  const soldOut = stock <= 0;
  const max = Math.min(stock, 10);

  if (soldOut) {
    return (
      <div className="rounded-xl bg-canvas p-4 text-sm text-ink-2">
        <p className="font-semibold text-ink">Sold out</p>
        <p className="mt-1">This product is out of stock. Add it to your wishlist to see it again later.</p>
      </div>
    );
  }

  const stepper = (
    <div className="flex h-12 items-center rounded-full bg-canvas ring-1 ring-line">
      <button
        type="button"
        aria-label={`Decrease quantity of ${name}`}
        disabled={qty <= 1}
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        className="grid size-12 place-items-center rounded-full text-ink hover:bg-white disabled:text-ink-3/50 disabled:hover:bg-transparent"
      >
        <Minus className="size-4" />
      </button>
      <output aria-live="polite" aria-label="Quantity" className="w-8 text-center font-display text-lg font-bold tabular">
        {qty}
      </output>
      <button
        type="button"
        aria-label={`Increase quantity of ${name}`}
        disabled={qty >= max}
        onClick={() => setQty((q) => Math.min(max, q + 1))}
        className="grid size-12 place-items-center rounded-full text-ink hover:bg-white disabled:text-ink-3/50 disabled:hover:bg-transparent"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-ink-2">Quantity</span>
          {stepper}
          {qty > 1 && <span className="text-sm text-ink-3 tabular">{taka(price * qty)} total</span>}
        </div>
        <div className="hidden gap-3 md:flex">
          <Link
            href="/cart"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-paan-50 font-semibold text-paan-800 ring-1 ring-paan-200 hover:bg-paan-100"
          >
            <ShoppingCart className="size-5" />
            Add to cart
          </Link>
          <Link
            href="/checkout"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-paan-600 font-semibold text-white hover:bg-paan-700"
          >
            Buy now
          </Link>
        </div>
      </div>

      {/* Mobile: the buy buttons live in a bar pinned to the bottom of the screen */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-bar md:hidden">
        <Link
          href="/cart"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-paan-50 text-[15px] font-semibold text-paan-800 ring-1 ring-paan-200"
        >
          <ShoppingCart className="size-5" />
          Add to cart
        </Link>
        <Link
          href="/checkout"
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-paan-600 text-[15px] font-semibold text-white"
        >
          Buy now
        </Link>
      </div>
    </>
  );
}
