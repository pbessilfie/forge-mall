import { allProducts } from "./mockProducts";
import { newArrivalsProducts } from "./mockNewArrivals";
import { onSaleProducts } from "./mockOnSaleProducts";
import { Product } from "@/components/products/ProductCard";

// Combine all product sources, deduplicated by id
const seen = new Set<string>();
const combined: Product[] = [];

for (const product of [
  ...allProducts,
  ...newArrivalsProducts,
  ...onSaleProducts,
]) {
  if (!seen.has(product.id)) {
    seen.add(product.id);
    combined.push(product);
  }
}

export const searchableProducts: Product[] = combined;

export const searchProducts = (query: string, limit = 6): Product[] => {
  if (!query.trim() || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  return searchableProducts
    .filter((p) => p.name.toLowerCase().includes(q))
    .slice(0, limit);
};
