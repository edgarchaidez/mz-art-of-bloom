import Link from "next/link";
import { arrangements } from "@/lib/arrangements";
import ShopCatalog from "@/components/ShopCatalog";

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="font-script text-6xl text-pink-500 mb-3">Our Arrangements</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Every arrangement is made to order with fresh, seasonal blooms.
          See something you love? Order directly or reach out for a custom creation.
        </p>
      </div>

      <ShopCatalog arrangements={arrangements} />

      {/* Custom Order CTA */}
      <div className="mt-16 bg-pink-50 rounded-3xl p-10 text-center flex flex-col items-center gap-4">
        <h2 className="font-script text-4xl text-pink-500">Don&apos;t see what you&apos;re looking for?</h2>
        <p className="text-gray-500 text-sm max-w-md">
          We create custom arrangements for any occasion. Tell us your vision and we&apos;ll bring it to life.
        </p>
        <Link
          href="/order/custom"
          className="bg-pink-500 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
        >
          Request a Custom Order
        </Link>
      </div>
    </div>
  );
}
