"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className,
}) => {
  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-5 bg-[#F0F0F0] rounded-full px-5 py-3 w-fit",
        className
      )}
    >
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="text-black hover:text-black/60 disabled:text-black/30 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-5 h-5" strokeWidth={2} />
      </button>

      <span className="text-base font-medium text-black min-w-[2ch] text-center">
        {quantity}
      </span>

      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="text-black hover:text-black/60 disabled:text-black/30 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
};

export default QuantitySelector;
