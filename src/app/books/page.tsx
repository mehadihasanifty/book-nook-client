"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  BookSearch,
  Search,
  UserRound,
} from "lucide-react";

type Book = {
  _id?: string;
  title: string;
  author: string;
  category?: string;
  image?: string;
  description?: string;
  totalCopies?: number;
  userName?: string;
  userEmail?: string;
};

const categoryFilters = [
  "All",
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

const AllBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/books");

        if (!res.ok) throw new Error("Failed to load the shelf");

        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.books ?? []);

        setBooks(list as Book[]);
      } catch (err) {
        console.error(err);
        setError("The shelf could not be reached. Please try again.");
      } finally {
        setIsPending(false);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return books.filter((book) => {
      const matchesCategory =
        category === "All" ||
        (book.category ?? "Others").toLowerCase() === category.toLowerCase();
      const matchesQuery =
        query === "" ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [books, search, category]);

  const copyBadge = (book: Book) => {
    const copies =
      typeof book.totalCopies === "number" ? book.totalCopies : undefined;

    if (copies === undefined) return null;

    if (copies > 0) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#174D38]/10 px-3 py-1 text-[11px] font-semibold text-[#174D38] dark:bg-[#D5B477]/15 dark:text-[#D5B477]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5FA64F]" />
          {copies} {copies === 1 ? "copy" : "copies"} free
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B64C43]/10 px-3 py-1 text-[11px] font-semibold text-[#B64C43] dark:bg-red-400/10 dark:text-red-400">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        All copies out
      </span>
    );
  };

  return (
    <main className="min-h-screen w-full bg-[#94ec8d] px-3 py-4 dark:bg-[#071F17] sm:px-5 sm:pb-16">
      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#174D38] transition hover:bg-white dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477] dark:hover:bg-white/10"
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>

        {/* Shelf card */}
        <div className="overflow-hidden rounded-[2.5rem] border border-[#ECEAE2] bg-[#FFFEFA] shadow-[0_18px_50px_rgba(23,77,56,0.12)] dark:border-gray-800 dark:bg-[#0E241C]">
          {/* Heading */}
          <div className="relative overflow-hidden px-6 pb-8 pt-12 sm:px-10 lg:px-14">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 right-6 select-none font-serif text-[150px] font-bold leading-none text-[#174D38]/[0.06] dark:text-white/[0.04]"
            >
              ✦
            </span>

            <div className="relative sm:max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#174D38] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]">
                <BookOpen size={14} />
                The Whole Shelf
              </span>

              <h1 className="font-serif text-3xl font-bold leading-tight text-[#1D241D] sm:text-4xl md:text-5xl dark:text-[#F5EFE3]">
                Browse Every{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Book</span>
                  <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#6B6F63] dark:text-gray-400">
                Covers, authors and copy counts for everything our readers have
                shared. Type a title or pick a category to narrow the shelf.
              </p>
            </div>

            {/* Toolbar */}
            <div className="relative mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full max-w-sm">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A18A62]"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search by title or author..."
                  className="w-full rounded-full border border-[#174D38]/15 bg-white py-3 pl-11 pr-4 text-sm text-[#1D241D] outline-none transition-colors placeholder:font-serif placeholder:italic focus:border-[#174D38] dark:border-gray-700 dark:bg-gray-900 dark:text-[#F5EFE3] dark:focus:border-[#D5B477] dark:placeholder:text-gray-500"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setCategory(filter)}
                    aria-pressed={category === filter}
                    className={`cursor-pointer rounded-full px-4 py-2 text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                      category === filter
                        ? "bg-[#174D38] text-[#F5EFE3] shadow-sm dark:bg-[#D5B477] dark:text-[#173D2D]"
                        : "border border-[#174D38]/15 bg-white text-[#55584E] hover:border-[#174D38]/40 hover:text-[#174D38] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-[#D5B477]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#174D38]/10 dark:border-gray-800" />

          {/* Books grid */}
          <div className="px-6 py-10 sm:px-10 lg:px-14">
            {isPending ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-[1.4rem] border border-[#174D38]/10 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="mb-4 aspect-[3/4] w-full rounded-xl bg-[#EAE5D9] dark:bg-gray-800" />
                    <div className="mb-2 h-4 w-3/4 rounded bg-[#EAE5D9] dark:bg-gray-800" />
                    <div className="h-3 w-1/2 rounded bg-[#EAE5D9] dark:bg-gray-800" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-[#B64C43]/20 bg-[#B64C43]/5 px-6 py-16 text-center dark:border-red-400/20 dark:bg-red-950/20">
                <BookSearch size={34} className="text-[#B64C43] dark:text-red-400" />
                <p className="text-sm font-medium text-[#B64C43] dark:text-red-400">
                  {error}
                </p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-[#174D38]/15 bg-[#174D38]/5 px-6 py-16 text-center dark:border-gray-800 dark:bg-white/[0.02]">
                <BookOpen size={34} className="text-[#174D38] dark:text-[#D5B477]" />
                <p className="font-serif text-lg font-semibold text-[#1D241D] dark:text-[#F5EFE3]">
                  Nothing on this part of the shelf yet
                </p>
                <p className="max-w-sm text-sm leading-6 text-[#6B6F63] dark:text-gray-400">
                  Try a different search word or category — or{" "}
                  <Link
                    href="/add-book"
                    className="font-semibold text-[#174D38] underline decoration-[#F3B54A]/70 decoration-2 underline-offset-4 dark:text-[#D5B477]"
                  >
                    add the first book
                  </Link>{" "}
                  yourself.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredBooks.map((book, ind) => (
                  <article
                    key={book._id ?? `${book.title}-${ind}`}
                    className="group flex h-full flex-col rounded-[1.4rem] border border-[#ECEAE2] bg-white p-4 shadow-[0_10px_30px_rgba(23,77,56,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#174D38]/30 hover:shadow-[0_20px_45px_rgba(23,77,56,0.14)] dark:border-gray-800 dark:bg-[#123327] dark:hover:border-[#D5B477]/40"
                  >
                    {/* Cover */}
                    <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-[#174D38] to-[#071F17] shadow-inner">
                      <div
                        className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: book.image
                            ? `url('${book.image}')`
                            : undefined,
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#071F17]/70 via-transparent to-transparent" />

                      {/* Faux spine */}
                      <div className="absolute inset-y-0 left-0 w-[7px] bg-gradient-to-r from-black/40 to-transparent" />

                      {book.category && (
                        <span className="absolute left-3 top-3 rounded-full bg-[#F3B54A]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3D2E12]">
                          {book.category}
                        </span>
                      )}

                      <span className="absolute bottom-3 left-3 right-3 truncate text-center font-serif text-lg font-bold text-[#F5EFE3] drop-shadow group-hover:opacity-0">
                        {book.title}
                      </span>
                    </div>

                    {/* Info */}
                    <h2 className="mb-1 line-clamp-2 font-serif text-base font-bold leading-snug text-[#1D241D] dark:text-[#F5EFE3]">
                      {book.title}
                    </h2>

                    <p className="mb-3 flex items-center gap-1.5 text-[12px] font-medium text-[#6B6F63] dark:text-gray-400">
                      <UserRound size={12} className="shrink-0 text-[#C49A5A]" />
                      <span className="truncate">{book.author}</span>
                    </p>

                    <div className="mt-auto">
                      {copyBadge(book)}
                      {book.totalCopies === undefined && (
                        <span className="text-[11px] font-medium italic text-[#A18A62]">
                          A shared read
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllBooksPage;
