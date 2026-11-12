# E-Bazar

An online marketplace for Bangladesh, built to feel like a real shopping app:
customers browse, search, buy and track orders, while sellers and admins work
behind that experience.

```
Browse > Search > Product > Add to cart > Coupon > Checkout > Payment > Tracking > Delivery > Review
```

The project is built in 19 days. See [ROADMAP.md](./ROADMAP.md) for the full
plan and what each day delivers.

## Progress

| Day | Section | Status |
|----:|---------|--------|
| 1 | UI and layout | done |
| 2 | Authentication and account | next |
| 3 to 19 | Catalog data, cart, wishlist, coupons, checkout, orders, payment, tracking, reviews, seller panel, admin panel, notifications, Postman tests, deployment | planned |

### What works today (Day 1)

- Home page: offer banners, category shortcuts, Flash Sale with a live
  countdown, products under ৳1,000, and a "Just for you" grid
- Categories page, category and subcategory listings
- Search by product name, description or category
- Sorting (popular, price, biggest discount, newest) and price filters on
  every listing, with a bottom-sheet filter panel on phones
- Product page with price, discount, stock, quantity and related products
- Deals and Flash Sale pages
- Account menu, help centre and a designed 404 page
- Phone layout with a bottom tab bar, like a shopping app
- Screens that are not built yet (cart, login, orders and so on) show which
  roadmap day they arrive on, so no link in the app is broken

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components)
- [React 19](https://react.dev) and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Prisma 6](https://www.prisma.io) with PostgreSQL, using the `pg` driver
  adapter (no native engine binary)
- Fonts from npm: Onest, Gabarito, and Hind Siliguri for the ৳ sign
- Icons from [Lucide](https://lucide.dev)
- Hosted on [Vercel](https://vercel.com) with Prisma Postgres

## Run it on your computer

You need Node.js 20 or newer and PostgreSQL running locally with a database
called `ebazar`.

```bash
npm install                 # installs packages and runs `prisma generate`
cp .env.example .env        # then set DATABASE_URL for your machine
npx prisma migrate dev      # creates the tables
npx prisma db seed          # loads demo users, categories, products, coupons
npm run dev
```

Open http://localhost:3000.

`.env` holds your database address and is never committed. Its format is:

```
DATABASE_URL="postgresql://USER@localhost:5432/ebazar?schema=public"
```

### Demo accounts

Logging in arrives on Day 2. The seed already creates these accounts:

| Role | Email | Password |
|------|-------|----------|
| Customer | `customer@ebazar.test` | `Customer@123` |
| Admin | `admin@ebazar.test` | `Admin@123` |

### Demo coupons

Applying coupons in the cart arrives on Day 7. The seed creates three, one for
each case the coupon rules need to handle:

| Code | Discount | Minimum order | Notes |
|------|----------|---------------|-------|
| `WELCOME10` | 10% | ৳500 | Valid for 90 days from seeding |
| `SAVE200` | ৳200 off | ৳2,000 | Can be used 100 times in total |
| `EXPIRED5` | 5% | none | Already expired, for testing the error message |

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. In the project, open **Storage** and create a **Prisma Postgres** database,
   then connect it to the project for Production and Preview. This adds
   `DATABASE_URL` to the project's environment variables.
3. Push to `main`. Every push deploys automatically.

On Vercel the `vercel-build` script runs instead of `build`:

```
prisma migrate deploy && prisma db seed && next build
```

It creates or updates the tables, loads the demo data, then builds the site.
The seed updates existing rows rather than adding copies, so it is safe to run
on every deploy. The seed step will be removed once sellers start adding real
products.

The build reads the catalogue from the database to prerender the shop, so the
database must be reachable whenever `next build` runs, locally or on Vercel.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the app at http://localhost:3000 |
| `npm run build` | Production build (database must be running) |
| `npm run start` | Serve the production build |
| `npm run lint` | Check the code with ESLint |
| `npx prisma studio` | Browse and edit the database in your browser |
| `npx prisma db seed` | Reload the demo data |

## Project structure

```
prisma/
  schema.prisma          database tables
  migrations/            SQL history of the tables
  seed.ts                demo data
src/app/                 pages (each folder is a URL)
  page.tsx               home
  c/[slug]/              category and subcategory listings
  p/[slug]/              product page
  search/  products/  deals/  flash-sale/  categories/
  account/  help/        account menu, help centre
  cart/  login/  ...     "coming on Day N" screens
src/components/
  layout/                header, search bar, category menu, tab bar, footer
  home/                  banners, Flash Sale, countdown, coupon card
  listing/               listing page, sort, price filter, filter sheet
  product/               product card, price, discount tag, product art
  ui/                    shared pieces
src/lib/
  catalog.ts             cached product and category queries
  content.ts             home banners and featured coupon
  listing.ts             sort and filter options
  format.ts              taka formatting, discount maths
  prisma.ts              database client
src/app/globals.css      design tokens: colours, fonts, corner radii
```

## Design notes

- Brand green `#0b6e4f`, turmeric yellow `#f6bf1c` only for Flash Sale and
  offers, red `#e0412f` only for discounts.
- Discounts always use the punched price-tag badge.
- Prices use South Asian digit grouping, for example ৳1,25,000.
- Products have no photos yet, so each one gets an illustrated tile. When a
  product has an `imageUrl`, the photo is shown instead.
