"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import ProductImageGallery from "@/components/pdp/ProductImageGallery";
import ProductInfo from "@/components/pdp/ProductInfo";
import ProductTabs from "@/components/pdp/ProductTabs";
import ProductSection from "@/components/products/ProductSection";
import RecentlyViewedSection from "@/components/products/RecentlyViewedSection";
import { getProductDetails, mockReviews } from "@/lib/getProductDetails";
import { useRecentlyViewedStore } from "@/lib/recently-viewed-store";
import { topSelling } from "@/lib/mockProducts";
import {
  pdpContainer,
  imageGalleryVariant,
  productInfoVariant,
  breadcrumbVariant,
  fadeInUp,
} from "@/lib/motion-variants";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  const product = getProductDetails(id);
  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addProduct);

  // Track this product as recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed({
        id: product.id,
        name: product.name,
        image: product.images[0]?.url ?? "",
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        rating: product.rating,
      });
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-col items-center justify-center py-32 gap-5 text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <p className="text-6xl font-bold text-black/10">404</p>
            <h1 className="text-2xl font-bold text-black">Product not found</h1>
            <p className="text-black/50 text-sm max-w-xs">
              This product doesn&apos;t exist or may have been removed.
            </p>
            <button
              onClick={() => router.push("/discover")}
              className="mt-2 px-7 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-black/85 transition-colors"
            >
              Back to Shop
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
      <div className="container mx-auto">
        {/* Breadcrumb */}
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
              href="/category/all"
              className="text-black/60 hover:text-black transition-colors"
            >
              Shop
            </Link>
            <ChevronRight className="w-4 h-4 text-black/40" />
            <span className="text-black font-medium line-clamp-1 max-w-48">
              {product.name}
            </span>
          </nav>
        </motion.div>

        {/* Product Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 min-h-96 pb-7 md:pb-12"
          variants={pdpContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={imageGalleryVariant}>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </motion.div>

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

        {/* Tabs */}
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

        {/* Related Products */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <ProductSection
            title="You May Also Like"
            products={topSelling.filter((p) => p.id !== product.id)}
            viewAllLink="/category/all"
          />
        </motion.div>

        {/* Recently Viewed */}
        <RecentlyViewedSection excludeId={product.id} />
      </div>
    </main>
  );
};

export default ProductPage;
