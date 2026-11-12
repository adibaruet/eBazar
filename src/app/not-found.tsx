import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { SearchForm } from "@/components/layout/SearchBar";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-12 text-center md:pt-20">
      <PackageSearch aria-hidden className="mx-auto size-14 text-ink-3" strokeWidth={1.3} />
      <h1 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-ink">
        This page isn’t on our shelves
      </h1>
      <p className="mt-2 text-[15px] text-ink-2">
        The link may be old, or the product may have been removed. Search for it instead.
      </p>
      <SearchForm className="mx-auto mt-6 max-w-md" />
      <Link href="/" className="mt-5 inline-block text-sm font-semibold text-paan-700 hover:underline">
        Back to the home page
      </Link>
    </div>
  );
}
