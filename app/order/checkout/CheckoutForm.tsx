"use client";

import { useState } from "react";
import type { Arrangement } from "@/lib/arrangements";
import { SHIPPING_FEE, DELIVERY_FEE, DELIVERY_ZIP_CODES } from "@/lib/arrangements";

type Fulfillment = "pickup" | "ship" | "delivery";

export default function CheckoutForm({ arrangement }: { arrangement: Arrangement }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("pickup");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bannerText: "",
    notes: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const canShip = arrangement.material === "artificial";
  const canDeliver = DELIVERY_ZIP_CODES.has(form.zip.slice(0, 5));
  const shippingFee = arrangement.shippingFee ?? SHIPPING_FEE;
  const extraCost = fulfillment === "ship" && canShip ? shippingFee
    : fulfillment === "delivery" ? DELIVERY_FEE
    : 0;
  const total = arrangement.price + extraCost;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, fulfillment, slug: arrangement.slug }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }
    setError(null);

    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Contact */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">
          Contact Info
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-gray-600">Full Name <span className="text-pink-500">*</span></label>
            <input
              id="name" name="name" type="text" required
              value={form.name} onChange={handleChange}
              placeholder="Jane Doe"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">Email <span className="text-pink-500">*</span></label>
            <input
              id="email" name="email" type="email" required
              value={form.email} onChange={handleChange}
              placeholder="jane@example.com"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm text-gray-600">Phone</label>
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="(555) 000-0000"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
      </fieldset>

      {/* Fulfillment */}
      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">
          Fulfillment
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setFulfillment("pickup")}
            className={`flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
              fulfillment === "pickup"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-200"
            }`}
          >
            <span className="text-sm font-medium text-gray-800">Local Pickup</span>
            <span className="text-xs text-gray-500">No additional charge · ready within 24 hrs</span>
          </button>
          <button
            type="button"
            onClick={() => setFulfillment("delivery")}
            className={`flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
              fulfillment === "delivery"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-200"
            }`}
          >
            <span className="text-sm font-medium text-gray-800">Local Delivery</span>
            <span className="text-xs text-gray-500">+${DELIVERY_FEE} · next day · Phoenix metro</span>
          </button>
          <button
            type="button"
            disabled={!canShip}
            onClick={() => canShip && setFulfillment("ship")}
            className={`flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
              !canShip
                ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                : fulfillment === "ship"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-200"
            }`}
          >
            <span className="text-sm font-medium text-gray-800">Ship to Me</span>
            <span className="text-xs text-gray-500">
              {canShip ? `+$${shippingFee} · arrives in 4–5 business days` : "Natural arrangements — pickup only"}
            </span>
          </button>
        </div>

        {/* Address fields — shown for ship or delivery */}
        {(fulfillment === "ship" && canShip) || fulfillment === "delivery" ? (
          <div className="flex flex-col gap-3 mt-1 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex flex-col gap-1">
              <label htmlFor="addressLine1" className="text-sm text-gray-600">Address <span className="text-pink-500">*</span></label>
              <input
                id="addressLine1" name="addressLine1" type="text" required
                value={form.addressLine1} onChange={handleChange}
                placeholder="123 Main St"
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="addressLine2" className="text-sm text-gray-600">Apt / Suite</label>
              <input
                id="addressLine2" name="addressLine2" type="text"
                value={form.addressLine2} onChange={handleChange}
                placeholder="Apt 4B (optional)"
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                <label htmlFor="city" className="text-sm text-gray-600">City <span className="text-pink-500">*</span></label>
                <input
                  id="city" name="city" type="text" required
                  value={form.city} onChange={handleChange}
                  placeholder="Phoenix"
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="state" className="text-sm text-gray-600">State <span className="text-pink-500">*</span></label>
                <input
                  id="state" name="state" type="text" required
                  value={form.state} onChange={handleChange}
                  placeholder="AZ"
                  maxLength={2}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white uppercase"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="zip" className="text-sm text-gray-600">ZIP <span className="text-pink-500">*</span></label>
                <input
                  id="zip" name="zip" type="text" required
                  value={form.zip} onChange={handleChange}
                  placeholder="85001"
                  maxLength={10}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                />
              </div>
            </div>
            {fulfillment === "delivery" && form.zip.length >= 5 && (
              canDeliver ? (
                <p className="text-xs text-green-600 font-medium">✓ We deliver to your area!</p>
              ) : (
                <p className="text-xs text-red-500">Sorry, we don&apos;t currently deliver to this ZIP code. Please choose pickup or shipping.</p>
              )
            )}
          </div>
        ) : null}
      </fieldset>

      {/* Banner text */}
      {arrangement.hasBanner && (
        <div className="flex flex-col gap-1">
          <label htmlFor="bannerText" className="text-sm text-gray-600">
            Custom Banner Text <span className="text-pink-500">*</span>
          </label>
          <input
            id="bannerText" name="bannerText" type="text" required
            value={form.bannerText} onChange={handleChange}
            placeholder='e.g. "Happy Birthday Sofia!" or "Te Quiero Mucho"'
            maxLength={50}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
          <p className="text-xs text-gray-400">{form.bannerText.length}/50 characters</p>
        </div>
      )}

      {/* Order Notes */}
      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-sm text-gray-600">Order Notes</label>
        <textarea
          id="notes" name="notes" rows={3}
          value={form.notes} onChange={handleChange}
          placeholder="Any special requests, preferred pickup time, etc."
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
        You&apos;ll be securely redirected to Stripe to complete payment.
      </div>

      {/* Total */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Arrangement</span>
          <span>${arrangement.price}</span>
        </div>
        {extraCost > 0 && (
          <div className="flex justify-between text-gray-500">
            <span>{fulfillment === "delivery" ? "Delivery" : "Shipping"}</span>
            <span>+${extraCost}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100">
          <span>Total</span>
          <span className="text-pink-500">${total}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || (fulfillment === "delivery" && !canDeliver)}
        className="bg-pink-500 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Processing..." : `Continue to Payment — $${total}`}
      </button>
    </form>
  );
}
