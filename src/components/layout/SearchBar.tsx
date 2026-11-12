"use client";

import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

/*
  A plain GET form, so search works before JavaScript loads.
  Day 3 adds live suggestions under the input.
*/
export function SearchForm({ defaultValue = "", className = "" }: { defaultValue?: string; className?: string }) {
  return (
    <form action="/search" role="search" className={`relative ${className}`}>
      <label htmlFor="site-search" className="sr-only">
        Search E-Bazar
      </label>
      <input
        id="site-search"
        key={defaultValue}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search panjabi, earbuds, kettles..."
        autoComplete="off"
        enterKeyHint="search"
        className="h-11 w-full rounded-full border-2 border-paan-600 bg-white pl-4 pr-14 text-[15px] text-ink outline-none placeholder:text-ink-3 focus-visible:outline-none focus:border-paan-700 focus:ring-4 focus:ring-paan-100"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1 top-1 grid h-9 w-11 place-items-center rounded-full bg-paan-600 text-white hover:bg-paan-700"
      >
        <Search className="size-[18px]" strokeWidth={2.4} />
      </button>
    </form>
  );
}

/** Keeps the current query in the box on /search. Must sit inside <Suspense>. */
export default function SearchBar({ className = "" }: { className?: string }) {
  const params = useSearchParams();
  return <SearchForm defaultValue={params.get("q") ?? ""} className={className} />;
}
