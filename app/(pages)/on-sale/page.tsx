"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, Tag, Percent } from "lucide-react";
import { RiEqualizerFill } from "react-icons/ri";
import ProductGrid from "@/components/plp/ProductGrid";
import Pagination from "@/components/plp/Pagination";
import SortDropdown from "@/components/ui/sort-dropdown";
import { onSaleProducts, getUniqueDiscounts } from "@/lib/mockOnSaleProducts";
import { fadeInUp } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

const OnSalePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("discount_high");
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  const itemsPerPage = 8;

  const uniqueDiscounts = getUniqueDiscounts();

  // Filter products by selected discount
  const filteredProducts = useMemo(() => {
    if (selectedDiscount === null) {
      return onSaleProducts;
    }
    return onSaleProducts.filter(
      (product) => product.discount === selectedDiscount
    );
  }, [selectedDiscount]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (sortBy) {
      case "discount_high":
        return products.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case "discount_low":
        return products.sort((a, b) => (a.discount || 0) - (b.discount || 0));
      case "price_asc":
        return products.sort((a, b) => a.price - b.price);
      case "price_dsc":
        return products.sort((a, b) => b.price - a.price);
      case "top_rated":
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  }, [filteredProducts, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);
  const startItem = startIndex + 1;
  const endItem = Math.min(endIndex, sortedProducts.length);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleDiscountFilter = (discount: number | null) => {
    setSelectedDiscount(discount);
    setCurrentPage(1);
  };

  // Calculate total savings
  const totalSavings = useMemo(() => {
    return onSaleProducts.reduce((acc, product) => {
      if (product.originalPrice && product.price) {
        return acc + (product.originalPrice - product.price);
      }
      return acc;
    }, 0);
  }, []);

  return (
    <main className="min-h-dvh bg-white">
      {/* Sale Banner */}
      <div className="bg-black text-white py-3">
        <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20">
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium">
            <Tag className="w-4 h-4 md:w-5 md:h-5" />
            <span>Limited Time Offers - Up to 40% Off!</span>
            <Percent className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20">
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
            <span className="text-black font-medium">On Sale</span>
          </nav>
        </div>

        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase">
                On Sale
              </h1>
              <p className="text-black/60 mt-2">
                Discover amazing deals on your favorite products
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-black">
                  {onSaleProducts.length}
                </p>
                <p className="text-xs md:text-sm text-black/60">Products</p>
              </div>
              <div className="w-px h-10 bg-black/10" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-black">
                  40%
                </p>
                <p className="text-xs md:text-sm text-black/60">Max Discount</p>
              </div>
              <div className="w-px h-10 bg-black/10" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-green-600">
                  ${totalSavings}
                </p>
                <p className="text-xs md:text-sm text-black/60">Total Savings</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Discount Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => handleDiscountFilter(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedDiscount === null
                ? "bg-black text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            )}
          >
            All Deals
          </button>
          {uniqueDiscounts.map((discount) => (
            <button
              key={discount}
              onClick={() => handleDiscountFilter(discount)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedDiscount === discount
                  ? "bg-red-500 text-white"
                  : "bg-red-50 text-red-600 hover:bg-red-100"
              )}
            >
              {discount}% Off
            </button>
          ))}
        </div>

        {/* Sorting Header */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-black/10">
          <p className="text-sm text-black/60">
            Showing {startItem}-{endItem} of {sortedProducts.length} Products
          </p>

          <div className="flex items-center gap-3">
            <div className="items-center gap-1.5 hidden md:flex">
              <span className="text-sm text-black/60">Sort by:</span>
              <SortDropdown
                options={[
                  { label: "Biggest Discount", value: "discount_high" },
                  { label: "Smallest Discount", value: "discount_low" },
                  { label: "Price: Low to High", value: "price_asc" },
                  { label: "Price: High to Low", value: "price_dsc" },
                  { label: "Top Rated", value: "top_rated" },
                ]}
                value={sortBy}
                onValueChange={handleSortChange}
              />
            </div>

            {/* Mobile Filter Button */}
            <button className="rounded-full p-2 bg-gray-100 lg:hidden">
              <RiEqualizerFill className="text-xl text-black" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <ProductGrid
            key={`${selectedDiscount}-${sortBy}-${currentPage}`}
            products={currentProducts}
            className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            animated
          />
        ) : (
          <EmptyState onReset={() => handleDiscountFilter(null)} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 mb-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
};

// Empty State Component
const EmptyState: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <Tag className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-black mb-2">No Products Found</h3>
      <p className="text-black/60 text-center max-w-md mb-6">
        There are no products matching your selected discount filter. Try
        selecting a different discount or view all deals.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
      >
        View All Deals
      </button>
    </div>
  );
};

export default OnSalePage;
