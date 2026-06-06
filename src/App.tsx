import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/globals.css";

import { ToastProvider } from "./context/ToastContext";
import { ModalProvider } from "./context/ModalContext";
import { SearchProvider, useSearch } from "./context/SearchContext";

import { MainLayout } from "./components/layout/MainLayout";
import { MediaModal } from "./components/anime/MediaModal";
import { ToastContainer } from "./components/ui/ToastContainer";
import { Dashboard } from "./pages/Dashboard";
import { SearchResults } from "./pages/SearchResults";

function Pages() {
  const { query } = useSearch();
  return query ? <SearchResults /> : <Dashboard />;
}

export function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <SearchProvider>
          <MainLayout>
            <Pages />
          </MainLayout>
          <MediaModal />
          <ToastContainer />
        </SearchProvider>
      </ModalProvider>
    </ToastProvider>
  );
}

export default App;
