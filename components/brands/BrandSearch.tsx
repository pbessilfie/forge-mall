"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const BrandSearch: React.FC<BrandSearchProps> = ({
  value,
  onChange,
  placeholder = "Search brands...",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center w-full max-w-md",
        className
      )}
    >
      <Search className="absolute left-4 w-5 h-5 text-black/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3 bg-[#F5F5F5] rounded-full text-sm text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black/10 transition-all duration-150"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 w-6 h-6 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors duration-150"
        >
          <X className="w-3.5 h-3.5 text-black/60" />
        </button>
      )}
    </div>
  );
};

export default BrandSearch;
