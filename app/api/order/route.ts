import { NextRequest } from "next/server";
import { Resend } from "resend";
import { getArrangement } from "@/lib/arrangements";
import { SHIPPING_FEE } from "@/lib/arrangements";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, phone, notes, bannerText, fulfillment, addressLine1, addressLine2, city, state, zip, slug } = body;

  if (!name || !email || !slug) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const arrangement = getArrangement(slug);
  if (!arrangement) {
    return Response.json({ error: "Arrangement not found." }, { status: 404 });
  }

  const shippingCost = arrangement.material === "artificial" && fulfillment === "ship" ? SHIPPING_FEE : 0;
  const total = arrangement.price + shippingCost;

  const shippingAddress = fulfillment === "ship"
    ? `${addressLine1}${addressLine2 ? `, ${addressLine2}` : ""}, ${city}, ${state} ${zip}`
    : "Local Pickup";

  const { error } = await resend.emails.send({
    from: "orders@mzartofbloom.com",
    to: "mzartofbloom@gmail.com",
    subject: `New Order — ${arrangement.name} from ${name}`,
    html: `
      <h2>New Order Received</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Arrangement</td><td style="padding:8px">${arrangement.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Price</td><td style="padding:8px">$${arrangement.price}</td></tr>
        ${shippingCost > 0 ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Shipping</td><td style="padding:8px">+$${shippingCost}</td></tr>` : ""}
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Total</td><td style="padding:8px"><strong>$${total}</strong></td></tr>
        <tr><td colspan="2" style="padding:8px;background:#e5e7eb"></td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Customer</td><td style="padding:8px">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Fulfillment</td><td style="padding:8px">${shippingAddress}</td></tr>
        ${bannerText ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Banner Text</td><td style="padding:8px">"${bannerText}"</td></tr>` : ""}
        ${notes ? `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Notes</td><td style="padding:8px">${notes}</td></tr>` : ""}
      </table>
      <p style="color:#999;font-size:12px;margin-top:24px">Received at ${new Date().toLocaleString()}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }

  return Response.json({ success: true });
}
