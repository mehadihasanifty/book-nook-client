import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#071F17] text-[#F5EFE3]">
      {/* Lamp glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[#F3B54A]/10 blur-3xl" />

      {/* Gold binding strip */}
      <div className="relative h-1 w-full bg-gradient-to-r from-transparent via-[#D5B477]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12 lg:py-16">
        {/* Member CTA Banner */}
        <div className="mb-14 flex flex-col items-start justify-between gap-7 rounded-[2rem] border border-[#F5EFE3]/10 bg-white/[0.03] px-8 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.3)] sm:px-10 lg:flex-row lg:items-center">
          <div>
            <span className="mb-3 inline-flex items-center gap-2.5 rounded-full border border-[#D5B477]/30 bg-white/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#E7C995]">
              <span className="h-2 w-2 rounded-full bg-[#C5EF70]" />
              Join The Nook
            </span>

            <h2 className="font-serif text-2xl font-bold leading-tight text-[#F5EFE3] sm:text-3xl md:text-4xl">
              Every book opens a{" "}
              <span className="relative inline-block">
                <span className="relative z-10">new world</span>
                <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
              </span>
            </h2>
          </div>

          <Link
            href="/register"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#C5EF70] px-7 py-3.5 text-sm font-bold text-[#071F17] shadow-md shadow-[#C5EF70]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#D5F99A] hover:shadow-lg"
          >
            Become a member
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl ring-1 ring-[#D5B477]/40">
                <Image
                  src="/Book-Nook-Logo.jpg"
                  alt="BookNook Logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </span>

              <span className="font-serif text-2xl font-bold tracking-wide">
                Book<span className="text-[#C5EF70]">Nook</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-[#F5EFE3]/50">
              Your Digital Library. Discover wonderful stories, explore new
              perspectives, and find your next favorite book with BookNook.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-[#F5EFE3]">
              Quick Links
            </h3>

            <ul className="grid grid-cols-1 space-y-4 text-sm text-[#F5EFE3]/50 sm:grid-cols-1">
              <li>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 transition hover:text-[#C5EF70]"
                >
                  <span className="h-px w-0 bg-[#C5EF70] transition-all duration-300 group-hover:w-3" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="group inline-flex items-center gap-2 transition hover:text-[#C5EF70]"
                >
                  <span className="h-px w-0 bg-[#C5EF70] transition-all duration-300 group-hover:w-3" />
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  href="/add-book"
                  className="group inline-flex items-center gap-2 transition hover:text-[#C5EF70]"
                >
                  <span className="h-px w-0 bg-[#C5EF70] transition-all duration-300 group-hover:w-3" />
                  Add Book
                </Link>
              </li>
              <li>
                <Link
                  href="/my-books"
                  className="group inline-flex items-center gap-2 transition hover:text-[#C5EF70]"
                >
                  <span className="h-px w-0 bg-[#C5EF70] transition-all duration-300 group-hover:w-3" />
                  My Books
                </Link>
              </li>
              <li>
                <Link
                  href="/my-borrows"
                  className="group inline-flex items-center gap-2 transition hover:text-[#C5EF70]"
                >
                  <span className="h-px w-0 bg-[#C5EF70] transition-all duration-300 group-hover:w-3" />
                  My Borrows
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-[#F5EFE3]">
              Get in Touch
            </h3>

            <ul className="space-y-5 text-sm text-[#F5EFE3]/50">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#D5B477]/25 bg-white/5 text-[#D5B477]">
                  <Mail size={16} />
                </span>
                <a
                  href="mailto:asfaq.farez@gmail.com"
                  className="pt-2 transition hover:text-[#C5EF70]"
                >
                  mh3915287@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#D5B477]/25 bg-white/5 text-[#D5B477]">
                  <Phone size={16} />
                </span>
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="pt-2 transition hover:text-[#C5EF70]"
                >
                  +880 1XXXXXXXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#D5B477]/25 bg-white/5 text-[#D5B477]">
                  <MapPin size={16} />
                </span>
                <span className="pt-2">Chittagong, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Discover More */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-[#F5EFE3]">
              Discover More
            </h3>

            <p className="mb-5 text-sm leading-7 text-[#F5EFE3]/50">
              Every book has a story. Start exploring our collection and let
              your next reading adventure begin.
            </p>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 font-semibold text-[#C5EF70] transition hover:gap-3"
            >
              Explore Books
              <ArrowUpRight size={15} />
            </Link>

            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-[#F5EFE3]/10 bg-white/[0.03] px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C5EF70]/15 text-[#C5EF70]">
                <Clock size={16} />
              </span>

              <p className="text-xs leading-5 text-[#F5EFE3]/60">
                Open around the clock —{" "}
                <span className="font-semibold text-[#E7C995]">
                  the shelf never closes.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Social + Copyright */}
        <div className="mt-12 flex flex-col items-center gap-5 border-t border-white/10 pt-7 sm:flex-row sm:justify-between">
          <p className="text-xs text-[#F5EFE3]/40">
            © 2026 BookNook. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#F5EFE3]/60 transition hover:border-[#C5EF70] hover:bg-[#C5EF70] hover:text-[#071F17]"
            >
              <FaFacebookF size={17} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#F5EFE3]/60 transition hover:border-[#C5EF70] hover:bg-[#C5EF70] hover:text-[#071F17]"
            >
              <FaInstagram size={17} />
            </a>
            <a
              href="https://github.com/mehadihasanifty"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#F5EFE3]/60 transition hover:border-[#C5EF70] hover:bg-[#C5EF70] hover:text-[#071F17]"
            >
              <FaGithub size={17} />
            </a>
          </div>

          <p className="text-xs text-[#F5EFE3]/40">
            Made with <span className="text-[#C5EF70]">♥</span> for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
