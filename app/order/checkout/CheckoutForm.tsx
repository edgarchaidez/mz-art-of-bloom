"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Arrangement } from "@/lib/arrangements";
import { SHIPPING_FEE } from "@/lib/arrangements";

type Fulfillment = "pickup" | "ship";

export default function CheckoutForm({ arrangement }: { arrangement: Arrangement }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
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
    // Mock card fields — not sent to any real processor
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const canShip = arrangement.material === "artificial";
  const shippingCost = canShip && fulfillment === "ship" ? SHIPPING_FEE : 0;
  const total = arrangement.price + shippingCost;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push(`/order/success?type=order&arrangement=${arrangement.slug}`);
    }, 1200);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <span className="text-xs text-gray-500">No additional charge</span>
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
              {canShip ? `+$${SHIPPING_FEE} flat rate` : "Natural arrangements — pickup only"}
            </span>
          </button>
        </div>

        {/* Shipping address — shown only when ship is selected */}
        {fulfillment === "ship" && canShip && (
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
                  placeholder="Atlanta"
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="state" className="text-sm text-gray-600">State <span className="text-pink-500">*</span></label>
                <input
                  id="state" name="state" type="text" required
                  value={form.state} onChange={handleChange}
                  placeholder="GA"
                  maxLength={2}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white uppercase"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="zip" className="text-sm text-gray-600">ZIP <span className="text-pink-500">*</span></label>
                <input
                  id="zip" name="zip" type="text" required
                  value={form.zip} onChange={handleChange}
                  placeholder="30301"
                  maxLength={10}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                />
              </div>
            </div>
          </div>
        )}
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

      {/* Mock Payment */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">
          Payment (Demo)
        </legend>
        <div className="flex flex-col gap-1">
          <label htmlFor="cardNumber" className="text-sm text-gray-600">Card Number</label>
          <input
            id="cardNumber" name="cardNumber" type="text"
            value={form.cardNumber} onChange={handleChange}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-mono"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="cardExpiry" className="text-sm text-gray-600">Expiry</label>
            <input
              id="cardExpiry" name="cardExpiry" type="text"
              value={form.cardExpiry} onChange={handleChange}
              placeholder="MM / YY"
              maxLength={7}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-mono"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cardCvc" className="text-sm text-gray-600">CVC</label>
            <input
              id="cardCvc" name="cardCvc" type="text"
              value={form.cardCvc} onChange={handleChange}
              placeholder="123"
              maxLength={4}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-mono"
            />
          </div>
        </div>
      </fieldset>

      {/* Total */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Arrangement</span>
          <span>${arrangement.price}</span>
        </div>
        {shippingCost > 0 && (
          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>
            <span>+${shippingCost}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100">
          <span>Total</span>
          <span className="text-pink-500">${total}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-pink-500 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Processing..." : `Pay $${total}`}
      </button>

      <p className="text-xs text-center text-gray-400">
        This is a demo checkout. No real charge will be made.
      </p>
    </form>
  );
}
