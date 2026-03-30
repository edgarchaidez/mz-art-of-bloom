import { client } from "@/sanity/lib/client";
import {
  allArrangementsQuery,
  featuredArrangementsQuery,
  arrangementBySlugQuery,
  allSlugsQuery,
} from "@/sanity/lib/queries";

export const SHIPPING_FEE = 15;

export type Material = "artificial" | "natural";

export type Arrangement = {
  slug: string;
  name: string;
  description: string;
  price: number;
  occasion: string[];
  images: string[];
  featured: boolean;
  material: Material;
  hasBanner: boolean;
};

export async function getArrangements(): Promise<Arrangement[]> {
  return client.fetch(allArrangementsQuery);
}

export async function getArrangement(slug: string): Promise<Arrangement | null> {
  return client.fetch(arrangementBySlugQuery, { slug });
}

export async function getFeaturedArrangements(): Promise<Arrangement[]> {
  return client.fetch(featuredArrangementsQuery);
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(allSlugsQuery);
}
