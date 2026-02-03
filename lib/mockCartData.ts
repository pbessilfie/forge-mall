import { CartItemData } from "@/components/cart/CartItem";

export const mockCartItems: CartItemData[] = [
  {
    id: "cart-1",
    name: "Gradient Graphic T-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80",
    size: "Large",
    color: "White",
    price: 145,
    quantity: 1,
  },
  {
    id: "cart-2",
    name: "Checkered Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&q=80",
    size: "Medium",
    color: "Red",
    price: 180,
    quantity: 1,
  },
  {
    id: "cart-3",
    name: "Skinny Fit Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&q=80",
    size: "Large",
    color: "Blue",
    price: 240,
    quantity: 1,
  },
];

export const calculateCartTotals = (items: CartItemData[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountPercentage = 20;
  const discount = Math.round((subtotal * discountPercentage) / 100);
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return {
    subtotal,
    discount,
    discountPercentage,
    deliveryFee,
    total,
  };
};
