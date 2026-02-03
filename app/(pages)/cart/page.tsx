"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import CartItem, { CartItemData } from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { mockCartItems, calculateCartTotals } from "@/lib/mockCartData";

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemData[]>(mockCartItems);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const { subtotal, discount, discountPercentage, deliveryFee } =
    calculateCartTotals(cartItems);

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
        <div className="container mx-auto ">
          {/* Breadcrumb */}
          <div className="py-5">
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
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20 text-center">
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
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
      <div className="container mx-auto ">
        {/* Breadcrumb Navigation */}
        <div className="py-5">
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
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black uppercase mb-6 md:mb-8">
          Your Cart
        </h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-6 lg:gap-8 pb-16 lg:pb-20">
          {/* Cart Items */}
          <div className="bg-white border border-black/10 rounded-3xl p-5 md:p-6 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            discountPercentage={discountPercentage}
            deliveryFee={deliveryFee}
            onCheckout={handleCheckout}
            showPromoCode={true}
          />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
