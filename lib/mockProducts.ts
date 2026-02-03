import { Product } from "@/components/products/ProductCard";

export const newArrivals: Product[] = [
  {
    id: "1",
    name: "T-shirt with Tape Details",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80",
    price: 120,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Skinny Fit Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&q=80",
    price: 240,
    originalPrice: 260,
    discount: 20,
    rating: 3.5,
  },
  {
    id: "3",
    name: "Checkered Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&q=80",
    price: 180,
    rating: 4.5,
  },
  {
    id: "4",
    name: "Sleeve Striped T-shirt",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop&q=80",
    price: 130,
    originalPrice: 160,
    discount: 30,
    rating: 4.5,
  },
  {
    id: "5",
    name: "Checkered Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&q=80",
    price: 180,
    rating: 4.5,
  },
];

export const topSelling: Product[] = [
  {
    id: "6",
    name: "Courage Graphic T-shirt",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&q=80",
    price: 145,
    rating: 4.0,
  },
  {
    id: "7",
    name: "Loose Fit Bermuda Shorts",
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&q=80",
    price: 80,
    rating: 3.0,
  },
  {
    id: "8",
    name: "Checkered Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&q=80",
    price: 180,
    rating: 4.5,
  },
  {
    id: "9",
    name: "Faded Skinny Jeans",
    image:
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=400&fit=crop&q=80",
    price: 210,
    rating: 4.5,
  },
  {
    id: "10",
    name: "Vertical Striped Shirt",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&q=80",
    price: 212,
    originalPrice: 232,
    discount: 20,
    rating: 5.0,
  },
];

// All products for category listing
export const allProducts: Product[] = [
  ...newArrivals,
  ...topSelling,
  {
    id: "11",
    name: "Gradient Graphic T-shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80",
    price: 145,
    rating: 3.5,
  },
  {
    id: "12",
    name: "Polo with Tipping Details",
    image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=400&fit=crop&q=80",
    price: 180,
    rating: 4.5,
  },
  {
    id: "13",
    name: "Black Striped T-shirt",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&q=80",
    price: 120,
    originalPrice: 150,
    discount: 30,
    rating: 5.0,
  },
];
