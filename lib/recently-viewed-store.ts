import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/components/products/ProductCard";

const MAX_ITEMS = 8;

interface RecentlyViewedStore {
  products: Product[];
  addProduct: (product: Product) => void;
  clearAll: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        const deduped = get().products.filter((p) => p.id !== product.id);
        set({ products: [product, ...deduped].slice(0, MAX_ITEMS) });
      },
      clearAll: () => set({ products: [] }),
    }),
    { name: "forge-mall-recently-viewed" }
  )
);
