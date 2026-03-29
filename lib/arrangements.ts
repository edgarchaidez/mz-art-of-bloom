export const SHIPPING_FEE = 15;

export type Material = "artificial" | "natural";

export type Arrangement = {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: "bouquet" | "centerpiece" | "arrangement" | "custom";
  occasion: string[];
  images: string[];
  featured: boolean;
  material: Material;
  hasBanner: boolean;
};

export const arrangements: Arrangement[] = [
  {
    slug: "hello-kitty-bouquet",
    name: "Hello Kitty Bouquet",
    description:
      "50 artificial pink and red foam roses arranged around a 7\" Hello Kitty plush, topped with a sparkling crown and finished with a custom ribbon banner. A bold, eye-catching gift that lasts forever.",
    price: 95,
    category: "bouquet",
    occasion: ["Birthday", "Anniversary", "Gift", "Romance"],
    images: [
      "/arrangements/hello-kitty-artificial-bouqet/IMG_9023.jpeg",
      "/arrangements/hello-kitty-artificial-bouqet/IMG_9025.jpeg",
      "/arrangements/hello-kitty-artificial-bouqet/IMG_9854.jpeg",
    ],
    featured: true,
    material: "artificial",
    hasBanner: true,
  },
  {
    slug: "hello-kitty-bouquet-pink",
    name: "Hello Kitty Pink Bouquet",
    description:
      "34 artificial pink and white foam roses surrounding an 8\" Hello Kitty plush, wrapped in exclusive Hello Kitty pink wrapping. Sweet, soft, and made to be cherished.",
    price: 85,
    category: "bouquet",
    occasion: ["Birthday", "Romance", "Gift"],
    images: [
      "/arrangements/hello-kitty-artificial-bouqet-34/IMG_9241.jpeg",
      "/arrangements/hello-kitty-artificial-bouqet-34/IMG_9242.jpeg",
    ],
    featured: true,
    material: "artificial",
    hasBanner: false,
  },
  {
    slug: "snoopy-bouquet",
    name: "Snoopy Bouquet",
    description:
      "19 eternal cream white ribbon roses paired with a Snoopy paper cutout and a custom banner. Timeless, elegant, and a little playful — just like the pup himself.",
    price: 80,
    category: "bouquet",
    occasion: ["Birthday", "Gift", "Celebration"],
    images: [
      "/arrangements/snoopy-bouquet/IMG_8850.jpeg",
      "/arrangements/snoopy-bouquet/IMG_8846.jpeg",
    ],
    featured: true,
    material: "artificial",
    hasBanner: true,
  },
  {
    slug: "fresh-pink-bouquet",
    name: "Fresh Pink Bouquet",
    description:
      "A vibrant arrangement of fresh pink roses and seasonal blooms, hand-assembled and wrapped to order. Natural florals at their finest — best enjoyed same day.",
    price: 75,
    category: "bouquet",
    occasion: ["Birthday", "Anniversary", "Gift"],
    images: [
      "/arrangements/snoopy-bouquet/IMG_8850.jpeg",
    ],
    featured: false,
    material: "natural",
    hasBanner: false,
  },
  {
    slug: "stitch-bouquet",
    name: "Stitch Bouquet",
    description:
      "Blue and pink artificial foam roses with a 7\" Stitch plush at the center, wrapped in blue Stitch-themed paper and finished with a custom banner. Perfect for any Lilo & Stitch fan.",
    price: 90,
    category: "bouquet",
    occasion: ["Romance", "Birthday", "Gift"],
    images: [
      "/arrangements/stitch-artificial-bouqet/IMG_8968.jpeg",
      "/arrangements/stitch-artificial-bouqet/IMG_8969.jpeg",
    ],
    featured: false,
    material: "artificial",
    hasBanner: true,
  },
];

export function getArrangement(slug: string): Arrangement | undefined {
  return arrangements.find((a) => a.slug === slug);
}

export function getFeaturedArrangements(): Arrangement[] {
  return arrangements.filter((a) => a.featured);
}
