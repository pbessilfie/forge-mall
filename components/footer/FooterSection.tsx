import React from "react";
import { cn } from "@/lib/utils";

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h3 className="text-sm font-semibold text-black tracking-wider uppercase">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
};

export default FooterSection;
