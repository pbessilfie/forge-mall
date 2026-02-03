import React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const Separator: React.FC<SeparatorProps> = ({
  className,
  orientation = "horizontal",
}) => {
  return (
    <div
      className={cn(
        "container mx-auto px-5 md:px-7 lg:px-12 xl:px-20",
        className
      )}
    >
      <hr
        className={cn(
          "border-black/10",
          orientation === "horizontal" ? "border-t" : "border-l h-full"
        )}
      />
    </div>
  );
};

export default Separator;
