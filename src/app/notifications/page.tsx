import type { Metadata } from "next";
import { Bell } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <ComingSoon
      icon={Bell}
      title="Notifications"
      body="Order updates from placed to delivered, plus coupons and offers picked for you."
      day={17}
    />
  );
}
