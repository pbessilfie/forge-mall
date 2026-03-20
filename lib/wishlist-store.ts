import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/components/products/ProductCard";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  getItemCount: () => number;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      toggleItem: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isWishlisted: (id) => get().items.some((item) => item.id === id),
      getItemCount: () => get().items.length,
      clearWishlist: () => set({ items: [] }),
    }),
    { name: "forge-mall-wishlist" }
  )
);
