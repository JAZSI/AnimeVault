import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MediaType } from "../types/jikan";

export interface ModalTarget {
  id: number;
  type: MediaType;
}

interface ModalContextValue {
  target: ModalTarget | null;
  openModal: (id: number, type: MediaType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<ModalTarget | null>(null);

  const openModal = useCallback((id: number, type: MediaType) => {
    setTarget({ id, type });
  }, []);

  const closeModal = useCallback(() => setTarget(null), []);

  const value = useMemo(
    () => ({ target, openModal, closeModal }),
    [target, openModal, closeModal],
  );

  return <ModalContext value={value}>{children}</ModalContext>;
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}
