import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getArrangement, getSiteSettings, SHIPPING_FEE, DELIVERY_FEE, DELIVERY_ZIP_CODES } from "@/lib/arrangements";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await request.json();

  const {
    slug, name, email, phone, notes, bannerText,
    fulfillment, addressLine1, addressLine2, city, state, zip,
  } = body;

  if (!slug || !name || !email) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const [arrangement, settings] = await Promise.all([getArrangement(slug), getSiteSettings()]);
  if (!arrangement) {
    return Response.json({ error: "Arrangement not found." }, { status: 404 });
  }
  if (!settings.acceptingOrders || arrangement.available === false) {
    return Response.json({ error: "This arrangement is not available for order." }, { status: 400 });
  }

  // Validate delivery eligibility server-side
  if (fulfillment === "delivery" && !DELIVERY_ZIP_CODES.has(zip.slice(0, 5))) {
    return Response.json({ error: "Delivery is not available to this ZIP code." }, { status: 400 });
  }

  const shippingFee = arrangement.shippingFee ?? SHIPPING_FEE;
  const extraCost =
    fulfillment === "ship" && arrangement.material === "artificial" ? shippingFee
    : fulfillment === "delivery" ? DELIVERY_FEE
    : 0;

  const origin = request.headers.get("origin") ?? "http://localhost:3000";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: "usd",
        product_data: {
            name: arrangement.name,
            images: arrangement.images[0] ? [arrangement.images[0]] : [],
          },
        unit_amount: arrangement.price * 100,
      },
      quantity: 1,
    },
  ];

  if (extraCost > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: fulfillment === "delivery" ? "Local Delivery" : "Shipping" },
        unit_amount: extraCost * 100,
      },
      quantity: 1,
    });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: email,
    success_url: `${origin}/order/success?type=order&arrangement=${slug}&total=${arrangement.price + extraCost}&fulfillment=${fulfillment}`,
    cancel_url: `${origin}/order/checkout?slug=${slug}`,
    metadata: {
      slug, name, email, phone: phone || "",
      fulfillment, bannerText: bannerText || "",
      notes: notes || "",
      addressLine1: addressLine1 || "", addressLine2: addressLine2 || "",
      city: city || "", state: state || "", zip: zip || "",
      extraCost: String(extraCost),
    },
  });
  } catch (err) {
    console.error("Stripe error:", err);
    return Response.json({ error: "Failed to create checkout session. Please try again." }, { status: 500 });
  }

  return Response.json({ url: session.url });
}
