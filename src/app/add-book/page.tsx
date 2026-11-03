"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookPlus,
  BookUser,
  ChevronDown,
  Library,
  Lightbulb,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { apiRequest } from "@/lib/booknook-api";
import { usePageTitle } from "@/lib/use-page-title";

export default function AddBookPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  usePageTitle("Add a Book");

  const handleAddBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!imageUrl) return toast.danger("Upload a book cover before adding the book.");
    const values = new FormData(form);
    const bookData = Object.fromEntries(values.entries());
    bookData.image = imageUrl;
    bookData.totalCopies = Number(bookData.totalCopies);
    setIsSaving(true);
    try {
      await apiRequest("/books", { method: "POST", body: JSON.stringify(bookData) });
      form.reset();
      setImageUrl("");
      toast.success("Your book was added successfully! 📚");
    } catch (error) {
      toast.danger(error instanceof Error ? error.message : "Could not add this book.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadCover = async (file?: File) => {
    if (!file) return;
    setIsUploading(true);
    const body = new FormData();
    body.set("image", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.message || "Image upload failed.");
      setImageUrl(result.url);
      toast.success("Book cover uploaded.");
    } catch (error) {
      toast.danger(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const shelfNotes = [
    {
      number: "01",
      text: "Every reader can add a book — no membership fees, just share what you loved.",
    },
    {
      number: "02",
      text: "Copies are tracked automatically. Borrowers take one, the count drops by one.",
    },
    {
      number: "03",
      text: "Covers make the shelf beautiful — paste a shareable image URL from the web.",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-[#94ec8d] px-3 py-4 dark:bg-[#071F17] sm:px-5 sm:pb-16">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/books"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#174D38] transition hover:bg-white dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477] dark:hover:bg-white/10"
        >
          <ArrowLeft size={15} /> Back to Books
        </Link>

        {/* Page Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#1D241D] sm:text-4xl dark:text-[#F5EFE3]">
            Add a{" "}
            <span className="relative inline-block">
              <span className="relative z-10">New Book</span>
              <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
            </span>
          </h1>

          <p className="mt-2 text-sm text-[#55584E] dark:text-gray-400">
            Share a new book with the BookNook community.
          </p>
        </div>

        {/* Split layout: narrative panel + index card form */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.5fr]">
          {/* Left: reading room panel */}
          <aside className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[2rem] bg-linear-to-b from-[#0E4630] to-[#071F17] p-8 text-[#F5EFE3] shadow-[0_20px_50px_rgba(7,31,23,0.25)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#D5B477]/20" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#D5B477]/20" />

            <div>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#D5B477]/30 bg-white/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#E7C995]">
                <Library size={14} />
                Put a book on the shelf
              </span>

              <p className="mt-5 font-serif text-xl font-semibold leading-relaxed text-[#F5EFE3]">
                Every addition makes the shelf a little richer.
              </p>

              <div className="mt-7 flex flex-col">
                {shelfNotes.map((note) => (
                  <div
                    key={note.number}
                    className="flex gap-4 border-b border-white/10 py-4 last:border-b-0"
                  >
                    <span className="font-serif text-lg text-[#D5B477]">
                      {note.number}
                    </span>
                    <p className="text-sm leading-6 text-[#F5EFE3]/70">
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#D5B477]/25 bg-white/5 px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C5EF70]/15 text-[#C5EF70]">
                <Lightbulb size={16} />
              </span>

              <p className="text-xs leading-5 text-[#F5EFE3]/60">
                Your details are attached automatically —{" "}
                <span className="font-semibold text-[#E7C995]">
                  just write the book story.
                </span>
              </p>
            </div>
          </aside>

          {/* Right: index card form */}
          <form
            className="rounded-[2rem] border border-[#ECEAE2] bg-[#FFFEFA] p-6 shadow-[0_18px_45px_rgba(23,77,56,0.10)] dark:border-gray-800 dark:bg-[#0E241C] sm:p-10"
            onSubmit={handleAddBook}
          >
            {/* Card margin line */}
            <div className="mb-8 w-full border-t border-dashed border-[#C49A5A]/50" />

            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]"
                >
                  Book Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Enter book title"
                  className="w-full border-b-2 border-[#174D38]/15 bg-transparent pb-2.5 text-sm text-[#1D241D] outline-none transition-colors placeholder:font-serif placeholder:italic focus:border-[#174D38] dark:border-gray-700 dark:text-[#F5EFE3] dark:focus:border-[#D5B477] dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]"
                >
                  Author Name
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  required
                  placeholder="Enter author name"
                  className="w-full border-b-2 border-[#174D38]/15 bg-transparent pb-2.5 text-sm text-[#1D241D] outline-none transition-colors placeholder:font-serif placeholder:italic focus:border-[#174D38] dark:border-gray-700 dark:text-[#F5EFE3] dark:focus:border-[#D5B477] dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    defaultValue=""
                    required
                    className="w-full appearance-none border-b-2 border-[#174D38]/15 bg-[#FFFEFA] pb-2.5 pr-6 text-sm text-[#1D241D] outline-none transition-colors focus:border-[#174D38] dark:border-gray-700 dark:bg-[#0E241C] dark:text-[#F5EFE3] dark:focus:border-[#D5B477]"
                  >
                  <option value="" disabled className="bg-[#F4F4F0] text-[#6B6F63]">
                      Select a category
                    </option>
                    <option className="bg-[#FFFEFA] text-[#1D241D]">Fiction</option>
                    <option className="bg-[#FFFEFA] text-[#1D241D]">Science</option>
                    <option className="bg-[#FFFEFA] text-[#1D241D]">History</option>
                    <option className="bg-[#FFFEFA] text-[#1D241D]">Kids</option>
                    <option className="bg-[#FFFEFA] text-[#1D241D]">Others</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute bottom-3 right-0 text-[#A18A62]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="totalCopies"
                  className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]"
                >
                  Total Copies
                </label>
                <input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="1"
                  required
                  placeholder="Enter total copies"
                  className="w-full border-b-2 border-[#174D38]/15 bg-transparent pb-2.5 text-sm text-[#1D241D] outline-none transition-colors placeholder:font-serif placeholder:italic focus:border-[#174D38] dark:border-gray-700 dark:text-[#F5EFE3] dark:focus:border-[#D5B477] dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="mt-7">
              <label
                htmlFor="image"
                className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]"
              >
                Book Cover Image
              </label>
              <input
                id="image"
                name="coverFile"
                type="file"
                accept="image/*"
                required={!imageUrl}
                onChange={(event) => uploadCover(event.currentTarget.files?.[0])}
                className="w-full border-b-2 border-[#174D38]/15 bg-transparent pb-2.5 text-sm text-[#1D241D] outline-none transition-colors placeholder:font-serif placeholder:italic focus:border-[#174D38] dark:border-gray-700 dark:text-[#F5EFE3] dark:focus:border-[#D5B477] dark:placeholder:text-gray-500"
              />
              <input type="hidden" name="image" value={imageUrl} />
              <p className="mt-2 text-xs text-[#A18A62]">{isUploading ? "Uploading cover…" : imageUrl ? "Cover uploaded successfully." : "Choose an image up to 10 MB. It will be uploaded to imgbb."}</p>
            </div>

            <div className="mt-7">
              <label
                htmlFor="description"
                className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]"
              >
                Book Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                placeholder="Write a short description about the book..."
                className="w-full resize-y border-b-2 border-[#174D38]/15 bg-transparent pb-2.5 text-sm text-[#1D241D] outline-none transition-colors placeholder:font-serif placeholder:italic focus:border-[#174D38] dark:border-gray-700 dark:text-[#F5EFE3] dark:focus:border-[#D5B477] dark:placeholder:text-gray-500"
              />
            </div>

            {/* Attached reader details */}
            <div className="mt-8 rounded-2xl border border-[#174D38]/10 bg-[#174D38]/4 p-5 dark:border-gray-800 dark:bg-white/3">
              <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]">
                <BookUser size={13} />
                Added by
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="userName"
                    className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]"
                  >
                    Name
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    defaultValue={user?.name}
                    placeholder="Your name"
                    readOnly
                    className="w-full rounded-lg border border-[#174D38]/10 bg-white px-3.5 py-2.5 text-sm font-medium text-[#1D241D] outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-[#F5EFE3]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="userEmail"
                    className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.6px] text-[#A18A62]"
                  >
                    Email Address
                  </label>
                  <input
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    placeholder="Your email"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full rounded-lg border border-[#174D38]/10 bg-white px-3.5 py-2.5 text-sm font-medium text-[#1D241D] outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-[#F5EFE3]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#174D38] px-5 py-3.5 text-sm font-semibold text-[#F5EFE3] shadow-md shadow-[#174D38]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#103B2B] hover:shadow-lg dark:bg-[#D5B477] dark:text-[#173D2D] dark:hover:bg-[#E5C88F]"
            >
              <BookPlus size={18} />
              {isSaving ? "Adding Book…" : "Add Book"}
            </button>

            <p className="mt-4 text-center text-[11px] text-[#A18A62]">
              Added books appear on the shelf instantly.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
