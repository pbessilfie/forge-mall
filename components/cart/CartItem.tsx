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
      <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-[#F0EEED] shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 128px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div className="space-y-1">
          {/* Product Name & Delete Button */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-sm md:text-base text-black line-clamp-2 leading-snug">
              {item.name}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-600 transition-colors shrink-0 p-0.5"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Size & Color */}
          <div className="text-xs md:text-sm text-black/60 space-y-0.5">
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

        {/* Price & Quantity — wraps on very small screens */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="font-bold text-lg md:text-xl text-black">
            ${item.price}
          </span>

          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={handleQuantityChange}
            min={1}
            className="gap-2 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
