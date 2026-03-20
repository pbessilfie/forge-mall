import { searchableProducts } from "./searchData";
import {
  mockProductDetails,
  mockReviews,
  ProductDetails,
} from "./mockProductDetails";
import { Color } from "@/components/pdp/ColorSelector";

const defaultColors: Color[] = [
  { name: "Black", value: "black", hex: "#1A1A1A" },
  { name: "White", value: "white", hex: "#F5F5F5" },
  { name: "Navy", value: "navy", hex: "#1B2A4A" },
];

const defaultSizes = ["Small", "Medium", "Large", "X-Large"];

// Deterministic "review count" based on product id characters
const pseudoReviewCount = (id: string): number => {
  const n = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (n % 280) + 60;
};

export const getProductDetails = (id: string): ProductDetails | null => {
  // Return the rich mock for the featured product
  if (id === mockProductDetails.id) {
    return mockProductDetails;
  }

  // Build a sensible ProductDetails from any product in our searchable catalog
  const product = searchableProducts.find((p) => p.id === id);
  if (!product) return null;

  const highResImage = product.image
    .replace("w=400&h=400", "w=800&h=800")
    .replace("w=400", "w=800");

  return {
    id: product.id,
    name: product.name,
    images: [
      { id: "1", url: highResImage, alt: `${product.name} — Front View` },
      { id: "2", url: highResImage, alt: `${product.name} — Side View` },
      { id: "3", url: highResImage, alt: `${product.name} — Back View` },
    ],
    rating: product.rating,
    reviewCount: pseudoReviewCount(product.id),
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    description: `${product.name} — a premium piece crafted for everyday style and lasting comfort. Part of our curated collection of essentials built to stand the test of time.`,
    colors: defaultColors,
    sizes: defaultSizes,
    details: `Premium quality ${product.name.toLowerCase()}.

Key Features:
• Premium fabric construction
• Comfortable everyday fit
• Durable double-stitched seams
• Pre-shrunk material — true to size

Care Instructions:
• Machine wash cold with like colors
• Tumble dry on low heat
• Do not bleach or dry clean`,
    faqs: mockProductDetails.faqs,
  };
};

export { mockReviews };
