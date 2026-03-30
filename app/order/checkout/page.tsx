import Link from "next/link";
import { notFound } from "next/navigation";
import { getArrangement } from "@/lib/arrangements";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;

  if (!slug) notFound();

  const arrangement = getArrangement(slug);
  if (!arrangement) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/shop" className="hover:text-pink-500 transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/shop/${arrangement.slug}`} className="hover:text-pink-500 transition-colors">
          {arrangement.name}
        </Link>
        <span>/</span>
        <span className="text-gray-600">Checkout</span>
      </nav>

      <h1 className="font-script text-5xl text-pink-500 mb-10">Complete Your Order</h1>

      {/* Order Summary */}
      <div className="bg-pink-50 rounded-2xl p-6 mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">You&apos;re ordering</p>
          <p className="font-semibold text-gray-900">{arrangement.name}</p>
          <p className="text-sm text-gray-500 mt-0.5">{arrangement.occasion.join(" · ")}</p>
        </div>
        <p className="text-2xl font-bold text-pink-500">${arrangement.price}</p>
      </div>

      {/* Mock payment notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-8 text-sm text-amber-700">
        <strong>Demo mode:</strong> No real payment is processed. This simulates the checkout flow.
      </div>

      <CheckoutForm arrangement={arrangement} />
    </div>
  );
}
