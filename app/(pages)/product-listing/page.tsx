"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { IoSearch } from "react-icons/io5";
import { RiEqualizerFill } from "react-icons/ri";
import { searchableProducts } from "@/lib/searchData";
import { Product } from "@/components/products/ProductCard";
import ProductGrid from "@/components/plp/ProductGrid";
import SortingHeader from "@/components/plp/SortingHeader";
import Pagination from "@/components/plp/Pagination";
import FiltersSidebar, { ActiveFilters } from "@/components/plp/FiltersSidebar";
import FiltersModal from "@/components/plp/FiltersModal";
import { pageVariants, fadeInUp } from "@/lib/motion-variants";

const ITEMS_PER_PAGE = 12;

type SortOption = "popular" | "newest" | "price_asc" | "price_dsc" | "top_rated";

const DEFAULT_FILTERS: ActiveFilters = {
  priceRange: [0, 400],
  colors: [],
  size: null,
};

const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products];
  switch (sortBy) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_dsc":
      return sorted.sort((a, b) => b.price - a.price);
    case "top_rated":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.reverse();
    default:
      return sorted;
  }
};

const ProductListingContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(DEFAULT_FILTERS);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = searchableProducts;

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter((p) => p.name.toLowerCase().includes(q));
    }

    // Price filter
    results = results.filter(
      (p) =>
        p.price >= activeFilters.priceRange[0] &&
        p.price <= activeFilters.priceRange[1]
    );

    return results;
  }, [query, activeFilters]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy]
  );

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    setCurrentPage(1);
  };

  const handleApplyFilters = (filters: ActiveFilters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    activeFilters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
    activeFilters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1] ||
    activeFilters.colors.length > 0 ||
    activeFilters.size !== null;

  return (
    <main className="min-h-dvh bg-white px-5 md:px-7 lg:px-12 xl:px-20">
      <div className="container mx-auto py-8 md:py-12">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Page Title */}
          <div className="mb-8 md:mb-10">
            {query ? (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <IoSearch className="text-black/40 text-lg" />
                  <p className="text-sm text-black/50">Search results for</p>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-black uppercase">
                  "{query}"
                </h1>
                <p className="text-black/50 mt-1 text-sm">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-black uppercase">
                  All Products
                </h1>
                <p className="text-black/50 mt-1 text-sm">
                  {filteredProducts.length} products
                </p>
              </div>
            )}
          </div>

          {/* Layout: Sidebar + Grid */}
          <div className="flex gap-6 lg:gap-8 items-start">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24">
              <FiltersSidebar onApplyFilters={handleApplyFilters} />
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Mobile filter button + sort */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <button
                  onClick={() => setIsFiltersModalOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-black/15 rounded-full text-sm font-medium text-black hover:bg-black/5 transition-colors"
                >
                  <RiEqualizerFill className="text-base" />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-black" />
                  )}
                </button>

                <SortingHeader
                  totalProducts={sortedProducts.length}
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onSortChange={handleSortChange}
                  className="flex-1"
                />
              </div>

              <AnimatePresence mode="wait">
                {paginatedProducts.length > 0 ? (
                  <motion.div
                    key={`${query}-${JSON.stringify(activeFilters)}-${sortBy}-${currentPage}`}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                  >
                    <ProductGrid products={paginatedProducts} animated />

                    {totalPages > 1 && (
                      <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="mt-10"
                      >
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={(page) => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col items-center justify-center py-24 gap-5 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center">
                      <IoSearch className="text-4xl text-black/25" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-black">
                        {query ? `No results for "${query}"` : "No products match your filters"}
                      </h2>
                      <p className="text-black/50 mt-1.5 text-sm max-w-xs">
                        {query
                          ? "Try a different search term or browse our collections."
                          : "Try adjusting your filters."}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Link
                        href="/new-arrivals"
                        className="px-6 py-2.5 border border-black/15 text-black text-sm font-medium rounded-full hover:bg-black/5 transition-colors"
                      >
                        New Arrivals
                      </Link>
                      <Link
                        href="/on-sale"
                        className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-black/85 transition-colors"
                      >
                        On Sale
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Filters Modal */}
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </main>
  );
};

const ProductListingPage = () => (
  <Suspense>
    <ProductListingContent />
  </Suspense>
);

export default ProductListingPage;
