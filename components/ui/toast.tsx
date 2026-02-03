"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { X, Check, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Toast as ToastType, ToastType as ToastVariant } from "@/lib/toast-store";

const toastVariants = cva(
  "relative flex items-center gap-4 w-full max-w-md p-3 rounded-2xl border-2 shadow-lg",
  {
    variants: {
      type: {
        success: "bg-green-50 border-green-300 text-green-900",
        error: "bg-red-50 border-red-300 text-red-900",
        warning: "bg-amber-50 border-amber-300 text-amber-900",
        info: "bg-blue-50 border-blue-300 text-blue-900",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

const iconContainerVariants = cva(
  "flex-shrink-0 flex items-center justify-center p-1.5  rounded-full",
  {
    variants: {
      type: {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-amber-500 text-white",
        info: "bg-blue-500 text-white",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

const closeButtonVariants = cva(
  "flex-shrink-0 p-1 rounded-full transition-colors hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      type: {
        success: "text-green-600 hover:text-green-800 focus-visible:ring-green-500",
        error: "text-red-600 hover:text-red-800 focus-visible:ring-red-500",
        warning: "text-amber-600 hover:text-amber-800 focus-visible:ring-amber-500",
        info: "text-blue-600 hover:text-blue-800 focus-visible:ring-blue-500",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

interface ToastIconProps {
  type: ToastVariant;
}

const ToastIcon: React.FC<ToastIconProps> = ({ type }) => {
  const iconProps = { className: "w-3 h-3", strokeWidth: 2.5 };

  switch (type) {
    case "success":
      return <Check {...iconProps} />;
    case "error":
      return <X {...iconProps} />;
    case "warning":
      return <AlertTriangle {...iconProps} />;
    case "info":
      return <Lightbulb {...iconProps} />;
    default:
      return <Info {...iconProps} />;
  }
};

interface ToastProps extends VariantProps<typeof toastVariants> {
  toast: ToastType;
  onDismiss: (id: string) => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  toast,
  onDismiss,
  className,
}) => {
  const { id, type, title, message, duration } = toast;

  React.useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onDismiss(id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className={cn(toastVariants({ type }), className)}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Icon */}
      <div className={iconContainerVariants({ type })}>
        <ToastIcon type={type!} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-xs leading-tight">{title}</p>
        {message && (
          <p className="text-[10px] opacity-80 mt-0.5 leading-tight truncate">
            {message}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className={closeButtonVariants({ type })}
        aria-label="Dismiss notification"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export { toastVariants };
