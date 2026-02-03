"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  className?: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
  className,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm text-black/60 font-normal">
        Choose Size
      </h3>
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={cn(
                "px-5 md:px-6 py-2 rounded-full text-sm font-normal transition-all",
                isSelected
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-black/60 hover:bg-black/10"
              )}
              aria-label={`Select size ${size}`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
