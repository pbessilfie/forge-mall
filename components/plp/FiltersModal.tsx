"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({ isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("Large");
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    colors: true,
    size: true,
    dressStyle: true,
  });

  const categories = [
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

  const dressStyles = [
    { label: "Casual", value: "casual" },
    { label: "Formal", value: "formal" },
    { label: "Party", value: "party" },
    { label: "Gym", value: "gym" },
  ];

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "px-6 fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90dvh] overflow-y-auto transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/10 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-black/60" />
          </button>
        </div>

        {/* Content */}
        <div className="pb-6">
          {/* Categories */}
          <div className="border-b border-black/10 py-5">
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.value}>
                  <button className="flex items-center justify-between w-full text-left text-black/60 hover:text-black transition-colors py-1">
                    <span className="text-base">{category.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="border-b border-black/10 py-5">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full mb-5"
            >
              <h3 className="text-base font-bold text-black">Price</h3>
              {expandedSections.price ? (
                <ChevronUp className="w-5 h-5 text-black/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-black/60" />
              )}
            </button>

            {expandedSections.price && (
              <div className="space-y-4">
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-black">${priceRange[0]}</span>
                  <span className="font-semibold text-black">${priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="border-b border-black/10 py-5">
            <button
              onClick={() => toggleSection("colors")}
              className="flex items-center justify-between w-full mb-5"
            >
              <h3 className="text-base font-bold text-black">Colors</h3>
              {expandedSections.colors ? (
                <ChevronUp className="w-5 h-5 text-black/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-black/60" />
              )}
            </button>

            {expandedSections.colors && (
              <div className="flex flex-wrap gap-2.5">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => toggleColor(color.value)}
                    className={cn(
                      "w-11 h-11 rounded-full border-2 transition-all relative",
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
                        stroke={
                          color.hex === "#FFFFFF" || color.hex === "#F5DD06"
                            ? "#000"
                            : "#fff"
                        }
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
            )}
          </div>

          {/* Size */}
          <div className="border-b border-black/10 py-5">
            <button
              onClick={() => toggleSection("size")}
              className="flex items-center justify-between w-full mb-5"
            >
              <h3 className="text-base font-bold text-black">Size</h3>
              {expandedSections.size ? (
                <ChevronUp className="w-5 h-5 text-black/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-black/60" />
              )}
            </button>

            {expandedSections.size && (
              <div className="grid grid-cols-3 gap-2">
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
            )}
          </div>

          {/* Dress Style */}
          <div className="border-b border-black/10 py-5">
            <button
              onClick={() => toggleSection("dressStyle")}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="text-base font-bold text-black">Dress Style</h3>
              {expandedSections.dressStyle ? (
                <ChevronUp className="w-5 h-5 text-black/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-black/60" />
              )}
            </button>

            {expandedSections.dressStyle && (
              <ul className="space-y-3">
                {dressStyles.map((style) => (
                  <li key={style.value}>
                    <button className="flex items-center justify-between w-full text-left text-black/60 hover:text-black transition-colors py-1">
                      <span className="text-base">{style.label}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Apply Filter Button */}
          <div className="pt-6">
            <Button
              onClick={onClose}
              className="w-full bg-black text-white py-6 rounded-full text-base font-medium hover:bg-black/90 transition-colors"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersModal;
