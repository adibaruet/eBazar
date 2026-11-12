import type { Metadata } from "next";
import { Store } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Seller dashboard" };

export default function SellerPage() {
  return (
    <ComingSoon
      icon={Store}
      title="Seller dashboard"
      body="Products, stock, orders, shipping updates, earnings and reviews for your shop."
      day={13}
    />
  );
}
