import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";


interface Brand {
  name: string;
  logo: string;
  slug: string;
}

interface BrandStripProps {
  className?: string;
}

const BrandStrip: React.FC<BrandStripProps> = ({ className }) => {
  const brands: Brand[] = [
    { name: "Versace", logo: "/brands/versace.svg", slug: "versace"  },
    { name: "Zara", logo: "/brands/zara.svg", slug: "zara"  },
    { name: "Gucci", logo: "/brands/gucci.svg", slug: "gucci"  },
    { name: "Prada", logo: "/brands/prada.svg", slug: "prada"  },
    { name: "Calvin Klein", logo: "/brands/calvin-klein.svg", slug: "calvin-klein"  },
  ];
  return (
    <div className={cn("bg-black py-8 md:py-10 lg:py-12", className)}>
      <div className="container mx-auto px-5 md:px-7 lg:px-12 xl:px-20">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-10 lg:gap-12">
          {brands.map((brand, idx) => (
            <Link
              key={idx}
              className="relative h-8 md:h-10 lg:h-12 w-auto"
              href={`/category/${brand.slug}`}
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={160}
                height={48}
                className="h-full w-auto object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandStrip;
