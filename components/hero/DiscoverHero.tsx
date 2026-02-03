"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import HeroStats from "./HeroStats";
import BrandStrip from "./BrandStrip";
import {
  heroFadeIn,
  heroContentContainer,
  heroContentItem,
} from "@/lib/motion-variants";

const DiscoverHero = () => {
  const stats = [
    { value: "200+", label: "International Brands" },
    { value: "2,000+", label: "High-Quality Products" },
    { value: "30,000+", label: "Happy Customers" },
  ];

  return (
    <motion.section
      variants={heroFadeIn}
      initial="initial"
      animate="animate"
      className="relative bg-[#f2f0f1]"
    >
      {/* Hero Content */}
      <div className="min-h-[calc(100dvh-50rem)] relative container mx-auto">
        {/* Right Content - Hero Image */}
        <div className="w-full h-full overflow-hidden z-0">
          {/* Hero Image */}
          <Image
            src="/images/hero-image.png"
            alt="Fashion models showcasing style"
            fill
            className="object-contain object-center"
            priority
          />
          {/* Decorative Stars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="absolute top-12 right-8 md:top-16 md:right-12 lg:top-20 lg:right-16 z-20"
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
            >
              <path
                d="M28 0L30.7049 25.2951L56 28L30.7049 30.7049L28 56L25.2951 30.7049L0 28L25.2951 25.2951L28 0Z"
                fill="black"
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="absolute top-48 left-4 md:top-56 md:left-1/2 lg:top-64 z-20"
          >
            <svg
              width="104"
              height="104"
              viewBox="0 0 104 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            >
              <path
                d="M52 0L54.8366 49.1634L104 52L54.8366 54.8366L52 104L49.1634 54.8366L0 52L49.1634 49.1634L52 0Z"
                fill="black"
              />
            </svg>
          </motion.div>
        </div>

        {/* Left Content */}
        <div className="w-full lg:w-1/2 py-12 md:py-16 lg:py-20 relative z-30">
          <motion.div
            variants={heroContentContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-6 md:gap-8 lg:gap-10"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <motion.h1
                variants={heroContentItem}
                className="font-bold text-4xl md:text-5xl lg:text-6xl text-black leading-14 uppercase"
              >
                Find clothes
                <br />
                that matches
                <br />
                your style
              </motion.h1>
              <motion.p
                variants={heroContentItem}
                className="text-sm md:text-base text-black/60 leading-relaxed max-w-xl"
              >
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </motion.p>
            </div>

            <motion.div variants={heroContentItem}>
              <Button
                asChild
                className="bg-black text-white hover:bg-black/90 rounded-full px-12 md:px-16 py-3 h-auto text-sm md:text-base font-medium"
              >
                <Link href="/category/all">Shop Now</Link>
              </Button>
            </motion.div>

            {/* Stats - Desktop */}
            <motion.div variants={heroContentItem} className="hidden md:block">
              <HeroStats stats={stats} />
            </motion.div>
          </motion.div>

          {/* Stats - Mobile */}
          <motion.div
            variants={heroContentItem}
            initial="initial"
            animate="animate"
            className="md:hidden mt-8 pt-8 border-t border-black/10"
          >
            <HeroStats stats={stats} />
          </motion.div>
        </div>
      </div>

      {/* Brand Strip */}
      <BrandStrip />
    </motion.section>
  );
};

export default DiscoverHero;
