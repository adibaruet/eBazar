import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@fontsource-variable/onest";
import "@fontsource-variable/gabarito";
import "@fontsource/hind-siliguri/bengali-500.css";
import "@fontsource/hind-siliguri/bengali-700.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav, { BottomNavFallback } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: { default: "E-Bazar: shop online in Bangladesh", template: "%s | E-Bazar" },
  description:
    "Electronics, fashion, home and beauty from shops across Bangladesh. Cash on Delivery and online payment.",
};

export const viewport: Viewport = {
  themeColor: "#0b6e4f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-paan-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <Suspense fallback={<BottomNavFallback />}>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  );
}
