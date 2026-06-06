import styles from "./Skeleton.module.css";

interface SkeletonProps {
  count?: number;
  ratio?: string;
}

export function Skeleton({ count = 6, ratio = "2 / 3.1" }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.block} style={{ aspectRatio: ratio }} />
      ))}
    </>
  );
}
