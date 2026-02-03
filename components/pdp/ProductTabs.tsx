"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ReviewsSection from "./ReviewsSection";
import { Review } from "./ReviewCard";

interface ProductTabsProps {
  productDetails: string;
  reviews: Review[];
  totalReviews: number;
  faqs: { question: string; answer: string }[];
  className?: string;
}

type TabType = "details" | "reviews" | "faqs";

const ProductTabs: React.FC<ProductTabsProps> = ({
  productDetails,
  reviews,
  totalReviews,
  faqs,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("reviews");

  const tabs: { id: TabType; label: string }[] = [
    { id: "details", label: "Product Details" },
    { id: "reviews", label: "Rating & Reviews" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <div className={cn("space-y-6 md:space-y-8", className)}>
      {/* Tab Navigation */}
      <div className="border-b border-black/10">
        <div className="flex items-center gap-6 md:gap-12 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative pb-4 text-base md:text-xl font-normal transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "text-black font-medium"
                  : "text-black/60 hover:text-black"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-100">
        {activeTab === "details" && (
          <div className="prose prose-sm md:prose-base max-w-none">
            <p className="text-black/60 leading-relaxed whitespace-pre-line">
              {productDetails}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <ReviewsSection reviews={reviews} totalReviews={totalReviews} />
        )}

        {activeTab === "faqs" && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-black/10 rounded-2xl p-5 md:p-6 space-y-2"
              >
                <h4 className="text-base md:text-lg font-bold text-black">
                  {faq.question}
                </h4>
                <p className="text-sm md:text-base text-black/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
