import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { SHIPPING_FEE } from "@/lib/arrangements";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const m = session.metadata!;

    const shippingCost = m.fulfillment === "ship" ? SHIPPING_FEE : 0;
    const arrangementPrice = (session.amount_total! / 100) - shippingCost;
    const total = session.amount_total! / 100;

    const shippingAddress = m.fulfillment === "ship"
      ? `${m.addressLine1}${m.addressLine2 ? `, ${m.addressLine2}` : ""}, ${m.city}, ${m.state} ${m.zip}`
      : "Local Pickup";

    await resend.emails.send({
      from: "orders@mzartofbloom.com",
      to: "mzartofbloom@gmail.com",
      subject: `New Order — ${m.slug} from ${m.name}`,
      html: `
        <h2>New Order Received</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Arrangement</td><td style="padding:8px">${m.slug}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Price</td><td style="padding:8px">$${arrangementPrice}</td></tr>
          ${shippingCost > 0 ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Shipping</td><td style="padding:8px">+$${shippingCost}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Total</td><td style="padding:8px"><strong>$${total}</strong></td></tr>
          <tr><td colspan="2" style="padding:8px;background:#e5e7eb"></td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Customer</td><td style="padding:8px">${m.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Email</td><td style="padding:8px"><a href="mailto:${m.email}">${m.email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Phone</td><td style="padding:8px">${m.phone || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Fulfillment</td><td style="padding:8px">${shippingAddress}</td></tr>
          ${m.bannerText ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Banner Text</td><td style="padding:8px">"${m.bannerText}"</td></tr>` : ""}
          ${m.notes ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Notes</td><td style="padding:8px">${m.notes}</td></tr>` : ""}
        </table>
        <p style="color:#999;font-size:12px;margin-top:24px">Received at ${new Date().toLocaleString()}</p>
      `,
    });
  }

  return Response.json({ received: true });
}
