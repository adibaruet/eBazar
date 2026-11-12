import type { Metadata } from "next";
import { ShoppingCart } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <ComingSoon
      icon={ShoppingCart}
      title="Your cart"
      body="Items you add will show here, grouped by shop, with quantities, coupons and your total."
      day={5}
    />
  );
}
