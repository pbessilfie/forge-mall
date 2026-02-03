"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <label
        htmlFor={inputId}
        className="inline-flex items-center gap-3 cursor-pointer select-none"
      >
        <div className="relative">
          <input
            id={inputId}
            type="checkbox"
            className="sr-only peer"
            ref={ref}
            checked={checked}
            onChange={onChange}
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-black/20 peer-focus-visible:ring-offset-1",
              checked
                ? "bg-black border-black"
                : "bg-white border-black/20 hover:border-black/40",
              className
            )}
          >
            {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
          </div>
        </div>
        {label && (
          <span className="text-sm text-black/80">{label}</span>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
