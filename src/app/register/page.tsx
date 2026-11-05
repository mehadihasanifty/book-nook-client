"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { usePageTitle } from "@/lib/use-page-title";

const RegisterPage = () => {
  usePageTitle("Create Account");
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);

  // Password Validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinimumLength = password.length >= 8;

  const isPasswordValid =
    hasUppercase && hasLowercase && hasNumber && hasMinimumLength;

  // Handle Registration
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || isGooglePending) return;

    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedImage = image.trim();

    // Required Fields
    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Name Validation
    if (trimmedName.length < 3) {
      setErrorMessage("Name must be at least 3 characters.");
      return;
    }

    // Password Validation
    if (!isPasswordValid) {
      setErrorMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.",
      );
      return;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      const { data, error } = await authClient.signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password,
        ...(trimmedImage ? { image: trimmedImage } : {}),
      });

      if (error) {
        console.error("Registration Error:", error);

        const message =
          error.message || "Registration failed. Please try again.";

        toast.danger(message);
        setErrorMessage(message);
        return;
      }

      if (!data) {
        toast.danger("Unable to create your account. Please try again.");
        setErrorMessage("Unable to create your account. Please try again.");
        return;
      }

      toast.success("Account created successfully. Please sign in.");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Registration failed:", error);

      toast.danger("Something went wrong. Please try again.");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google Registration
  const handleGoogleRegister = async () => {
    if (isGooglePending || isSubmitting) return;

    setErrorMessage("");

    try {
      setIsGooglePending(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.error("Google Registration Error:", error);

        const message =
          error.message || "Google authentication failed. Please try again.";

        toast.danger(message);
        setErrorMessage(message);

        setIsGooglePending(false);
      }
    } catch (error) {
      console.error("Google registration failed:", error);

      toast.danger("Unable to sign in with Google. Please try again.");
      setErrorMessage("Unable to sign in with Google. Please try again.");

      setIsGooglePending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#94ec8d] px-4 py-10 dark:bg-[#071F17] sm:px-6">
      <div className="w-full max-w-md">
        {/* Registration Card */}
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
              Create Your Account
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Join BookNook and discover your next favorite book.
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

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={3}
                autoComplete="name"
                className="w-full rounded-lg border border-gray-200 bg-[#FFFEFA] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#174D38] focus:ring-2 focus:ring-[#174D38]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-[#D5B477]"
              />
            </div>

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

            {/* Photo URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Profile Photo URL
                <span className="ml-1 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                autoComplete="url"
                className="w-full rounded-lg border border-gray-200 bg-[#FFFEFA] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#174D38] focus:ring-2 focus:ring-[#174D38]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-[#D5B477]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 bg-[#FFFEFA] px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#174D38] focus:ring-2 focus:ring-[#174D38]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-[#D5B477]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#174D38] dark:hover:text-[#D5B477]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p className={hasMinimumLength ? "text-green-600" : ""}>
                  {hasMinimumLength ? "✓" : "○"} At least 8 characters
                </p>

                <p className={hasUppercase ? "text-green-600" : ""}>
                  {hasUppercase ? "✓" : "○"} One uppercase letter
                </p>

                <p className={hasLowercase ? "text-green-600" : ""}>
                  {hasLowercase ? "✓" : "○"} One lowercase letter
                </p>

                <p className={hasNumber ? "text-green-600" : ""}>
                  {hasNumber ? "✓" : "○"} One number
                </p>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 bg-[#FFFEFA] px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#174D38] focus:ring-2 focus:ring-[#174D38]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-[#D5B477]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#174D38] dark:hover:text-[#D5B477]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500">
                  Passwords do not match.
                </p>
              )}

              {confirmPassword && password === confirmPassword && (
                <p className="mt-1.5 text-xs text-green-600">
                  Passwords match.
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting || isGooglePending}
              className="mt-2 w-full rounded-lg bg-[#174D38] px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-md shadow-[#174D38]/15 transition-all duration-300 hover:bg-[#103B2B] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D5B477] dark:text-[#173D2D] dark:hover:bg-[#E5C88F]"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
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

          {/* Google Registration */}
          <button
            type="button"
            onClick={handleGoogleRegister}
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

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#174D38] transition-colors hover:text-[#C49A5A] dark:text-[#D5B477]"
            >
              Login
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

export default RegisterPage;
