
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);

  // Handle Email & Password Login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || isGooglePending) return;

    setErrorMessage("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      const { data, error } = await authClient.signIn.email({
        email: trimmedEmail,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        console.error("Login Error:", error);

        setErrorMessage(
          error.message || "Invalid email or password. Please try again.",
        );
        return;
      }

      if (!data) {
        setErrorMessage("Login failed. Please try again.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    if (isGooglePending || isSubmitting) return;

    setErrorMessage("");

    try {
      setIsGooglePending(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.error("Google Login Error:", error);

        setErrorMessage(
          error.message || "Google authentication failed. Please try again.",
        );

        setIsGooglePending(false);
      }
    } catch (error) {
      console.error("Google login failed:", error);

      setErrorMessage("Unable to sign in with Google. Please try again.");

      setIsGooglePending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#94ec8d] px-4 py-10 dark:bg-[#071F17] sm:px-6">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="rounded-2xl border border-[#EAE5D9] bg-white p-6 shadow-[0_15px_50px_rgba(23,77,56,0.07)] dark:border-gray-800 dark:bg-gray-900 sm:p-8">

          {/* Header */}
          <div className="mb-7 text-center">
            <Link href="/" className="inline-block">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#174D38] dark:text-[#D5B477]">
                BookNook
              </h1>
            </Link>

            <div className="mx-auto my-3 h-1 w-12 rounded-full bg-[#C49A5A]" />

            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
              Welcome Back!
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in to continue your reading journey.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
            >
              {errorMessage}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-200 bg-[#FFFEFA] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#174D38] focus:ring-2 focus:ring-[#174D38]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-[#D5B477]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#174D38] transition-colors hover:text-[#C49A5A] dark:text-[#D5B477]"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-200 bg-[#FFFEFA] px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#174D38] focus:ring-2 focus:ring-[#174D38]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-[#D5B477]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#174D38] dark:hover:text-[#D5B477]"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting || isGooglePending}
              className="mt-2 w-full rounded-lg bg-[#174D38] px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-md shadow-[#174D38]/15 transition-all duration-300 hover:bg-[#103B2B] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D5B477] dark:text-[#173D2D] dark:hover:bg-[#E5C88F]"
            >
              {isSubmitting ? "Signing In..." : "Login to Your Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGooglePending || isSubmitting}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-[#C49A5A] hover:bg-[#F8F6F0] disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {isGooglePending ? (
              "Connecting to Google..."
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.93 46.98 31.78 46.98 24.55Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  />
                </svg>

                Continue with Google
              </>
            )}
          </button>

          {/* Register Link */}
          <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#174D38] transition-colors hover:text-[#C49A5A] dark:text-[#D5B477]"
            >
              Create an Account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center font-serif text-xs italic text-[#A18A62]">
          Every book opens a new world.
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
