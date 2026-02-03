"use client";

import React, { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import ColorSelector, { Color } from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "@/components/ui/quantity-selector";
import { Button } from "@/components/ui/button";

interface ProductInfoProps {
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  colors: Color[];
  sizes: string[];
  className?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  rating,
  reviewCount,
  price,
  originalPrice,
  discount,
  description,
  colors,
  sizes,
  className,
}) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.value || "");
  const [selectedSize, setSelectedSize] = useState(sizes[2] || sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 md:w-6 md:h-6 fill-[#FFC633] text-[#FFC633]"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 md:w-6 md:h-6 fill-[#FFC633] text-[#FFC633]"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 md:w-6 md:h-6 fill-none text-[#FFC633]"
        />
      );
    }

    return stars;
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", {
      name,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    // Add to cart logic here
  };

  return (
    <div className={cn("space-y-4 md:space-y-5", className)}>
      {/* Product Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase leading-tight">
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">{renderStars(rating)}</div>
        <span className="text-xs text-black font-normal">
          {rating}/5
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xl md:text-3xl font-bold text-black">
          ${price}
        </span>
        {originalPrice && originalPrice > price && (
          <>
            <span className="text-2xl md:text-3xl font-bold text-black/40 line-through">
              ${originalPrice}
            </span>
            {discount && (
              <span className="px-3 py-1.5 bg-red-100 text-red-600 text-xs md:text-sm font-medium rounded-full">
                -{discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-black/60 leading-relaxed">
        {description}
      </p>

      {/* Separator */}
      <hr className="border-black/10" />

      {/* Color Selector */}
      <ColorSelector
        colors={colors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      {/* Separator */}
      <hr className="border-black/10" />

      {/* Size Selector */}
      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      {/* Separator */}
      <hr className="border-black/10" />

      {/* Quantity Selector & Add to Cart */}
      <div className="flex items-center gap-3 md:gap-4 flex-wrap">
        <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
        <Button
          onClick={handleAddToCart}
          className="flex-1 min-w-50 bg-black text-white hover:bg-black/90 rounded-full py-6 text-base font-medium"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
