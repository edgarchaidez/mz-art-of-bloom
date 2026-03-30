import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, phone, occasion, budget, colorPreferences, flowerPreferences, additionalNotes } = body;

  if (!name || !email || !occasion || !budget) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "chaidez.edgar@gmail.com",
    subject: `New Custom Order Inquiry from ${name}`,
    html: `
      <h2>New Custom Order Inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Name</td><td style="padding:8px">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Occasion</td><td style="padding:8px">${occasion}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Budget</td><td style="padding:8px">${budget}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Color Preferences</td><td style="padding:8px">${colorPreferences || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Flower Preferences</td><td style="padding:8px">${flowerPreferences || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#fdf2f8">Notes</td><td style="padding:8px">${additionalNotes || "—"}</td></tr>
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
