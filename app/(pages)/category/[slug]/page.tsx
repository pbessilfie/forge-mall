"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FiltersSidebar from "@/components/plp/FiltersSidebar";
import FiltersModal from "@/components/plp/FiltersModal";
import SortingHeader from "@/components/plp/SortingHeader";
import ProductGrid from "@/components/plp/ProductGrid";
import Pagination from "@/components/plp/Pagination";
import { allProducts } from "@/lib/mockProducts";
import { RiEqualizerFill } from "react-icons/ri";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("most-popular");
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const itemsPerPage = 9;

  // Unwrap params promise
  const { slug } = use(params);

  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Pagination logic
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    // Implement sorting logic here
  };

  return (
    <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
      <div className="container mx-auto">
        {" "}
        {/* Breadcrumb */}
        <div className=" py-5">
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/"
              className="text-black/60 hover:text-black transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-black/40" />
            <span className="text-black font-medium">{categoryName}</span>
          </nav>
        </div>
        {/* Main Content */}
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-6 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="hidden lg:block">
              <FiltersSidebar />
            </div>

            {/* Products Section */}
            <div className="space-y-5">
              <div className="flex items-center lg:items-start justify-between ">
                {" "}
                <div className=" flex items-baseline gap-2.5 justify-between lg:w-full">
                  {" "}
                  <h1 className="text-3xl md:text-4xl font-bold text-black">
                    {categoryName}
                  </h1>
                  {/* Sorting Header */}
                  <SortingHeader
                    totalProducts={allProducts.length}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onSortChange={handleSortChange}
                  />
                </div>
                {/* Category Title */}
                <button
                  onClick={() => setIsFiltersModalOpen(true)}
                  className="rounded-full p-2 bg-gray-100 lg:hidden"
                >
                  <RiEqualizerFill className="text-xl text-black" />{" "}
                </button>
              </div>

              {/* Product Grid */}
              <ProductGrid
                key={`${slug}-${currentPage}`}
                products={currentProducts}
                animated
              />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Modal */}
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
      />
    </main>
  );
};

export default CategoryPage;
