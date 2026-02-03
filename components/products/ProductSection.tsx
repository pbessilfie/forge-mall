"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import ProductCard, { Product } from "./ProductCard";
import { Button } from "@/components/ui/button";
import {
  sectionFadeUp,
  productRowContainer,
  productRowItem,
} from "@/lib/motion-variants";

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  className?: string;
  animated?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  viewAllLink = "#",
  className,
  animated = false,
}) => {
  if (animated) {
    return (
      <motion.section
        variants={sectionFadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        className={cn("py-12 md:py-16", className)}
      >
        <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20">
          <div className="space-y-5">
            {/* Title */}
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black uppercase text-center mb-10">
              {title}
            </h2>

            {/* Product List - Staggered */}
            <div className="w-full overflow-x-auto scrollbar-hide">
              <motion.div
                variants={productRowContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-30px" }}
                className="flex gap-3 md:gap-4 pb-4"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={productRowItem}
                    className="shrink-0 w-62.5 md:w-73.75"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* View All Button */}
            <div className="flex justify-center">
              <Button
                asChild
                variant="outline"
                className="rounded-full px-12 md:px-16 py-3 h-auto text-sm md:text-base font-medium border-black/10 hover:bg-black/5 bg-white"
              >
                <Link href={viewAllLink}>View All</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20">
        <div className="space-y-5">
          {/* Title */}
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black uppercase text-center mb-10">
            {title}
          </h2>

          {/* Product List */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 md:gap-4 pb-4">
              {products.map((product) => (
                <div key={product.id} className="shrink-0 w-62.5 md:w-73.75">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-12 md:px-16 py-3 h-auto text-sm md:text-base font-medium border-black/10 hover:bg-black/5 bg-white"
            >
              <Link href={viewAllLink}>View All</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
