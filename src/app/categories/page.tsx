import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { getCategoryTree } from "@/lib/catalog";
import { DepartmentBadge } from "@/components/ui/DepartmentIcon";

export const metadata: Metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const tree = await getCategoryTree();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-6 lg:pt-6">
      <h1 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-ink md:text-4xl">
        Categories
      </h1>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tree.map((c) => (
          <li key={c.id} className="rounded-panel bg-white p-4 ring-1 ring-line">
            <Link href={`/c/${c.slug}`} className="group flex items-center gap-4">
              <DepartmentBadge slug={c.slug} className="size-14" iconClassName="size-6" />
              <div className="flex-1">
                <h2 className="font-display text-lg font-bold text-ink group-hover:text-paan-700">
                  {c.name}
                </h2>
                <p className="text-sm text-ink-3">{c.productCount} products</p>
              </div>
              <ChevronRight className="size-5 text-ink-3" />
            </Link>
            {c.children.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                {c.children.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/c/${s.slug}`}
                      className="block rounded-full bg-canvas px-3.5 py-1.5 text-sm text-ink-2 hover:bg-paan-50 hover:text-paan-800"
                    >
                      {s.name}
                      <span className="ml-1.5 text-ink-3">{s.productCount}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
