"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  budget: string;
  colorPreferences: string;
  flowerPreferences: string;
  additionalNotes: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  occasion: "",
  budget: "",
  colorPreferences: "",
  flowerPreferences: "",
  additionalNotes: "",
};

const occasions = [
  "Anniversary",
  "Birthday",
  "Baby Shower",
  "Graduation",
  "Corporate Event",
  "Sympathy",
  "Just Because",
  "Other",
];

const budgets = ["Under $50", "$50–$100", "$100–$200", "$200–$300", "$300+"];

export default function CustomOrderForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      router.push("/order/success?type=inquiry");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Contact Info */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">
          Your Info
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-gray-600">
              Full Name <span className="text-pink-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">
              Email <span className="text-pink-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm text-gray-600">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
      </fieldset>

      {/* Order Details */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">
          Order Details
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="occasion" className="text-sm text-gray-600">
              Occasion <span className="text-pink-500">*</span>
            </label>
            <select
              id="occasion"
              name="occasion"
              required
              value={form.occasion}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            >
              <option value="" disabled>Select an occasion</option>
              {occasions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="budget" className="text-sm text-gray-600">
              Budget Range <span className="text-pink-500">*</span>
            </label>
            <select
              id="budget"
              name="budget"
              required
              value={form.budget}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            >
              <option value="" disabled>Select a budget</option>
              {budgets.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="colorPreferences" className="text-sm text-gray-600">
            Color Preferences
          </label>
          <input
            id="colorPreferences"
            name="colorPreferences"
            type="text"
            value={form.colorPreferences}
            onChange={handleChange}
            placeholder="e.g. soft pinks, white, blush"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="flowerPreferences" className="text-sm text-gray-600">
            Flower Preferences
          </label>
          <input
            id="flowerPreferences"
            name="flowerPreferences"
            type="text"
            value={form.flowerPreferences}
            onChange={handleChange}
            placeholder="e.g. roses, peonies, sunflowers (or 'surprise me!')"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="additionalNotes" className="text-sm text-gray-600">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={4}
            value={form.additionalNotes}
            onChange={handleChange}
            placeholder="Any other details about your arrangement, delivery date, special requests..."
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white resize-none"
          />
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-pink-500 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send Inquiry"}
      </button>

      <p className="text-xs text-center text-gray-400">
        We&apos;ll follow up within 24 hours to discuss your order and finalize details.
      </p>
    </form>
  );
}
