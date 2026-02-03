"use client";

import * as React from "react";
import { AnimatePresence } from "motion/react";
import { useToastStore } from "@/lib/toast-store";
import { Toast } from "./toast";
import { cn } from "@/lib/utils";

type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToasterProps {
  position?: ToasterPosition;
  className?: string;
  maxToasts?: number;
}

const positionClasses: Record<ToasterPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

export const Toaster: React.FC<ToasterProps> = ({
  position = "top-right",
  className,
  maxToasts = 5,
}) => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  // Limit the number of visible toasts
  const visibleToasts = toasts.slice(-maxToasts);

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-3 pointer-events-none",
        positionClasses[position],
        className
      )}
      aria-label="Notifications"
      role="region"
    >
      <AnimatePresence mode="popLayout">
        {visibleToasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;
