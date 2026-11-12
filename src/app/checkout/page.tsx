import type { Metadata } from "next";
import { Wallet } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <ComingSoon
      icon={Wallet}
      title="Checkout"
      body="Choose an address and delivery option, pay by Cash on Delivery or online, and place your order."
      day={8}
    />
  );
}
