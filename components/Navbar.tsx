"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logos/logo1.png" alt="MZ Art of Bloom" width={958} height={866} style={{ height: '52px', width: 'auto' }} />
          <span style={{ fontFamily: 'var(--font-josefin)' }} className="text-xl text-pink-500 uppercase">MZ Art of Bloom</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/shop" className="hover:text-pink-500 transition-colors">
            Shop
          </Link>
          <Link href="/order/custom" className="hover:text-pink-500 transition-colors">
            Custom Order
          </Link>
          <Link
            href="/shop"
            className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            Order Now
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 hover:text-pink-500"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-pink-100 px-6 pb-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors pt-3">
            Shop
          </Link>
          <Link href="/order/custom" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">
            Custom Order
          </Link>
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="bg-pink-500 text-white text-center px-5 py-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
