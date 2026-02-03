"use client";

import React from "react";
import { CreditCard, Wallet, CircleDollarSign, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export type PaymentMethod = "card" | "paypal" | "cash";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  className?: string;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
  className,
}) => {
  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      label: "Credit / Debit Card",
      icon: CreditCard,
    },
    {
      id: "paypal" as PaymentMethod,
      label: "PayPal",
      icon: Wallet,
    },
    {
      id: "cash" as PaymentMethod,
      label: "Cash on Delivery",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-xl md:text-2xl font-bold text-black mb-5">
        Payment Method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 md:p-5 rounded-xl border-2 transition-all",
                isSelected
                  ? "border-black bg-[#F0F0F0]"
                  : "border-black/10 bg-white hover:border-black/30"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors",
                    isSelected ? "bg-black" : "bg-[#F0F0F0]"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6",
                      isSelected ? "text-white" : "text-black"
                    )}
                  />
                </div>
                <span className="text-base md:text-lg font-medium text-black">
                  {method.label}
                </span>
              </div>

              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Card Details Form (shown when card is selected) */}
      {selectedMethod === "card" && (
        <div className="space-y-4 pt-4">
          <Input type="text" placeholder="Card Number" />
          <div className="grid grid-cols-2 gap-4">
            <Input type="text" placeholder="MM/YY" />
            <Input type="text" placeholder="CVV" />
          </div>
          <Input type="text" placeholder="Cardholder Name" />
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
