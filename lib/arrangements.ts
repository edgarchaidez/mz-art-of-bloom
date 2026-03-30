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
  {
    slug: "hello-kitty-eternal-bouquet",
    name: "Hello Kitty Eternal Bouquet",
    description: "50 artificial pink, white, and hot pink foam roses arranged around a 7\" Hello Kitty plush, crowned with a sparkling tiara and adorned with delicate butterflies. Finished with a custom banner — a dreamy, forever-lasting arrangement that makes a statement.",
    price: 125,
    category: "bouquet",
    occasion: ["Birthday", "Gift", "Romance"],
    images: [
      "/arrangements/hello-kitty-eternal-artificial-bouquet/IMG_6926.jpeg",
      "/arrangements/hello-kitty-eternal-artificial-bouquet/IMG_6939.jpeg",
      "/arrangements/hello-kitty-eternal-artificial-bouquet/IMG_6940.jpeg",
    ],
    featured: false,
    material: "artificial",
    hasBanner: true,
  },
  {
    slug: "pink-roses-bouquet-100",
    name: "Pink Roses Bouquet (100)",
    description: "100 artificial pink roses and lilies bundled into a lush, full-bodied arrangement that makes an unforgettable impression. Includes a custom banner — perfect for the moment that deserves to be remembered.",
    price: 185,
    category: "bouquet",
    occasion: ["Anniversary", "Romance", "Birthday", "Gift"],
    images: [
      "/arrangements/pink-roses-artificial-bouquet-100/IMG_9045.jpeg",
      "/arrangements/pink-roses-artificial-bouquet-100/IMG_9855.jpeg",
    ],
    featured: false,
    material: "artificial",
    hasBanner: true,
  },
  {
    slug: "purple-foam-roses-bouquet",
    name: "Purple Foam Roses Bouquet",
    description: "34 artificial purple foam roses wrapped in luxurious purple Dior wrapping, crowned with a sparkling tiara and adorned with butterflies. A custom banner adds your personal touch to this bold, regal arrangement.",
    price: 115,
    category: "bouquet",
    occasion: ["Birthday", "Gift", "Romance"],
    images: [
      "/arrangements/purple-foam-roses-artificial-bouquet/IMG_9482.jpeg",
      "/arrangements/purple-foam-roses-artificial-bouquet/IMG_9856.jpeg",
    ],
    featured: false,
    material: "artificial",
    hasBanner: true,
  },
  {
    slug: "red-roses-with-crown-bouquet",
    name: "Red Roses with Crown Bouquet",
    description: "100 deep red artificial roses accented with decorative pearls and topped with a crown — dramatic, romantic, and built to last. Finished with a custom banner for a truly personalized touch.",
    price: 175,
    category: "bouquet",
    occasion: ["Anniversary", "Romance", "Birthday"],
    images: [
      "/arrangements/red-roses-with-crown-artificial-bouquet/IMG_8771.jpeg",
      "/arrangements/red-roses-with-crown-artificial-bouquet/IMG_8772.jpeg",
    ],
    featured: false,
    material: "artificial",
    hasBanner: true,
  },
  {
    slug: "hello-kitty-natural-bouquet",
    name: "Hello Kitty Natural Bouquet",
    description: "25 fresh pink roses surrounding a 7\" Hello Kitty plush, accented with delicate butterflies. A sweet fusion of real florals and playful charm — a custom banner can be added upon request.",
    price: 125,
    category: "bouquet",
    occasion: ["Birthday", "Gift", "Romance"],
    images: [
      "/arrangements/hello-kitty-natural-bouquet/IMG_9200.jpeg",
      "/arrangements/hello-kitty-natural-bouquet/IMG_9201.jpeg",
    ],
    featured: false,
    material: "natural",
    hasBanner: false,
  },
  {
    slug: "red-and-yellow-natural-bouquet",
    name: "Red & Yellow Natural Bouquet",
    description: "50 fresh red and golden-yellow roses with filler blooms dyed in deep black — a striking contrast of warmth and drama. A bold statement piece for those who aren't afraid to stand out.",
    price: 175,
    category: "bouquet",
    occasion: ["Birthday", "Gift", "Celebration"],
    images: [
      "/arrangements/red-and-yellow-natural-bouquet/IMG_8865.jpeg",
      "/arrangements/red-and-yellow-natural-bouquet/IMG_8867.jpeg",
    ],
    featured: false,
    material: "natural",
    hasBanner: false,
  },
  {
    slug: "goth-natural-bouquet",
    name: "Goth Natural Bouquet",
    description: "25 fresh roses paired with filler flowers dyed in deep black — moody, bold, and undeniably striking. For those who find beauty in the dark.",
    price: 75,
    category: "bouquet",
    occasion: ["Birthday", "Gift"],
    images: [
      "/arrangements/goth-natural-bouquet/IMG_9832.jpeg",
      "/arrangements/goth-natural-bouquet/IMG_9833.jpeg",
    ],
    featured: false,
    material: "natural",
    hasBanner: false,
  },
  {
    slug: "red-goth-natural-bouquet",
    name: "Red Goth Natural Bouquet",
    description: "25 fresh red roses layered with gerberas and mini carnations, all dyed in deep, dramatic hues. A rich, passionate arrangement with an edge.",
    price: 150,
    category: "bouquet",
    occasion: ["Birthday", "Gift"],
    images: [
      "/arrangements/red-goth-natural-bouquet/IMG_9736.jpeg",
      "/arrangements/red-goth-natural-bouquet/IMG_9737.jpeg",
    ],
    featured: false,
    material: "natural",
    hasBanner: false,
  },
];

export function getArrangement(slug: string): Arrangement | undefined {
  return arrangements.find((a) => a.slug === slug);
}

export function getFeaturedArrangements(): Arrangement[] {
  return arrangements.filter((a) => a.featured);
}
