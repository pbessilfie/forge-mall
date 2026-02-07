import { Product } from "@/components/products/ProductCard";

export interface NewArrivalProduct extends Product {
  isNew?: boolean;
  category?: "men" | "women" | "unisex";
  dateAdded?: string;
}

export const newArrivalsProducts: NewArrivalProduct[] = [
  {
    id: "new-1",
    name: "T-shirt with Tape Details",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80",
    price: 120,
    rating: 4.5,
    isNew: true,
    category: "men",
    dateAdded: "2024-01-15",
  },
  {
    id: "new-2",
    name: "Skinny Fit Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&q=80",
    price: 240,
    rating: 4.0,
    isNew: true,
    category: "unisex",
    dateAdded: "2024-01-14",
  },
  {
    id: "new-3",
    name: "Checkered Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&q=80",
    price: 180,
    rating: 4.5,
    isNew: true,
    category: "men",
    dateAdded: "2024-01-13",
  },
  {
    id: "new-4",
    name: "Sleeve Striped T-shirt",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop&q=80",
    price: 130,
    rating: 4.5,
    isNew: true,
    category: "women",
    dateAdded: "2024-01-12",
  },
  {
    id: "new-5",
    name: "Classic Denim Jacket",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop&q=80",
    price: 280,
    rating: 4.8,
    isNew: true,
    category: "unisex",
    dateAdded: "2024-01-11",
  },
  {
    id: "new-6",
    name: "Oversized Hoodie",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&q=80",
    price: 165,
    rating: 4.2,
    isNew: true,
    category: "unisex",
    dateAdded: "2024-01-10",
  },
  {
    id: "new-7",
    name: "Floral Summer Dress",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop&q=80",
    price: 195,
    rating: 4.7,
    isNew: true,
    category: "women",
    dateAdded: "2024-01-09",
  },
  {
    id: "new-8",
    name: "Linen Blend Trousers",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop&q=80",
    price: 145,
    rating: 4.3,
    isNew: true,
    category: "men",
    dateAdded: "2024-01-08",
  },
  {
    id: "new-9",
    name: "Cropped Cardigan",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&q=80",
    price: 98,
    rating: 4.1,
    isNew: true,
    category: "women",
    dateAdded: "2024-01-07",
  },
  {
    id: "new-10",
    name: "Slim Fit Chinos",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop&q=80",
    price: 125,
    rating: 4.4,
    isNew: true,
    category: "men",
    dateAdded: "2024-01-06",
  },
  {
    id: "new-11",
    name: "Ribbed Tank Top",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop&q=80",
    price: 45,
    rating: 4.0,
    isNew: true,
    category: "women",
    dateAdded: "2024-01-05",
  },
  {
    id: "new-12",
    name: "Wool Blend Coat",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop&q=80",
    price: 320,
    rating: 4.9,
    isNew: true,
    category: "unisex",
    dateAdded: "2024-01-04",
  },
];

export type SortOption = "newest" | "price_asc" | "price_desc" | "rating";
export type CategoryFilter = "all" | "men" | "women" | "unisex";

export const sortNewArrivals = (
  products: NewArrivalProduct[],
  sortBy: SortOption
): NewArrivalProduct[] => {
  const sorted = [...products];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.dateAdded || "").getTime() -
          new Date(a.dateAdded || "").getTime()
      );
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};

export const filterByCategory = (
  products: NewArrivalProduct[],
  category: CategoryFilter
): NewArrivalProduct[] => {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
};
