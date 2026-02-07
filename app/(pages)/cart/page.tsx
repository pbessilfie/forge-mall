"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCartStore } from "@/lib/cart-store";
import {
  breadcrumbVariant,
  pageTitleVariant,
  cartContainer,
  cartItemVariant,
  orderSummaryVariant,
  emptyCartVariant,
} from "@/lib/motion-variants";

const CartPage = () => {
  const router = useRouter();
  const cartItems = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // Calculate totals from cart store items
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountPercentage = 20;
  const discount = Math.round((subtotal * discountPercentage) / 100);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
        <div className="container mx-auto ">
          {/* Breadcrumb */}
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
              <span className="text-black font-medium">Cart</span>
            </nav>
          </motion.div>

          {/* Empty State */}
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            variants={emptyCartVariant}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-black/60 mb-8">
              Add some products to your cart to get started.
            </p>
            <Link
              href="/"
              className="bg-black text-white hover:bg-black/90 rounded-full px-12 py-4 text-base font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
      <div className="container mx-auto ">
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
            <span className="text-black font-medium">Cart</span>
          </nav>
        </motion.div>

        {/* Page Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-black uppercase mb-6 md:mb-8"
          variants={pageTitleVariant}
          initial="initial"
          animate="animate"
        >
          Your Cart
        </motion.h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-6 lg:gap-8 pb-16 lg:pb-20">
          {/* Cart Items */}
          <motion.div
            className="bg-white border border-black/10 rounded-3xl p-5 md:p-6 space-y-6"
            variants={cartContainer}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cartItemVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  <CartItem
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            variants={orderSummaryVariant}
            initial="initial"
            animate="animate"
          >
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              discountPercentage={discountPercentage}
              deliveryFee={deliveryFee}
              onCheckout={handleCheckout}
              showPromoCode={true}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
