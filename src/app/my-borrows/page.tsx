"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, RotateCcw } from "lucide-react";
import { toast } from "@heroui/react";
import { apiRequest } from "@/lib/booknook-api";
import { usePageTitle } from "@/lib/use-page-title";

type Borrow = { _id: string; bookId: string; bookTitle: string; bookImage: string; borrowDate: string; returnDate: string };
const dateLabel = (value: string) => new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export default function MyBorrowsPage() {
  const [items, setItems] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returning, setReturning] = useState<string | null>(null);
  usePageTitle("My Borrows");

  const loadBorrows = useCallback(async () => {
    try {
      const list = await apiRequest("/borrows");
      setItems(Array.isArray(list) ? list : []);
    } catch (error) {
      toast.danger(error instanceof Error ? error.message : "Could not load your borrowed books.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void Promise.resolve().then(loadBorrows); }, [loadBorrows]);

  const returnBook = async (id: string) => {
    setReturning(id);
    try {
      await apiRequest(`/borrows/${id}`, { method: "DELETE" });
      setItems((current) => current.filter((item) => item._id !== id));
      toast.success("Book returned. Thank you for sharing it!");
    } catch (error) {
      toast.danger(error instanceof Error ? error.message : "Could not return this book.");
    } finally { setReturning(null); }
  };

  return (
    <main className="min-h-screen w-full bg-[#94ec8d] px-3 py-4 dark:bg-[#071F17] sm:px-5 sm:pb-16">
      <div className="mx-auto w-full max-w-7xl">
        <Link href="/books" className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#174D38] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]"><ArrowLeft size={15} /> Back to Books</Link>
        <section className="overflow-hidden rounded-[2.5rem] border border-[#ECEAE2] bg-[#FFFEFA] shadow-[0_18px_50px_rgba(23,77,56,0.12)] dark:border-gray-800 dark:bg-[#0E241C]">
          <header className="px-6 py-9 sm:px-10 lg:px-14">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#174D38] dark:text-[#D5B477]"><BookOpen size={14} /> Your reading list</span><h1 className="font-serif text-3xl font-bold text-[#1D241D] sm:text-4xl dark:text-[#F5EFE3]">My Borrows</h1><p className="mt-2 text-sm text-[#6B6F63] dark:text-gray-400">Keep track of the books you are reading and return them when you are done.</p></header>
          <div className="border-t border-[#174D38]/10 px-6 py-8 sm:px-10 lg:px-14">
            {loading ? <div className="flex min-h-48 items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#174D38]/20 border-t-[#174D38] dark:border-[#D5B477]/20 dark:border-t-[#D5B477]" /></div> : items.length === 0 ? <div className="rounded-3xl border border-dashed border-[#174D38]/20 px-6 py-14 text-center"><p className="font-serif text-xl font-semibold text-[#1D241D] dark:text-[#F5EFE3]">No books borrowed yet.</p><Link href="/books" className="mt-4 inline-block text-sm font-semibold text-[#174D38] underline dark:text-[#D5B477]">Explore the shelf</Link></div> : (
              <div className="overflow-x-auto rounded-2xl border border-[#174D38]/10">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead className="bg-[#174D38]/5 text-[11px] uppercase tracking-wider text-[#A18A62] dark:bg-white/[0.03]"><tr><th className="px-5 py-4">Book</th><th className="px-5 py-4">Borrow Date</th><th className="px-5 py-4">Return Date</th><th className="px-5 py-4 text-right">Action</th></tr></thead><tbody className="divide-y divide-[#174D38]/10 dark:divide-gray-800">{items.map((item) => <tr key={item._id} className="bg-white dark:bg-[#123327]"><td className="px-5 py-4"><div className="flex items-center gap-4"><div className="h-16 w-12 shrink-0 rounded-lg bg-gradient-to-br from-[#174D38] to-[#071F17] bg-cover bg-center" style={item.bookImage ? { backgroundImage: `url('${item.bookImage}')` } : undefined} /><div><p className="font-serif font-bold text-[#1D241D] dark:text-[#F5EFE3]">{item.bookTitle}</p><Link href={`/books/${item.bookId}`} className="mt-1 text-xs text-[#174D38] underline dark:text-[#D5B477]">View details</Link></div></div></td><td className="px-5 py-4 text-sm text-[#55584E] dark:text-gray-300">{dateLabel(item.borrowDate)}</td><td className="px-5 py-4 text-sm text-[#55584E] dark:text-gray-300">{dateLabel(item.returnDate)}</td><td className="px-5 py-4 text-right"><button disabled={returning === item._id} onClick={() => returnBook(item._id)} className="inline-flex items-center gap-2 rounded-full bg-[#174D38] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-60 dark:bg-[#D5B477] dark:text-[#173D2D]"><RotateCcw size={14} />{returning === item._id ? "Returning…" : "Return Book"}</button></td></tr>)}</tbody></table></div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
