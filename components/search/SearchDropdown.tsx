"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { Product } from "@/components/products/ProductCard";

interface SearchDropdownProps {
  query: string;
  results: Product[];
  isVisible: boolean;
  selectedIndex: number;
  onClose: () => void;
}

const SearchDropdown = ({
  query,
  results,
  isVisible,
  selectedIndex,
  onClose,
}: SearchDropdownProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.2)] border border-black/[0.07] overflow-hidden z-50"
        >
          {results.length > 0 ? (
            <>
              <ul className="py-1.5">
                {results.map((product, idx) => (
                  <motion.li
                    key={product.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.14, delay: idx * 0.03 }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        selectedIndex === idx
                          ? "bg-black/[0.06]"
                          : "hover:bg-black/[0.03]"
                      }`}
                    >
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#F0EEED] flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-black line-clamp-1">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm text-black font-medium">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-black/40 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {product.discount && (
                        <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full flex-shrink-0">
                          -{product.discount}%
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="border-t border-black/[0.07] px-4 py-2.5">
                <Link
                  href={`/product-listing?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-sm text-black/50 hover:text-black transition-colors flex items-center gap-2 font-medium"
                >
                  <IoSearch className="text-base flex-shrink-0" />
                  <span>
                    See all results for{" "}
                    <span className="text-black">"{query}"</span>
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="py-8 text-center"
            >
              <p className="text-sm text-black/40">
                No results for{" "}
                <span className="font-semibold text-black/70">"{query}"</span>
              </p>
              <p className="text-xs text-black/30 mt-1">
                Try a different search term
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDropdown;
