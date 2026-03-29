@AGENTS.md

# Mz Art of Bloom

A flower arrangement e-commerce app for a small floral business. Customers can browse arrangements, place orders, and submit custom inquiries.

## Stack

- **Next.js 16.2.1** — App Router, TypeScript
- **React 19.2.4**
- **Tailwind CSS 4** — configured via `@theme {}` in `globals.css`, no `tailwind.config.js`
- **Fonts** — Lato (body), Great Vibes (script headings) via `next/font/google`

## Project Structure

```
app/
  page.tsx                   # Landing page (hero, featured arrangements, how it works)
  shop/
    page.tsx                 # Full catalog grid
    [slug]/page.tsx          # Individual arrangement detail + order button
  order/
    checkout/
      page.tsx               # Mock checkout page (replace with Stripe later)
      CheckoutForm.tsx       # Client component — fake card form, simulates payment
    custom/
      page.tsx               # Custom order inquiry page
      CustomOrderForm.tsx    # Client component — inquiry form
    success/page.tsx         # Confirmation page (handles both orders and inquiries)
  api/
    inquiry/route.ts         # POST — receives custom order form, logs it (wire Resend here)

lib/
  arrangements.ts            # Mock catalog data — swap for Sanity CMS later

components/
  Navbar.tsx                 # Sticky nav with mobile hamburger menu (client component)
  Footer.tsx                 # Branded footer

public/
  arrangements/              # Drop real flower photos here (filenames must match lib/arrangements.ts)
```

## Key Things to Know

- **Mock data**: `lib/arrangements.ts` holds hardcoded arrangements. Each has a `slug` field used as the URL identifier for detail pages (`/shop/pink-bridal-bouquet`, etc.). Replace with Sanity CMS when ready.
- **Mock payments**: The checkout flow is purely simulated. To go live, integrate Stripe Checkout and replace `app/order/checkout/`.
- **Email notifications**: `app/api/inquiry/route.ts` currently just `console.log`s submissions. Wire up [Resend](https://resend.com) here to email the business owner on new inquiries.
- **Photos**: Placeholder image paths are set in `lib/arrangements.ts`. Add real photos to `public/arrangements/` with matching filenames.
- **Brand colors**: Hot pink `#E91E8C` and leaf green `#4CAF50`, defined as CSS custom properties in `globals.css` under `@theme`.

## TODO (Future)

- [ ] Replace mock data with Sanity CMS (catalog management for non-technical owner)
- [ ] Integrate Stripe Checkout for real payments
- [ ] Wire Resend to `app/api/inquiry/route.ts` for email notifications
- [ ] Add real product photos to `public/arrangements/`
