"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Brand } from "@/lib/mockBrands";

interface FeaturedBrandCardProps {
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

const FeaturedBrandCard: React.FC<FeaturedBrandCardProps> = ({
  brand,
  className,
}) => {
  return (
    <Link
      href={`/category/${brand.slug}`}
      className={cn(
        "group relative flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-[#F5F5F5] hover:bg-[#EFEFEF] transition-all duration-200 cursor-pointer min-h-[220px] md:min-h-[260px] overflow-hidden",
        className
      )}
    >
      {/* Arrow Icon */}
      <div className="absolute top-5 right-5 md:top-6 md:right-6 w-10 h-10 rounded-full bg-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200">
        <ArrowUpRight className="w-5 h-5 text-white" />
      </div>

      {/* Top Section - Style Tag */}
      <div className="flex items-start">
        {brand.styleTag && (
          <span
            className={cn(
              "text-xs font-medium px-3 py-1.5 rounded-full",
              styleTagColors[brand.styleTag] || "bg-gray-100 text-gray-600"
            )}
          >
            {brand.styleTag}
          </span>
        )}
      </div>

      {/* Bottom Section - Brand Info */}
      <div className="mt-auto">
        {/* Brand Logo Placeholder */}
        <div className="mb-3">
          <span className="text-3xl md:text-4xl font-bold text-black/80 tracking-tight group-hover:text-black transition-colors duration-200">
            {brand.name}
          </span>
        </div>

        {/* Description */}
        {brand.description && (
          <p className="text-sm text-black/50 mb-2 line-clamp-1">
            {brand.description}
          </p>
        )}

        {/* Product Count */}
        {brand.productCount && (
          <span className="text-sm font-medium text-black/60">
            {brand.productCount} products
          </span>
        )}
      </div>
    </Link>
  );
};

export default FeaturedBrandCard;
