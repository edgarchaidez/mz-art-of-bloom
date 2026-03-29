import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, phone, occasion, budget, colorPreferences, flowerPreferences, additionalNotes } = body;

  if (!name || !email || !occasion || !budget) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  // TODO: Replace this with Resend email notification once set up
  console.log("New custom inquiry received:", {
    name,
    email,
    phone,
    occasion,
    budget,
    colorPreferences,
    flowerPreferences,
    additionalNotes,
    receivedAt: new Date().toISOString(),
  });

  return Response.json({ success: true });
}
