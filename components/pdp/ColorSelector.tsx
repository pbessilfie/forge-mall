"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Color {
  name: string;
  value: string;
  hex: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  className?: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorChange,
  className,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm text-black/60 font-normal">
        Select Colors
      </h3>
      <div className="flex items-center gap-3 flex-wrap">
        {colors.map((color) => {
          const isSelected = selectedColor === color.value;
          return (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className={cn(
                "relative w-9 h-9 rounded-full border-2 transition-all",
                isSelected
                  ? "border-black scale-110"
                  : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select ${color.name} color`}
              title={color.name}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check
                    className={cn(
                      "w-4 h-4",
                      // Use white check for dark colors, black for light colors
                      color.hex === "#FFFFFF" || color.hex === "#F0EEED"
                        ? "text-black"
                        : "text-white"
                    )}
                    strokeWidth={3}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
