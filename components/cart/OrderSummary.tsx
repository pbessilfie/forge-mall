"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Tag, X, Check } from "lucide-react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  summaryItemsContainer,
  summaryItemVariant,
  errorShakeVariant,
} from "@/lib/motion-variants";

// Hardcoded promo codes
const PROMO_CODES: Record<
  string,
  { label: string; discountPercent?: number; freeShipping?: boolean }
> = {
  FORGE10: { label: "10% off your order", discountPercent: 10 },
  WELCOME20: { label: "20% off your order", discountPercent: 20 },
  SALE30: { label: "30% off your order", discountPercent: 30 },
  FREESHIP: { label: "Free shipping", freeShipping: true },
};

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

const AnimatedPrice = ({
  value,
  prefix = "$",
  className,
}: {
  value: number;
  prefix?: string;
  className?: string;
}) => {
  const spring = useSpring(value, { stiffness: 100, damping: 20 });
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
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoFreeShipping, setPromoFreeShipping] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"idle" | "error">("idle");
  const [promoError, setPromoError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  const effectiveDelivery = promoFreeShipping ? 0 : deliveryFee;
  const total = subtotal - discount - promoDiscount + effectiveDelivery;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    const found = PROMO_CODES[code];
    if (!found) {
      setPromoStatus("error");
      setPromoError("Invalid promo code. Try FORGE10, WELCOME20, SALE30, or FREESHIP.");
      setShakeKey((k) => k + 1);
      return;
    }

    const extra = found.discountPercent
      ? Math.round(subtotal * (found.discountPercent / 100))
      : 0;

    setAppliedCode(code);
    setPromoDiscount(extra);
    setPromoFreeShipping(found.freeShipping ?? false);
    setPromoStatus("idle");
    setPromoError("");
    setPromoCode("");
  };

  const handleRemovePromo = () => {
    setAppliedCode(null);
    setPromoDiscount(0);
    setPromoFreeShipping(false);
    setPromoCode("");
    setPromoStatus("idle");
    setPromoError("");
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

        {/* Promo discount line — animated in/out */}
        <AnimatePresence>
          {promoDiscount > 0 && (
            <motion.div
              key="promo-discount"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between gap-2 overflow-hidden"
            >
              <span className="text-sm md:text-base text-green-700 flex items-center gap-1.5 min-w-0">
                <Tag className="w-4 h-4 shrink-0" />
                <span className="truncate">Promo ({appliedCode})</span>
              </span>
              <AnimatedPrice
                value={promoDiscount}
                prefix="-$"
                className="text-base md:text-lg font-bold text-green-700"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Free shipping line */}
        <AnimatePresence>
          {promoFreeShipping && (
            <motion.div
              key="free-shipping"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between gap-2 overflow-hidden"
            >
              <span className="text-sm md:text-base text-green-700 flex items-center gap-1.5 min-w-0">
                <Tag className="w-4 h-4 shrink-0" />
                <span className="truncate">Free Shipping ({appliedCode})</span>
              </span>
              <span className="text-base md:text-lg font-bold text-green-700">
                -${deliveryFee}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex items-center justify-between"
          variants={summaryItemVariant}
        >
          <span className="text-base md:text-lg text-black/60">
            Delivery Fee
          </span>
          <AnimatedPrice
            value={effectiveDelivery}
            className={cn(
              "text-base md:text-lg font-bold",
              promoFreeShipping ? "text-black/30 line-through" : "text-black"
            )}
          />
        </motion.div>

        <motion.hr className="border-black/10" variants={summaryItemVariant} />

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
            className="space-y-2"
            variants={summaryItemVariant}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="wait">
              {appliedCode ? (
                /* Applied state */
                <motion.div
                  key="applied"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 justify-between bg-green-50 border border-green-200 rounded-full px-4 py-2.5 min-w-0"
                >
                  <div className="flex items-center gap-2 text-green-700 min-w-0 flex-1">
                    <Check className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-semibold shrink-0">{appliedCode}</span>
                    <span className="text-sm text-green-600 truncate">
                      — {PROMO_CODES[appliedCode]?.label}
                    </span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-green-500 hover:text-green-700 transition-colors shrink-0"
                    aria-label="Remove promo code"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                /* Input state */
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    key={shakeKey}
                    variants={errorShakeVariant}
                    initial="initial"
                    animate={promoStatus === "error" ? "shake" : "initial"}
                    className="flex-1 min-w-0 flex items-center gap-2 bg-[#F0F0F0] rounded-full px-3 py-2.5"
                  >
                    <Tag className="w-4 h-4 text-black/40 shrink-0" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoStatus("idle");
                        setPromoError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      placeholder="Promo code"
                      className="flex-1 min-w-0 bg-transparent text-sm text-black placeholder:text-black/40 outline-none uppercase"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="shrink-0">
                    <Button
                      onClick={handleApplyPromo}
                      disabled={!promoCode.trim()}
                      className="bg-black text-white hover:bg-black/90 rounded-full px-5 text-sm font-medium py-2.5 h-auto disabled:opacity-40"
                    >
                      Apply
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
              {promoError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-red-500 px-4"
                >
                  {promoError}
                </motion.p>
              )}
            </AnimatePresence>
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
