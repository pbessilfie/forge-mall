"use client";

import { motion, AnimatePresence } from "motion/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlistStore } from "@/lib/wishlist-store";
import { Product } from "@/components/products/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md";
}

export const WishlistButton = ({
  product,
  className,
  size = "md",
}: WishlistButtonProps) => {
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const { success, info } = useToast();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      toggleItem(product);
      info("Removed from Wishlist", product.name, 2500);
    } else {
      toggleItem(product);
      success("Saved to Wishlist", product.name, 2500);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileTap={{ scale: 0.82 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "flex items-center justify-center rounded-full bg-white shadow-md",
        size === "sm" ? "w-8 h-8" : "w-10 h-10",
        className
      )}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <AnimatePresence mode="wait">
        {isWishlisted ? (
          <motion.span
            key="filled"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 30 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="flex items-center justify-center"
          >
            <FaHeart
              className={cn(
                "text-red-500",
                size === "sm" ? "text-xs" : "text-sm"
              )}
            />
          </motion.span>
        ) : (
          <motion.span
            key="empty"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="flex items-center justify-center"
          >
            <FaRegHeart
              className={cn(
                "text-black/50",
                size === "sm" ? "text-xs" : "text-sm"
              )}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
