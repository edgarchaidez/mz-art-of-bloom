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
        ${m.imageUrl ? `<img src="${esc(m.imageUrl)}" alt="${esc(m.arrangementName || m.slug)}" style="width:100%;max-width:200px;border-radius:12px;margin-bottom:16px;display:block">` : ""}
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Arrangement</td><td style="padding:8px"><a href="https://www.mzartofbloom.com/shop/${esc(m.slug)}">${esc(m.arrangementName || m.slug)}</a></td></tr>
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

    const fulfillmentCustomerLabel =
      m.fulfillment === "ship" ? `Shipping to ${esc(m.addressLine1)}${m.addressLine2 ? `, ${esc(m.addressLine2)}` : ""}, ${esc(m.city)}, ${esc(m.state)} ${esc(m.zip)}`
      : m.fulfillment === "delivery" ? `Local delivery to ${esc(m.addressLine1)}${m.addressLine2 ? `, ${esc(m.addressLine2)}` : ""}, ${esc(m.city)}, ${esc(m.state)} ${esc(m.zip)}`
      : "Local pickup";

    await sendWithRetry(() => resend.emails.send({
      from: "orders@mzartofbloom.com",
      to: m.email,
      replyTo: "mzartofbloom@gmail.com",
      subject: `Your order is confirmed: ${esc(m.arrangementName || m.slug)}!`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1f2937">
          <h1 style="color:#be185d;font-size:24px;margin-bottom:4px">Thank you, ${esc(m.name.split(" ")[0])}! 🌸</h1>
          <p style="color:#6b7280;margin-top:0">Your order has been received and your payment was successful.</p>

          ${m.imageUrl ? `<img src="${esc(m.imageUrl)}" alt="${esc(m.arrangementName || m.slug)}" style="width:100%;max-width:240px;border-radius:12px;margin:16px 0;display:block">` : ""}

          <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
            <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Arrangement</td><td style="padding:8px">${esc(m.arrangementName || m.slug)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Total Paid</td><td style="padding:8px"><strong>$${total}</strong></td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Fulfillment</td><td style="padding:8px">${fulfillmentCustomerLabel}</td></tr>
            ${m.bannerText ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Banner Text</td><td style="padding:8px">"${esc(m.bannerText)}"</td></tr>` : ""}
            ${m.notes ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Notes</td><td style="padding:8px">${esc(m.notes)}</td></tr>` : ""}
          </table>

          <p style="background:#fdf2f8;border-left:4px solid #e91e8c;padding:12px 16px;border-radius:4px;margin-bottom:24px">
            We&apos;ll be in touch within 24 hours to confirm your ${m.fulfillment === "pickup" ? "pickup time" : m.fulfillment === "delivery" ? "delivery details" : "shipping details"}. If you have any questions in the meantime, just reply to this email.
          </p>

          <div style="margin-top:24px;background:#fdf2f8;border-radius:12px;padding:20px;text-align:center">
            <p style="font-size:16px;font-weight:bold;color:#be185d;margin:0 0 8px 0">Happy with your order? 🌸</p>
            <p style="font-size:14px;color:#6b7280;margin:0 0 16px 0">Leave a review and help us grow!</p>
            <a href="https://g.page/r/CVCX5YQf0lxwEBI/review" style="background:#e91e8c;color:white;padding:12px 24px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:bold;display:inline-block">Leave a Google Review</a>
          </div>
          <p style="color:#6b7280;font-size:13px;margin-top:16px">MZ Art of Bloom</p>
        </div>
      `,
    }));
  }

  return Response.json({ received: true });
}
