import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = { title: "Help centre" };

const faqs = [
  {
    q: "How do I place an order?",
    a: "Find a product, choose a size or colour if it has one, and tap Add to cart or Buy now. At checkout pick your address, delivery option and how you want to pay, then tap Place order.",
  },
  {
    q: "How does Cash on Delivery work?",
    a: "You pay the delivery person in cash when the parcel reaches you. There is nothing to pay when you place the order.",
  },
  {
    q: "Can I cancel an order?",
    a: "Yes, from My orders, as long as the order has not been shipped. You can cancel the whole order or a single item and tell us why. If you paid online, the refund status shows on the order.",
  },
  {
    q: "How much is delivery?",
    a: "The delivery charge depends on where you are and the delivery option you choose. You see the exact amount at checkout, before you place the order.",
  },
  {
    q: "How do I use a coupon?",
    a: "Type the code into the coupon box in your cart or at checkout and tap Apply. The discount shows in your order summary. Some coupons need a minimum order amount or expire on a set date.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-4 md:pt-8">
      <h1 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-ink md:text-4xl">
        Help centre
      </h1>
      <p className="mt-1 text-[15px] text-ink-2">Answers to the questions shoppers ask most.</p>
      <div className="mt-6 divide-y divide-line overflow-hidden rounded-panel bg-white ring-1 ring-line">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 text-[15px] font-semibold text-ink hover:bg-canvas/60 [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{f.q}</span>
              <ChevronDown className="size-5 text-ink-3 transition-transform group-open:rotate-180" />
            </summary>
            <p className="max-w-prose px-5 pb-5 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
