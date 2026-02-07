"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ShippingForm, {
  ShippingFormData,
} from "@/components/checkout/ShippingForm";
import PaymentMethodSelector, {
  PaymentMethod,
} from "@/components/checkout/PaymentMethodSelector";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import {
  breadcrumbVariant,
  pageTitleVariant,
  checkoutContainer,
  checkoutSectionVariant,
  ctaButtonVariant,
  processingOverlayVariant,
  successCheckVariant,
} from "@/lib/motion-variants";

const CheckoutPage = () => {
  const router = useRouter();
  const { success } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartItems = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  // Calculate totals from cart store
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountPercentage = 20;
  const discount = Math.round((subtotal * discountPercentage) / 100);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;

  const handleShippingSubmit = (data: ShippingFormData) => {
    console.log("Shipping data:", data);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();

      // Show success state briefly, then redirect
      setTimeout(() => {
        success("Congratulations!", "Your order has been placed successfully");
        router.push("/");
      }, 1500);
    }, 2000);
  };

  return (
    <main className="min-h-dvh bg-white">
      <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20">
        {/* Breadcrumb Navigation */}
        <motion.div
          className="py-5"
          variants={breadcrumbVariant}
          initial="initial"
          animate="animate"
        >
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/"
              className="text-black/60 hover:text-black transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-black/40" />
            <Link
              href="/cart"
              className="text-black/60 hover:text-black transition-colors"
            >
              Cart
            </Link>
            <ChevronRight className="w-4 h-4 text-black/40" />
            <span className="text-black font-medium">Checkout</span>
          </nav>
        </motion.div>

        {/* Page Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-black uppercase mb-6 md:mb-8"
          variants={pageTitleVariant}
          initial="initial"
          animate="animate"
        >
          Checkout
        </motion.h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-6 lg:gap-8 pb-16 lg:pb-20">
          {/* Left Column - Forms */}
          <motion.div
            className="space-y-6"
            variants={checkoutContainer}
            initial="initial"
            animate="animate"
          >
            {/* Shipping Form */}
            <motion.div
              className="bg-white border border-black/10 rounded-3xl p-5 md:p-6"
              variants={checkoutSectionVariant}
            >
              <ShippingForm onSubmit={handleShippingSubmit} />
            </motion.div>

            {/* Payment Method */}
            <motion.div
              className="bg-white border border-black/10 rounded-3xl p-5 md:p-6"
              variants={checkoutSectionVariant}
            >
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            className="space-y-6"
            variants={checkoutContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={checkoutSectionVariant}>
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                discountPercentage={discountPercentage}
                deliveryFee={deliveryFee}
                showPromoCode={false}
                buttonVisibility={false}
              />
            </motion.div>

            {/* Place Order Button */}
            <motion.div variants={ctaButtonVariant}>
              <motion.button
                onClick={handlePlaceOrder}
                disabled={isProcessing || isSuccess}
                className="relative w-full bg-black text-white rounded-full py-2.5 h-auto text-base md:text-lg font-medium overflow-hidden disabled:cursor-not-allowed"
                whileHover={{ scale: isProcessing || isSuccess ? 1 : 1.01 }}
                whileTap={{ scale: isProcessing || isSuccess ? 1 : 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {/* Button content with states */}
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      className="flex items-center justify-center gap-2"
                      variants={successCheckVariant}
                      initial="initial"
                      animate="animate"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Order Placed!</span>
                    </motion.div>
                  ) : isProcessing ? (
                    <motion.div
                      key="processing"
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Place Order
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Subtle shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{ translateX: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Processing Overlay - Non-blocking visual feedback */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="fixed inset-0 bg-black/5 pointer-events-none z-50"
            variants={processingOverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default CheckoutPage;
