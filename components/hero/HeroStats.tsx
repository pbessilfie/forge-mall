import React from "react";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

interface HeroStatsProps {
  stats: Stat[];
  className?: string;
  mobileLayout?: boolean;
}

const HeroStats: React.FC<HeroStatsProps> = ({
  stats,
  className,
  mobileLayout = false,
}) => {
  if (mobileLayout && stats.length >= 3) {
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        {/* Top row - first two stats with divider */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-0.5 text-center">
            <h3 className="font-bold text-2xl text-black">{stats[0].value}</h3>
            <p className="text-xs text-black/60">{stats[0].label}</p>
          </div>
          <div className="w-px h-12 bg-black/10" />
          <div className="flex flex-col items-center gap-0.5 text-center">
            <h3 className="font-bold text-2xl text-black">{stats[1].value}</h3>
            <p className="text-xs text-black/60">{stats[1].label}</p>
          </div>
        </div>
        {/* Bottom row - third stat centered */}
        <div className="flex flex-col items-center gap-0.5 text-center">
          <h3 className="font-bold text-xl text-black">{stats[2].value}</h3>
          <p className="text-xs text-black/60">{stats[2].label}</p>
        </div>
      </div>
    );
  }

  // Desktop layout with dividers
  return (
    <div className={cn("flex items-center", className)}>
      {stats.map((stat, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-3xl xl:text-4xl text-black">
              {stat.value}
            </h3>
            <p className="text-sm text-black/60">{stat.label}</p>
          </div>
          {idx < stats.length - 1 && (
            <div className="w-px h-16 bg-black/10 mx-6 xl:mx-8" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default HeroStats;
