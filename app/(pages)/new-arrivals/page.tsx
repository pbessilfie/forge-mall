"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import ProductGrid from "@/components/plp/ProductGrid";
import Pagination from "@/components/plp/Pagination";
import {
  newArrivalsProducts,
  sortNewArrivals,
  filterByCategory,
  type SortOption,
  type CategoryFilter,
} from "@/lib/mockNewArrivals";
import { sectionFadeUp, staggerContainer, staggerItem } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import SortDropdown from "@/components/ui/sort-dropdown";

const NewArrivalsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const prefersReducedMotion = useReducedMotion();
  const itemsPerPage = 8;

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "all" },
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Unisex", value: "unisex" },
  ];

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Top Rated", value: "rating" },
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterByCategory(newArrivalsProducts, categoryFilter);
    return sortNewArrivals(filtered, sortBy);
  }, [categoryFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: CategoryFilter) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

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
              <span className="text-black font-medium">New Arrivals</span>
            </nav>
          </div>

          {/* Page Header */}
          <motion.div
            className="mb-8 md:mb-10"
            initial={prefersReducedMotion ? false : "initial"}
            animate="animate"
            variants={sectionFadeUp}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              New Arrivals
            </h1>
            <p className="text-sm md:text-base text-black/60">
              Discover our latest additions, fresh from the runway to your wardrobe.
            </p>
          </motion.div>

          {/* Controls Section */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            initial={prefersReducedMotion ? false : "initial"}
            animate="animate"
            variants={staggerContainer}
          >
            {/* Category Tabs */}
            <motion.div
              className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1"
              variants={staggerItem}
            >
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    categoryFilter === category.value
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black/70 hover:bg-black/10"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* Sort & Count */}
            <motion.div
              className="flex items-center justify-between sm:justify-end gap-4"
              variants={staggerItem}
            >
              <p className="text-sm text-black/60">
                {filteredAndSortedProducts.length} product
                {filteredAndSortedProducts.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-black/60 hidden sm:inline">
                  Sort by:
                </span>
                <SortDropdown
                  options={sortOptions}
                  value={sortBy}
                  onValueChange={handleSortChange}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Product Grid */}
          {currentProducts.length > 0 ? (
            <ProductGrid
              key={`${categoryFilter}-${sortBy}-${currentPage}`}
              products={currentProducts}
              animated
              showNewBadge
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg text-black/60 mb-2">No products found</p>
              <p className="text-sm text-black/40 mb-4">
                Try adjusting your filters
              </p>
              <button
                onClick={() => {
                  setCategoryFilter("all");
                  setSortBy("newest");
                }}
                className="px-4 py-2 text-sm font-medium text-black bg-black/5 hover:bg-black/10 rounded-full transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="py-10"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default NewArrivalsPage;
