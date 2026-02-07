import { create } from "zustand";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getItemByProduct: (
    productId: string,
    size: string,
    color: string
  ) => CartItem | undefined;
  getItemCount: () => number;
  clearCart: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existing = get().getItemByProduct(
      item.productId,
      item.size,
      item.color
    );
    if (existing) {
      // If same product+size+color already in cart, increase quantity
      set((state) => ({
        items: state.items.map((i) =>
          i.id === existing.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      }));
    } else {
      set((state) => ({
        items: [...state.items, { ...item, id: generateId() }],
      }));
    }
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  updateQuantity: (id, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },
  getItemByProduct: (productId, size, color) => {
    return get().items.find(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
    );
  },
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  clearCart: () => {
    set({ items: [] });
  },
}));
