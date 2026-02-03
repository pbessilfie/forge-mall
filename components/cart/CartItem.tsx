"use client";

import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import QuantitySelector from "@/components/ui/quantity-selector";

export interface CartItemData {
  id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  className?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
  className,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <div
      className={cn(
        "flex gap-4 pb-6 border-b border-black/10 last:border-b-0",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-[#F0EEED] shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 128px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Product Name & Delete Button */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base md:text-lg text-black">
              {item.name}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-600 hover:text-red-700 transition-colors shrink-0"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Size & Color */}
          <div className="text-sm text-black/60 space-y-0.5">
            <p>
              <span className="font-normal">Size: </span>
              <span className="font-medium">{item.size}</span>
            </p>
            <p>
              <span className="font-normal">Color: </span>
              <span className="font-medium">{item.color}</span>
            </p>
          </div>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl md:text-2xl text-black">
            ${item.price}
          </span>

          {/* Quantity Selector */}
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={handleQuantityChange}
            min={1}
            className="gap-4 px-4 py-2.5"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
