"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { FaRegHeart } from "react-icons/fa";
import { useWishlistStore } from "@/lib/wishlist-store";
import ProductCard from "@/components/products/ProductCard";
import {
  pageVariants,
  staggerContainer,
  staggerItem,
  fadeInUp,
} from "@/lib/motion-variants";

const WishlistPage = () => {
  const items = useWishlistStore((s) => s.items);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);

  return (
    <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
      <div className="container mx-auto py-8 md:py-12">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black uppercase">
                Wishlist
              </h1>
              <p className="text-black/50 mt-1 text-sm">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>

            <AnimatePresence>
              {items.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={clearWishlist}
                  className="text-sm text-black/40 hover:text-black transition-colors underline underline-offset-2"
                >
                  Clear all
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {items.length > 0 ? (
              <motion.div
                key="grid"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
              >
                {items.map((product) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center justify-center py-24 gap-5 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center"
                >
                  <FaRegHeart className="text-4xl text-black/25" />
                </motion.div>

                <div>
                  <h2 className="text-xl font-bold text-black">
                    Your wishlist is empty
                  </h2>
                  <p className="text-black/50 mt-1.5 text-sm max-w-xs">
                    Save items you love by tapping the heart icon on any
                    product.
                  </p>
                </div>

                <Link
                  href="/category/all"
                  className="mt-2 px-7 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-black/85 transition-colors"
                >
                  Browse Products
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
};

export default WishlistPage;
