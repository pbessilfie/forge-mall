"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCartOutline, IoSearch, IoClose } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/lib/cart-store";

const AppHeader = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItemCount = useCartStore((s) => s.getItemCount());

  const headerNavItems = [
    {
      label: "Shop",
      link: "/category/all",
    },
    {
      label: "On Sale",
      link: "/on-sale",
    },
    {
      label: "New Arrivals",
      link: "/new-arrivals",
    },
    {
      label: "Brands",
      link: "/brands",
    },
  ];

  const handleNavClick = (link: string) => {
    setIsMobileMenuOpen(false);
    router.push(link);
  };

  return (
    <>
      <header className="px-5 md:px-7 lg:px-12 xl:px-20 bg-white/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between gap-3 border-b border-black/10 py-3 lg:py-5">
          {/* Mobile: Hamburger Menu | Desktop: Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger - Mobile Only */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1 -ml-1"
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt2 className="text-2xl text-black" />
            </button>

            {/* Logo */}
            <h1
              className="font-bold text-2xl md:text-3xl text-black cursor-pointer"
              onClick={() => router.push("/discover")}
            >
              FORGE.MALL
            </h1>
          </div>

          {/* Desktop Navigation - Hidden on Mobile */}
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

          {/* Desktop Search Bar - Hidden on Mobile */}
          <div className="hidden lg:flex rounded-full bg-[#f0f0f0] items-center gap-2.5 w-xl overflow-hidden px-3">
            <IoSearch className="text-black/40 text-xl" />
            <input
              type="search"
              placeholder="Search for products..."
              className="text-sm placeholder:text-black/40 text-black px-1.5 py-3 bg-transparent flex-1 outline-0 font-medium placeholder:font-normal"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-2 text-black">
            {/* Search Icon - Mobile Only */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden rounded-md hover:bg-black/5 p-2 cursor-pointer"
              aria-label="Search"
            >
              <IoSearch className="text-[22px]" />
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
                    className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 leading-none"
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-b border-black/10"
            >
              <div className="py-3">
                <div className="rounded-full bg-[#f0f0f0] flex items-center gap-2.5 px-4">
                  <IoSearch className="text-black/40 text-xl" />
                  <input
                    type="search"
                    placeholder="Search for products..."
                    className="text-sm placeholder:text-black/40 text-black py-3 bg-transparent flex-1 outline-0 font-medium placeholder:font-normal"
                    autoFocus
                  />
                </div>
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
                    <li key={idx}>
                      <button
                        onClick={() => handleNavClick(navItem.link)}
                        className="w-full text-left px-4 py-3 text-base font-medium text-black hover:bg-black/5 rounded-lg transition-colors"
                      >
                        {navItem.label}
                      </button>
                    </li>
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
