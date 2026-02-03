import { Product } from "@/components/products/ProductCard";

export const onSaleProducts: Product[] = [
  {
    id: "sale-1",
    name: "Skinny Fit Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&q=80",
    price: 192,
    originalPrice: 240,
    discount: 20,
    rating: 4.5,
  },
  {
    id: "sale-2",
    name: "Sleeve Striped T-shirt",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop&q=80",
    price: 112,
    originalPrice: 160,
    discount: 30,
    rating: 4.0,
  },
  {
    id: "sale-3",
    name: "Vertical Striped Shirt",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&q=80",
    price: 186,
    originalPrice: 232,
    discount: 20,
    rating: 5.0,
  },
  {
    id: "sale-4",
    name: "Black Striped T-shirt",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&q=80",
    price: 105,
    originalPrice: 150,
    discount: 30,
    rating: 4.5,
  },
  {
    id: "sale-5",
    name: "Classic Denim Jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&q=80",
    price: 175,
    originalPrice: 250,
    discount: 30,
    rating: 4.8,
  },
  {
    id: "sale-6",
    name: "Cotton Casual Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&q=80",
    price: 126,
    originalPrice: 180,
    discount: 30,
    rating: 4.2,
  },
  {
    id: "sale-7",
    name: "Summer Linen Pants",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop&q=80",
    price: 68,
    originalPrice: 85,
    discount: 20,
    rating: 3.8,
  },
  {
    id: "sale-8",
    name: "Graphic Print Hoodie",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&q=80",
    price: 84,
    originalPrice: 120,
    discount: 30,
    rating: 4.6,
  },
  {
    id: "sale-9",
    name: "Slim Fit Chinos",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop&q=80",
    price: 72,
    originalPrice: 90,
    discount: 20,
    rating: 4.3,
  },
  {
    id: "sale-10",
    name: "Premium Cotton Polo",
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=400&fit=crop&q=80",
    price: 63,
    originalPrice: 90,
    discount: 30,
    rating: 4.7,
  },
  {
    id: "sale-11",
    name: "Vintage Wash Jeans",
    image:
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=400&fit=crop&q=80",
    price: 168,
    originalPrice: 210,
    discount: 20,
    rating: 4.4,
  },
  {
    id: "sale-12",
    name: "Oversized Graphic Tee",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&q=80",
    price: 87,
    originalPrice: 145,
    discount: 40,
    rating: 4.1,
  },
];

// Helper function to get products by discount range
export const getProductsByDiscount = (minDiscount: number, maxDiscount: number = 100): Product[] => {
  return onSaleProducts.filter(
    (product) => product.discount && product.discount >= minDiscount && product.discount <= maxDiscount
  );
};

// Get all unique discount percentages
export const getUniqueDiscounts = (): number[] => {
  const discounts = onSaleProducts
    .map((product) => product.discount)
    .filter((discount): discount is number => discount !== undefined);
  return [...new Set(discounts)].sort((a, b) => b - a);
};
