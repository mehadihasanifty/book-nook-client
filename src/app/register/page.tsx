"use client";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { ArrowLeft, BookPlus, BookOpen, UserRound } from "lucide-react";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCon, setIsVisibleCon] = useState(false);

  const handleOnSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
      confirmPassword: string;
    };
    // console.log(user);

    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      toast.warning("Please fill up all the information");
      return;
    }

    if (user.password.length < 8) {
      toast.warning("Password must be 8 character");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.warning("The password are not match");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
      callbackURL: "/",
    });

    if (data) {
      // console.log(data);
      redirect("/");
    }
    if (error) {
      toast.warning(
        error.message || "Something is wrong, Please check your information",
      );
    }

    toast.success(
      "You'r account created successfully. please Sign in for continue",
    );
    // alert("Form submitted successfully!");
    form.reset();
  };
  const handleGoogleRegister = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const joiningSteps = [
    {
      number: "01",
      icon: BookOpen,
      title: "Fill in the card",
      text: "A name, an email and a password — that is the whole form.",
    },
    {
      number: "02",
      icon: UserRound,
      title: "Sign in",
      text: "Use the same details to enter your reading nook.",
    },
    {
      number: "03",
      icon: BookPlus,
      title: "Start borrowing",
      text: "The whole shelf opens up, free and forever.",
    },
  ];

  return (
    <section className="grid min-h-screen w-full grid-cols-1 bg-[#94ec8d] dark:bg-[#071F17] lg:grid-cols-[1.15fr_0.85fr]">
      {/* Left: registration form */}
      <section className="flex flex-col items-center justify-center px-4 py-10 sm:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#174D38]/20 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#174D38] transition hover:bg-white dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477] dark:hover:bg-white/10"
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div className="w-full max-w-xl rounded-[2rem] border border-[#ECEAE2] bg-[#FFFEFA] px-6 py-8 shadow-[0_18px_45px_rgba(23,77,56,0.12)] dark:border-gray-800 dark:bg-[#0E241C] sm:px-9">
          <div className="mb-7 text-center">
            <span className="mb-3 inline-flex items-center gap-2.5 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[1.6px] text-[#174D38] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]">
              Become a member
            </span>

            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1D241D] sm:text-4xl dark:text-[#F5EFE3]">
              Create an{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Account</span>
                <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
              </span>
            </h1>

            <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#6B6F63] dark:text-gray-400">
              Join BookNook and discover your next favorite book. Free to join,
              and it takes a minute. You need an email address and a password of
              your own — nothing else, and no card.
            </p>
          </div>

          {/* Registration Form */}
          <Form className="w-full" onSubmit={handleOnSubmit}>
            <Fieldset className="w-full">
              <Fieldset.Legend className="sr-only">
                Registration Form
              </Fieldset.Legend>

              <Description className="sr-only text-black">
                Enter your details to create a BookNook account.
              </Description>

              <FieldGroup className="gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    isRequired
                    name="name"
                    type="text"
                    validate={(value) => {
                      if (value.length < 3) {
                        return "Name must be at least 3 characters";
                      }
                      return null;
                    }}
                  >
                    <Label className="mb-2 text-[11px] font-bold uppercase tracking-[1.4px] text-[#A18A62]">
                      Full Name
                    </Label>
                    <Input
                      placeholder="John Doe"
                      className="rounded-full border-gray-300 bg-white placeholder:font-serif placeholder:italic placeholder:text-gray-400 dark:bg-gray-900"
                    />
                    <FieldError />
                  </TextField>

                  <TextField isRequired name="image" type="url">
                    <Label className="mb-2 text-[11px] font-bold uppercase tracking-[1.4px] text-[#A18A62]">
                      Profile Image URL
                    </Label>
                    <Input
                      className="rounded-full border-gray-300 bg-white placeholder:font-serif placeholder:italic placeholder:text-gray-400 dark:bg-gray-900"
                      placeholder="https://example.com/photo.jpg"
                    />
                    <FieldError />
                  </TextField>
                </div>

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
                      aria-label="Password"
                      className="w-full rounded-full bg-white text-black placeholder:font-serif placeholder:italic placeholder:text-gray-400 dark:bg-gray-900"
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter your password"
                    />

                    <InputGroup.Suffix className="pe-1">
                      <Button
                        isIconOnly
                        aria-label={
                          isVisible ? "Hide password" : "Show password"
                        }
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
                  <Description className="mt-1 font-serif text-xs italic text-[#A18A62]">
                    Must be at least 8 characters with 1 uppercase and 1 number
                  </Description>
                </TextField>

                <TextField
                  isRequired
                  minLength={8}
                  name="confirmPassword"
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
                    Confirm Password
                  </Label>
                  <InputGroup className="rounded-full border-gray-300">
                    <InputGroup.Input
                      aria-label="Password"
                      className="w-full rounded-full bg-white placeholder:font-serif placeholder:italic placeholder:text-gray-400 dark:bg-gray-900"
                      type={isVisibleCon ? "text" : "password"}
                      placeholder="Confirm your password"
                    />
                    <InputGroup.Suffix className="pe-1">
                      <Button
                        isIconOnly
                        aria-label={
                          isVisibleCon ? "Hide password" : "Show password"
                        }
                        size="sm"
                        variant="ghost"
                        onPress={() => setIsVisibleCon(!isVisibleCon)}
                      >
                        {isVisibleCon ? (
                          <FaEye className="size-4 text-gray-500" />
                        ) : (
                          <FaEyeSlash className="size-4 text-gray-500" />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <FieldError />
                  <Description className="mt-1 font-serif text-xs italic text-[#A18A62]">
                    Must be at least 8 characters with 1 uppercase and 1 number
                  </Description>
                </TextField>
              </FieldGroup>

              {/* Register Button */}
              <Fieldset.Actions className=" w-full">
                <Button
                  type="submit"
                  className="w-full cursor-pointer rounded-full bg-[#174D38] py-3 font-semibold text-[#F5EFE3] shadow-md shadow-[#174D38]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#103B2B] hover:shadow-lg dark:bg-[#D5B477] dark:text-[#173D2D] dark:hover:bg-[#E5C88F]"
                >
                  Register
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 border-t border-dashed border-[#C49A5A]/50" />
            <span className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#A18A62]">
              Or continue with
            </span>
            <div className="h-px flex-1 border-t border-dashed border-[#C49A5A]/50" />
          </div>

          {/* Google Registration */}
          <Button
            onClick={handleGoogleRegister}
            type="button"
            variant="outline"
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-[#DCD5CB] bg-white py-2.5 font-semibold text-[#26372F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FAF7F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-[#6B6F63] dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#174D38] underline decoration-[#F3B54A]/70 decoration-2 underline-offset-4 transition-colors hover:text-[#103B2B] dark:text-[#D5B477] dark:hover:text-[#E5C88F]"
            >
              Login
            </Link>
          </p>
        </div>
      </section>

      {/* Right: member card preview panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0E4630] to-[#071F17] p-10 text-[#F5EFE3] lg:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#D5B477]/20" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#F3B54A]/10 blur-3xl" />

        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#D5B477]/30 bg-white/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#E7C995]">
            <span className="h-2 w-2 rounded-full bg-[#C5EF70]" />
            Get a card of your own
          </span>

          <h2 className="mt-7 max-w-sm font-serif text-4xl font-bold leading-tight text-[#F5EFE3]">
            Your card, stamped in{" "}
            <span className="relative inline-block">
              <span className="relative z-10">seconds</span>
              <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
            </span>
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-7 text-[#F5EFE3]/60">
            Fill the form and your member card is ready — no fees, no queues.
          </p>
        </div>

        {/* Card preview */}
        <div className="relative overflow-hidden rounded-[1.6rem] border border-[#D5B477]/40 bg-gradient-to-br from-[#174D38] to-[#071F17] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border border-[#D5B477]/25" />

          <span className="absolute right-5 top-0 hidden h-12 w-5 rounded-b-md bg-[#C5EF70] shadow-md lg:block" />

          <div className="relative flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-2 ring-[#D5B477]/60 ring-offset-4 ring-offset-[#071F17]">
              <UserRound size={26} className="text-[#E7C995]" />
            </span>

            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-[2.2px] text-[#E7C995]/90">
                BookNook Member Card
              </span>

              <p className="mt-1 truncate font-serif text-xl font-bold text-[#F5EFE3]">
                Your Name Here
              </p>

              <p className="truncate text-xs text-[#F5EFE3]/60">
                you@example.com
              </p>

              <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[1.6px] text-[#C5EF70]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5EF70]" />
                Reader In Good Standing
              </span>
            </div>
          </div>

          <div className="relative mt-5 flex items-center justify-between border-t border-dashed border-[#F5EFE3]/20 pt-3.5">
            <span className="font-serif text-xs tracking-[3px] text-[#E7C995]/70">
              THE READING CORNER
            </span>

            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#C5EF70]/80" />
              <span className="h-2 w-2 rounded-full bg-[#D5B477]/80" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
            </span>
          </div>
        </div>

        {/* Joining steps */}
        <div className="flex flex-col gap-3">
          {joiningSteps.map((step) => (
            <div
              key={step.number}
              className="flex items-center gap-3.5 rounded-2xl border border-[#F5EFE3]/10 bg-white/[0.04] px-4 py-3.5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C5EF70]/15 font-serif text-sm font-bold text-[#C5EF70]">
                {step.number}
              </span>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#F5EFE3]/90">
                  {step.title}
                </p>
                <p className="truncate text-xs text-[#F5EFE3]/55">
                  {step.text}
                </p>
              </div>
            </div>
          ))}

          <p className="mt-2 text-center font-serif text-xs italic text-[#E7C995]/70">
            “Every book opens a new world.”
          </p>
        </div>
      </aside>
    </section>
  );
}
