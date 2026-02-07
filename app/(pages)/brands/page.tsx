"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import BrandCard from "@/components/brands/BrandCard";
import FeaturedBrandCard from "@/components/brands/FeaturedBrandCard";
import AlphabetIndex from "@/components/brands/AlphabetIndex";
import BrandSearch from "@/components/brands/BrandSearch";
import {
  brands,
  featuredBrands,
  getAvailableLetters,
  getBrandsByLetter,
  searchBrands,
} from "@/lib/mockBrands";
import {
  sectionFadeUp,
  staggerContainer,
  staggerItem,
} from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const BrandsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const availableLetters = useMemo(() => getAvailableLetters(), []);

  const filteredBrands = useMemo(() => {
    if (searchQuery) {
      return searchBrands(searchQuery);
    }
    if (activeLetter) {
      return getBrandsByLetter(activeLetter);
    }
    return brands;
  }, [searchQuery, activeLetter]);

  const handleLetterClick = (letter: string | null) => {
    setActiveLetter(letter);
    setSearchQuery("");
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setActiveLetter(null);
    }
  };

  // Sort brands alphabetically for display
  const sortedBrands = useMemo(() => {
    return [...filteredBrands].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredBrands]);

  return (
    <main className="min-h-dvh bg-white">
      <div className="px-5 md:px-7 lg:px-12 xl:px-20">
        <div className="container mx-auto">
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
              <span className="text-black font-medium">Brands</span>
            </nav>
          </div>

          {/* Header Section */}
          <motion.div
            className="mb-10 md:mb-14"
            initial={prefersReducedMotion ? false : "initial"}
            animate="animate"
            variants={sectionFadeUp}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
              Shop by Brand
            </h1>
            <p className="text-base md:text-lg text-black/60 max-w-xl">
              Discover your favorite fashion brands. From luxury houses to
              streetwear icons.
            </p>
          </motion.div>

          {/* Featured Brands Section */}
          <motion.section
            className="mb-12 md:mb-16"
            initial={prefersReducedMotion ? false : "initial"}
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h2
              className="text-xl md:text-2xl font-bold text-black mb-6"
              variants={staggerItem}
            >
              Featured Brands
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {featuredBrands.map((brand) => (
                <motion.div key={brand.id} variants={staggerItem}>
                  <FeaturedBrandCard brand={brand} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Search and Filter Section */}
          <section className="mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
              <BrandSearch
                value={searchQuery}
                onChange={handleSearchChange}
                className="md:max-w-sm"
              />
              <div className="flex-1 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
                <AlphabetIndex
                  availableLetters={availableLetters}
                  activeLetter={activeLetter}
                  onLetterClick={handleLetterClick}
                />
              </div>
            </div>
          </section>

          {/* All Brands Section */}
          <section className="pb-16 md:pb-20">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-black">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : activeLetter
                  ? `Brands starting with "${activeLetter}"`
                  : "All Brands"}
              </h2>
              <span className="text-sm text-black/50">
                {sortedBrands.length} brand{sortedBrands.length !== 1 ? "s" : ""}
              </span>
            </div>

            {sortedBrands.length > 0 ? (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
                initial={prefersReducedMotion ? false : "initial"}
                animate="animate"
                variants={staggerContainer}
                key={`${searchQuery}-${activeLetter}`}
              >
                {sortedBrands.map((brand) => (
                  <motion.div key={brand.id} variants={staggerItem}>
                    <BrandCard brand={brand} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg text-black/60 mb-2">No brands found</p>
                <p className="text-sm text-black/40">
                  Try adjusting your search or filter
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveLetter(null);
                  }}
                  className="mt-4 px-4 py-2 text-sm font-medium text-black bg-black/5 hover:bg-black/10 rounded-full transition-colors duration-150"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default BrandsPage;
