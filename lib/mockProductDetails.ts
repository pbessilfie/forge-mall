import { ProductImage } from "@/components/pdp/ProductImageGallery";
import { Color } from "@/components/pdp/ColorSelector";
import { Review } from "@/components/pdp/ReviewCard";

export interface ProductDetails {
  id: string;
  name: string;
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  colors: Color[];
  sizes: string[];
  details: string;
  faqs: { question: string; answer: string }[];
}

export const mockProductDetails: ProductDetails = {
  id: "1",
  name: "One Life Graphic T-shirt",
  images: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&q=80",
      alt: "One Life Graphic T-shirt - Front View",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop&q=80",
      alt: "One Life Graphic T-shirt - Side View",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop&q=80",
      alt: "One Life Graphic T-shirt - Back View",
    },
  ],
  rating: 4.5,
  reviewCount: 451,
  price: 260,
  originalPrice: 300,
  discount: 40,
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  colors: [
    { name: "Olive Green", value: "olive", hex: "#4F5D2F" },
    { name: "Dark Green", value: "dark-green", hex: "#314F4A" },
    { name: "Navy Blue", value: "navy", hex: "#31344F" },
  ],
  sizes: ["Small", "Medium", "Large", "X-Large"],
  details: `This premium graphic t-shirt combines style and comfort in one perfect package. Made from 100% organic cotton, it features a unique "One Life" graphic print that makes a bold statement.

Key Features:
• 100% organic cotton fabric
• Soft and breathable material
• Unique graphic design
• Regular fit
• Ribbed crew neck
• Double-stitched sleeves and bottom hem
• Pre-shrunk fabric

Care Instructions:
• Machine wash cold with like colors
• Tumble dry low
• Do not bleach
• Iron on low heat if needed

Perfect for casual outings, everyday wear, or layering. This versatile piece pairs well with jeans, shorts, or joggers for a complete look.`,
  faqs: [
    {
      question: "What is the fit like?",
      answer:
        "This t-shirt has a regular fit that's true to size. It's not too tight or too loose, providing a comfortable and flattering silhouette for most body types.",
    },
    {
      question: "Is the graphic print durable?",
      answer:
        "Yes! The graphic is applied using high-quality screen printing technology that ensures long-lasting durability. It won't crack, peel, or fade even after multiple washes when care instructions are followed.",
    },
    {
      question: "Can I return or exchange if the size doesn't fit?",
      answer:
        "Absolutely! We offer free returns and exchanges within 30 days of purchase. The item must be unworn, unwashed, and in its original condition with tags attached.",
    },
    {
      question: "Is this t-shirt eco-friendly?",
      answer:
        "Yes! This t-shirt is made from 100% organic cotton, which is grown without harmful pesticides and uses less water than conventional cotton. We're committed to sustainable fashion.",
    },
  ],
};

export const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Samantha D.",
    rating: 4.5,
    comment:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my go-to shirt.",
    postedDate: "August 14, 2023",
    verified: true,
  },
  {
    id: "2",
    userName: "Alex M.",
    rating: 4,
    comment:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    postedDate: "August 15, 2023",
    verified: true,
  },
  {
    id: "3",
    userName: "Ethan R.",
    rating: 3.5,
    comment:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    postedDate: "August 16, 2023",
    verified: true,
  },
  {
    id: "4",
    userName: "Olivia P.",
    rating: 4,
    comment:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this shirt stand out.",
    postedDate: "August 17, 2023",
    verified: true,
  },
  {
    id: "5",
    userName: "Liam K.",
    rating: 4,
    comment:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    postedDate: "August 18, 2023",
    verified: true,
  },
  {
    id: "6",
    userName: "Ava H.",
    rating: 4.5,
    comment:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details of the design make this shirt a conversation starter. It's evident that the designer poured their creativity into making this shirt stand out.",
    postedDate: "August 19, 2023",
    verified: true,
  },
  {
    id: "7",
    userName: "Noah W.",
    rating: 5,
    comment:
      "Perfect t-shirt for everyday wear. The quality is outstanding and the design is timeless. I've washed it multiple times and it still looks brand new!",
    postedDate: "August 20, 2023",
    verified: true,
  },
  {
    id: "8",
    userName: "Emma S.",
    rating: 4,
    comment:
      "Great purchase! The t-shirt fits perfectly and the material is really comfortable. The only minor issue is that it took a bit longer to arrive than expected.",
    postedDate: "August 21, 2023",
    verified: true,
  },
  {
    id: "9",
    userName: "James B.",
    rating: 4.5,
    comment:
      "Love the design and the quality of the fabric. It's become one of my favorite t-shirts. Highly recommend for anyone looking for a stylish yet comfortable option.",
    postedDate: "August 22, 2023",
    verified: true,
  },
  {
    id: "10",
    userName: "Sophia L.",
    rating: 5,
    comment:
      "Absolutely fantastic! The t-shirt exceeded all my expectations. The print is vibrant, the fabric is soft, and the fit is perfect. Will definitely be ordering more!",
    postedDate: "August 23, 2023",
    verified: true,
  },
];
