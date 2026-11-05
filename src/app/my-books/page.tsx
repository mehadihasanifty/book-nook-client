"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { API_URL, apiRequest } from "@/lib/booknook-api";
import { usePageTitle } from "@/lib/use-page-title";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  userEmail: string;
};

const fieldClass =
  "w-full rounded-xl border border-[#174D38]/15 bg-white px-4 py-3 text-sm text-[#1D241D] outline-none focus:border-[#174D38] dark:border-gray-700 dark:bg-gray-900 dark:text-[#F5EFE3]";

export default function MyBooksPage() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email?.toLowerCase();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);
  usePageTitle("My Books");

  const loadBooks = useCallback(async () => {
    if (!email) return;
    try {
      const response = await fetch(`${API_URL}/books`, { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load your books.");
      const all = await response.json();
      setBooks(
        (Array.isArray(all) ? all : []).filter(
          (book: Book) => book.userEmail?.toLowerCase() === email,
        ),
      );
    } catch (error) {
      toast.danger(
        error instanceof Error ? error.message : "Could not load your books.",
      );
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    void Promise.resolve().then(loadBooks);
  }, [loadBooks]);

  const saveBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;
    const values: Record<string, FormDataEntryValue | number> =
      Object.fromEntries(new FormData(event.currentTarget).entries());
    values.totalCopies = Number(values.totalCopies);
    setBusy(true);
    try {
      await apiRequest(`/books/${editing._id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      toast.success("Book updated successfully.");
      setEditing(null);
      await loadBooks();
    } catch (error) {
      toast.danger(
        error instanceof Error ? error.message : "Could not update this book.",
      );
    } finally {
      setBusy(false);
    }
  };

  const deleteBook = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await apiRequest(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((items) => items.filter((book) => book._id !== deleting._id));
      toast.success("Book deleted successfully.");
      setDeleting(null);
    } catch (error) {
      toast.danger(
        error instanceof Error ? error.message : "Could not delete this book.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#94ec8d] px-3 py-4 dark:bg-[#071F17] sm:px-5 sm:pb-16">
      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/books"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#174D38] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]"
        >
          <ArrowLeft size={15} />
          Back to Books
        </Link>
        <section className="overflow-hidden rounded-[2.5rem] border border-[#ECEAE2] bg-[#FFFEFA] shadow-[0_18px_50px_rgba(23,77,56,0.12)] dark:border-gray-800 dark:bg-[#0E241C]">
          <header className="flex flex-col gap-5 px-6 py-9 sm:flex-row sm:items-end sm:justify-between sm:px-10 lg:px-14">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#174D38] dark:text-[#D5B477]">
                <BookOpen size={14} />
                Your shelf
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1D241D] sm:text-4xl dark:text-[#F5EFE3]">
                My Books
              </h1>
              <p className="mt-2 text-sm text-[#6B6F63] dark:text-gray-400">
                Manage the books you have shared with BookNook.
              </p>
            </div>
            <Link
              href="/add-book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#174D38] px-5 py-3 text-sm font-semibold text-white dark:bg-[#D5B477] dark:text-[#173D2D]"
            >
              <Plus size={17} />
              Add a Book
            </Link>
          </header>
          <div className="border-t border-[#174D38]/10 px-6 py-8 sm:px-10 lg:px-14">
            {loading ? (
              <div className="flex min-h-48 items-center justify-center">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#174D38]/20 border-t-[#174D38] dark:border-[#D5B477]/20 dark:border-t-[#D5B477]" />
              </div>
            ) : books.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#174D38]/20 px-6 py-14 text-center">
                <p className="font-serif text-xl font-semibold text-[#1D241D] dark:text-[#F5EFE3]">
                  Your shelf is waiting for its first book.
                </p>
                <Link
                  href="/add-book"
                  className="mt-4 inline-block text-sm font-semibold text-[#174D38] underline dark:text-[#D5B477]"
                >
                  Add a book
                </Link>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                  <article
                    key={book._id}
                    className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#ECEAE2] bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#123327]"
                  >
                    <div
                      className="mb-4 aspect-4/3 rounded-xl bg-linear-to-br from-[#174D38] to-[#071F17] bg-cover bg-center"
                      style={
                        book.image
                          ? { backgroundImage: `url('${book.image}')` }
                          : undefined
                      }
                    />
                    <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#A18A62]">
                      {book.category} · {book.totalCopies} copies
                    </span>
                    <h2 className="font-serif text-lg font-bold text-[#1D241D] dark:text-[#F5EFE3]">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#6B6F63] dark:text-gray-400">
                      by {book.author}
                    </p>
                    <div className="mt-auto flex gap-3 pt-5">
                      <button
                        onClick={() => setEditing(book)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#174D38]/20 px-4 py-2.5 text-xs font-semibold text-[#174D38] dark:border-[#D5B477]/30 dark:text-[#D5B477]"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleting(book)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-700 dark:text-red-300"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {editing && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4">
          <form
            onSubmit={saveBook}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-[#FFFEFA] p-6 shadow-2xl dark:bg-[#0E241C] sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#1D241D] dark:text-[#F5EFE3]">
                Edit Book
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-[#A18A62]">
                Title
                <input
                  name="title"
                  required
                  defaultValue={editing.title}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>

              <label className="text-xs font-semibold text-[#A18A62]">
                Author
                <input
                  name="author"
                  required
                  defaultValue={editing.author}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>

              <label className="text-xs font-semibold text-[#A18A62]">
                Category
                <select
                  name="category"
                  defaultValue={editing.category}
                  className={`mt-2 ${fieldClass}`}
                >
                  <option>Fiction</option>

                  <option>Science</option>
                  <option>History</option>
                  <option>Kids</option>
                  <option>Others</option>
                </select>
              </label>
              <label className="text-xs font-semibold text-[#A18A62]">
                Total Copies
                <input
                  name="totalCopies"
                  type="number"
                  min="0"
                  required
                  defaultValue={editing.totalCopies}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>
              <label className="text-xs font-semibold text-[#A18A62] sm:col-span-2">
                Cover URL
                <input
                  name="image"
                  type="url"
                  required
                  defaultValue={editing.image}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>
              <label className="text-xs font-semibold text-[#A18A62] sm:col-span-2">
                Description
                <textarea
                  name="description"
                  required
                  rows={4}
                  defaultValue={editing.description}
                  className={`mt-2 ${fieldClass}`}
                />
              </label>
            </div>
            <button
              disabled={busy}
              className="mt-6 w-full rounded-full bg-[#174D38] px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-60 dark:bg-[#D5B477] dark:text-[#173D2D]"
            >
              {busy ? "Saving…" : "Save Changes"}
            </button>
          </form>
        </div>
      )}
      {deleting && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            className="w-full max-w-md rounded-[2rem] bg-[#FFFEFA] p-7 shadow-2xl dark:bg-[#0E241C]"
          >
            <h2 className="font-serif text-2xl font-bold text-[#1D241D] dark:text-[#F5EFE3]">
              Delete this book?
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#6B6F63] dark:text-gray-400">
              “{deleting.title}” will be removed from the shelf. You cannot undo
              this action.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                disabled={busy}
                onClick={() => setDeleting(null)}
                className="flex-1 rounded-full border border-[#174D38]/20 px-4 py-3 text-sm font-semibold text-[#174D38] dark:text-[#D5B477]"
              >
                Cancel
              </button>

              <button
                disabled={busy}
                onClick={deleteBook}
                className="flex-1 rounded-full bg-red-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busy ? "Deleting…" : "Delete Book"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
