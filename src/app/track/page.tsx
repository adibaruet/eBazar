import type { Metadata } from "next";
import { Truck } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Track your order" };

const steps = ["Order placed", "Order confirmed", "Packed", "Shipped", "Out for delivery", "Delivered"];

export default function TrackPage() {
  return (
    <ComingSoon
      icon={Truck}
      title="Track your order"
      body="Follow your parcel through every step, from the moment you order to the moment it arrives."
      day={11}
    >
      <ol aria-label="Delivery steps" className="mx-auto mt-6 max-w-xs text-left">
        {steps.map((s, i) => (
          <li key={s} className="relative flex items-center gap-3 pb-4 last:pb-0">
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute left-[9px] top-5 h-full w-0.5 bg-line" />
            )}
            <span aria-hidden className="relative size-5 rounded-full border-2 border-line-strong bg-white" />
            <span className="text-sm text-ink-2">{s}</span>
          </li>
        ))}
      </ol>
    </ComingSoon>
  );
}
