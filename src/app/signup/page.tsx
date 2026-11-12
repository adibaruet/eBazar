import type { Metadata } from "next";
import { CircleUser } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <ComingSoon
      icon={CircleUser}
      title="Create your account"
      body="Sign up with your name, email and phone number to start ordering."
      day={2}
    />
  );
}
