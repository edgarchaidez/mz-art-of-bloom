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

export const US_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC","PR","GU","VI","AS","MP",
]);

export const SHIPPING_FEE = 15;
export const DELIVERY_FEE = 15;

// Approximate local coverage around 19th Ave & Southern, based on ZIP maps:
// https://www.firstthingsfirst.org/wp-content/uploads/2024/09/Regional-Needs-and-Assets-2024-Phoenix-South.pdf (p. 137)
// https://www.tempe.gov/home/showpublisheddocument/104549/638328103622870000
// This is a geographic estimate, not a verified 15-mile driving limit.
// Exclude Mesa, outer suburbs, and large ZIPs such as Laveen's 85339,
// whose farther addresses can require substantially longer drives.
export const DELIVERY_ZIP_CODES = new Set([
  // Downtown, central, west, and south Phoenix
  "85003", "85004", "85006", "85007", "85008", "85009",
  "85012", "85013", "85014", "85015", "85017", "85019",
  "85031", "85033", "85034", "85035", "85040", "85041", "85042", "85043",
  // Central Tempe; keep the farther East Valley excluded
  "85282",
]);

export type Material = "artificial" | "natural";

export type Arrangement = {
  slug: string;
  name: string;
  description: string;
  price: number;
  occasion: string[];
  style: string[];
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
