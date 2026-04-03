import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

import { sendWithRetry } from "@/lib/resend";

function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY);
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

    console.log("metadata:", m);
    const extraCost = parseFloat(m.extraCost ?? "0");
    const total = session.amount_total! / 100;
    const arrangementPrice = total - extraCost;

    const fulfillmentLabel =
      m.fulfillment === "ship" ? `Ship to: ${esc(m.addressLine1)}${m.addressLine2 ? `, ${esc(m.addressLine2)}` : ""}, ${esc(m.city)}, ${esc(m.state)} ${esc(m.zip)}`
      : m.fulfillment === "delivery" ? `Deliver to: ${esc(m.addressLine1)}${m.addressLine2 ? `, ${esc(m.addressLine2)}` : ""}, ${esc(m.city)}, ${esc(m.state)} ${esc(m.zip)}`
      : "Local Pickup";

    const sent = await sendWithRetry(() => resend.emails.send({
      from: "orders@mzartofbloom.com",
      to: "mzartofbloom@gmail.com",
      subject: `New Order — ${m.slug} from ${esc(m.name)}`,
      html: `
        <h2>New Order Received</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Arrangement</td><td style="padding:8px">${esc(m.arrangementName || m.slug)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Price</td><td style="padding:8px">$${arrangementPrice}</td></tr>
          ${extraCost > 0 ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">${m.fulfillment === "delivery" ? "Delivery" : "Shipping"}</td><td style="padding:8px">+$${extraCost}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Total</td><td style="padding:8px"><strong>$${total}</strong></td></tr>
          <tr><td colspan="2" style="padding:8px;background:#e5e7eb"></td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Customer</td><td style="padding:8px">${esc(m.name)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Email</td><td style="padding:8px"><a href="mailto:${esc(m.email)}">${esc(m.email)}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Phone</td><td style="padding:8px">${esc(m.phone) || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Fulfillment</td><td style="padding:8px">${fulfillmentLabel}</td></tr>
          ${m.bannerText ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Banner Text</td><td style="padding:8px">"${esc(m.bannerText)}"</td></tr>` : ""}
          ${m.notes ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Notes</td><td style="padding:8px">${esc(m.notes)}</td></tr>` : ""}
        </table>
        <p style="color:#999;font-size:12px;margin-top:24px">Received at ${new Date().toLocaleString()}</p>
      `,
    }));

    if (!sent) {
      return Response.json({ error: "Failed to send email." }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}
