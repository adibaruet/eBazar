# E-Bazar

A Bangladeshi online marketplace built with Next.js 16 (App Router, Cache
Components), Prisma and PostgreSQL. See [ROADMAP.md](./ROADMAP.md) for the
19-day build plan and what each day delivers.

## Run it locally

You need Node 20+ and a local PostgreSQL database called `ebazar`.

```bash
npm install                 # also runs `prisma generate`
cp .env.example .env        # then set DATABASE_URL for your machine
npx prisma migrate dev      # creates the tables
npx prisma db seed          # demo users, categories, 20 products, 3 coupons
npm run dev
```

Open http://localhost:3000.

Demo logins (used from Day 2): `customer@ebazar.test` / `Customer@123` and
`admin@ebazar.test` / `Admin@123`.

> `npm run build` reads the catalogue from the database to prerender the
> shop, so the database must be running when you build.

## Where things live

```
src/app/                 routes: /, /categories, /c/[slug], /search, /products,
                         /deals, /flash-sale, /p/[slug], /account, /help
                         and "coming on Day N" screens for the rest
src/components/layout/   header, search, category menu, mobile tab bar, footer
src/components/home/     banner carousel, flash sale, countdown, coupon card
src/components/listing/  listing page, price filter, sort, mobile filter sheet
src/components/product/  product card, price, discount tag, product art
src/lib/catalog.ts       cached catalogue queries (tag: "catalog")
src/lib/content.ts       home banners and featured coupon (moves to DB on Day 16)
src/app/globals.css      design tokens (colours, fonts, radii)
```

## Notes

- Prisma uses the Rust-free client (`engineType = "client"` +
  `@prisma/adapter-pg`): queries go through the `pg` driver, with no native
  engine binary to download or deploy.
- Fonts are installed from npm (`@fontsource`), so builds work offline.
- Products have no photos yet; each one gets an illustrated tile until image
  uploads arrive. If `imageUrl` is set, the photo is shown instead.
