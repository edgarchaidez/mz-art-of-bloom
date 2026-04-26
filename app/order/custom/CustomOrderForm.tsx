"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FlowerType = "artificial" | "natural" | "";
type ArtificialType = "glitter-roses" | "ribbon-roses" | "foam-roses" | "";
type Fulfillment = "pickup" | "shipping" | "delivery" | "";

type FormState = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  flowerType: FlowerType;
  artificialType: ArtificialType;
  colorPreferences: string;
  addonCrown: boolean;
  addonPlush: boolean;
  addonPlushCharacter: string;
  addonButterflies: boolean;
  addonBanner: boolean;
  addonBannerPhrase: string;
  fulfillment: Fulfillment;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  date: string;
  time: string;
  additionalNotes: string;
};

const INITIAL: FormState = {
  name: "", email: "", phone: "", budget: "",
  flowerType: "", artificialType: "", colorPreferences: "",
  addonCrown: false, addonPlush: false, addonPlushCharacter: "",
  addonButterflies: false, addonBanner: false, addonBannerPhrase: "",
  fulfillment: "", addressLine1: "", addressLine2: "",
  city: "", state: "", zip: "",
  date: "", time: "", additionalNotes: "",
};

const BUDGETS = ["Under $50", "$50–$100", "$100–$200", "$200–$300", "$300+"];

const ARTIFICIAL_TYPES: { value: ArtificialType; label: string; description: string }[] = [
  { value: "glitter-roses", label: "Glitter Roses", description: "Artificial roses with a glitter finish" },
  { value: "ribbon-roses", label: "Ribbon Eternal Roses", description: "Handcrafted from ribbon fabric" },
  { value: "foam-roses", label: "Foam Roses", description: "Lifelike foam petal roses" },
];

const ADDONS = [
  { key: "addonCrown" as const, label: "Crown", price: "$15" },
  { key: "addonPlush" as const, label: "Plush", price: "$25" },
  { key: "addonButterflies" as const, label: "Butterflies", price: "Free" },
  { key: "addonBanner" as const, label: "Custom Banner", price: "Free" },
];

const inputClass = "border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white";
const cardClass = (active: boolean) =>
  `flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition-colors cursor-pointer ${
    active ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-200"
  }`;

function today() {
  return new Date().toISOString().split("T")[0];
}
function tomorrow() {
  return new Date(Date.now() + 86_400_000).toISOString().split("T")[0];
}

export default function CustomOrderForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"flowerType" | "artificialType" | "fulfillment", string>>>({});

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "flowerType" || key === "artificialType" || key === "fulfillment") {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 5 * 1024 * 1024) {
      setImageError("Image must be under 5 MB.");
      return;
    }
    setImageError(null);
    setImage(file);
  }

  const needsAddress = form.fulfillment === "shipping" || form.fulfillment === "delivery";
  const minDate = form.fulfillment === "delivery" ? tomorrow() : today();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const errors: typeof fieldErrors = {};
    if (!form.flowerType) errors.flowerType = "Please select a flower type.";
    if (form.flowerType === "artificial" && !form.artificialType) errors.artificialType = "Please select a flower style.";
    if (!form.fulfillment) errors.fulfillment = "Please select a fulfillment method.";
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      const firstKey = (["flowerType", "artificialType"] as const).find((k) => errors[k])
        ? "section-flowers"
        : "section-fulfillment";
      setTimeout(() => document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
      return;
    }

    setSubmitting(true);
    setError(null);

    const data = new FormData();
    (Object.entries(form) as [string, unknown][]).forEach(([k, v]) => data.append(k, String(v)));
    if (image) data.append("image", image);

    try {
      const res = await fetch("/api/inquiry", { method: "POST", body: data });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }

      router.push("/order/success?type=inquiry");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Contact */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">Your Info</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-gray-600">Full Name <span className="text-pink-500">*</span></label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">Email <span className="text-pink-500">*</span></label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" className={inputClass} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm text-gray-600">Phone</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" className={inputClass} />
        </div>
      </fieldset>

      {/* Flower Preferences */}
      <fieldset id="section-flowers" className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">Flower Preferences</legend>

        {/* Artificial vs Natural */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Flower Type <span className="text-pink-500">*</span></span>
          <div className="grid grid-cols-2 gap-3">
            {(["artificial", "natural"] as const).map((type) => (
              <button key={type} type="button" onClick={() => { set("flowerType", type); set("artificialType", ""); }}
                className={cardClass(form.flowerType === type)}>
                <span className="text-sm font-medium text-gray-800 capitalize">{type}</span>
                <span className="text-xs text-gray-500">
                  {type === "artificial" ? "Long-lasting, no maintenance" : "Fresh, fragrant arrangements"}
                </span>
              </button>
            ))}
          </div>
          {fieldErrors.flowerType && <p className="text-xs text-red-500">{fieldErrors.flowerType}</p>}
        </div>

        {/* Artificial subtypes */}
        {form.flowerType === "artificial" && (
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">Flower Style <span className="text-pink-500">*</span></span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ARTIFICIAL_TYPES.map(({ value, label, description }) => (
                <button key={value} type="button" onClick={() => set("artificialType", value)}
                  className={cardClass(form.artificialType === value)}>
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                  <span className="text-xs text-gray-500">{description}</span>
                </button>
              ))}
            </div>
            {fieldErrors.artificialType && <p className="text-xs text-red-500">{fieldErrors.artificialType}</p>}
          </div>
        )}

        {/* Color preferences */}
        <div className="flex flex-col gap-1">
          <label htmlFor="colorPreferences" className="text-sm text-gray-600">Color Preferences</label>
          <input id="colorPreferences" name="colorPreferences" type="text" value={form.colorPreferences}
            onChange={handleChange} placeholder="e.g. soft pinks, white, blush" className={inputClass} />
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-1">
          <label htmlFor="budget" className="text-sm text-gray-600">Budget Range</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
            <option value="">No preference</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </fieldset>

      {/* Add-ons */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">Add-ons</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ADDONS.map(({ key, label, price }) => (
            <button key={key} type="button" onClick={() => set(key, !form[key])}
              className={`flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                form[key] ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-200"
              }`}>
              <span className="text-sm font-medium text-gray-800">{label}</span>
              <span className={`text-xs font-medium ${price === "Free" ? "text-green-600" : "text-pink-500"}`}>{price}</span>
            </button>
          ))}
        </div>

        {form.addonPlush && (
          <div className="flex flex-col gap-1">
            <label htmlFor="addonPlushCharacter" className="text-sm text-gray-600">
              Character of Choice <span className="text-pink-500">*</span>
            </label>
            <input id="addonPlushCharacter" name="addonPlushCharacter" type="text" required
              value={form.addonPlushCharacter} onChange={handleChange}
              placeholder="e.g. Hello Kitty, Pikachu, Stitch" className={inputClass} />
          </div>
        )}

        {form.addonBanner && (
          <div className="flex flex-col gap-1">
            <label htmlFor="addonBannerPhrase" className="text-sm text-gray-600">
              Banner Phrase <span className="text-pink-500">*</span>
            </label>
            <input id="addonBannerPhrase" name="addonBannerPhrase" type="text" required
              value={form.addonBannerPhrase} onChange={handleChange}
              placeholder='e.g. "Happy Birthday Sofia!" or "Te Quiero Mucho"'
              maxLength={50} className={inputClass} />
            <p className="text-xs text-gray-400">{form.addonBannerPhrase.length}/50 characters</p>
          </div>
        )}
      </fieldset>

      {/* Fulfillment */}
      <fieldset id="section-fulfillment" className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">Fulfillment</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {([
            { value: "pickup", label: "Local Pickup", description: "Ready within 4 hours" },
            { value: "delivery", label: "Local Delivery", description: "Within 15 miles" },
            { value: "shipping", label: "Ship to Me", description: "Artificial arrangements only" },
          ] as const).map(({ value, label, description }) => (
            <button key={value} type="button" onClick={() => set("fulfillment", value)}
              className={cardClass(form.fulfillment === value)}>
              <span className="text-sm font-medium text-gray-800">{label}</span>
              <span className="text-xs text-gray-500">{description}</span>
            </button>
          ))}
        </div>
        {fieldErrors.fulfillment && <p className="text-xs text-red-500">{fieldErrors.fulfillment}</p>}

        {needsAddress && (
          <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            {form.fulfillment === "delivery" && (
              <p className="text-xs text-amber-600">Delivery is available within 15 miles of our location. We&apos;ll confirm your area when we follow up.</p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="addressLine1" className="text-sm text-gray-600">Address <span className="text-pink-500">*</span></label>
              <input id="addressLine1" name="addressLine1" type="text" required
                value={form.addressLine1} onChange={handleChange} placeholder="123 Main St" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="addressLine2" className="text-sm text-gray-600">Apt / Suite</label>
              <input id="addressLine2" name="addressLine2" type="text"
                value={form.addressLine2} onChange={handleChange} placeholder="Apt 4B (optional)" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                <label htmlFor="city" className="text-sm text-gray-600">City <span className="text-pink-500">*</span></label>
                <input id="city" name="city" type="text" required
                  value={form.city} onChange={handleChange} placeholder="Phoenix" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="state" className="text-sm text-gray-600">State <span className="text-pink-500">*</span></label>
                <input id="state" name="state" type="text" required
                  value={form.state} onChange={handleChange} placeholder="AZ" maxLength={2}
                  className={`${inputClass} uppercase`} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="zip" className="text-sm text-gray-600">ZIP <span className="text-pink-500">*</span></label>
                <input id="zip" name="zip" type="text" required
                  value={form.zip} onChange={handleChange} placeholder="85001" maxLength={10} className={inputClass} />
              </div>
            </div>
          </div>
        )}
      </fieldset>

      {/* Date & Time */}
      {form.fulfillment && (
        <fieldset className="flex flex-col gap-4">
          <legend className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">
            {form.fulfillment === "shipping" ? "Desired Ship Date" : "Requested Date & Time"}
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm text-gray-600">Date <span className="text-pink-500">*</span></label>
              <input id="date" name="date" type="date" required min={minDate}
                value={form.date} onChange={handleChange} className={inputClass} />
            </div>
            {form.fulfillment !== "shipping" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="time" className="text-sm text-gray-600">Preferred Time</label>
                <input id="time" name="time" type="time"
                  value={form.time} onChange={handleChange} className={inputClass} />
              </div>
            )}
          </div>
          {form.fulfillment === "pickup" && (
            <p className="text-xs text-gray-500">Pickup orders are typically ready within 4 hours. We&apos;ll confirm your exact time when we follow up.</p>
          )}
          {form.fulfillment === "delivery" && (
            <p className="text-xs text-gray-500">Next-day delivery available. Delivery date must be at least 1 day from today.</p>
          )}
        </fieldset>
      )}

      {/* Inspiration Photo */}
      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Inspiration Photo
        </label>
        <p className="text-xs text-gray-500">Upload a photo of an arrangement you love — helps us understand your style.</p>
        <input id="image" name="image" type="file" accept="image/*"
          onChange={handleImageChange}
          className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer" />
        {imageError && <p className="text-xs text-red-500">{imageError}</p>}
        {image && <p className="text-xs text-green-600">✓ {image.name}</p>}
      </div>

      {/* Additional Notes */}
      <div className="flex flex-col gap-1">
        <label htmlFor="additionalNotes" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Additional Notes
        </label>
        <textarea id="additionalNotes" name="additionalNotes" rows={3}
          value={form.additionalNotes} onChange={handleChange}
          placeholder="Anything else we should know about your order..."
          className={`${inputClass} resize-none`} />
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
      )}

      <button type="submit" disabled={submitting}
        className="bg-pink-500 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? "Sending..." : "Send Inquiry"}
      </button>

      <p className="text-xs text-center text-gray-400">
        We&apos;ll follow up within 24 hours to discuss your order and finalize details.
      </p>
    </form>
  );
}
