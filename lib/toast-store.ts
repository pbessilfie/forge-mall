import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastOptions {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (options) => {
    const id = generateId();
    const toast: Toast = {
      id,
      type: options.type,
      title: options.title,
      message: options.message,
      duration: options.duration ?? 5000,
    };
    set((state) => ({
      toasts: [...state.toasts, toast],
    }));
    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));

// Convenience functions for direct usage without hooks
export const showToast = (options: ToastOptions) => {
  return useToastStore.getState().addToast(options);
};

export const toast = {
  success: (title: string, message?: string, duration?: number) =>
    showToast({ type: "success", title, message, duration }),
  error: (title: string, message?: string, duration?: number) =>
    showToast({ type: "error", title, message, duration }),
  warning: (title: string, message?: string, duration?: number) =>
    showToast({ type: "warning", title, message, duration }),
  info: (title: string, message?: string, duration?: number) =>
    showToast({ type: "info", title, message, duration }),
};

export const dismissToast = (id: string) => {
  useToastStore.getState().removeToast(id);
};

export const clearAllToasts = () => {
  useToastStore.getState().clearToasts();
};
