import { cacheLife, cacheTag } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { percentOff } from "@/lib/format";
import type { ListingFilters } from "@/lib/listing";

/*
  Read-only catalog queries for the storefront.

  Every function is cached with the "catalog" tag. When sellers and admins
  start editing products (Days 13 and 15), their server actions call
  revalidateTag("catalog") and the shop updates straight away.
*/

const cardSelect = {
  id: true,
  name: true,
  slug: true,
  price: true,
  discountPrice: true,
  stock: true,
  imageUrl: true,
  createdAt: true,
  category: {
    select: { name: true, slug: true, parent: { select: { slug: true } } },
  },
} satisfies Prisma.ProductSelect;

export type ProductCardData = Prisma.ProductGetPayload<{ select: typeof cardSelect }>;

export type { ListingFilters, SortKey } from "@/lib/listing";

const effectivePrice = (p: { price: number; discountPrice: number | null }) =>
  p.discountPrice ?? p.price;

// Sorting by "price after discount" is a COALESCE that Prisma can't order by,
// so for now it happens here. Day 3 moves price onto variants and sorts in SQL.
function applyFilters(products: ProductCardData[], { sort = "popular", min, max }: ListingFilters) {
  let list = products.filter((p) => {
    const price = effectivePrice(p);
    return (min === undefined || price >= min) && (max === undefined || price <= max);
  });

  list = [...list];
  switch (sort) {
    case "price-asc":
      list.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "price-desc":
      list.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "discount":
      list.sort(
        (a, b) => percentOff(b.price, b.discountPrice) - percentOff(a.price, a.discountPrice),
      );
      break;
    case "newest":
      list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime() || b.id - a.id);
      break;
    default:
      // "Popular" has no sales data yet; in-stock items first, then catalogue order.
      list.sort((a, b) => Number(b.stock > 0) - Number(a.stock > 0) || a.id - b.id);
  }
  return list;
}

export async function getCategoryTree() {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");

  const categories = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { id: "asc" },
    include: {
      _count: { select: { products: { where: { isActive: true } } } },
      children: {
        orderBy: { id: "asc" },
        include: { _count: { select: { products: { where: { isActive: true } } } } },
      },
    },
  });

  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    productCount: c._count.products + c.children.reduce((n, s) => n + s._count.products, 0),
    children: c.children.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      productCount: s._count.products,
    })),
  }));
}

export type CategoryNode = Awaited<ReturnType<typeof getCategoryTree>>[number];

export async function getCategoryPage(slug: string, filters: ListingFilters) {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      parent: true,
      children: { orderBy: { id: "asc" } },
    },
  });
  if (!category) return null;

  // A parent category shows its own products plus everything in its subcategories.
  const ids = [category.id, ...category.children.map((c) => c.id)];
  const products = await prisma.product.findMany({
    where: { isActive: true, categoryId: { in: ids } },
    select: cardSelect,
    orderBy: { id: "asc" },
  });

  // Siblings let a subcategory page offer its neighbours as chips.
  const siblings = category.parentId
    ? await prisma.category.findMany({
        where: { parentId: category.parentId },
        orderBy: { id: "asc" },
      })
    : [];

  return {
    category,
    siblings,
    total: products.length,
    priceRange: priceRange(products),
    products: applyFilters(products, filters),
  };
}

export async function searchProducts(query: string, filters: ListingFilters) {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const words = query.trim().split(/\s+/).filter(Boolean).slice(0, 6);
  if (words.length === 0) return { total: 0, priceRange: null, products: [] };

  // Every word must match the name, description or category name.
  // Day 3 replaces this with Postgres full-text search and ranking.
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      AND: words.map((w) => ({
        OR: [
          { name: { contains: w, mode: "insensitive" as const } },
          { description: { contains: w, mode: "insensitive" as const } },
          { category: { name: { contains: w, mode: "insensitive" as const } } },
        ],
      })),
    },
    select: cardSelect,
    orderBy: { id: "asc" },
  });

  return {
    total: products.length,
    priceRange: priceRange(products),
    products: applyFilters(products, filters),
  };
}

/** Discounted products, biggest discount first. Backs Flash Sale and Deals. */
export async function getDiscounted(filters: ListingFilters = { sort: "discount" }) {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const products = await prisma.product.findMany({
    where: { isActive: true, discountPrice: { not: null }, stock: { gt: 0 } },
    select: cardSelect,
  });
  return applyFilters(
    products.filter((p) => percentOff(p.price, p.discountPrice) > 0),
    filters,
  );
}

export async function getUnderPrice(limit: number) {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      stock: { gt: 0 },
      OR: [{ discountPrice: { lte: limit } }, { discountPrice: null, price: { lte: limit } }],
    },
    select: cardSelect,
  });
  return applyFilters(products, { sort: "price-asc" });
}

export async function getAllProducts() {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: cardSelect,
    orderBy: { id: "desc" },
  });
  return products;
}

export async function getProduct(slug: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: { include: { parent: true } } },
  });
  if (!product || !product.isActive) return null;

  // Related: same category first, then the rest of the parent category.
  const familyIds = product.category.parentId
    ? (
        await prisma.category.findMany({
          where: {
            OR: [{ id: product.category.parentId }, { parentId: product.category.parentId }],
          },
          select: { id: true },
        })
      ).map((c) => c.id)
    : [product.categoryId];

  const related = await prisma.product.findMany({
    where: { isActive: true, id: { not: product.id }, categoryId: { in: familyIds } },
    select: cardSelect,
    take: 12,
  });
  related.sort(
    (a, b) =>
      Number(b.category.slug === product.category.slug) -
        Number(a.category.slug === product.category.slug) || a.id - b.id,
  );

  return { product, related };
}

function priceRange(products: ProductCardData[]) {
  if (products.length === 0) return null;
  const prices = products.map(effectivePrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Every active product with listing filters applied. Backs /products. */
export async function listProducts(filters: ListingFilters) {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: cardSelect,
    orderBy: { id: "asc" },
  });
  return {
    total: products.length,
    priceRange: priceRange(products),
    products: applyFilters(products, filters),
  };
}

/** Discounted products with listing filters applied. Backs /deals and /flash-sale. */
export async function listDiscounted(filters: ListingFilters) {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const all = await getDiscounted({ sort: "discount" });
  return {
    total: all.length,
    priceRange: priceRange(all),
    products: applyFilters(all, { ...filters, sort: filters.sort === "popular" ? "discount" : filters.sort }),
  };
}
