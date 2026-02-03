"use client";

import * as React from "react";
import { EyeOff, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, errorMessage, label, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor={inputId}
              className={cn(
                "text-sm font-medium",
                error ? "text-red-500" : "text-black/60"
              )}
            >
              {label}
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-1.5 text-sm text-black/60 hover:text-black transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              {showPassword ? "Show" : "Hide"}
            </button>
          </div>
        )}
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex w-full px-4 py-2 rounded-xl border text-base text-black placeholder:text-black/40 bg-white outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-black/10 focus:border-black/30",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
