"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MdOutlineEmail } from "react-icons/md";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsletterReveal, formSuccessFade } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface NewsletterBannerProps {
  className?: string;
}

type FormState = "idle" | "loading" | "success";

const NewsletterBanner: React.FC<NewsletterBannerProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "loading" || formState === "success") return;

    setFormState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setFormState("success");
    setEmail("");

    // Reset after showing success message
    setTimeout(() => {
      setFormState("idle");
    }, 4000);
  };

  const MotionWrapper = prefersReducedMotion ? "div" : motion.div;

  return (
    <MotionWrapper
      {...(!prefersReducedMotion && {
        variants: newsletterReveal,
        initial: "initial",
        whileInView: "animate",
        viewport: { once: true, margin: "-50px" },
      })}
      className={cn(
        "bg-black rounded-3xl py-10 md:py-12 px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col md:flex-row items-center justify-between gap-8 w-full",
        className
      )}
    >
      <div className="flex flex-col gap-2 text-center md:text-left flex-1">
        <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-[2.75rem] uppercase leading-tight tracking-tight">
          Stay up to date about
          <br />
          our latest offers
        </h1>
      </div>

      <div className="w-full md:w-auto md:min-w-95 lg:min-w-100">
        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              variants={prefersReducedMotion ? undefined : formSuccessFade}
              initial={prefersReducedMotion ? false : "initial"}
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center gap-3 py-6"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div className="text-center">
                <p className="text-white font-medium text-base">
                  You&apos;re subscribed!
                </p>
                <p className="text-white/60 text-sm mt-1">
                  Thank you for joining our newsletter.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={false}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3.5"
            >
              {/* Email Input */}
              <div className="relative flex items-center">
                <MdOutlineEmail
                  className={cn(
                    "absolute left-5 text-xl transition-colors duration-180",
                    isFocused ? "text-black/60" : "text-black/40"
                  )}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email address"
                  disabled={formState === "loading"}
                  className={cn(
                    "w-full pl-14 pr-5 py-3.5 rounded-full bg-white text-sm text-black placeholder:text-black/40 outline-none font-normal transition-all duration-180",
                    "disabled:opacity-70 disabled:cursor-not-allowed",
                    isFocused
                      ? "ring-2 ring-white/30 shadow-[0_0_0_4px_rgba(255,255,255,0.1)]"
                      : "ring-0"
                  )}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState === "loading" || !email}
                className={cn(
                  "relative w-full py-3.5 rounded-full bg-white text-black font-medium text-sm transition-all duration-150",
                  "hover:bg-white/90 hover:-translate-y-px hover:shadow-md",
                  "active:translate-y-0 active:shadow-none",
                  "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                )}
              >
                <span
                  className={cn(
                    "transition-opacity duration-150",
                    formState === "loading" ? "opacity-0" : "opacity-100"
                  )}
                >
                  Subscribe to Newsletter
                </span>
                {formState === "loading" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-black" />
                  </span>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </MotionWrapper>
  );
};

export default NewsletterBanner;
