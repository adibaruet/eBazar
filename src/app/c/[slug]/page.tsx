import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryPage, getCategoryTree } from "@/lib/catalog";
import { parseFilters } from "@/lib/listing";
import ListingView, { ListingSkeleton } from "@/components/listing/ListingView";

export async function generateMetadata({ params }: PageProps<"/c/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tree = await getCategoryTree();
  const all = tree.flatMap((c) => [c, ...c.children]);
  const found = all.find((c) => c.slug === slug);
  return { title: found ? found.name : "Category not found" };
}

async function CategoryListing({ params, searchParams }: PageProps<"/c/[slug]">) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const filters = parseFilters(sp);
  const data = await getCategoryPage(slug, filters);
  if (!data) notFound();

  const { category, siblings } = data;
  const isSub = Boolean(category.parent);
  const base = `/c/${category.slug}`;

  // On a department page the chips are its subcategories; on a subcategory
  // page they are its siblings, with "All <parent>" first.
  const chips = isSub
    ? [
        { label: `All ${category.parent!.name}`, href: `/c/${category.parent!.slug}` },
        ...siblings.map((s) => ({ label: s.name, href: `/c/${s.slug}`, active: s.id === category.id })),
      ]
    : category.children.length
      ? [
          { label: "All", href: base, active: true },
          ...category.children.map((s) => ({ label: s.name, href: `/c/${s.slug}` })),
        ]
      : [];

  return (
    <ListingView
      title={category.name}
      crumbs={[
        { label: "Home", href: "/" },
        ...(isSub ? [{ label: category.parent!.name, href: `/c/${category.parent!.slug}` }] : []),
        { label: category.name },
      ]}
      chips={chips}
      basePath={base}
      filters={filters}
      total={data.total}
      priceRange={data.priceRange}
      products={data.products}
    />
  );
}

export default function CategoryPage(props: PageProps<"/c/[slug]">) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CategoryListing {...props} />
    </Suspense>
  );
}
