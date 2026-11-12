import { BookOpen, Flower2, Headphones, Shirt, Smartphone, Sofa, Sparkles, Tag, type LucideIcon } from "lucide-react";
import { paletteFor } from "@/components/product/ProductArt";

const icons: Record<string, LucideIcon> = {
  electronics: Headphones,
  "mobile-accessories": Smartphone,
  fashion: Shirt,
  men: Shirt,
  women: Flower2,
  "home-and-living": Sofa,
  beauty: Sparkles,
  books: BookOpen,
};

export function DepartmentIcon({ slug, className = "" }: { slug: string; className?: string }) {
  const Icon = icons[slug] ?? Tag;
  return <Icon aria-hidden className={className} strokeWidth={1.8} />;
}

/** Round tinted badge with the department icon, used on the home rail and categories page. */
export function DepartmentBadge({
  slug,
  parentSlug,
  className = "size-16",
  iconClassName = "size-7",
}: {
  slug: string;
  parentSlug?: string | null;
  className?: string;
  iconClassName?: string;
}) {
  const p = paletteFor(slug, parentSlug);
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full ${className}`}
      style={{ background: p.bg, color: p.fg, boxShadow: `inset 0 0 0 1px ${p.ring}` }}
    >
      <DepartmentIcon slug={slug} className={iconClassName} />
    </span>
  );
}
