"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, Sparkles, UserRound } from "lucide-react";
import { API_URL } from "@/lib/booknook-api";

type NewBook = {
  _id: string;
  title: string;
  author: string;
  category?: string;
  image?: string;
};

const NewArrivals = () => {
  const [books, setBooks] = useState<NewBook[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`, {
          cache: "no-store",
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) throw new Error("Failed to load the shelf");
        const data = await res.json();
        if (alive) {
          setBooks(Array.isArray(data) ? data : []);
          setFailed(false);
        }
      } catch {
        if (alive) setFailed(true);
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="bg-[#F3E5D6] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#174D38]">
              <Sparkles size={14} />
              Fresh On The Shelf
            </span>

            <h2 className="font-serif text-3xl font-bold leading-tight text-[#171717] sm:text-4xl md:text-5xl">
              New{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Arrivals</span>
                <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#55504B] sm:text-base">
              The six newest books our readers have shared. Fresh covers,
              familiar faces — something new is always waiting at the shelf.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#174D38] transition-all hover:gap-3"
          >
            See All Books
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Book Cards */}
        {books === null ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, ind) => (
              <div
                key={ind}
                className="animate-pulse rounded-[1.4rem] border border-[#174D38]/10 bg-white p-4"
              >
                <div className="mb-4 aspect-4/3 w-full rounded-xl bg-[#EAE5D9]" />
                <div className="mb-2 h-4 w-3/4 rounded bg-[#EAE5D9]" />
                <div className="h-3 w-1/2 rounded bg-[#EAE5D9]" />
              </div>
            ))}
          </div>
        ) : failed ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-[#B64C43]/20 bg-[#B64C43]/5 px-6 py-16 text-center">
            <RefreshCw size={30} className="text-[#B64C43]" />
            <p className="text-sm font-medium text-[#B64C43]">
              New arrivals could not be loaded. Please check back soon.
            </p>
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-[#174D38]/20 px-6 py-16 text-center">
            <p className="font-serif text-lg font-semibold text-[#1D241D]">
              The shelf is still empty — be the first to add a book!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              {books.map((book) => (
                <article
                  key={book._id}
                  className="group flex h-full flex-col rounded-[1.4rem] border border-[#ECEAE2] bg-white p-4 shadow-[0_10px_30px_rgba(23,77,56,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#174D38]/30 hover:shadow-[0_20px_45px_rgba(23,77,56,0.14)]"
                >
                  {/* Cover */}
                  <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-xl bg-gradient-to-br from-[#174D38] to-[#071F17] shadow-inner">
                    <div
                      className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: book.image
                          ? `url('${book.image}')`
                          : undefined,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071F17]/70 via-transparent to-transparent" />

                    {book.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#F3B54A]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3D2E12]">
                        {book.category}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="mb-1 line-clamp-2 font-serif text-base font-bold leading-snug text-[#1D241D]">
                    {book.title}
                  </h3>

                  <p className="mb-4 flex items-center gap-1.5 text-[12px] font-medium text-[#6B6F63]">
                    <UserRound size={12} className="shrink-0 text-[#C49A5A]" />
                    <span className="truncate">{book.author}</span>
                  </p>

                  <Link
                    href={`/books/${book._id}`}
                    className="mt-auto flex w-full items-center justify-center rounded-full bg-[#174D38] px-4 py-2.5 text-xs font-semibold text-[#F5EFE3] transition hover:bg-[#103B2B]"
                  >
                    View Details
                  </Link>
                </article>
              ))}
            </div>

            {/* See All Books */}
            <div className="mt-10 text-center">
              <Link
                href="/books"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#174D38] px-8 py-3.5 text-sm font-semibold text-[#F5EFE3] shadow-md shadow-[#174D38]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#103B2B] hover:shadow-lg"
              >
                See All Books
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
