import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface StyleCategory {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface StyleCardProps {
  category: StyleCategory;
  className?: string;
}

const StyleCard: React.FC<StyleCardProps> = ({ category, className }) => {
  return (
    <Link
      href={category.link}
      className={cn(
        "group relative block overflow-hidden rounded-3xl bg-white transition-transform hover:scale-[1.02] duration-300",
        className
      )}
    >
      {/* Background Image */}
      <div className="relative w-full h-full min-h-70 md:min-h-75">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Category Name */}
      <div className="absolute top-5 left-6 md:top-6 md:left-8">
        <h3 className="font-bold text-2xl md:text-3xl text-black">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default StyleCard;
