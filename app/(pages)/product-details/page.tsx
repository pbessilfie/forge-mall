"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import ProductImageGallery from "@/components/pdp/ProductImageGallery";
import ProductInfo from "@/components/pdp/ProductInfo";
import ProductTabs from "@/components/pdp/ProductTabs";
import { mockProductDetails, mockReviews } from "@/lib/mockProductDetails";
import ProductSection from "@/components/products/ProductSection";
import { topSelling } from "@/lib/mockProducts";
import {
  pdpContainer,
  imageGalleryVariant,
  productInfoVariant,
  breadcrumbVariant,
  fadeInUp,
} from "@/lib/motion-variants";

const ProductDetailsPage = () => {
  const product = mockProductDetails;

  return (
    <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
      <div className="container mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.div
          className="py-5"
          variants={breadcrumbVariant}
          initial="initial"
          animate="animate"
        >
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/"
              className="text-black/60 hover:text-black transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-black/40" />
            <Link
              href="/category/men"
              className="text-black/60 hover:text-black transition-colors"
            >
              Shop
            </Link>
            <ChevronRight className="w-4 h-4 text-black/40" />
            <Link
              href="/category/men"
              className="text-black/60 hover:text-black transition-colors"
            >
              Men
            </Link>
            <ChevronRight className="w-4 h-4 text-black/40" />
            <span className="text-black font-medium">T-shirts</span>
          </nav>
        </motion.div>

        {/* Product Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 min-h-96 pb-7 md:pb-12"
          variants={pdpContainer}
          initial="initial"
          animate="animate"
        >
          {/* Left: Image Gallery */}
          <motion.div variants={imageGalleryVariant}>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </motion.div>

          {/* Right: Product Info */}
          <motion.div variants={productInfoVariant}>
            <ProductInfo
              id={product.id}
              name={product.name}
              rating={product.rating}
              reviewCount={product.reviewCount}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              description={product.description}
              colors={product.colors}
              sizes={product.sizes}
              image={product.images[0]?.url}
            />
          </motion.div>
        </motion.div>

        {/* Product Tabs Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProductTabs
            productDetails={product.details}
            reviews={mockReviews}
            totalReviews={product.reviewCount}
            faqs={product.faqs}
            className="pb-16 lg:pb-20"
          />
        </motion.div>

        {/* Related Products Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <ProductSection
            title="Top Selling"
            products={topSelling}
            viewAllLink="/products/top-selling"
          />
        </motion.div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
