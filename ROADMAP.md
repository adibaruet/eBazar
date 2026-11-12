# E-Bazar roadmap

The goal is a marketplace that feels like a real shopping app, with the seller
and admin systems working behind it. The customer journey we are building is:

```
Browse > Search > Product > Add to cart > Coupon > Checkout > Payment > Tracking > Delivery > Review
```

Work is split into 19 days. Each day ends with something you can click through
in the browser, and each day that adds backend logic also adds the matching
`/api/v1/...` route handlers so Postman testing on Day 18 has real endpoints.

Status: `done`, `next`, or blank.

| Day | Section | Status |
|----:|---------|--------|
| 1 | UI and layout | done |
| 2 | Authentication and account | next |
| 3 | Catalog data model: stores, variations, images, banners, flash sale | |
| 4 | Product details | |
| 5 | Cart, Buy Now, save for later | |
| 6 | Wishlist and saved addresses | |
| 7 | Coupons | |
| 8 | Checkout and orders | |
| 9 | Cancel, refund, reorder, invoice | |
| 10 | Online payment | |
| 11 | Tracking and delivery charges | |
| 12 | Reviews | |
| 13 | Seller panel, part 1: store and products | |
| 14 | Seller panel, part 2: orders and earnings | |
| 15 | Admin panel, part 1: people, products, categories | |
| 16 | Admin panel, part 2: orders, money, content, reports | |
| 17 | Notifications | |
| 18 | Postman testing | |
| 19 | Deployment | |

---

## Day 1: UI and layout (done)

The new look, the app shell, and every browsing screen, reading real data from
the existing database.

- Design system: Onest for text, Gabarito for headings and prices, Hind Siliguri
  for the ৳ sign. Colours in `src/app/globals.css` as Tailwind v4 theme tokens.
- App shell: top bar, sticky header with search, category menu, mobile bottom
  tab bar (Home, Categories, Wishlist, Cart, Account), footer.
- Home: banner carousel, category rail, Flash Sale with a live countdown,
  biggest discounts, shop by category, Just for you grid, trust strip.
- Categories page, category and subcategory listing with sort and price filter.
- Search results page (searches name and description).
- Product page layout: image, price and discount, stock, quantity, related
  products, delivery and returns panel.
- Loading skeletons, 404 page, and a "coming on Day N" screen for every link
  in the shell that is not built yet, so nothing in the navigation is broken.
- Prisma switched to the Rust-free client (`engineType = "client"` with
  `@prisma/adapter-pg`). No native engine binary, which also makes Vercel
  deploys simpler.

## Day 2: Authentication and account

- Sign up, login, logout (server actions + `/api/v1/auth/*`).
- Sessions in an httpOnly cookie, stored in a `Session` table so logout and
  "log out everywhere" really revoke them.
- Forgot password: one-time reset token with expiry; in development the reset
  link is printed to the terminal instead of emailed.
- `src/proxy.ts` guards `/account`, `/seller`, `/admin` by role.
- Profile, edit profile, change password (asks for the current one).
- Header and Account tab switch between guest and signed-in states.

## Day 3: Catalog data model

The current schema stores one price and one image per product, and has no
sellers. Today fixes that before the shopping features are built on top.

- New tables: `Store` (seller shop), `ProductImage`, `ProductVariant`
  (size, colour, own SKU, price and stock), `Banner`, `FlashSale` +
  `FlashSaleItem`, `Brand`.
- Price and stock move to the variant. A product with no options has one
  default variant, so cart and orders always point at a variant.
- Richer seed: about 60 products across 4 stores, with variants and images.
- Listing filters: price range, brand, store, rating, in stock; sorting;
  pagination.
- Search with Postgres full-text search and search suggestions in the header.
- Discounted products page and the Flash Sale backed by real tables.

## Day 4: Product details

- Image gallery with thumbnails, swipe on mobile, zoom on desktop.
- Variation picker (size and colour chips); price, stock and image change with
  the chosen variant; sold-out options are shown but disabled.
- Rating summary block (real reviews arrive on Day 12).
- Related products, recommended products, recently viewed (cookie for guests,
  table for signed-in users).
- Store/seller page: banner, rating, product grid, follow button placeholder.

## Day 5: Cart, Buy Now, save for later

- Add to cart, update quantity, remove; stock is checked on every change.
- Guest cart in a cookie, merged into the user's cart on login.
- Buy Now skips the cart and goes straight to checkout with one item.
- Save for later moves an item out of the cart into a saved list and back.
- Cart grouped by store, the way marketplace carts are.

## Day 6: Wishlist and saved addresses

- Heart button on cards and product page; wishlist page; move to cart.
- Saved addresses: add, edit, delete, set default; division, district and area
  pickers for Bangladesh.

## Day 7: Coupons

One coupon service used by the cart, checkout and the API:

- Coupon code, apply, remove.
- Minimum order, percentage discount (with optional max cap), fixed discount.
- Expiry, total usage limit, per-user limit, inactive coupons.
- Clear messages: "This code has expired", "Add ৳500 more to use SAVE200".
- Price breakdown component used everywhere:

```
Subtotal       ৳2,500
Delivery          ৳60
Coupon          -৳250
----------------------
Total          ৳2,310
```

## Day 8: Checkout and orders

- Checkout: select address or add a new one, delivery option, Cash on
  Delivery or online payment, coupon, order summary, Place Order.
- Place Order runs in one database transaction: re-check stock, decrement it,
  count the coupon use, copy prices into the order (a price snapshot).
- Orders are split into one package per store so each seller ships their own
  items, while the customer still sees one order.
- Order number like `EB-260512-4821`, confirmation screen, order history,
  order details.

## Day 9: Cancel, refund, reorder, invoice

- Cancel an order, or a single item, while it is not yet shipped.
- Cancellation reason picker and a confirm step.
- `Refund` records for paid orders, with status (requested, processing,
  refunded) visible to the customer.
- Reorder puts the same items back in the cart at today's price.
- Invoice page that prints cleanly, plus a PDF download.

## Day 10: Online payment

- SSLCommerz sandbox (cards, bKash, Nagad, Rocket in one gateway).
- `Payment` table, success, failure and cancel pages, server-side validation of
  the gateway callback before an order is marked paid.
- Cash on Delivery stays the default path.

## Day 11: Tracking and delivery charges

- Every status change writes an `OrderStatusHistory` row (the table exists).
- Track order page with the timeline:

```
✓ Order Placed
✓ Order Confirmed
✓ Packed
● Shipped
○ Out for Delivery
○ Delivered
```

- Delivery charges by zone (inside Dhaka, outside Dhaka) and option
  (standard, express), editable by admin; estimated delivery date.

## Day 12: Reviews

- Rate and review only items from delivered orders.
- Upload product photos with the review.
- Edit and delete your review; product rating average and count kept in sync.

## Day 13: Seller panel, part 1

- Seller registration (application waits for admin approval).
- Store profile: logo, banner, description.
- Seller dashboard layout (its own sidebar shell, separate from the shop).
- Add, edit, delete products with variants, images and stock.
- Products go to "pending approval" until an admin approves them.

## Day 14: Seller panel, part 2

- Seller orders (their packages only), accept or reject, update shipping status.
- Sales dashboard with charts, earnings after commission, payouts list.
- Store coupons, and the store's reviews.

## Day 15: Admin panel, part 1

- Admin dashboard with key numbers.
- Manage customers, manage sellers, approve or reject sellers.
- Manage products, approve or reject products.
- Manage categories and subcategories.

## Day 16: Admin panel, part 2

- Manage orders, cancellations, refunds.
- Manage coupons, banners, reviews, delivery charges.
- Sales reports with date range and CSV export.

## Day 17: Notifications

- `Notification` table written by order events: placed, confirmed, shipped,
  out for delivery, delivered, cancelled; plus coupon and offer broadcasts.
- Bell with unread count, notifications page, mark as read.

## Day 18: Postman testing

- Postman collection and environment for every `/api/v1` route.
- Test scripts per request (status codes, response shape, auth errors), and a
  full journey run: sign up, browse, cart, coupon, checkout, track, review.

## Day 19: Deployment

- Hosted Postgres (Neon or Supabase), Vercel project, environment variables.
- `prisma migrate deploy` in the build, seed for the demo data.
- Image storage for product and review photos.
