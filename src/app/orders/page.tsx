import type { Metadata } from "next";
import { Package } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "My orders" };

export default function OrdersPage() {
  return (
    <ComingSoon
      icon={Package}
      title="My orders"
      body="Every order you place, with its status, invoice, and options to track, cancel or reorder."
      day={8}
    />
  );
}
