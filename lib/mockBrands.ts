export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
  styleTag?: "Luxury" | "Streetwear" | "Casual" | "Athletic" | "Minimalist" | "Contemporary";
  featured?: boolean;
  productCount?: number;
}

export const brands: Brand[] = [
  {
    id: "1",
    name: "Gucci",
    slug: "gucci",
    logo: "/brands/gucci.svg",
    description: "Italian luxury fashion house",
    styleTag: "Luxury",
    featured: true,
    productCount: 245,
  },
  {
    id: "2",
    name: "Prada",
    slug: "prada",
    logo: "/brands/prada.svg",
    description: "Italian luxury fashion brand",
    styleTag: "Luxury",
    featured: true,
    productCount: 189,
  },
  {
    id: "3",
    name: "Versace",
    slug: "versace",
    logo: "/brands/versace.svg",
    description: "Bold Italian luxury fashion",
    styleTag: "Luxury",
    featured: true,
    productCount: 156,
  },
  {
    id: "4",
    name: "Zara",
    slug: "zara",
    logo: "/brands/zara.svg",
    description: "Fast fashion retailer",
    styleTag: "Contemporary",
    featured: true,
    productCount: 892,
  },
  {
    id: "5",
    name: "Calvin Klein",
    slug: "calvin-klein",
    logo: "/brands/calvin-klein.svg",
    description: "American fashion house",
    styleTag: "Minimalist",
    featured: false,
    productCount: 423,
  },
  {
    id: "6",
    name: "Adidas",
    slug: "adidas",
    logo: "/brands/adidas.svg",
    description: "German sportswear manufacturer",
    styleTag: "Athletic",
    featured: false,
    productCount: 756,
  },
  {
    id: "7",
    name: "Nike",
    slug: "nike",
    logo: "/brands/nike.svg",
    description: "American athletic apparel",
    styleTag: "Athletic",
    featured: false,
    productCount: 934,
  },
  {
    id: "8",
    name: "Balenciaga",
    slug: "balenciaga",
    logo: "/brands/balenciaga.svg",
    description: "Spanish luxury fashion house",
    styleTag: "Luxury",
    featured: false,
    productCount: 178,
  },
  {
    id: "9",
    name: "Burberry",
    slug: "burberry",
    logo: "/brands/burberry.svg",
    description: "British luxury fashion house",
    styleTag: "Luxury",
    featured: false,
    productCount: 267,
  },
  {
    id: "10",
    name: "Champion",
    slug: "champion",
    logo: "/brands/champion.svg",
    description: "American athletic apparel",
    styleTag: "Athletic",
    featured: false,
    productCount: 312,
  },
  {
    id: "11",
    name: "Diesel",
    slug: "diesel",
    logo: "/brands/diesel.svg",
    description: "Italian retail clothing company",
    styleTag: "Casual",
    featured: false,
    productCount: 198,
  },
  {
    id: "12",
    name: "Fendi",
    slug: "fendi",
    logo: "/brands/fendi.svg",
    description: "Italian luxury fashion house",
    styleTag: "Luxury",
    featured: false,
    productCount: 145,
  },
  {
    id: "13",
    name: "H&M",
    slug: "h-and-m",
    logo: "/brands/hm.svg",
    description: "Swedish fashion retailer",
    styleTag: "Casual",
    featured: false,
    productCount: 1247,
  },
  {
    id: "14",
    name: "Hugo Boss",
    slug: "hugo-boss",
    logo: "/brands/hugo-boss.svg",
    description: "German luxury fashion house",
    styleTag: "Contemporary",
    featured: false,
    productCount: 356,
  },
  {
    id: "15",
    name: "Lacoste",
    slug: "lacoste",
    logo: "/brands/lacoste.svg",
    description: "French clothing company",
    styleTag: "Casual",
    featured: false,
    productCount: 287,
  },
  {
    id: "16",
    name: "Levi's",
    slug: "levis",
    logo: "/brands/levis.svg",
    description: "American clothing company",
    styleTag: "Casual",
    featured: false,
    productCount: 534,
  },
  {
    id: "17",
    name: "Mango",
    slug: "mango",
    logo: "/brands/mango.svg",
    description: "Spanish clothing brand",
    styleTag: "Contemporary",
    featured: false,
    productCount: 678,
  },
  {
    id: "18",
    name: "New Balance",
    slug: "new-balance",
    logo: "/brands/new-balance.svg",
    description: "American sports footwear",
    styleTag: "Athletic",
    featured: false,
    productCount: 423,
  },
  {
    id: "19",
    name: "Off-White",
    slug: "off-white",
    logo: "/brands/off-white.svg",
    description: "Italian streetwear label",
    styleTag: "Streetwear",
    featured: false,
    productCount: 89,
  },
  {
    id: "20",
    name: "Ralph Lauren",
    slug: "ralph-lauren",
    logo: "/brands/ralph-lauren.svg",
    description: "American fashion company",
    styleTag: "Contemporary",
    featured: false,
    productCount: 445,
  },
  {
    id: "21",
    name: "Supreme",
    slug: "supreme",
    logo: "/brands/supreme.svg",
    description: "American streetwear brand",
    styleTag: "Streetwear",
    featured: false,
    productCount: 156,
  },
  {
    id: "22",
    name: "Tommy Hilfiger",
    slug: "tommy-hilfiger",
    logo: "/brands/tommy-hilfiger.svg",
    description: "American fashion brand",
    styleTag: "Casual",
    featured: false,
    productCount: 512,
  },
  {
    id: "23",
    name: "Under Armour",
    slug: "under-armour",
    logo: "/brands/under-armour.svg",
    description: "American sports equipment",
    styleTag: "Athletic",
    featured: false,
    productCount: 389,
  },
  {
    id: "24",
    name: "Uniqlo",
    slug: "uniqlo",
    logo: "/brands/uniqlo.svg",
    description: "Japanese casual wear",
    styleTag: "Minimalist",
    featured: false,
    productCount: 867,
  },
];

export const featuredBrands = brands.filter((brand) => brand.featured);

export const getBrandsByLetter = (letter: string): Brand[] => {
  return brands.filter(
    (brand) => brand.name.charAt(0).toUpperCase() === letter.toUpperCase()
  );
};

export const getAvailableLetters = (): string[] => {
  const letters = new Set(brands.map((brand) => brand.name.charAt(0).toUpperCase()));
  return Array.from(letters).sort();
};

export const searchBrands = (query: string): Brand[] => {
  const lowercaseQuery = query.toLowerCase();
  return brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(lowercaseQuery) ||
      brand.styleTag?.toLowerCase().includes(lowercaseQuery)
  );
};
