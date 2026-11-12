import type { Metadata } from "next";
import { Heart } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <ComingSoon
      icon={Heart}
      title="Your wishlist"
      body="Tap the heart on any product to save it here, then move it to your cart when you are ready."
      day={6}
    />
  );
}
