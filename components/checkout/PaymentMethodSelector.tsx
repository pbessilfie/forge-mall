"use client";

import { CreditCard, Wallet, CircleDollarSign, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  formFieldsContainer,
  formFieldVariant,
  paymentMethodVariant,
  cardFormReveal,
} from "@/lib/motion-variants";

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
    <motion.div
      className={cn("space-y-4", className)}
      variants={formFieldsContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className="text-xl md:text-2xl font-bold text-black mb-5"
        variants={formFieldVariant}
      >
        Payment Method
      </motion.h2>

      <div className="space-y-3">
        {paymentMethods.map((method, index) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <motion.button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 md:p-5 rounded-xl border-2 transition-colors",
                isSelected
                  ? "border-black bg-[#F0F0F0]"
                  : "border-black/10 bg-white hover:border-black/30"
              )}
              variants={paymentMethodVariant}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              style={{
                boxShadow: isSelected
                  ? "0 4px 20px -4px rgba(0, 0, 0, 0.12)"
                  : "none",
              }}
              custom={index}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  )}
                  animate={{
                    backgroundColor: isSelected ? "#000000" : "#F0F0F0",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6 transition-colors duration-200",
                      isSelected ? "text-white" : "text-black"
                    )}
                  />
                </motion.div>
                <span className="text-base md:text-lg font-medium text-black">
                  {method.label}
                </span>
              </div>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    className="w-6 h-6 rounded-full bg-black flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                    }}
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Card Details Form (shown when card is selected) */}
      <AnimatePresence>
        {selectedMethod === "card" && (
          <motion.div
            className="space-y-4 pt-4 overflow-hidden"
            variants={cardFormReveal}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
            >
              <Input
                type="text"
                placeholder="Card Number"
                className="transition-all duration-200 focus:ring-2 focus:ring-black/5"
              />
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
            >
              <Input
                type="text"
                placeholder="MM/YY"
                className="transition-all duration-200 focus:ring-2 focus:ring-black/5"
              />
              <Input
                type="text"
                placeholder="CVV"
                className="transition-all duration-200 focus:ring-2 focus:ring-black/5"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              <Input
                type="text"
                placeholder="Cardholder Name"
                className="transition-all duration-200 focus:ring-2 focus:ring-black/5"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PaymentMethodSelector;
