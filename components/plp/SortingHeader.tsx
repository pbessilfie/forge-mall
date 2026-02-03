"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import SortDropdown from "@/components/ui/sort-dropdown";

interface SortingHeaderProps {
  totalProducts: number;
  currentPage: number;
  itemsPerPage: number;
  onSortChange?: (sortBy: string) => void;
  className?: string;
}

const SortingHeader: React.FC<SortingHeaderProps> = ({
  totalProducts,
  currentPage,
  itemsPerPage,
  onSortChange,
  className,
}) => {
  const [sortBy, setSortBy] = useState("popular");
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalProducts);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      {/* Results Count */}
      <p className="text-sm text-black/60">
        Showing {startItem}-{endItem} of {totalProducts} Products
      </p>

      {/* Sort Dropdown */}
      <div className="items-center gap-1.5 hidden md:flex">
        <span className="text-sm text-black/60 hidden sm:inline">Sort by:</span>
        <SortDropdown
          options={[
            { label: "Most Popular", value: "popular" },
            { label: "Newest", value: "newest" },
            { label: "Price: Low to High", value: "price_asc" },
            { label: "Price: High to Low", value: "price_dsc" },
            { label: "Top Rated", value: "top_rated" },
          ]}
          value={sortBy}
          onValueChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default SortingHeader;
