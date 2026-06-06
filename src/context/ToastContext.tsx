import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface Toast {
  id: number;
  message: string;
  icon: string;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, icon?: string) => void;
  dismissToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_TTL = 3000;
let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, icon = "fa-bolt") => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message, icon }]);
      setTimeout(() => dismissToast(id), TOAST_TTL);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  );

  return <ToastContext value={value}>{children}</ToastContext>;
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
