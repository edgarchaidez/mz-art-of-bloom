import { client } from "@/sanity/lib/client";
import {
  allArrangementsQuery,
  featuredArrangementsQuery,
  arrangementBySlugQuery,
  allSlugsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

export type SiteSettings = {
  acceptingOrders: boolean;
  unavailableMessage: string;
};

export const SHIPPING_FEE = 15;
export const DELIVERY_FEE = 15;

export const DELIVERY_ZIP_CODES = new Set([
  // Phoenix
  "85001","85002","85003","85004","85005","85006","85007","85008","85009",
  "85010","85011","85012","85013","85014","85015","85016","85017","85018",
  "85019","85020","85021","85022","85023","85024","85027","85028","85029",
  "85031","85032","85033","85034","85035","85037","85040","85041","85042",
  "85043","85044","85045","85048","85050","85051","85053","85054",
  // Tempe
  "85281","85282","85283","85284","85285","85287",
  // Mesa
  "85201","85202","85203","85204","85205","85206","85207","85208","85209",
  "85210","85212","85213","85215","85216",
  // Chandler
  "85224","85225","85226","85244","85246","85248","85249",
  // Gilbert
  "85233","85234","85295","85296","85297","85298",
  // Glendale
  "85301","85302","85303","85304","85305","85306","85307","85308","85309",
  "85310","85318",
  // Peoria
  "85345","85380","85381","85382","85383",
  // Scottsdale
  "85250","85251","85253","85254","85255","85257","85258","85259","85260",
  "85266","85268",
  // Avondale / Laveen / Goodyear
  "85323","85338","85339",
  // Tolleson
  "85353",
]);

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
  shippingFee?: number;
  available: boolean;
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

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await client.fetch(siteSettingsQuery);
  return settings ?? { acceptingOrders: true, unavailableMessage: "We're currently not accepting new orders. Please check back soon!" };
}
