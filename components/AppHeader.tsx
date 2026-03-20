"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCartOutline, IoSearch, IoClose } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useWishlistStore } from "@/lib/wishlist-store";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/lib/cart-store";
import { searchProducts } from "@/lib/searchData";
import { Product } from "@/components/products/ProductCard";
import SearchDropdown from "@/components/search/SearchDropdown";

const AppHeader = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const showDropdown = isSearchFocused && searchQuery.trim().length >= 2;

  // Debounced search — resets keyboard selection index alongside results
  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedIndex(-1);
      if (searchQuery.trim().length >= 2) {
        setSearchResults(searchProducts(searchQuery));
      } else {
        setSearchResults([]);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isOutsideDesktop = !desktopSearchRef.current?.contains(target);
      const isOutsideMobile = !mobileSearchRef.current?.contains(target);
      if (isOutsideDesktop && isOutsideMobile) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          router.push(`/product/${searchResults[selectedIndex].id}`);
          clearSearch();
        } else if (searchQuery.trim()) {
          router.push(
            `/product-listing?q=${encodeURIComponent(searchQuery.trim())}`
          );
          clearSearch();
        }
        break;
      case "Escape":
        clearSearch();
        break;
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
    setSelectedIndex(-1);
    setIsSearchOpen(false);
  };

  const headerNavItems = [
    { label: "Shop", link: "/category/all" },
    { label: "On Sale", link: "/on-sale" },
    { label: "New Arrivals", link: "/new-arrivals" },
    { label: "Brands", link: "/brands" },

  ];

  const handleNavClick = (link: string) => {
    setIsMobileMenuOpen(false);
    router.push(link);
  };

  return (
    <>
      <header className="px-5 md:px-7 lg:px-12 xl:px-20 bg-white/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between gap-3 border-b border-black/10 py-3 lg:py-5">
          {/* Mobile: Hamburger | Desktop: Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1 -ml-1"
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt2 className="text-2xl text-black" />
            </button>
            <h1
              className="font-bold text-2xl md:text-3xl text-black cursor-pointer"
              onClick={() => router.push("/discover")}
            >
              FORGE.MALL
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {headerNavItems.map((navItem, idx) => (
              <Link
                key={idx}
                href={navItem.link}
                className="text-sm text-black hover:underline"
              >
                {navItem.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search Bar */}
          <div ref={desktopSearchRef} className="hidden lg:flex relative w-xl">
            <div className="rounded-full bg-[#f0f0f0] flex items-center gap-2.5 w-full px-3">
              <IoSearch className="text-black/40 text-xl shrink-0" />
              <input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={handleKeyDown}
                className="text-sm placeholder:text-black/40 text-black px-1.5 py-3 bg-transparent flex-1 outline-0 font-medium placeholder:font-normal"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    onClick={clearSearch}
                    className="text-black/40 hover:text-black/70 transition-colors"
                    aria-label="Clear search"
                  >
                    <IoClose className="text-lg" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <SearchDropdown
              query={searchQuery}
              results={searchResults}
              isVisible={showDropdown}
              selectedIndex={selectedIndex}
              onClose={clearSearch}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-2 text-black">
            {/* Search Icon - Mobile Only */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) clearSearch();
              }}
              className="lg:hidden rounded-md hover:bg-black/5 p-2 cursor-pointer"
              aria-label="Search"
            >
              <IoSearch className="text-[22px]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => router.push("/wishlist")}
              className="relative rounded-md hover:bg-black/5 p-2 cursor-pointer hidden sm:flex"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
            >
              <AnimatePresence mode="wait">
                {wishlistCount > 0 ? (
                  <motion.span
                    key="filled"
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  >
                    <FaHeart className="text-[20px] md:text-[22px] text-red-500" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="empty"
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaRegHeart className="text-[20px] md:text-[22px]" />
                  </motion.span>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key="wishlist-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold min-w-4.5 h-4.5 rounded-full flex items-center justify-center px-1 leading-none"
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Cart */}
            <button
              onClick={() => router.push("/cart")}
              className="relative rounded-md hover:bg-black/5 p-2 cursor-pointer"
              aria-label={`Cart${cartItemCount > 0 ? `, ${cartItemCount} items` : ""}`}
            >
              <IoCartOutline className="text-[22px] md:text-2xl" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold min-w-4.5 h-4.5 rounded-full flex items-center justify-center px-1 leading-none"
                  >
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Account */}
            <button
              className="rounded-md hover:bg-black/5 p-2 cursor-pointer"
              onClick={() => router.push("/login")}
              aria-label="Account"
            >
              <MdOutlineAccountCircle className="text-[22px] md:text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden border-b border-black/10"
            >
              <div ref={mobileSearchRef} className="py-3 relative">
                <div className="rounded-full bg-[#f0f0f0] flex items-center gap-2.5 px-4">
                  <IoSearch className="text-black/40 text-xl shrink-0" />
                  <input
                    type="search"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={handleKeyDown}
                    className="text-sm placeholder:text-black/40 text-black py-3 bg-transparent flex-1 outline-0 font-medium placeholder:font-normal"
                    autoFocus
                  />
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.15 }}
                        onClick={clearSearch}
                        className="text-black/40 hover:text-black/70 transition-colors"
                        aria-label="Clear search"
                      >
                        <IoClose className="text-lg" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
                <SearchDropdown
                  query={searchQuery}
                  results={searchResults}
                  isVisible={showDropdown}
                  selectedIndex={selectedIndex}
                  onClose={clearSearch}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-70 bg-white z-50 lg:hidden shadow-2xl"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-black/10">
                <h2 className="font-bold text-xl text-black">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 hover:bg-black/5 rounded-md"
                  aria-label="Close menu"
                >
                  <IoClose className="text-2xl text-black" />
                </button>
              </div>

              {/* Menu Navigation */}
              <nav className="p-5">
                <ul className="space-y-1">
                  {headerNavItems.map((navItem, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavClick(navItem.link)}
                        className="w-full text-left px-4 py-3 text-base font-medium text-black hover:bg-black/5 rounded-lg transition-colors"
                      >
                        {navItem.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-black/10">
                <button
                  onClick={() => handleNavClick("/login")}
                  className="w-full py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-black/90 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppHeader;
