"use client";

import React from "react";
import { Star, StarHalf, CheckCircle, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  postedDate: string;
  verified: boolean;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, className }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 md:w-5 md:h-5 fill-[#FFC633] text-[#FFC633]"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 md:w-5 md:h-5 fill-[#FFC633] text-[#FFC633]"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 md:w-5 md:h-5 fill-none text-[#FFC633]"
        />
      );
    }

    return stars;
  };

  return (
    <div
      className={cn(
        "bg-white border border-black/10 rounded-2xl p-5 space-y-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {" "}
        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
        </div>{" "}
        <button
          className="text-black/40 hover:text-black transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* User Name & Verified Badge */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <h4 className="text-base md:text-lg font-bold text-black">
            {review.userName}
          </h4>
          {review.verified && (
            <CheckCircle className="w-5 h-5 text-[#01AB31] fill-[#01AB31]" />
          )}
        </div>

        {/* Review Comment */}
        <p className="text-sm text-black/60 leading-relaxed">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      {/* Posted Date */}
      <p className="text-sm text-black/60 font-medium">
        Posted on {review.postedDate}
      </p>
    </div>
  );
};

export default ReviewCard;
