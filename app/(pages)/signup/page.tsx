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
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupPage = () => {
  const router = useRouter();
  const { success } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase and number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!agreeToTerms) {
      return;
    }

    setIsLoading(true);

    // Simulate signup API call
    setTimeout(() => {
      setIsLoading(false);
      success("Congratulations!", "Your account has been created successfully");
      router.push("/login");
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false);
      success("Welcome!", "Signed up with Google");
      router.push("/");
    }, 1500);
  };

  const handleAppleSignup = () => {
    setIsLoading(true);
    // Simulate Apple OAuth
    setTimeout(() => {
      setIsLoading(false);
      success("Welcome!", "Signed up with Apple");
      router.push("/");
    }, 1500);
  };

  const isFormValid = name.trim() && email.trim() && password && confirmPassword && agreeToTerms;

  return (
    <AuthLayout>
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
        Create an account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name Field */}
        <AuthInput
          label="Full name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name)
              setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder=""
          disabled={isLoading}
          error={!!errors.name}
          errorMessage={errors.name}
          autoComplete="name"
        />

        {/* Email Field */}
        <AuthInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: undefined }));
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
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder=""
          disabled={isLoading}
          error={!!errors.password}
          errorMessage={errors.password}
          autoComplete="new-password"
        />

        {/* Confirm Password Field */}
        <PasswordInput
          id="confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword)
              setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          placeholder=""
          disabled={isLoading}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          autoComplete="new-password"
        />

        {/* Terms Agreement Checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox
            label=""
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            disabled={isLoading}
          />
          <p className="text-sm text-black/60 ">
            I agree to the{" "}
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
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !isFormValid}
          className="w-full bg-black hover:bg-black/80 text-white disabled:bg-black/20 disabled:text-white rounded-full py-2.5 h-auto text-base font-medium transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-black/60 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-black underline underline-offset-2 hover:text-black/70 font-medium"
        >
          Log in
        </Link>
      </p>

      {/* Social Login */}
      <SocialLoginButtons
        onGoogleClick={handleGoogleSignup}
        onAppleClick={handleAppleSignup}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default SignupPage;
