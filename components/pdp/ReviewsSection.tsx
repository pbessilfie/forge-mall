"use client";

import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import ReviewCard, { Review } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import SortDropdown from "@/components/ui/sort-dropdown";

interface ReviewsSectionProps {
  reviews: Review[];
  totalReviews: number;
  className?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  totalReviews,
  className,
}) => {
  const [sortBy, setSortBy] = useState("latest");
  const [displayCount, setDisplayCount] = useState(6);

  const displayedReviews = reviews.slice(0, displayCount);
  const hasMoreReviews = displayCount < reviews.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, reviews.length));
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-black">
          All Reviews{" "}
          <span className="text-black/60 font-normal text-sm lg:text-base">
            ({totalReviews})
          </span>
        </h2>

        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <button
            className="p-2.5 bg-[#F0F0F0] rounded-full hover:bg-black/10 transition-colors"
            aria-label="Filter reviews"
          >
            <SlidersHorizontal className="w-5 h-5 text-black" />
          </button>

          {/* Sort Dropdown */}
          <SortDropdown
            options={[
              { label: "Latest", value: "latest" },
              { label: "Oldest", value: "oldest" },
              { label: "Highest Rated", value: "highest" },
              { label: "Lowest Rated", value: "lowest" },
            ]}
            value={sortBy}
            onValueChange={setSortBy}
            className="bg-[#F0F0F0] rounded-full"
          />

          {/* Write Review Button */}
          <Button className="bg-black text-white hover:bg-black/90 rounded-full px-5 md:px-6 py-2.5 text-sm md:text-base font-medium">
            Write a Review
          </Button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreReviews && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="rounded-full px-12 md:px-16 py-3 text-base font-medium border-black/10"
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
