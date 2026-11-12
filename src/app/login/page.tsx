import type { Metadata } from "next";
import { CircleUser } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <ComingSoon
      icon={CircleUser}
      title="Log in"
      body="Log in with your email and password to see your orders, wishlist and saved addresses."
      day={2}
    />
  );
}
