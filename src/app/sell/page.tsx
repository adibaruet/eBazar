import type { Metadata } from "next";
import { Store } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Sell on E-Bazar" };

export default function SellPage() {
  return (
    <ComingSoon
      icon={Store}
      title="Sell on E-Bazar"
      body="Open your shop, list products with sizes and colours, and manage orders and earnings from one dashboard."
      day={13}
    />
  );
}
