"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, BookHeart, BookOpen, Lamp } from "lucide-react";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleLoginSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    // console.log(user);
    // Convert FormData to plain object

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
      callbackURL: "/",
    });
    if (data) {
      // console.log(data);
    }

    if (error) {
      toast.warning(
        error.message || "Something is wrong,Invalid email or password",
      );
    }

    toast.success(
      "You'r Loggin successfull. Please sign in to proceed further.",
    );
  };
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const nookPerks = [
    { icon: BookOpen, text: "Borrow from the shared shelf for free" },
    { icon: BookHeart, text: "Keep your borrowed list and return anytime" },
    { icon: Lamp, text: "Add books you love for the next reader" },
  ];

  return (
    <section className="grid min-h-screen w-full grid-cols-1 bg-[#94ec8d] dark:bg-[#071F17] lg:grid-cols-[1fr_1.1fr]">
      {/* Left: the reading nook panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0E4630] to-[#071F17] p-10 text-[#F5EFE3] lg:flex">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#D5B477]/20" />
        <div className="pointer-events-none absolute -left-14 -top-14 h-44 w-44 rounded-full border border-[#D5B477]/20" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#F3B54A]/10 blur-3xl" />

        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#D5B477]/30 bg-white/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#E7C995]">
            <span className="h-2 w-2 rounded-full bg-[#C5EF70]" />
            The Reading Corner
          </span>

          <h2 className="mt-7 max-w-md font-serif text-4xl font-bold leading-tight text-[#F5EFE3]">
            Step back into your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">reading nook</span>
              <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
            </span>
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-7 text-[#F5EFE3]/60">
            The lamp is still on and your shelf is exactly where you left it.
            Sign in and pick up your story.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {nookPerks.map((perk) => (
            <div
              key={perk.text}
              className="flex items-center gap-3.5 rounded-2xl border border-[#F5EFE3]/10 bg-white/[0.04] px-4 py-3.5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C5EF70]/15 text-[#C5EF70]">
                <perk.icon size={18} />
              </span>
              <p className="text-sm font-medium text-[#F5EFE3]/80">
                {perk.text}
              </p>
            </div>
          ))}

          <p className="mt-3 text-center font-serif text-xs italic text-[#E7C995]/70">
            “A little world of endless stories.”
          </p>
        </div>
      </aside>

      {/* Right: sign in form */}
      <section className="flex flex-col items-center justify-center px-4 py-10 sm:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#174D38] transition hover:bg-white dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477] dark:hover:bg-white/10"
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div className="w-full max-w-md rounded-[2rem] border border-[#ECEAE2] bg-[#FFFEFA] px-6 py-8 shadow-[0_18px_45px_rgba(23,77,56,0.12)] dark:border-gray-800 dark:bg-[#0E241C] sm:px-9">
          <div className="mb-7 text-center">
            <span className="mb-3 inline-flex items-center gap-2.5 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[1.6px] text-[#174D38] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]">
              Welcome Back
            </span>

            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1D241D] dark:text-[#F5EFE3]">
              Bel<span className="text-[#174D38] dark:text-[#D5B477]">o</span>ng
              to BookNook
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-6 text-[#6B6F63] dark:text-gray-400">
              Your next favorite book is waiting. Sign in to borrow, share and
              keep up with your shelf.
            </p>
          </div>

          <Form
            className="flex w-full flex-col gap-5"
            onSubmit={handleLoginSubmit}
          >
            <TextField isRequired name="email" type="email">
              <Label className="mb-2 text-[11px] font-bold uppercase tracking-[1.4px] text-[#A18A62]">
                Email Address
              </Label>
              <Input
                placeholder="john@example.com"
                className="rounded-full border-gray-300 bg-white placeholder:font-serif placeholder:italic placeholder:text-gray-400 dark:bg-gray-900"
              />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="mb-2 text-[11px] font-bold uppercase tracking-[1.4px] text-[#A18A62]">
                Password
              </Label>
              <InputGroup className="rounded-full border-gray-300">
                <InputGroup.Input
                  className="w-full rounded-full bg-white text-black placeholder:font-serif placeholder:italic placeholder:text-gray-400 dark:bg-gray-900"
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <InputGroup.Suffix className="pe-1">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <FaEye className="size-4 text-gray-500" />
                    ) : (
                      <FaEyeSlash className="size-4 text-gray-500" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="mt-1 w-full cursor-pointer rounded-full bg-[#174D38] py-3 font-semibold text-[#F5EFE3] shadow-md shadow-[#174D38]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#103B2B] hover:shadow-lg dark:bg-[#D5B477] dark:text-[#173D2D] dark:hover:bg-[#E5C88F]"
            >
              Login
            </Button>
          </Form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 border-t border-dashed border-[#C49A5A]/50" />
            <span className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#A18A62]">
              Or continue with
            </span>
            <div className="h-px flex-1 border-t border-dashed border-[#C49A5A]/50" />
          </div>

          <Button
            onClick={handleGoogleLogin}
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-[#DCD5CB] bg-white py-2.5 font-semibold text-[#26372F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FAF7F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>

          <p className="mt-7 text-center text-sm text-[#6B6F63] dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#174D38] underline decoration-[#F3B54A]/70 decoration-2 underline-offset-4 transition-colors hover:text-[#103B2B] dark:text-[#D5B477] dark:hover:text-[#E5C88F]"
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    </section>
  );
}
