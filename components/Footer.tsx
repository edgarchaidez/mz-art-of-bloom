import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="font-script text-2xl text-pink-500">Mz Art of Bloom</span>
          <p className="text-sm text-gray-500 mt-1">Handcrafted floral arrangements for every occasion.</p>
        </div>

        <nav className="flex gap-6 text-sm text-gray-600">
          <Link href="/shop" className="hover:text-pink-500 transition-colors">Shop</Link>
          <Link href="/order/custom" className="hover:text-pink-500 transition-colors">Custom Order</Link>
        </nav>

        <p className="text-xs text-gray-400">© {new Date().getFullYear()} MZ Art of Bloom. All rights reserved.</p>
      </div>
    </footer>
  );
}
