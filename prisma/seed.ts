import { PrismaClient, DiscountType, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// [name, category slug, price, discountPrice, stock]
const products: [string, string, number, number | null, number][] = [
  ["Wireless Earbuds", "electronics", 1850, 1499, 40],
  ["Bluetooth Speaker", "electronics", 2400, null, 25],
  ["Smart Watch", "electronics", 3200, 2799, 30],
  ["Power Bank 10000mAh", "electronics", 1450, null, 60],
  ["Phone Case", "mobile-accessories", 350, null, 100],
  ["Fast Charger 20W", "mobile-accessories", 890, 750, 80],
  ["USB-C Cable", "mobile-accessories", 250, null, 150],
  ["Cotton Panjabi", "men", 1650, 1390, 35],
  ["Polo T-Shirt", "men", 650, null, 70],
  ["Denim Jeans", "men", 1800, 1500, 45],
  ["Cotton Saree", "women", 2200, 1850, 30],
  ["Salwar Kameez Set", "women", 2800, null, 25],
  ["Silk Scarf", "women", 550, 450, 60],
  ["Electric Kettle", "home-and-living", 1350, 1100, 40],
  ["Bed Sheet Set", "home-and-living", 1900, null, 35],
  ["LED Table Lamp", "home-and-living", 780, null, 50],
  ["Face Wash", "beauty", 320, null, 90],
  ["Sunscreen SPF50", "beauty", 650, 550, 70],
  ["Programming Fundamentals Book", "books", 480, null, 40],
  ["Notebook Set (3 pcs)", "books", 220, null, 120],
];

async function main() {
  // Users (dev passwords only)
  await prisma.user.upsert({
    where: { email: "admin@ebazar.test" },
    update: {},
    create: {
      name: "E-Bazar Admin",
      email: "admin@ebazar.test",
      passwordHash: await bcrypt.hash("Admin@123", 10),
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@ebazar.test" },
    update: {},
    create: {
      name: "Test Customer",
      email: "customer@ebazar.test",
      passwordHash: await bcrypt.hash("Customer@123", 10),
      phone: "01700000000",
      role: Role.CUSTOMER,
      addresses: {
        create: {
          fullName: "Test Customer",
          phone: "01700000000",
          line1: "House 12, Road 5, Dhanmondi",
          city: "Dhaka",
          district: "Dhaka",
          postalCode: "1205",
          isDefault: true,
        },
      },
    },
  });

  // Categories
  const topLevel = ["Electronics", "Fashion", "Home & Living", "Beauty", "Books"];
  for (const name of topLevel) {
    const slug = slugify(name);
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
  }

  const subs: [string, string][] = [
    ["Mobile Accessories", "electronics"],
    ["Men", "fashion"],
    ["Women", "fashion"],
  ];
  for (const [name, parentSlug] of subs) {
    const parent = await prisma.category.findUniqueOrThrow({
      where: { slug: parentSlug },
    });
    const slug = slugify(name);
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug, parentId: parent.id },
    });
  }

  // Products
  for (const [name, categorySlug, price, discountPrice, stock] of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: categorySlug },
    });
    const slug = slugify(name);
    const data = {
      name,
      slug,
      description: `${name} - sample product for E-Bazar development.`,
      price,
      discountPrice,
      stock,
      // Real photos arrive with seller uploads (Day 3). Until then the UI draws
      // an illustrated tile per product, which looks better than random stock.
      imageUrl: null,
      categoryId: category.id,
    };
    await prisma.product.upsert({
      where: { slug },
      update: data,
      create: data,
    });
  }

  // Coupons
  const day = 24 * 60 * 60 * 1000;
  const coupons = [
    {
      code: "WELCOME10",
      type: DiscountType.PERCENTAGE,
      value: 10,
      minOrder: 500,
      expiresAt: new Date(Date.now() + 90 * day),
      usageLimit: null,
    },
    {
      code: "SAVE200",
      type: DiscountType.FIXED,
      value: 200,
      minOrder: 2000,
      expiresAt: new Date(Date.now() + 90 * day),
      usageLimit: 100,
    },
    {
      code: "EXPIRED5",
      type: DiscountType.PERCENTAGE,
      value: 5,
      minOrder: 0,
      expiresAt: new Date(Date.now() - 7 * day),
      usageLimit: null,
    },
  ];
  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());