"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Arrangement, Material } from "@/lib/arrangements";

type MaterialFilter = Material | "all";

const materialLabels: { value: MaterialFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "artificial", label: "Artificial" },
  { value: "natural", label: "Natural" },
];

export default function ShopCatalog({ arrangements }: { arrangements: Arrangement[] }) {
  const [materialFilter, setMaterialFilter] = useState<MaterialFilter>("all");
  const [styleFilter, setStyleFilter] = useState<string>("all");

  const styles = Array.from(new Set(arrangements.flatMap((a) => (a.style ?? []).filter(Boolean)))).sort();

  const filtered = arrangements.filter((a) => {
    if (materialFilter !== "all" && a.material !== materialFilter) return false;
    if (styleFilter !== "all" && !(a.style ?? []).includes(styleFilter)) return false;
    return true;
  });

  const arrow = (
    <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const selectClass = "appearance-none border border-pink-200 rounded-xl pl-3 pr-7 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white cursor-pointer hover:border-pink-400 transition-colors";

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-3 mb-10 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Material:</span>
          <div className="relative">
            <select value={materialFilter} onChange={(e) => setMaterialFilter(e.target.value as MaterialFilter)} className={selectClass}>
              <option value="all">All</option>
              {materialLabels.slice(1).map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {arrow}
          </div>
        </div>
        {styles.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Theme:</span>
            <div className="relative">
              <select value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)} className={selectClass}>
                <option value="all">All</option>
                {styles.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {arrow}
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {filtered.map((arrangement) => (
          <Link
            key={arrangement.slug}
            href={`/shop/${arrangement.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-pink-50"
          >
            <div className="relative aspect-square bg-pink-100 overflow-hidden">
              <Image
                src={arrangement.images[0]}
                alt={arrangement.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Material badge */}
              <span
                className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                  arrangement.material === "artificial"
                    ? "bg-white text-green-700 border border-green-200"
                    : "bg-white text-amber-700 border border-amber-200"
                }`}
              >
                {arrangement.material === "artificial" ? "Ships" : "Pickup"}
              </span>
            </div>
            {/* Mobile: compact name + price */}
            <div className="p-3 flex items-center justify-between gap-2 lg:hidden">
              <h2 className="font-medium text-sm text-gray-900 group-hover:text-pink-500 transition-colors leading-tight">
                {arrangement.name}
              </h2>
              <span className="text-pink-500 font-semibold text-sm whitespace-nowrap">${arrangement.price}</span>
            </div>

            {/* Desktop: full card with description and tags */}
            <div className="hidden lg:block p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-medium text-gray-900 group-hover:text-pink-500 transition-colors">
                  {arrangement.name}
                </h2>
                <span className="text-pink-500 font-semibold whitespace-nowrap">${arrangement.price}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{arrangement.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {arrangement.occasion.map((tag) => (
                  <span key={tag} className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-16">No arrangements found.</p>
      )}
    </div>
  );
}
