"use client";

import { motion } from "motion/react";
import { useRecentlyViewedStore } from "@/lib/recently-viewed-store";
import ProductCard from "./ProductCard";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";

interface RecentlyViewedSectionProps {
  excludeId?: string;
}

const RecentlyViewedSection = ({ excludeId }: RecentlyViewedSectionProps) => {
  const products = useRecentlyViewedStore((s) => s.products).filter(
    (p) => p.id !== excludeId
  );

  if (products.length === 0) return null;

  return (
    <section className="py-10 md:py-14">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-2xl md:text-3xl font-bold text-black uppercase">
          Recently Viewed
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={staggerItem}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default RecentlyViewedSection;
