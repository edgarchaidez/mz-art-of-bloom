import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getArrangement, SHIPPING_FEE } from "@/lib/arrangements";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    slug, name, email, phone, notes, bannerText,
    fulfillment, addressLine1, addressLine2, city, state, zip,
  } = body;

  if (!slug || !name || !email) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const arrangement = await getArrangement(slug);
  if (!arrangement) {
    return Response.json({ error: "Arrangement not found." }, { status: 404 });
  }

  const shippingCost = arrangement.material === "artificial" && fulfillment === "ship" ? SHIPPING_FEE : 0;
  const origin = request.headers.get("origin") ?? "http://localhost:3000";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: "usd",
        product_data: { name: arrangement.name },
        unit_amount: arrangement.price * 100,
      },
      quantity: 1,
    },
  ];

  if (shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Shipping" },
        unit_amount: shippingCost * 100,
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: email,
    success_url: `${origin}/order/success?type=order&arrangement=${slug}&total=${arrangement.price + shippingCost}`,
    cancel_url: `${origin}/order/checkout?slug=${slug}`,
    metadata: {
      slug, name, email, phone: phone || "",
      fulfillment, bannerText: bannerText || "",
      notes: notes || "",
      addressLine1: addressLine1 || "", addressLine2: addressLine2 || "",
      city: city || "", state: state || "", zip: zip || "",
    },
  });

  return Response.json({ url: session.url });
}
