"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import StyleCard, { StyleCategory } from "./StyleCard";
import {
  sectionFadeUp,
  styleGridContainer,
  styleCardItem,
} from "@/lib/motion-variants";

interface BrowseByStyleSectionProps {
  categories: StyleCategory[];
  className?: string;
  animated?: boolean;
}

const BrowseByStyleSection: React.FC<BrowseByStyleSectionProps> = ({
  categories,
  className,
  animated = false,
}) => {
  if (animated) {
    return (
      <motion.section
        variants={sectionFadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        className={cn("py-8 md:py-14 xl:py-20", className)}
      >
        <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20 bg-[#F0F0F0] rounded-4xl">
          <div className="bg-[#F0F0F0] rounded-[40px] px-6 md:px-12 lg:px-16 py-10 md:py-14 lg:py-16">
            <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
              {/* Section Title */}
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black uppercase text-center">
                Browse by Dress Style
              </h2>

              {/* Style Grid - Animated */}
              <motion.div
                variants={styleGridContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-30px" }}
                className="flex flex-col gap-5"
              >
                {/* First Row - Casual (1/3) and Formal (2/3) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <motion.div variants={styleCardItem} className="md:col-span-1">
                    <StyleCard category={categories[0]} />
                  </motion.div>
                  <motion.div variants={styleCardItem} className="md:col-span-2">
                    <StyleCard category={categories[1]} />
                  </motion.div>
                </div>

                {/* Second Row - Party (2/3) and Gym (1/3) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <motion.div variants={styleCardItem} className="md:col-span-2">
                    <StyleCard category={categories[2]} />
                  </motion.div>
                  <motion.div variants={styleCardItem} className="md:col-span-1">
                    <StyleCard category={categories[3]} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <section className={cn("py-8 md:py-14 xl:py-20", className)}>
      <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20 bg-[#F0F0F0] rounded-4xl">
        <div className="bg-[#F0F0F0] rounded-[40px] px-6 md:px-12 lg:px-16 py-10 md:py-14 lg:py-16">
          <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
            {/* Section Title */}
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black uppercase text-center">
              Browse by Dress Style
            </h2>

            {/* Style Grid */}
            <div className="flex flex-col gap-5">
              {/* First Row - Casual (1/3) and Formal (2/3) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1">
                  <StyleCard category={categories[0]} />
                </div>
                <div className="md:col-span-2">
                  <StyleCard category={categories[1]} />
                </div>
              </div>

              {/* Second Row - Party (2/3) and Gym (1/3) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <StyleCard category={categories[2]} />
                </div>
                <div className="md:col-span-1">
                  <StyleCard category={categories[3]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByStyleSection;
