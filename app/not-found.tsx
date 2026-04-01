import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
      <span className="text-6xl">🌸</span>
      <h1 className="font-script text-6xl text-pink-500">Oops!</h1>
      <p className="text-gray-500 leading-relaxed">
        We couldn&apos;t find the page you&apos;re looking for. It may have been moved or doesn&apos;t exist.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <Link
          href="/shop"
          className="bg-pink-500 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
        >
          Browse Arrangements
        </Link>
        <Link
          href="/"
          className="border border-green-500 text-green-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-green-50 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
