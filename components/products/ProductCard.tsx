import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="text-gray-300 text-sm" />
      );
    }

    return stars;
  };

  return (
    <Link
      // href={`/product/${product.id}`}
      href={`/product-details`}
      className={cn(
        "group flex flex-col gap-3 cursor-pointer w-full",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F0EEED]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2">
        {/* Product Name */}
        <h3 className="font-bold text-base md:text-lg text-black line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-black/60">
            {product.rating.toFixed(1)}/5
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl md:text-2xl text-black">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="font-bold text-xl md:text-2xl text-black/40 line-through">
                ${product.originalPrice}
              </span>
              {product.discount && (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                  -{product.discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
