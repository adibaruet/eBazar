"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import type { CategoryNode } from "@/lib/catalog";
import { DepartmentIcon } from "@/components/ui/DepartmentIcon";

/** Desktop "All categories" menu: departments on the left, subcategories on the right. */
export default function CategoryMenu({ tree }: { tree: CategoryNode[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(tree[0]?.slug);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const current = tree.find((c) => c.slug === active) ?? tree[0];

  return (
    <div ref={ref} className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        className="flex h-10 items-center gap-2 rounded-full bg-paan-50 px-4 text-sm font-semibold text-paan-800 hover:bg-paan-100"
      >
        <LayoutGrid className="size-4" />
        All categories
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && current && (
        <div id={menuId} className="absolute left-0 top-full z-50 pt-2">
          <div className="flex w-[560px] overflow-hidden rounded-panel bg-white shadow-lift ring-1 ring-line">
            <ul className="w-56 shrink-0 border-r border-line bg-canvas/60 py-2">
              {tree.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/c/${c.slug}`}
                    onMouseEnter={() => setActive(c.slug)}
                    onFocus={() => setActive(c.slug)}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                      c.slug === current.slug
                        ? "bg-white font-semibold text-paan-700"
                        : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    <DepartmentIcon slug={c.slug} className="size-[18px]" />
                    <span className="flex-1">{c.name}</span>
                    <ChevronRight className="size-4 text-ink-3" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex-1 p-5">
              <Link
                href={`/c/${current.slug}`}
                onClick={() => setOpen(false)}
                className="font-display text-lg font-bold text-ink hover:text-paan-700"
              >
                {current.name}
              </Link>
              <p className="mt-0.5 text-sm text-ink-3">{current.productCount} products</p>
              {current.children.length > 0 ? (
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {current.children.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/c/${s.slug}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-ink-2 ring-1 ring-line hover:bg-paan-50 hover:text-paan-800 hover:ring-paan-200"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <Link
                  href={`/c/${current.slug}`}
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-block text-sm font-semibold text-paan-700 hover:underline"
                >
                  Browse all {current.name.toLowerCase()}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
