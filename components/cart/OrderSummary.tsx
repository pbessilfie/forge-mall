"use client";

import React, { useState } from "react";
import { ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  discountPercentage: number;
  deliveryFee: number;
  onCheckout?: () => void;
  showPromoCode?: boolean;
  buttonVisibility?: boolean;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount,
  discountPercentage,
  deliveryFee,
  onCheckout,
  showPromoCode = true,buttonVisibility = true,
  className,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const total = subtotal - discount + deliveryFee;

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
    // Implement promo code logic here
  };

  return (
    <div
      className={cn(
        "bg-white border border-black/10 rounded-3xl p-5 md:p-6 space-y-5 h-fit",
        className
      )}
    >
      <h2 className="text-xl md:text-2xl font-bold text-black">
        Order Summary
      </h2>

      {/* Summary Details */}
      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-base md:text-lg text-black/60">Subtotal</span>
          <span className="text-base md:text-lg font-bold text-black">
            ${subtotal}
          </span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between">
          <span className="text-base md:text-lg text-black/60">
            Discount (-{discountPercentage}%)
          </span>
          <span className="text-base md:text-lg font-bold text-red-600">
            -${discount}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex items-center justify-between">
          <span className="text-base md:text-lg text-black/60">
            Delivery Fee
          </span>
          <span className="text-base md:text-lg font-bold text-black">
            ${deliveryFee}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-black/10" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl font-medium text-black">
            Total
          </span>
          <span className="text-xl md:text-2xl font-bold text-black">
            ${total}
          </span>
        </div>
      </div>

      {/* Promo Code Input */}
      {showPromoCode && (
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 bg-[#F0F0F0] rounded-full px-4 py-2.5">
            <Tag className="w-5 h-5 text-black/40" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Add promo code"
              className="flex-1 bg-transparent text-sm md:text-base text-black placeholder:text-black/40 outline-none"
            />
          </div>
          <Button
            onClick={handleApplyPromo}
            className="bg-black text-white hover:bg-black/90 rounded-full px-6 md:px-8 text-sm md:text-base font-medium py-2.5 h-auto"
          >
            Apply
          </Button>
        </div>
      )}

      {/* Checkout Button */}
      {buttonVisibility && <Button
        onClick={onCheckout}
        className="w-full bg-black text-white hover:bg-black/90 rounded-full text-sm md:text-base font-medium flex items-center justify-center gap-2 py-2.5 h-auto"
      >
        Go to Checkout
        <ArrowRight className="w-5 h-5" />
      </Button>}
    </div>
  );
};

export default OrderSummary;
