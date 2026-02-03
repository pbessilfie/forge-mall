import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductImageGallery from "@/components/pdp/ProductImageGallery";
import ProductInfo from "@/components/pdp/ProductInfo";
import ProductTabs from "@/components/pdp/ProductTabs";
import { mockProductDetails, mockReviews } from "@/lib/mockProductDetails";
import ProductSection from "@/components/products/ProductSection";
import { topSelling } from "@/lib/mockProducts";

const ProductDetailsPage = () => {
  const product = mockProductDetails;

  return (
    <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
      <div className="container mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="py-5">
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
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 min-h-96 pb-7 md:pb-12">
          {/* Left: Image Gallery */}
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />

          {/* Right: Product Info */}
          <ProductInfo
            name={product.name}
            rating={product.rating}
            reviewCount={product.reviewCount}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            description={product.description}
            colors={product.colors}
            sizes={product.sizes}
          />
        </div>

        {/* Product Tabs Section */}
        <ProductTabs
          productDetails={product.details}
          reviews={mockReviews}
          totalReviews={product.reviewCount}
          faqs={product.faqs}
          className="pb-16 lg:pb-20"
        />

        <ProductSection
          title="Top Selling"
          products={topSelling}
          viewAllLink="/products/top-selling"
        />
      </div>
    </main>
  );
};

export default ProductDetailsPage;
