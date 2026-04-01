import { groq } from "next-sanity";

const arrangementFields = groq`
  name,
  "slug": slug.current,
  description,
  price,
  material,
  occasion,
  "images": images[].asset->url,
  featured,
  hasBanner,
  shippingFee,
  available
`;

export const allArrangementsQuery = groq`
  *[_type == "arrangement"] | order(_createdAt asc) { ${arrangementFields} }
`;

export const featuredArrangementsQuery = groq`
  *[_type == "arrangement" && featured == true] | order(_createdAt asc) { ${arrangementFields} }
`;

export const arrangementBySlugQuery = groq`
  *[_type == "arrangement" && slug.current == $slug][0] { ${arrangementFields} }
`;

export const allSlugsQuery = groq`
  *[_type == "arrangement"] { "slug": slug.current }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] { acceptingOrders, unavailableMessage }
`;
