"use client";

import { Suspense, use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, CalendarDays, UserRound, X } from "lucide-react";
import { toast } from "@heroui/react";
import { apiRequest, API_URL, getApiToken } from "@/lib/booknook-api";
import { authClient } from "@/lib/auth-client";
import { usePageTitle } from "@/lib/use-page-title";

type FetchedBook = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  userName: string;
  userEmail: string;
  addedDate: string;
};

function copiesLabel(totalCopies: number) {
  if (totalCopies < 1) return "Not Available";
  return `${totalCopies} ${totalCopies === 1 ? "copy" : "copies"} available`;
}

function Spinner() {
  return (
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#174D38]/20 border-t-[#174D38] dark:border-[#D5B477]/20 dark:border-t-[#D5B477]" />
  );
}

function BorrowDialog({
  book,
  user,
  busy,
  onConfirm,
  onClose,
}: {
  book: FetchedBook;
  user?: { name?: string | null; email?: string | null } | null;
  busy: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="borrow-title"
        className="w-full max-w-lg rounded-[2rem] border border-[#ECEAE2] bg-[#FFFEFA] p-6 shadow-2xl dark:border-gray-800 dark:bg-[#0E241C] sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#A18A62]">
              Confirm loan
            </p>
            <h2
              id="borrow-title"
              className="mt-2 font-serif text-2xl font-bold text-[#1D241D] dark:text-[#F5EFE3]"
            >
              Borrow {book.title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-2 text-[#6B6F63] hover:bg-[#174D38]/10"
          >
            <X size={19} />
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#6B6F63] dark:text-gray-400">
          Your borrow is due in 14 days. The available copy count will be
          updated when you confirm.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A18A62]">
            Your name
            <input
              readOnly
              value={user?.name || ""}
              className="mt-2 w-full rounded-lg border border-[#174D38]/10 bg-white px-3 py-2.5 text-sm text-[#1D241D] dark:border-gray-700 dark:bg-gray-900 dark:text-[#F5EFE3]"
            />
          </label>
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A18A62]">
            Your email
            <input
              readOnly
              value={user?.email || ""}
              className="mt-2 w-full rounded-lg border border-[#174D38]/10 bg-white px-3 py-2.5 text-sm text-[#1D241D] dark:border-gray-700 dark:bg-gray-900 dark:text-[#F5EFE3]"
            />
          </label>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={onConfirm}
          className="mt-7 w-full rounded-full bg-[#174D38] px-5 py-3.5 text-sm font-semibold text-[#F5EFE3] transition hover:bg-[#f3faf8] disabled:opacity-60 dark:bg-[#D5B477] dark:text-[#173D2D]"
        >
          {busy ? "Confirming…" : "Confirm Borrow"}
        </button>
      </section>
    </div>
  );
}

function BookDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [book, setBook] = useState<FetchedBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBorrow, setShowBorrow] = useState(false);
  const [borrowing, setBorrowing] = useState(false);
  usePageTitle(book?.title || "Book Details");

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const token = await getApiToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const payload = await res.json();
        if (!res.ok)
          throw new Error(payload.message || "Could not load this book.");
        if (alive) setBook(payload);
      } catch (err) {
        toast.danger(
          err instanceof Error ? err.message : "Could not load this book.",
        );
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [id]);

  const borrow = async () => {
    setBorrowing(true);
    try {
      await apiRequest("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: id }),
      });
      toast.success("Book borrowed successfully. Return it within 14 days.");
      setShowBorrow(false);
      setBook((current) =>
        current
          ? { ...current, totalCopies: current.totalCopies - 1 }
          : current,
      );
      router.refresh();
    } catch (err) {
      toast.danger(
        err instanceof Error ? err.message : "Could not borrow this book.",
      );
    } finally {
      setBorrowing(false);
    }
  };

  let body;
  if (loading) {
    body = (
      <div className="flex min-h-80 items-center justify-center rounded-[2.5rem] bg-[#FFFEFA] dark:bg-[#0E241C]">
        <Spinner />
      </div>
    );
  } else if (book) {
    body = (
      <article className="grid overflow-hidden rounded-[2.5rem] border border-[#ECEAE2] bg-[#FFFEFA] shadow-[0_18px_50px_rgba(23,77,56,0.12)] dark:border-gray-800 dark:bg-[#0E241C] md:grid-cols-[0.8fr_1.2fr]">
        <div
          className="min-h-80 bg-linear-to-br from-[#174D38] to-[#071F17] bg-cover bg-center md:min-h-140"
          style={
            book.image ? { backgroundImage: `url('${book.image}')` } : undefined
          }
          role="img"
          aria-label={`Cover of ${book.title}`}
        />
        <div className="flex flex-col p-6 sm:p-10 lg:p-14">
          <span className="mb-4 w-fit rounded-full bg-[#F3B54A]/35 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#75521E] dark:text-[#E7C995]">
            {book.category}
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight text-[#1D241D] sm:text-4xl dark:text-[#F5EFE3]">
            {book.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-[#6B6F63] dark:text-gray-400">
            <UserRound size={16} /> {book.author}
          </p>
          <p className="mt-7 whitespace-pre-wrap text-sm leading-7 text-[#55584E] dark:text-gray-300">
            {book.description}
          </p>
          <div className="mt-7 grid gap-3 rounded-2xl border border-[#174D38]/10 bg-[#174D38]/5 p-5 text-white dark:border-gray-800 dark:bg-white/5">
            <p>
              <span className="font-semibold text-[#174D38] dark:text-[#D5B477]">
                Added by
              </span>{" "}
              {book.userName} · {book.userEmail}
            </p>
            <p className="flex items-center gap-2 text-[#6B6F63] dark:text-gray-400">
              <CalendarDays size={15} />
              Added{" "}
              {book.addedDate
                ? new Date(book.addedDate).toLocaleDateString()
                : "recently"}
            </p>
            <p className="font-semibold text-[#174D38] dark:text-[#D5B477]">
              {copiesLabel(book.totalCopies)}
            </p>
          </div>
          <button
            type="button"
            disabled={book.totalCopies < 1}
            onClick={() => setShowBorrow(true)}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#174D38] px-5 py-3.5 text-sm font-semibold text-[#F5EFE3] shadow-md transition hover:bg-[#ccffec] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#D5B477] dark:text-[#173D2D]"
          >
            {" "}
            <BookOpen size={17} />{" "}
            {book.totalCopies < 1 ? "Not Available" : "Borrow This Book"}
          </button>
        </div>
      </article>
    );
  } else {
    body = (
      <div className="rounded-[2.5rem] bg-[#FFFEFA] p-10 text-center dark:bg-[#0E241C]">
        <BookOpen className="mx-auto mb-4 text-[#A18A62]" />
        <p className="text-[#55584E] dark:text-gray-300">
          This book could not be found.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#94ec8d] px-3 py-4 dark:bg-[#071F17] sm:px-5 sm:pb-16">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/books"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#174D38] transition hover:bg-[#07100e] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]"
        >
          <ArrowLeft size={15} /> Back to Books
        </Link>
        {body}
      </div>
      {showBorrow && book && (
        <BorrowDialog
          book={book}
          user={user}
          busy={borrowing}
          onConfirm={borrow}
          onClose={() => setShowBorrow(false)}
        />
      )}
    </main>
  );
}

function BookDetailsFallback() {
  return (
    <main className="min-h-screen w-full bg-[#94ec8d] px-3 py-4 dark:bg-[#071F17] sm:px-5 sm:pb-16">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/books"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#174D38] transition hover:bg-white dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]"
        >
          <ArrowLeft size={15} /> Back to Books
        </Link>
        <div className="flex min-h-80 items-center justify-center rounded-[2.5rem] bg-[#FFFEFA] dark:bg-[#0E241C]">
          <Spinner />
        </div>
      </div>
    </main>
  );
}

export default function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<BookDetailsFallback />}>
      <BookDetails params={params} />
    </Suspense>
  );
}
