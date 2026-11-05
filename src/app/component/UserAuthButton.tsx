"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Popover } from "@heroui/react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";

interface UserAuthUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AuthButtonsProps {
  user: UserAuthUser | null;
  isPending: boolean;
  isMobile?: boolean;
  onNavigate?: () => void;
}

const UserAuthButtons = ({
  user,
  isPending,
  isMobile = false,
  onNavigate,
}: AuthButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const displayName = user?.name?.trim() || "BookNook Reader";
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        toast.danger(error.message || "Could not sign out. Please try again.");
        return;
      }

      setIsOpen(false);
      onNavigate?.();
      toast.success("You are signed out. See you at the shelf!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.danger("Something went wrong while signing out. Please try again.");
    }
  };

  if (isPending) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-[#EAE5D9] dark:bg-gray-800" />
    );
  }

  // Logged out: Login & Register buttons
  if (!user) {
    return (
      <div
        className={`flex ${isMobile ? "w-full flex-col" : "items-center"} gap-2.5`}
      >
        <Link
          href="/login"
          onClick={onNavigate}
          className={`inline-flex items-center justify-center rounded-full border border-[#174D38]/25 bg-[#F8F6F0] px-6 py-2.5 text-[13px] font-semibold tracking-wide text-[#174D38] transition-all duration-300 hover:border-[#174D38] hover:bg-[#174D38]/5 dark:border-[#D5B477]/30 dark:bg-transparent dark:text-[#D5B477] dark:hover:bg-[#D5B477]/10 ${isMobile ? "w-full" : ""}`}
        >
          Login
        </Link>

        <Link
          href="/register"
          onClick={onNavigate}
          className={`inline-flex items-center justify-center rounded-full bg-[#174D38] px-6 py-2.5 text-[13px] font-semibold tracking-wide text-white shadow-md shadow-[#174D38]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#103B2B] hover:shadow-lg dark:bg-[#D5B477] dark:text-[#173D2D] dark:hover:bg-[#E5C88F] ${isMobile ? "w-full" : ""}`}
        >
          Register
        </Link>
      </div>
    );
  }

  // Logged in: photo chip that opens the profile dropdown
  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <button
          type="button"
          aria-label="Open user profile menu"
          aria-expanded={isOpen}
          className={`group flex cursor-pointer items-center gap-2.5 rounded-full border border-[#E8E6DE] bg-white py-1.5 pl-2 pr-4 shadow-sm transition-all duration-300 hover:border-[#C49A5A]/70 hover:shadow dark:border-gray-700 dark:bg-gray-900 dark:hover:border-[#D5B477]/50 dark:hover:bg-gray-800 ${isMobile ? "w-full justify-between" : ""}`}
        >
          <span className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#174D38]/10 ring-2 ring-[#174D38]/10 transition group-hover:ring-[#C49A5A]/50">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${displayName}'s profile`}
                  width={36}
                  height={36}
                  unoptimized
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#174D38] font-serif text-base font-bold text-[#E7C995]">
                  {initial}
                </span>
              )}
            </span>

            <span
              className={`max-w-27.5 truncate text-[13px] font-semibold text-[#1D241D] dark:text-gray-200 ${isMobile ? "" : "hidden xl:block"}`}
            >
              {displayName}
            </span>
          </span>

          <ChevronDown
            size={15}
            className={`text-[#A18A62] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </Popover.Trigger>

      <Popover.Content
        placement="bottom end"
        offset={12}
        className="z-50 w-64 overflow-hidden rounded-2xl border border-[#E8E6DE] bg-[#FFFEFA] p-0 shadow-[0_15px_50px_rgba(23,77,56,0.14)] dark:border-gray-700 dark:bg-gray-950"
      >
        <Popover.Dialog className="p-0">
          {/* User information */}
          <div className="relative overflow-hidden bg-[#174D38] px-4 py-5">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full border border-white/10" />
            <div className="absolute -right-3 -top-5 h-20 w-20 rounded-full border border-white/10" />

            <div className="relative flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#D5B477]">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={`${displayName}'s profile`}
                    width={44}
                    height={44}
                    unoptimized
                    className="h-11 w-11 object-cover"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center bg-[#174D38] font-serif text-lg font-bold text-[#E7C995]">
                    {initial}
                  </span>
                )}
              </span>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {displayName}
                </p>
                {user.email && (
                  <p className="mt-1 truncate text-[11px] text-white/65">
                    {user.email}
                  </p>
                )}
                <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[#E7C995]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D5B477]" />
                  BookNook Member
                </span>
              </div>
            </div>
          </div>

          {/* My Profile */}
          <div className="p-2.5">
            <Link
              href="/profile"
              onClick={() => {
                setIsOpen(false);
                onNavigate?.();
              }}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#45483F] transition-all duration-200 hover:bg-[#F3F0E8] hover:text-[#174D38] dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-[#D5B477]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#174D38]/8 text-[#174D38] transition-colors group-hover:bg-[#174D38] group-hover:text-white dark:bg-white/10 dark:text-[#D5B477] dark:group-hover:bg-[#174D38]">
                <UserRound size={17} />
              </span>

              <span className="flex-1">
                <span className="block text-[13px] font-semibold">
                  My Profile
                </span>
                <span className="mt-0.5 block text-[11px] text-gray-400">
                  View your details
                </span>
              </span>

              <span className="text-lg text-[#C49A5A] transition-transform group-hover:translate-x-1">
                ›
              </span>
            </Link>

            {/* Logout */}
            <div className="mt-2 border-t border-[#EAE5D9] pt-2 dark:border-gray-800">
              <button
                type="button"
                onClick={handleLogout}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#B64C43] transition-all duration-200 hover:bg-[#FFF0ED] dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B64C43]/8 transition-colors group-hover:bg-[#B64C43] group-hover:text-white dark:bg-red-400/10">
                  <LogOut size={17} />
                </span>

                <span className="text-[13px] font-semibold">Logout</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#EAE5D9] bg-[#F8F6F0] px-4 py-3 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="font-serif text-[11px] italic text-[#A18A62]">
              A little world of endless stories.
            </p>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};

export default UserAuthButtons;
