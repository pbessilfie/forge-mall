"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

const AppHeader = () => {
  const router = useRouter();
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
      label: "New Arrival",
      link: "/category/new-arrivals",
    },
    {
      label: "Brands",
      link: "/category/brands",
    },
  ];
  return (
    <header className=" px-5 md:px-7 lg:px-12 xl:px-20 bg-white/50 backdrop-blur-sm sticky top-0 z-50 ">
      <div className="container mx-auto flex items-center justify-between gap-3 border-b border-black/10 py-3 lg:py-5">
        <h1
          className="font-bold text-3xl text-black cursor-pointer"
          onClick={() => router.push("/discover")}
        >
          FORGE.MALL
        </h1>
        <nav className="flex items-center gap-3">
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
        <div className="rounded-full bg-[#f0f0f0] flex items-center gap-2.5 w-xl overflow-hidden px-2.5">
          <IoSearch className="text-black/40 text-2xl" />
          <input
            type="search"
            placeholder="Search for products..."
            className="text-sm placeholder:text-black/40 text-black px-1.5 py-3 bg-transparent flex-1 outline-0 font-medium placeholder:font-normal"
          />
        </div>
        <div className="flex items-center gap-2 text-black">
          <button
            onClick={() => router.push("/cart")}
            className="rounded-md hover:bg-accent p-2 cursor-pointer"
          >
            <IoCartOutline className="text-2xl" />
          </button>
          <button className="rounded-md hover:bg-accent p-2 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            <MdOutlineAccountCircle className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
