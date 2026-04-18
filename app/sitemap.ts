import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/arrangements";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const arrangements = slugs.map(({ slug }) => ({
    url: `https://www.mzartofbloom.com/shop/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.mzartofbloom.com",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.mzartofbloom.com/shop",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.mzartofbloom.com/order/custom",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...arrangements,
  ];
}
