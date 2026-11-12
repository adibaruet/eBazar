import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

async function ProductGrid() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { id: "asc" },
  });

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {products.map((p) => (
        <div key={p.id} className="rounded-lg border bg-white p-3 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.imageUrl ?? ""}
            alt={p.name}
            className="mb-2 aspect-square w-full rounded object-cover"
          />
          <h3 className="text-sm font-medium text-gray-900">{p.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-semibold text-green-700">
              ৳{(p.discountPrice ?? p.price).toLocaleString("en-US")}
            </span>
            {p.discountPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{p.price.toLocaleString("en-US")}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold text-green-800">E-Bazar</h1>
      <h2 className="mb-3 text-lg font-semibold text-gray-800">All Products</h2>
      <Suspense fallback={<p className="text-gray-500">Loading products...</p>}>
        <ProductGrid />
      </Suspense>
    </main>
  );
}