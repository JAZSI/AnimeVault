import type { ReactNode } from "react";
import styles from "./MainLayout.module.css";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={styles.viewport}>{children}</main>
      </div>
    </>
  );
}
