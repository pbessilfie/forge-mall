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
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-5 md:px-7 pt-8 pb-0">
          <motion.div
            variants={heroContentContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-start"
          >
            {/* Title */}
            <motion.h1
              variants={heroContentItem}
              className="font-bold text-[2.5rem] md:text-5xl text-black leading-[1.1] uppercase tracking-tight"
            >
              Find clothes
              <br />
              that matches
              <br />
              your style
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroContentItem}
              className="text-sm text-black/60 leading-relaxed mt-4 max-w-sm"
            >
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </motion.p>

            {/* Shop Now Button */}
            <motion.div variants={heroContentItem} className="w-full mt-6">
              <Button
                asChild
                className="w-full bg-black text-white hover:bg-black/90 rounded-full py-3.5 h-auto text-sm font-medium"
              >
                <Link href="/category/all">Shop Now</Link>
              </Button>
            </motion.div>

            {/* Stats - Mobile Layout */}
            <motion.div variants={heroContentItem} className="w-full mt-8">
              <HeroStats stats={stats} mobileLayout />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Image - Mobile */}
        <div className="relative w-full">
          <div className="relative w-full aspect-4/5 md:aspect-3/4">
            <Image
              src="/images/hero-image-mobile.svg"
              alt="Fashion models showcasing style"
              fill
              className="object-contain object-bottom"
              priority
            />
            {/* Decorative Stars */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="absolute top-[15%] right-[8%]"
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 md:w-14 md:h-14"
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
              className="absolute top-[45%] left-[5%]"
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 md:w-10 md:h-10"
              >
                <path
                  d="M28 0L30.7049 25.2951L56 28L30.7049 30.7049L28 56L25.2951 30.7049L0 28L25.2951 25.2951L28 0Z"
                  fill="black"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Full Width Image with Content Overlay */}
      <div className="hidden lg:block">
        <div className="relative min-h-150 xl:min-h-175 overflow-hidden">
          {/* Full Width Hero Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-image.png"
              alt="Fashion models showcasing style"
              fill
              className="object-contain object-bottom-right"
              priority
            />
          </div>

          {/* Decorative Stars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="absolute top-12 right-[8%] xl:top-16 xl:right-[10%] z-10"
          >
            <svg
              width="104"
              height="104"
              viewBox="0 0 104 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 xl:w-18 xl:h-18"
            >
              <path
                d="M52 0L54.8366 49.1634L104 52L54.8366 54.8366L52 104L49.1634 54.8366L0 52L49.1634 49.1634L52 0Z"
                fill="black"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="absolute top-1/3 right-[42%] xl:right-[44%] z-10"
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 xl:w-14 xl:h-14"
            >
              <path
                d="M28 0L30.7049 25.2951L56 28L30.7049 30.7049L28 56L25.2951 30.7049L0 28L25.2951 25.2951L28 0Z"
                fill="black"
              />
            </svg>
          </motion.div>

          {/* Content Overlay - Left Aligned */}
          <div className="relative z-20 h-full min-h-150 xl:min-h-175 flex items-center">
            <div className="px-12 xl:px-20 py-16 xl:py-20 max-w-[55%] xl:max-w-[50%]">
              <motion.div
                variants={heroContentContainer}
                initial="initial"
                animate="animate"
                className="flex flex-col gap-6 xl:gap-8"
              >
                {/* Title & Description */}
                <div className="flex flex-col gap-4 xl:gap-5">
                  <motion.h1
                    variants={heroContentItem}
                    className="font-bold text-[3rem] xl:text-[4rem] text-black leading-[1.05] uppercase tracking-tight"
                  >
                    Find clothes
                    <br />
                    that matches
                    <br />
                    your style
                  </motion.h1>
                  <motion.p
                    variants={heroContentItem}
                    className="text-base text-black/60 leading-relaxed max-w-md xl:max-w-lg"
                  >
                    Browse through our diverse range of meticulously crafted
                    garments, designed to bring out your individuality and cater
                    to your sense of style.
                  </motion.p>
                </div>

                {/* Shop Now Button */}
                <motion.div variants={heroContentItem}>
                  <Button
                    asChild
                    className="bg-black text-white hover:bg-black/90 rounded-full px-12 xl:px-16 py-4 h-auto text-base font-medium"
                  >
                    <Link href="/category/all">Shop Now</Link>
                  </Button>
                </motion.div>

                {/* Stats with Dividers */}
                <motion.div variants={heroContentItem} className="pt-2 xl:pt-4">
                  <HeroStats stats={stats} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Strip */}
      <BrandStrip />
    </motion.section>
  );
};

export default DiscoverHero;
