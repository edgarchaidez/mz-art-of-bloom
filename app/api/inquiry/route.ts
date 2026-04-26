import { NextRequest } from "next/server";
import { Resend } from "resend";

import { sendWithRetry } from "@/lib/resend";

function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | undefined) {
  return `<tr><td style="padding:8px;font-weight:bold;background:#fdf2f8;white-space:nowrap">${label}</td><td style="padding:8px">${value ? esc(value) : "—"}</td></tr>`;
}


function sectionHeader(title: string) {
  return `<tr><td colspan="2" style="padding:10px 8px 4px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;color:#9d174d;border-top:2px solid #fce7f3">${title}</td></tr>`;
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = await request.formData();

  const name = data.get("name") as string | null;
  const email = data.get("email") as string | null;
  const phone = data.get("phone") as string | null;
  const budget = data.get("budget") as string | null;
  const flowerType = data.get("flowerType") as string | null;
  const artificialType = data.get("artificialType") as string | null;
  const colorPreferences = data.get("colorPreferences") as string | null;
  const addonCrown = data.get("addonCrown") === "true";
  const addonPlush = data.get("addonPlush") === "true";
  const addonPlushCharacter = data.get("addonPlushCharacter") as string | null;
  const addonButterflies = data.get("addonButterflies") === "true";
  const addonBanner = data.get("addonBanner") === "true";
  const addonBannerPhrase = data.get("addonBannerPhrase") as string | null;
  const fulfillment = data.get("fulfillment") as string | null;
  const addressLine1 = data.get("addressLine1") as string | null;
  const addressLine2 = data.get("addressLine2") as string | null;
  const city = data.get("city") as string | null;
  const state = data.get("state") as string | null;
  const zip = data.get("zip") as string | null;
  const date = data.get("date") as string | null;
  const time = data.get("time") as string | null;
  const additionalNotes = data.get("additionalNotes") as string | null;
  const imageFile = data.get("image") as File | null;

  if (!name || !email || !flowerType || !fulfillment || !date) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  // Build add-ons list
  const addonLines: string[] = [];
  if (addonCrown) addonLines.push("Crown (+$15)");
  if (addonPlush) addonLines.push(`Plush (+$25)${addonPlushCharacter ? ` — ${addonPlushCharacter}` : ""}`);
  if (addonButterflies) addonLines.push("Butterflies (Free)");
  if (addonBanner) addonLines.push(`Custom Banner (Free)${addonBannerPhrase ? ` — "${addonBannerPhrase}"` : ""}`);

  // Build flower type display
  const flowerTypeLabel = flowerType === "artificial"
    ? `Artificial${artificialType ? ` — ${artificialType.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}` : ""}`
    : "Natural / Fresh";

  // Build fulfillment display
  const fulfillmentLabels: Record<string, string> = {
    pickup: "Local Pickup",
    delivery: "Local Delivery",
    shipping: "Ship to Me",
  };
  const fulfillmentLabel = fulfillmentLabels[fulfillment] ?? fulfillment;

  const addressParts = [addressLine1, addressLine2, city && state ? `${city}, ${state}` : (city ?? state), zip].filter(Boolean);
  const fullAddress = addressParts.length ? addressParts.join(", ") : null;

  // Handle image attachment
  let attachments: { filename: string; content: Buffer }[] | undefined;
  if (imageFile && imageFile.size > 5 * 1024 * 1024) {
    return Response.json({ error: "Image must be under 5 MB." }, { status: 400 });
  }
  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    attachments = [{ filename: imageFile.name, content: buffer }];
  }

  const html = `
    <h2 style="color:#be185d;margin-bottom:16px">New Custom Order Inquiry</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-size:14px">
      ${sectionHeader("Contact")}
      ${row("Name", name)}
      ${row("Email", email)}
      ${row("Phone", phone ?? undefined)}

      ${sectionHeader("Flower Preferences")}
      ${row("Flower Type", flowerTypeLabel)}
      ${row("Color Preferences", colorPreferences ?? undefined)}
      ${row("Budget", budget ?? undefined)}

      ${addonLines.length ? `
      ${sectionHeader("Add-ons")}
      <tr><td colspan="2" style="padding:8px">${addonLines.map(a => `• ${esc(a)}`).join("<br>")}</td></tr>
      ` : ""}

      ${sectionHeader("Fulfillment")}
      ${row("Method", fulfillmentLabel)}
      ${fullAddress ? row("Address", fullAddress) : ""}

      ${sectionHeader("Date & Time")}
      ${row("Date", date ?? undefined)}
      ${time ? row("Preferred Time", time) : ""}

      ${additionalNotes ? `
      ${sectionHeader("Notes")}
      <tr><td colspan="2" style="padding:8px">${esc(additionalNotes)}</td></tr>
      ` : ""}
    </table>
    ${attachments ? `<p style="color:#6b7280;font-size:12px;margin-top:16px">📎 Inspiration photo attached.</p>` : ""}
    <p style="color:#9ca3af;font-size:12px;margin-top:24px">Received at ${new Date().toLocaleString()}</p>
  `;

  const sent = await sendWithRetry(() => resend.emails.send({
    from: "orders@mzartofbloom.com",
    to: "mzartofbloom@gmail.com",
    replyTo: email,
    subject: `New Custom Order Inquiry from ${esc(name)}`,
    html,
    attachments,
  }));

  if (!sent) {
    return Response.json({ error: "Failed to send inquiry. Please try again." }, { status: 500 });
  }

  return Response.json({ success: true });
}
