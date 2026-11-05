"use client";

import Image from "next/image";
import { UserRound, Mail, BookOpen, LogOut, Library } from "lucide-react";
import { toast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/lib/use-page-title";

export default function ProfilePage() {
  usePageTitle("My Profile");
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        toast.danger(error.message || "Could not sign out. Please try again.");
        return;
      }

      toast.success("You are signed out. See you at the shelf!");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.danger("Something went wrong while signing out. Please try again.");
    }
  };

  const detailRows = [
    { icon: UserRound, label: "Full Name", value: user?.name ?? "—" },
    { icon: Mail, label: "Email", value: user?.email ?? "—" },
    { icon: BookOpen, label: "Membership", value: "BookNook Reader" },
  ];

  return (
    <main className="min-h-screen w-full bg-[#94ec8d] px-3 py-4 dark:bg-[#071F17] sm:px-5 sm:pb-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center pt-10">
        {/* Heading */}
        <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[1.6px] text-[#174D38] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]">
          <Library size={13} />
          Your Account
        </span>

        <h1 className="font-serif text-3xl font-bold text-[#1D241D] sm:text-4xl dark:text-[#F5EFE3]">
          My{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Profile</span>
            <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
          </span>
        </h1>

        <p className="mt-2 text-center text-sm text-[#55584E] dark:text-gray-400">
          Your BookNook account information.
        </p>

        {/* Member card */}
        <section className="relative mt-8 w-full overflow-hidden rounded-[2rem] bg-linear-to-br from-[#0E4630] via-[#174D38] to-[#071F17] p-7 text-[#F5EFE3] shadow-[0_24px_60px_rgba(7,31,23,0.35)] sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full border border-[#D5B477]/25" />
          <div className="pointer-events-none absolute -right-4 -top-6 h-20 w-20 rounded-full border border-[#D5B477]/25" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#F3B54A]/10 blur-2xl" />

          {/* Bookmark ribbon */}
          <span className="absolute right-8 top-0 hidden h-14 w-6 rounded-b-md bg-[#C5EF70] shadow-md sm:block" />

          <div className="relative flex items-center gap-6">
            <span className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl overflow-hidden ring-2 ring-[#D5B477]/60 ring-offset-4 ring-offset-[#0E4630] sm:h-28 sm:w-28">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile picture"
                  width={128}
                  height={128}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-[#174D38] font-serif text-4xl font-bold text-[#E7C995]">
                  {user?.name?.charAt(0) ?? "?"}
                </span>
              )}
            </span>

            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-[2.2px] text-[#E7C995]/90">
                BookNook Member Card
              </span>

              <h2 className="mt-1.5 truncate font-serif text-2xl font-bold text-[#F5EFE3] sm:text-3xl">
                {user?.name ?? "Reader"}
              </h2>

              <p className="mt-1 truncate text-sm text-[#F5EFE3]/60">
                {user?.email ?? "Sign in to view your details"}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[1.6px] text-[#C5EF70]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5EF70]" />
                Reader In Good Standing
              </span>
            </div>
          </div>

          <div className="relative mt-6 flex items-center justify-between border-t border-dashed border-[#F5EFE3]/20 pt-4">
            <span className="font-serif text-sm tracking-[3px] text-[#E7C995]/70">
              THE READING CORNER
            </span>

            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#C5EF70]/80" />
              <span className="h-2 w-2 rounded-full bg-[#D5B477]/80" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
            </span>
          </div>
        </section>

        {/* Account details */}
        <section className="mt-5 w-full rounded-[2rem] border border-[#ECEAE2] bg-[#FFFEFA] p-6 shadow-[0_18px_45px_rgba(23,77,56,0.10)] dark:border-gray-800 dark:bg-[#0E241C] sm:p-8">
          <h3 className="mb-5 text-center font-serif text-lg font-semibold text-[#1D241D] dark:text-[#F5EFE3]">
            Account Details
          </h3>

          <ul className="flex flex-col gap-3">
            {detailRows.map((row) => (
              <li
                key={row.label}
                className="flex items-center gap-4 rounded-2xl border border-[#174D38]/10 bg-[#174D38]/4 px-4 py-3.5 dark:border-gray-800 dark:bg-white/3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#174D38] text-[#E7C995] dark:bg-[#D5B477] dark:text-[#173D2D]">
                  <row.icon size={17} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-[1.8px] text-[#A18A62]">
                    {row.label}
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-semibold text-[#1D241D] dark:text-[#F5EFE3]">
                    {row.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button className="cursor-pointer rounded-full bg-[#174D38] px-6 py-3 text-sm font-semibold text-[#F5EFE3] shadow-md shadow-[#174D38]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#103B2B] dark:bg-[#D5B477] dark:text-[#173D2D] dark:hover:bg-[#E5C88F]">
              Edit Profile
            </button>

            <Link
              href="/books"
              className="rounded-full border border-[#174D38]/40 px-6 py-3 text-sm font-semibold text-[#174D38] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#174D38]/5 dark:border-[#D5B477]/40 dark:text-[#D5B477] dark:hover:bg-white/5"
            >
              My Books
            </Link>

            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-[#B64C43] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#B64C43]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#963D35] dark:bg-transparent dark:text-red-400 dark:shadow-none dark:ring-1 dark:ring-red-400/40 dark:hover:bg-red-950/40"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
