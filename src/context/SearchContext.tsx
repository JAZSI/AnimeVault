import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface SearchContextValue {
  query: string;
  search: (q: string) => void;
  clear: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");

  const search = useCallback((q: string) => setQuery(q.trim()), []);
  const clear = useCallback(() => setQuery(""), []);

  const value = useMemo(
    () => ({ query, search, clear }),
    [query, search, clear],
  );

  return <SearchContext value={value}>{children}</SearchContext>;
}

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within a SearchProvider");
  return ctx;
}
