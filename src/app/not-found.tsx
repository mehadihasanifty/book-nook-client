import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "BookNook | Page Not Found" };

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#FAF9F6] px-4 py-16 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <div className="mx-auto w-full max-w-2xl text-center">
        {/* Error Code */}
        <p className="mb-3 font-serif text-8xl font-bold tracking-tight text-[#174D38] dark:text-green-300 sm:text-9xl">
          404
        </p>

        {/* Message */}
        <h1 className="mb-4  text-3xl font-bold sm:text-4xl">
          Looks Like This Page Is Missing!
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
          The page you are looking for might have been moved, removed, or
          perhaps it never existed. Don&apos;t worry, there are plenty of
          stories waiting for you at BookNook.
        </p>

        {/* Back Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#174D38] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#103D2C] hover:shadow-lg dark:bg-green-400 dark:text-gray-950 dark:hover:bg-green-300"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Footer Text */}
        <p className="mt-10 text-xs tracking-widest text-gray-400 dark:text-gray-600">
          BOOKNOOK · An Online Book Library
        </p>
      </div>
    </main>
  );
}
