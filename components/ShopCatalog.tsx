"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Arrangement, Material } from "@/lib/arrangements";

type Filter = Material | "all";

const filterLabels: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "artificial", label: "Artificial" },
  { value: "natural", label: "Natural" },
];

export default function ShopCatalog({ arrangements }: { arrangements: Arrangement[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? arrangements : arrangements.filter((a) => a.material === filter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex items-center gap-2 mb-10">
        <span className="text-sm text-gray-500 mr-1">Filter:</span>
        {filterLabels.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === value
                ? "bg-pink-500 text-white"
                : "border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-500"
            }`}
          >
            {label}
          </button>
        ))}
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
