"use client";

import { motion } from "motion/react";
import DiscoverHero from "@/components/hero/DiscoverHero";
import ProductSection from "@/components/products/ProductSection";
import BrowseByStyleSection from "@/components/browse/BrowseByStyleSection";
import Separator from "@/components/ui/separator";
import { newArrivals, topSelling } from "@/lib/mockProducts";
import { styleCategories } from "@/lib/styleCategories";
import { pageFadeUp } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const Discover = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.main
      variants={prefersReducedMotion ? undefined : pageFadeUp}
      initial={prefersReducedMotion ? false : "initial"}
      animate="animate"
    >
      <DiscoverHero />
      <ProductSection
        className="py-12 md:py-16"
        title="New Arrivals"
        products={newArrivals}
        viewAllLink="/products/new-arrivals"
        animated
      />

      <Separator />
      <ProductSection
        className="py-12 md:py-16"
        title="Top Selling"
        products={topSelling}
        viewAllLink="/products/top-selling"
        animated
      />

      <Separator />

      <BrowseByStyleSection categories={styleCategories} animated />
    </motion.main>
  );
};

export default Discover;
