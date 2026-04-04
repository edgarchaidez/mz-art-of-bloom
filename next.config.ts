import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Prevent browser HTTP caching and BFCache on the checkout page.
        // Cache-Control: no-store is the only reliable signal that prevents both —
        // unload listeners no longer prevent BFCache in Chrome 123+.
        source: "/order/checkout",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
