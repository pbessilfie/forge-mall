"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import ProductCard, { Product } from "../products/ProductCard";
import { productGridContainer, productCardItem } from "@/lib/motion-variants";

interface ProductGridProps {
  products: Product[];
  className?: string;
  animated?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className,
  animated = false,
}) => {
  if (animated) {
    return (
      <motion.div
        variants={productGridContainer}
        initial="initial"
        animate="animate"
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6",
          className
        )}
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={productCardItem}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
