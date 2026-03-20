"use client";

import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import ReviewCard, { Review } from "./ReviewCard";
import WriteReviewModal from "./WriteReviewModal";
import { Button } from "@/components/ui/button";
import SortDropdown from "@/components/ui/sort-dropdown";
import { staggerItem } from "@/lib/motion-variants";

interface ReviewsSectionProps {
  reviews: Review[];
  totalReviews: number;
  className?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews: initialReviews,
  totalReviews: initialTotal,
  className,
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [totalReviews, setTotalReviews] = useState(initialTotal);
  const [sortBy, setSortBy] = useState("latest");
  const [displayCount, setDisplayCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const displayedReviews = sortedReviews.slice(0, displayCount);
  const hasMoreReviews = displayCount < reviews.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, reviews.length));
  };

  const handleNewReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
    setTotalReviews((prev) => prev + 1);
    setDisplayCount((prev) => prev + 1);
  };

  return (
    <>
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
            <button
              className="p-2.5 bg-[#F0F0F0] rounded-full hover:bg-black/10 transition-colors"
              aria-label="Filter reviews"
            >
              <SlidersHorizontal className="w-5 h-5 text-black" />
            </button>

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

            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white hover:bg-black/90 rounded-full px-5 md:px-6 py-2.5 text-sm md:text-base font-medium"
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* Reviews Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          layout
        >
          <AnimatePresence initial={false}>
            {displayedReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={staggerItem}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
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

      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewReview}
      />
    </>
  );
};

export default ReviewsSection;
