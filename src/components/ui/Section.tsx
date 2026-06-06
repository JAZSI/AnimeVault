import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  icon: string;
  title: string;
  children: ReactNode;
  compact?: boolean;
  id?: string;
}

export function Section({ icon, title, children, compact, id }: SectionProps) {
  return (
    <section className={compact ? styles.compactSection : styles.section} id={id}>
      <div className={`${styles.header} ${compact ? styles.compactHeader : ""}`}>
        <div className={`${styles.title} ${compact ? styles.compactTitle : ""}`}>
          <i className={`fas ${icon}`} />
          {title}
        </div>
      </div>
      {children}
    </section>
  );
}
