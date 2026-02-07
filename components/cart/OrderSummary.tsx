"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Tag } from "lucide-react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  summaryItemsContainer,
  summaryItemVariant,
} from "@/lib/motion-variants";

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

// Animated number component for smooth price transitions
const AnimatedPrice = ({
  value,
  prefix = "$",
  className,
}: {
  value: number;
  prefix?: string;
  className?: string;
}) => {
  const spring = useSpring(value, {
    stiffness: 100,
    damping: 20,
  });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [display]);

  return (
    <span className={className}>
      {prefix}
      {displayValue}
    </span>
  );
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount,
  discountPercentage,
  deliveryFee,
  onCheckout,
  showPromoCode = true,
  buttonVisibility = true,
  className,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const total = subtotal - discount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setIsPromoApplied(true);
      console.log("Applying promo code:", promoCode);
      // Simulate promo application
      setTimeout(() => setIsPromoApplied(false), 2000);
    }
  };

  return (
    <motion.div
      className={cn(
        "bg-white border border-black/10 rounded-3xl p-5 md:p-6 space-y-5 h-fit",
        className
      )}
      variants={summaryItemsContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className="text-xl md:text-2xl font-bold text-black"
        variants={summaryItemVariant}
      >
        Order Summary
      </motion.h2>

      {/* Summary Details */}
      <div className="space-y-4">
        {/* Subtotal */}
        <motion.div
          className="flex items-center justify-between"
          variants={summaryItemVariant}
        >
          <span className="text-base md:text-lg text-black/60">Subtotal</span>
          <AnimatedPrice
            value={subtotal}
            className="text-base md:text-lg font-bold text-black"
          />
        </motion.div>

        {/* Discount */}
        <motion.div
          className="flex items-center justify-between"
          variants={summaryItemVariant}
        >
          <span className="text-base md:text-lg text-black/60">
            Discount (-{discountPercentage}%)
          </span>
          <AnimatedPrice
            value={discount}
            prefix="-$"
            className="text-base md:text-lg font-bold text-red-600"
          />
        </motion.div>

        {/* Delivery Fee */}
        <motion.div
          className="flex items-center justify-between"
          variants={summaryItemVariant}
        >
          <span className="text-base md:text-lg text-black/60">
            Delivery Fee
          </span>
          <AnimatedPrice
            value={deliveryFee}
            className="text-base md:text-lg font-bold text-black"
          />
        </motion.div>

        {/* Divider */}
        <motion.hr
          className="border-black/10"
          variants={summaryItemVariant}
        />

        {/* Total */}
        <motion.div
          className="flex items-center justify-between"
          variants={summaryItemVariant}
        >
          <span className="text-lg md:text-xl font-medium text-black">
            Total
          </span>
          <AnimatedPrice
            value={total}
            className="text-xl md:text-2xl font-bold text-black"
          />
        </motion.div>
      </div>

      {/* Promo Code Input */}
      <AnimatePresence>
        {showPromoCode && (
          <motion.div
            className="flex items-center gap-3"
            variants={summaryItemVariant}
            initial="initial"
            animate="animate"
          >
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
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleApplyPromo}
                disabled={isPromoApplied}
                className="bg-black text-white hover:bg-black/90 rounded-full px-6 md:px-8 text-sm md:text-base font-medium py-2.5 h-auto disabled:opacity-70"
              >
                <AnimatePresence mode="wait">
                  {isPromoApplied ? (
                    <motion.span
                      key="applied"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      Applied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="apply"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      Apply
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Button */}
      {buttonVisibility && (
        <motion.div variants={summaryItemVariant}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <Button
              onClick={onCheckout}
              className="w-full bg-black text-white hover:bg-black/90 rounded-full text-sm md:text-base font-medium flex items-center justify-center gap-2 py-2.5 h-auto"
            >
              Go to Checkout
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderSummary;
