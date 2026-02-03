"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";
import ShippingForm, {
  ShippingFormData,
} from "@/components/checkout/ShippingForm";
import PaymentMethodSelector, {
  PaymentMethod,
} from "@/components/checkout/PaymentMethodSelector";
import OrderSummary from "@/components/cart/OrderSummary";
import { mockCartItems, calculateCartTotals } from "@/lib/mockCartData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const router = useRouter();
  const { success } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const { subtotal, discount, discountPercentage, deliveryFee } =
    calculateCartTotals(mockCartItems);

  const handleShippingSubmit = (data: ShippingFormData) => {
    console.log("Shipping data:", data);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      success("Congratulations!", "Your order has been placed successfully");
      router.push("/");
    }, 2000);
  };

  return (
    <main className="min-h-dvh bg-white">
      <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20">
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
            <Link
              href="/cart"
              className="text-black/60 hover:text-black transition-colors"
            >
              Cart
            </Link>
            <ChevronRight className="w-4 h-4 text-black/40" />
            <span className="text-black font-medium">Checkout</span>
          </nav>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black uppercase mb-6 md:mb-8">
          Checkout
        </h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-6 lg:gap-8 pb-16 lg:pb-20">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Shipping Form */}
            <div className="bg-white border border-black/10 rounded-3xl p-5 md:p-6">
              <ShippingForm onSubmit={handleShippingSubmit} />
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-black/10 rounded-3xl p-5 md:p-6">
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              discountPercentage={discountPercentage}
              deliveryFee={deliveryFee}
              showPromoCode={false}
              buttonVisibility={false}
            />

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-black text-white hover:bg-black/90 disabled:bg-black/50 rounded-full py-2 h-auto text-base md:text-lg font-medium"
            >
              {isProcessing ? (<Loader2 className="w-5 h-5 mr-2 animate-spin" />) : null}
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
