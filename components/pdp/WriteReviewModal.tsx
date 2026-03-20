"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Review } from "./ReviewCard";
import { scaleFade, backdropVariants } from "@/lib/motion-variants";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: Review) => void;
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (rating === 0) newErrors.rating = "Please select a rating";
    if (comment.trim().length < 10)
      newErrors.comment = "Review must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 800));

    const newReview: Review = {
      id: `user-${Date.now()}`,
      userName: name.trim(),
      rating,
      comment: comment.trim(),
      postedDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      verified: false,
    };

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      onSubmit(newReview);
      // Reset form
      setName("");
      setRating(0);
      setComment("");
      setErrors({});
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setName("");
    setRating(0);
    setComment("");
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  const displayRating = hoveredRating || rating;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={scaleFade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/10">
                <h2 className="text-xl font-bold text-black">Write a Review</h2>
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-black/60" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-5">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="py-10 flex flex-col items-center gap-4 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                          delay: 0.1,
                        }}
                        className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
                      >
                        <Check className="w-8 h-8 text-green-600" />
                      </motion.div>
                      <div>
                        <p className="text-lg font-bold text-black">
                          Review submitted!
                        </p>
                        <p className="text-sm text-black/50 mt-1">
                          Thank you for your feedback.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-black">
                          Your name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setErrors((prev) => ({ ...prev, name: "" }));
                          }}
                          placeholder="e.g. Alex M."
                          className="w-full px-4 py-3 rounded-xl bg-[#F0F0F0] text-sm text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black/10"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500">{errors.name}</p>
                        )}
                      </div>

                      {/* Star Rating */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-black">
                          Rating
                        </label>
                        <div
                          className="flex items-center gap-1.5"
                          onMouseLeave={() => setHoveredRating(0)}
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.1 }}
                              onClick={() => {
                                setRating(star);
                                setErrors((prev) => ({ ...prev, rating: "" }));
                              }}
                              onMouseEnter={() => setHoveredRating(star)}
                              aria-label={`Rate ${star} stars`}
                            >
                              <Star
                                className={`w-8 h-8 transition-colors ${
                                  star <= displayRating
                                    ? "fill-[#FFC633] text-[#FFC633]"
                                    : "fill-none text-black/20"
                                }`}
                              />
                            </motion.button>
                          ))}
                          {displayRating > 0 && (
                            <span className="text-sm text-black/50 ml-1">
                              {
                                ["", "Poor", "Fair", "Good", "Great", "Excellent"][
                                  displayRating
                                ]
                              }
                            </span>
                          )}
                        </div>
                        {errors.rating && (
                          <p className="text-xs text-red-500">{errors.rating}</p>
                        )}
                      </div>

                      {/* Comment */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-black">
                          Your review
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                            setErrors((prev) => ({ ...prev, comment: "" }));
                          }}
                          placeholder="Tell others what you think about this product..."
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-[#F0F0F0] text-sm text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black/10 resize-none"
                        />
                        <div className="flex items-center justify-between">
                          {errors.comment ? (
                            <p className="text-xs text-red-500">
                              {errors.comment}
                            </p>
                          ) : (
                            <span />
                          )}
                          <p className="text-xs text-black/30 ml-auto">
                            {comment.length} chars
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {!isSuccess && (
                <div className="px-6 pb-6 flex gap-3">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 rounded-full border-black/15 text-black hover:bg-black/5"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-white hover:bg-black/90 rounded-full disabled:opacity-60"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Submitting...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Submit Review
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WriteReviewModal;
