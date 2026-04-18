@AGENTS.md

# Mz Art of Bloom

A flower arrangement e-commerce app for a small floral business. Customers can browse arrangements, place orders, and submit custom inquiries.

## Stack

- **Next.js 16.2.1** — App Router, TypeScript
- **React 19.2.4**
- **Tailwind CSS 4** — configured via `@theme {}` in `globals.css`, no `tailwind.config.js`
- **Fonts** — Lato (body), Lobster Two (script headings) via `next/font/google`
- **Sanity** — headless CMS for catalog and site settings
- **Stripe** — hosted checkout for payments, webhook for order confirmation
- **Resend** — transactional email for inquiry notifications

## Project Structure

```
app/
  page.tsx                   # Landing page (hero, featured arrangements, how it works)
  shop/
    page.tsx                 # Full catalog grid
    [slug]/page.tsx          # Individual arrangement detail + order button
  order/
    checkout/
      page.tsx               # Checkout page (server component)
      CheckoutForm.tsx       # Client component — fulfillment selection, address, sessionStorage persistence
    custom/
      page.tsx               # Custom order inquiry page
      CustomOrderForm.tsx    # Client component — inquiry form
    success/page.tsx         # Confirmation page (handles both orders and inquiries)
  api/
    checkout/route.ts        # POST — creates Stripe Checkout session
    inquiry/route.ts         # POST — receives custom order form, sends email via Resend
    webhook/route.ts         # POST — Stripe webhook for order confirmation
  sitemap.ts                 # Auto-generated sitemap from Sanity catalog
  robots.ts                  # robots.txt

lib/
  arrangements.ts            # Sanity queries + catalog types (Arrangement, SiteSettings)
  resend.ts                  # Resend helper with retry logic

components/
  Navbar.tsx                 # Sticky nav with mobile hamburger menu (client component)
  Footer.tsx                 # Branded footer with social links
```

## Key Things to Know

- **Catalog**: `lib/arrangements.ts` queries Sanity for arrangements. Each has a `slug` used as the URL identifier (`/shop/pink-bridal-bouquet`). Managed via Sanity Studio at `/studio`.
- **Checkout**: Stripe Checkout handles payments. `app/api/checkout/route.ts` creates the session, `app/api/webhook/route.ts` handles post-payment events.
- **Email**: `app/api/inquiry/route.ts` sends inquiry emails via Resend. Uses a retry helper in `lib/resend.ts`.
- **Fulfillment**: Three options — local pickup, local delivery (ZIP code validated against an allowlist in `lib/arrangements.ts`), and shipping (artificial arrangements only). Fee constants also live in `lib/arrangements.ts`.
- **Form persistence**: Checkout form saves to `sessionStorage` on every change and restores on mount. Clears when the tab is closed. `Cache-Control: no-store` on the checkout route (via `next.config.ts`) prevents BFCache from freezing the form state on browser back.
- **Brand colors**: Hot pink `#E91E8C` (`--color-pink-500`) and supporting palette defined in `globals.css` under `@theme`.
- **Site settings**: Sanity controls `acceptingOrders` flag — when false, all checkout routes return 404.

## Environment Variables

See `.env.example` for required keys:
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
