import React from "react";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

interface HeroStatsProps {
  stats: Stat[];
  className?: string;
}

const HeroStats: React.FC<HeroStatsProps> = ({ stats, className }) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-6 md:gap-8 lg:gap-12", className)}>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-1 md:gap-2"
        >
          <h3 className="font-semibold text-3xl md:text-4xl  text-black">
            {stat.value}
          </h3>
          <p className="text-sm md:text-base text-black/60">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
