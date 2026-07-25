import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Refund and cancellation policy for MZ Art of Bloom orders.",
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-script text-5xl text-pink-500 mb-2">Refund &amp; Cancellation Policy</h1>

      <div className="flex flex-col gap-8 text-gray-700 leading-relaxed">
        <p>
          At MZ Art of Bloom, every bouquet is handcrafted and made to order. Due to the custom
          nature of our products, all sales are final.
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Cancellations</h2>
          <p>
            Orders may be canceled within 1 hour of purchase for a full refund. After the 1-hour
            cancellation window has passed, your order enters production and cancellations, refunds,
            or changes cannot be guaranteed.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Refunds</h2>
          <p>We do not offer refunds or exchanges for:</p>
          <ul className="list-disc list-inside flex flex-col gap-1 text-gray-600">
            <li>Change of mind</li>
            <li>Incorrect information provided by the customer (including delivery address or recipient details)</li>
            <li>Delayed pickups</li>
            <li>Minor variations in flower colors, wrapping, or decorations due to availability and the handcrafted nature of each bouquet</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Shipped Artificial Bouquet Damage</h2>
          <p>
            The only exception to our no-refund policy applies to artificial bouquets shipped through
            a carrier that arrive damaged during transit.
          </p>
          <p>To be eligible for a replacement or refund, you must:</p>
          <ul className="list-disc list-inside flex flex-col gap-1 text-gray-600">
            <li>Contact us within 24 hours of delivery.</li>
            <li>Provide clear photos of the damaged bouquet, the shipping box, all packaging materials, and the shipping label.</li>
            <li>Keep all original packaging until your claim has been reviewed.</li>
          </ul>
          <p>
            Once your claim is reviewed and approved, we may offer a replacement or a full refund,
            depending on the extent of the damage.
          </p>
          <p>This exception does not apply to:</p>
          <ul className="list-disc list-inside flex flex-col gap-1 text-gray-600">
            <li>Fresh flower bouquets</li>
            <li>Local deliveries</li>
            <li>Customer pickups</li>
            <li>Damage occurring after the order has been delivered or picked up in good condition</li>
          </ul>
        </section>

        <p className="text-sm text-gray-500 border-t border-gray-100 pt-6">
          By placing an order with MZ Art of Bloom, you acknowledge and agree to this Refund &amp; Cancellation Policy.
        </p>
      </div>
    </div>
  );
}
