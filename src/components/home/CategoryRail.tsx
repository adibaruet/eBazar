import Link from "next/link";
import type { CategoryNode } from "@/lib/catalog";
import { DepartmentBadge } from "@/components/ui/DepartmentIcon";

/** Round department shortcuts. Subcategories sit next to their parent. */
export default function CategoryRail({ tree }: { tree: CategoryNode[] }) {
  const items = tree.flatMap((c) => [
    { slug: c.slug, parent: null as string | null, name: c.name },
    ...c.children.map((s) => ({ slug: s.slug, parent: c.slug, name: s.name })),
  ]);

  return (
    <nav aria-label="Shop by category">
      <ul className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 lg:-mx-6 lg:justify-between lg:px-6">
        {items.map((c) => (
          <li key={c.slug} className="shrink-0">
            <Link
              href={`/c/${c.slug}`}
              className="flex w-[78px] flex-col items-center gap-2 rounded-xl p-1.5 text-center hover:bg-white md:w-24"
            >
              <DepartmentBadge
                slug={c.slug}
                parentSlug={c.parent}
                className="size-14 md:size-16"
                iconClassName="size-6 md:size-7"
              />
              <span className="line-clamp-2 text-[12px] font-medium leading-tight text-ink-2 md:text-[13px]">
                {c.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
