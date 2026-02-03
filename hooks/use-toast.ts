import { useCallback } from "react";
import {
  useToastStore,
  type Toast,
  type ToastOptions,
  type ToastType,
} from "@/lib/toast-store";

interface UseToastReturn {
  /**
   * Show a toast notification
   * @param options Toast configuration options
   * @returns The toast ID for manual dismissal
   */
  showToast: (options: ToastOptions) => string;

  /**
   * Show a success toast
   * @param title The toast title
   * @param message Optional description message
   * @param duration Optional auto-dismiss duration in ms (default: 5000)
   */
  success: (title: string, message?: string, duration?: number) => string;

  /**
   * Show an error toast
   * @param title The toast title
   * @param message Optional description message
   * @param duration Optional auto-dismiss duration in ms (default: 5000)
   */
  error: (title: string, message?: string, duration?: number) => string;

  /**
   * Show a warning toast
   * @param title The toast title
   * @param message Optional description message
   * @param duration Optional auto-dismiss duration in ms (default: 5000)
   */
  warning: (title: string, message?: string, duration?: number) => string;

  /**
   * Show an info toast
   * @param title The toast title
   * @param message Optional description message
   * @param duration Optional auto-dismiss duration in ms (default: 5000)
   */
  info: (title: string, message?: string, duration?: number) => string;

  /**
   * Dismiss a specific toast by ID
   * @param id The toast ID to dismiss
   */
  dismiss: (id: string) => void;

  /**
   * Dismiss all toasts
   */
  dismissAll: () => void;

  /**
   * Current list of active toasts
   */
  toasts: Toast[];
}

/**
 * Hook for showing toast notifications
 *
 * @example
 * ```tsx
 * const { success, error, warning, info } = useToast();
 *
 * // Show a success toast
 * success("Success!", "Your changes have been saved");
 *
 * // Show an error toast with custom duration
 * error("Error!", "Something went wrong", 10000);
 *
 * // Show using the generic showToast method
 * showToast({ type: "info", title: "Info", message: "This is an info toast" });
 * ```
 */
export function useToast(): UseToastReturn {
  const toasts = useToastStore((state) => state.toasts);
  const addToast = useToastStore((state) => state.addToast);
  const removeToast = useToastStore((state) => state.removeToast);
  const clearToasts = useToastStore((state) => state.clearToasts);

  const showToast = useCallback(
    (options: ToastOptions) => {
      return addToast(options);
    },
    [addToast]
  );

  const createToast = useCallback(
    (type: ToastType) =>
      (title: string, message?: string, duration?: number) => {
        return addToast({ type, title, message, duration });
      },
    [addToast]
  );

  const success = useCallback(
    (title: string, message?: string, duration?: number) =>
      createToast("success")(title, message, duration),
    [createToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) =>
      createToast("error")(title, message, duration),
    [createToast]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) =>
      createToast("warning")(title, message, duration),
    [createToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) =>
      createToast("info")(title, message, duration),
    [createToast]
  );

  const dismiss = useCallback(
    (id: string) => {
      removeToast(id);
    },
    [removeToast]
  );

  const dismissAll = useCallback(() => {
    clearToasts();
  }, [clearToasts]);

  return {
    showToast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
    toasts,
  };
}

export default useToast;
