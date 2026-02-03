"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/ui/auth-input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { useToast } from "@/hooks/use-toast";

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email or username is required";
    } else if (email.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      success("Welcome back!", "You have successfully logged in");
      router.push("/");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false);
      success("Welcome!", "Signed in with Google");
      router.push("/");
    }, 1500);
  };

  const handleAppleLogin = () => {
    setIsLoading(true);
    // Simulate Apple OAuth
    setTimeout(() => {
      setIsLoading(false);
      success("Welcome!", "Signed in with Apple");
      router.push("/");
    }, 1500);
  };

  const isFormValid = email.trim() && password;

  return (
    <AuthLayout>
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
        My Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email/Username Field */}
        <AuthInput
          label="Email address or user name"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder=""
          disabled={isLoading}
          error={!!errors.email}
          errorMessage={errors.email}
          autoComplete="email"
        />

        {/* Password Field */}
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder=""
          disabled={isLoading}
          error={!!errors.password}
          errorMessage={errors.password}
          autoComplete="current-password"
        />

        {/* Remember Me */}
        <div className="pt-1">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
        </div>

        {/* Terms Agreement */}
        <p className="text-sm text-black/60 pt-2">
          By continuing, you agree to the{" "}
          <Link
            href="/terms"
            className="text-black underline underline-offset-2 hover:text-black/70"
          >
            Terms of use
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-black underline underline-offset-2 hover:text-black/70"
          >
            Privacy Policy.
          </Link>
        </p>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !isFormValid}
          className="w-full bg-black hover:bg-black/80 text-white disabled:bg-black/20 disabled:text-white rounded-full py-2.5 h-auto text-base font-medium transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      {/* Forgot Password Link */}
      <div className="text-center mt-6">
        <Link
          href="/forgot-password"
          className="text-sm text-black underline underline-offset-2 hover:text-black/70"
        >
          Forget your password
        </Link>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-black/60 mt-4">
        Don&apos;t have an acount?{" "}
        <Link
          href="/signup"
          className="text-black underline underline-offset-2 hover:text-black/70 font-medium"
        >
          Sign up
        </Link>
      </p>

      {/* Social Login */}
      <SocialLoginButtons
        onGoogleClick={handleGoogleLogin}
        onAppleClick={handleAppleLogin}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default LoginPage;
