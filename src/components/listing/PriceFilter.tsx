import Link from "next/link";
import { taka } from "@/lib/format";
import type { ListingFilters } from "@/lib/listing";

/*
  Plain GET form: works without JavaScript and keeps the URL shareable.
  `keep` carries other params (q, sort) through the submit.
*/
export default function PriceFilter({
  basePath,
  filters,
  keep,
  range,
}: {
  basePath: string;
  filters: ListingFilters;
  keep: Record<string, string>;
  range: { min: number; max: number } | null;
}) {
  const presets: [string, number | undefined, number | undefined][] = [
    [`Under ${taka(500)}`, undefined, 500],
    [`${taka(500)} to ${taka(1000)}`, 500, 1000],
    [`${taka(1000)} to ${taka(2000)}`, 1000, 2000],
    [`Over ${taka(2000)}`, 2000, undefined],
  ];

  const hrefFor = (min?: number, max?: number) => {
    const p = new URLSearchParams(keep);
    if (min !== undefined) p.set("min", String(min));
    if (max !== undefined) p.set("max", String(max));
    const qs = p.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const active = filters.min !== undefined || filters.max !== undefined;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-ink">Price</h3>
        {active && (
          <Link href={hrefFor()} className="text-xs font-semibold text-paan-700 hover:underline">
            Clear
          </Link>
        )}
      </div>

      <ul className="mt-3 flex flex-wrap gap-2">
        {presets.map(([label, min, max]) => {
          const on = filters.min === min && filters.max === max;
          return (
            <li key={label}>
              <Link
                href={hrefFor(min, max)}
                aria-current={on ? "true" : undefined}
                className={`block rounded-full px-3 py-1.5 text-[13px] ring-1 ${
                  on
                    ? "bg-paan-600 text-white ring-paan-600"
                    : "bg-white text-ink-2 ring-line hover:ring-line-strong"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <form action={basePath} className="mt-4">
        {range && (
          <p className="mb-2 text-xs text-ink-3">
            Prices here run from {taka(range.min)} to {taka(range.max)}
          </p>
        )}
        {Object.entries(keep).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        <div className="flex items-center gap-2">
          <label className="flex-1">
            <span className="sr-only">Minimum price</span>
            <input
              name="min"
              type="number"
              inputMode="numeric"
              min={0}
              defaultValue={filters.min}
              placeholder="Min"
              className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-line focus:outline-none focus:ring-2 focus:ring-paan-500"
            />
          </label>
          <span className="text-ink-3">to</span>
          <label className="flex-1">
            <span className="sr-only">Maximum price</span>
            <input
              name="max"
              type="number"
              inputMode="numeric"
              min={0}
              defaultValue={filters.max}
              placeholder="Max"
              className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-line focus:outline-none focus:ring-2 focus:ring-paan-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-3 h-10 w-full rounded-full bg-paan-600 text-sm font-semibold text-white hover:bg-paan-700"
        >
          Apply price
        </button>
      </form>
    </div>
  );
}
