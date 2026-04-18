# Mz Art of Bloom

**[mzartofbloom.com](https://www.mzartofbloom.com)**

E-commerce storefront for a small floral business. Customers can browse arrangements, place orders, and submit custom inquiries.

## Features

- **Product catalog** — arrangement grid with detail pages, filtering, and availability control
- **Checkout flow** — fulfillment selection (pickup / local delivery / shipping), address validation, Stripe payment integration
- **Custom order inquiries** — form-based inquiry flow with email notifications via Resend
- **CMS-driven content** — catalog managed through Sanity, no code changes needed to add or update arrangements

## Stack

- **Next.js 16** — App Router, server components, dynamic routing
- **React 19** — client components, concurrent features
- **TypeScript**
- **Tailwind CSS 4** — utility styles via `@theme {}` tokens, no config file
- **Sanity** — headless CMS for catalog management
- **Stripe** — hosted checkout for payments
- **Resend** — transactional email for inquiry notifications

## Project Structure

```
app/
  page.tsx                   # Landing page
  shop/
    page.tsx                 # Catalog grid
    [slug]/page.tsx          # Arrangement detail + order CTA
  order/
    checkout/
      page.tsx               # Checkout page (server)
      CheckoutForm.tsx       # Checkout form with fulfillment, address, sessionStorage persistence
    custom/
      page.tsx               # Custom order inquiry page
      CustomOrderForm.tsx    # Inquiry form
    success/page.tsx         # Confirmation (orders + inquiries)
  api/
    checkout/route.ts        # Creates Stripe Checkout session
    inquiry/route.ts         # Receives inquiry form, sends email via Resend

lib/
  arrangements.ts            # Sanity queries + catalog types

components/
  Navbar.tsx
  Footer.tsx
```

## Local Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in your Stripe, Sanity, and Resend keys.

> **Note:** When testing the checkout flow in dev, open Chrome DevTools and enable **Disable cache** in the Network tab. Next.js hardcodes `Cache-Control: no-cache` in development which allows BFCache — the production `no-store` header that prevents this is only respected outside of dev mode.
