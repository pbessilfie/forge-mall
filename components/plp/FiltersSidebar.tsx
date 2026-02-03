"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FiltersSidebarProps {
  className?: string;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ className }) => {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("Large");

  const categories: FilterOption[] = [
    { label: "T-shirts", value: "t-shirts" },
    { label: "Shorts", value: "shorts" },
    { label: "Shirts", value: "shirts" },
    { label: "Hoodie", value: "hoodie" },
    { label: "Jeans", value: "jeans" },
  ];

  const colors = [
    { name: "Green", value: "green", hex: "#00C12B" },
    { name: "Red", value: "red", hex: "#F50606" },
    { name: "Yellow", value: "yellow", hex: "#F5DD06" },
    { name: "Orange", value: "orange", hex: "#F57906" },
    { name: "Cyan", value: "cyan", hex: "#06CAF5" },
    { name: "Blue", value: "blue", hex: "#063AF5" },
    { name: "Purple", value: "purple", hex: "#7D06F5" },
    { name: "Pink", value: "pink", hex: "#F506A4" },
    { name: "White", value: "white", hex: "#FFFFFF" },
    { name: "Black", value: "black", hex: "#000000" },
  ];

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  const dressStyles: FilterOption[] = [
    { label: "Casual", value: "casual" },
    { label: "Formal", value: "formal" },
    { label: "Party", value: "party" },
    { label: "Gym", value: "gym" },
  ];

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  return (
    <aside className={cn("bg-white rounded-2xl border border-black/10 p-5 md:p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-black">Filters</h2>
        <SlidersHorizontal className="w-5 h-5 text-black/60" />
      </div>

      {/* Categories */}
      <div className="border-t border-black/10 pt-5 mb-6">
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.value}>
              <button className="flex items-center justify-between w-full text-left text-black/60 hover:text-black transition-colors">
                <span className="text-base">{category.label}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="border-t border-black/10 pt-5 mb-6">
        <h3 className="text-base font-bold text-black mb-5">Price</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="50"
            max="200"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-black">${priceRange[0]}</span>
            <span className="font-semibold text-black">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="border-t border-black/10 pt-5 mb-6">
        <h3 className="text-base font-bold text-black mb-5">Colors</h3>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleColor(color.value)}
              className={cn(
                "w-10 h-10 rounded-full border-2 transition-all relative",
                selectedColors.includes(color.value)
                  ? "border-black scale-110"
                  : "border-transparent hover:scale-105",
                color.hex === "#FFFFFF" && "border-black/20"
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            >
              {selectedColors.includes(color.value) && (
                <svg
                  className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={color.hex === "#FFFFFF" || color.hex === "#F5DD06" ? "#000" : "#fff"}
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="border-t border-black/10 pt-5 mb-6">
        <h3 className="text-base font-bold text-black mb-5">Size</h3>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-4 py-2.5 rounded-full text-sm font-medium transition-colors",
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-black/60 hover:bg-black/5"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style */}
      <div className="border-t border-black/10 pt-5 mb-6">
        <h3 className="text-base font-bold text-black mb-4">Dress Style</h3>
        <ul className="space-y-3">
          {dressStyles.map((style) => (
            <li key={style.value}>
              <button className="flex items-center justify-between w-full text-left text-black/60 hover:text-black transition-colors">
                <span className="text-base">{style.label}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Apply Filter Button */}
      <Button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-black/80 transition-colors">
        Apply Filter
      </Button>
    </aside>
  );
};

export default FiltersSidebar;
