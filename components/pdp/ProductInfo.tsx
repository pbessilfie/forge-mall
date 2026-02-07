"use client";

import React, { useState, useCallback } from "react";
import { Star, StarHalf, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import ColorSelector, { Color } from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "@/components/ui/quantity-selector";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

interface ProductInfoProps {
  id?: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  colors: Color[];
  sizes: string[];
  image?: string;
  className?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  id = "1",
  name,
  rating,
  reviewCount,
  price,
  originalPrice,
  discount,
  description,
  colors,
  sizes,
  image = "",
  className,
}) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.value || "");
  const [selectedSize, setSelectedSize] = useState(sizes[2] || sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const { success } = useToast();

  // Derive cart item reactively from the items array
  const cartItem = cartItems.find(
    (item) =>
      item.productId === id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );
  const isInCart = !!cartItem;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 md:w-6 md:h-6 fill-[#FFC633] text-[#FFC633]"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 md:w-6 md:h-6 fill-[#FFC633] text-[#FFC633]"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 md:w-6 md:h-6 fill-none text-[#FFC633]"
        />
      );
    }

    return stars;
  };

  const handleAddToCart = useCallback(() => {
    addItem({
      productId: id,
      name,
      image,
      size: selectedSize,
      color: selectedColor,
      price,
      quantity,
    });

    // Show brief success confirmation on button
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);

    // Show toast notification
    success("Added to Cart", `${name} (${selectedSize}, ${selectedColor})`);

    // Reset local quantity to 1 for next add
    setQuantity(1);
  }, [addItem, id, name, image, selectedSize, selectedColor, price, quantity, success]);

  const handleCartQuantityChange = useCallback(
    (newQuantity: number) => {
      if (cartItem) {
        const increased = newQuantity > cartItem.quantity;
        updateQuantity(cartItem.id, newQuantity);
        if (increased) {
          success("Cart Updated", `${name} quantity increased to ${newQuantity}`);
        }
      }
    },
    [cartItem, updateQuantity, success, name]
  );

  // Reset justAdded when variant changes
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setJustAdded(false);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setJustAdded(false);
  };

  return (
    <div className={cn("space-y-4 md:space-y-5", className)}>
      {/* Product Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase leading-tight">
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">{renderStars(rating)}</div>
        <span className="text-xs text-black font-normal">
          {rating}/5
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xl md:text-3xl font-bold text-black">
          ${price}
        </span>
        {originalPrice && originalPrice > price && (
          <>
            <span className="text-2xl md:text-3xl font-bold text-black/40 line-through">
              ${originalPrice}
            </span>
            {discount && (
              <span className="px-3 py-1.5 bg-red-100 text-red-600 text-xs md:text-sm font-medium rounded-full">
                -{discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-black/60 leading-relaxed">
        {description}
      </p>

      {/* Separator */}
      <hr className="border-black/10" />

      {/* Color Selector */}
      <ColorSelector
        colors={colors}
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
      />

      {/* Separator */}
      <hr className="border-black/10" />

      {/* Size Selector */}
      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onSizeChange={handleSizeChange}
      />

      {/* Separator */}
      <hr className="border-black/10" />

      {/* Quantity Selector & Add to Cart / In-Cart Controls */}
      <div className="flex items-center gap-3 md:gap-4 flex-wrap">
        <AnimatePresence mode="wait">
          {isInCart ? (
            // In-cart state: show quantity selector for the cart item
            <motion.div
              key="in-cart"
              className="flex items-center gap-3 md:gap-4 flex-1 min-w-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <QuantitySelector
                quantity={cartItem.quantity}
                onQuantityChange={handleCartQuantityChange}
              />
              <div className="flex-1 min-w-50 bg-black/5 text-black rounded-full py-4 text-base font-medium flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>In Cart</span>
              </div>
            </motion.div>
          ) : (
            // Default state: quantity selector + add to cart button
            <motion.div
              key="add-to-cart"
              className="flex items-center gap-3 md:gap-4 flex-1 min-w-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
              <motion.div
                className="flex-1 min-w-50"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  onClick={handleAddToCart}
                  disabled={justAdded}
                  className="w-full bg-black text-white hover:bg-black/90 rounded-full py-6 text-base font-medium disabled:opacity-100"
                >
                  <AnimatePresence mode="wait">
                    {justAdded ? (
                      <motion.span
                        key="added"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-5 h-5" />
                        Added!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductInfo;
