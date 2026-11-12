"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { sortOptions, type SortKey } from "@/lib/listing";

export default function SortSelect({ value }: { value: SortKey }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <label className="relative flex items-center">
      <span className="sr-only">Sort by</span>
      <select
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          if (e.target.value === "popular") next.delete("sort");
          else next.set("sort", e.target.value);
          const qs = next.toString();
          router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        }}
        className="h-10 appearance-none rounded-full bg-white py-0 pl-4 pr-9 text-sm font-medium text-ink ring-1 ring-line hover:ring-line-strong"
      >
        {sortOptions.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-ink-3" />
    </label>
  );
}
