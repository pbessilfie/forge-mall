"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Brand } from "@/lib/mockBrands";

interface BrandCardProps {
  brand: Brand;
  className?: string;
}

const styleTagColors: Record<string, string> = {
  Luxury: "bg-amber-50 text-amber-700",
  Streetwear: "bg-purple-50 text-purple-700",
  Casual: "bg-blue-50 text-blue-700",
  Athletic: "bg-green-50 text-green-700",
  Minimalist: "bg-gray-100 text-gray-700",
  Contemporary: "bg-rose-50 text-rose-700",
};

const BrandCard: React.FC<BrandCardProps> = ({ brand, className }) => {
  return (
    <Link
      href={`/category/${brand.slug}`}
      className={cn(
        "group flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FAFAFA] border border-transparent hover:border-black/5 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer",
        className
      )}
    >
      {/* Brand Logo Container */}
      <div className="w-full h-20 flex items-center justify-center mb-4">
        <div className="relative w-24 h-16 flex items-center justify-center">
          {/* Placeholder for logo - using text as fallback */}
          <span className="text-2xl font-bold text-black/80 tracking-tight group-hover:text-black transition-colors duration-200">
            {brand.name.split(" ")[0]}
          </span>
        </div>
      </div>

      {/* Brand Name */}
      <h3 className="font-semibold text-base text-black text-center mb-1.5">
        {brand.name}
      </h3>

      {/* Style Tag */}
      {brand.styleTag && (
        <span
          className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-full",
            styleTagColors[brand.styleTag] || "bg-gray-100 text-gray-600"
          )}
        >
          {brand.styleTag}
        </span>
      )}

      {/* Product Count (subtle) */}
      {brand.productCount && (
        <span className="text-xs text-black/40 mt-2">
          {brand.productCount} products
        </span>
      )}
    </Link>
  );
};

export default BrandCard;
