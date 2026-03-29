import Link from "next/link";
import { getArrangement } from "@/lib/arrangements";

export default async function SuccessPage(props: PageProps<never>) {
  const searchParams = await (props as { searchParams: Promise<{ type?: string; arrangement?: string }> }).searchParams;
  const type = searchParams?.type ?? "order";
  const arrangementSlug = searchParams?.arrangement;
  const arrangement = arrangementSlug ? getArrangement(arrangementSlug) : null;

  const isInquiry = type === "inquiry";

  return (
    <div className="max-w-lg mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-script text-6xl text-pink-500">
        {isInquiry ? "Inquiry Sent!" : "Order Placed!"}
      </h1>

      {isInquiry ? (
        <p className="text-gray-600 leading-relaxed">
          Thank you for reaching out! We&apos;ve received your custom order inquiry and will
          follow up within <strong>24 hours</strong> to discuss your vision and finalize details.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-3">
          {arrangement && (
            <div className="bg-pink-50 rounded-2xl px-6 py-4 w-full">
              <p className="text-sm text-gray-500">You ordered</p>
              <p className="font-semibold text-gray-900">{arrangement.name}</p>
              <p className="text-pink-500 font-bold">${arrangement.price}</p>
            </div>
          )}
          <p className="text-gray-600 leading-relaxed">
            Thank you for your order! We&apos;ll be in touch shortly to confirm your arrangement
            and arrange pickup or delivery details.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
          href="/shop"
          className="border border-pink-400 text-pink-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
        >
          Back to Shop
        </Link>
        <Link
          href="/"
          className="bg-pink-500 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
