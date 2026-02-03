"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  className,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const selectedImage = images[selectedImageIndex];

  return (
    <div className={cn("flex flex-col-reverse md:flex-row gap-3 h-full", className)}>
      {/* Thumbnail Gallery */}
      <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-y-auto scrollbar-hide h-full">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImageIndex(index)}
            className={cn(
              "relative shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-2xl overflow-hidden border-2 transition-all",
              selectedImageIndex === index
                ? "border-black"
                : "border-transparent hover:border-black/30"
            )}
          >
            <Image
              src={image.url}
              alt={`${productName} - thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 144px"
            />
          </button>
        ))}
      </div>

      {/* Main Image Preview */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F0EEED] order-1 md:order-2">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
