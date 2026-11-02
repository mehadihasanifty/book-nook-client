"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import AuthButtons from "./UserAuthButton";
import Image from "next/image";

type NavbarLink = {
  name: string;
  href: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;

  const publicLinks: NavbarLink[] = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
  ];

  const privateLinks: NavbarLink[] = [
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  // Private routes are only visible to logged in users.
  const navLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const desktopLinkClass = (href: string) =>
    `relative flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
      isActive(href)
        ? "bg-[#174D38] text-white shadow-md shadow-[#174D38]/25 dark:bg-[#D5B477] dark:text-[#173D2D]"
        : "text-[#55584E] hover:bg-white hover:text-[#174D38] dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-[#D5B477]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full  px-3 py-3  sm:px-5">
      <nav className="mx-auto flex w-full max-w-360 items-center justify-between gap-4 rounded-[1.75rem] border border-[#ECEAE2] bg-white px-4 py-2.5 shadow-[0_12px_35px_rgba(23,77,56,0.10)] dark:border-gray-800 dark:bg-gray-600 sm:rounded-full sm:px-6 sm:py-3">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/Book-Nook-Logo.jpg"
            alt="BookNook logo"
            width={112}
            height={112}
            preload
            className="h-11 w-11 rounded-[0.9rem] object-cover shadow-md shadow-[#174D38]/20 transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
          />

          <div className="leading-none">
            <h1 className="font-serif text-[24px] font-bold tracking-tight text-[#1D241D] sm:text-[29px] dark:text-[#F5EFE3]">
              BookNook
            </h1>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[2px] text-black dark:text-gray-950">
              Your Reading Space
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center rounded-full bg-[#F4F4F0] p-1.5 lg:flex dark:bg-gray-900">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={desktopLinkClass(link.href)}
            >
              {link.name === "Home" && <Home size={16} strokeWidth={2.4} />}
              {link.name}
              {isActive(link.href) && (
                <span className="absolute -bottom-2.5 left-1/2 h-1 w-9 -translate-x-1/2 rounded-full bg-[#174D38] dark:bg-[#D5B477]" />
              )}
            </Link>
          ))}
        </div>

        {/* Right side: authentication + menu toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <AuthButtons user={user} isPending={isPending} />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="flex h-12 w-16 cursor-pointer items-center justify-center rounded-[1.1rem] border border-[#ECEAE2] bg-white text-[#1D241D] shadow-sm transition-all duration-300 hover:border-[#C49A5A]/60 hover:bg-[#F8F6F0] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 lg:hidden"
          >
            
            {isMenuOpen ? (
              <X size={22} strokeWidth={2.5} />
            ) : (
              <Menu size={22} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Dropdown Menu */}
      <div
        className={`absolute inset-x-0 top-full z-40 mt-2 px-3 transition-all duration-300 sm:px-5 ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-360 overflow-hidden rounded-3xl border border-[#ECEAE2] bg-white p-4 shadow-[0_20px_50px_rgba(23,77,56,0.16)] dark:border-gray-800 dark:bg-gray-950 sm:px-6 sm:pb-6">
          <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-[2px] text-[#A18A62]">
            Explore BookNook
          </p>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-[#174D38] text-white shadow-md shadow-[#174D38]/15 dark:bg-[#245E45]"
                    : "text-[#55584E] hover:bg-[#F4F4F0] hover:text-[#174D38] dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-[#D5B477]"
                }`}
              >
                {link.name === "Home" && <Home size={16} strokeWidth={2.4} />}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t border-[#EAE5D9] pt-4 dark:border-gray-800">
            <AuthButtons
              user={user}
              isPending={isPending}
              isMobile
              onNavigate={() => setIsMenuOpen(false)}
            />
          </div>

          <p className="mt-4 text-center font-serif text-xs italic text-[#A18A62]">
            Every book opens a new world.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
