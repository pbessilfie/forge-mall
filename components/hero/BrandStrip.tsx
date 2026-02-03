import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Brand {
  name: string;
  logo: string;
}

interface BrandStripProps {
  className?: string;
}

const BrandStrip: React.FC<BrandStripProps> = ({ className }) => {
  const brands: Brand[] = [
    { name: "Versace", logo: "/brands/versace.svg" },
    { name: "Zara", logo: "/brands/zara.svg" },
    { name: "Gucci", logo: "/brands/gucci.svg" },
    { name: "Prada", logo: "/brands/prada.svg" },
    { name: "Calvin Klein", logo: "/brands/calvin-klein.svg" },
  ];

  return (
    <div className={cn("bg-black py-8 md:py-10 lg:py-12", className)}>
      <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-10 lg:gap-12">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="relative h-8 md:h-10 lg:h-12 w-auto"
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={160}
                height={48}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandStrip;
