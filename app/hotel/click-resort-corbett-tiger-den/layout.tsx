import styles from "../../resort-layout.module.css";

export default function TigerDenLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={styles.shell}>{children}</div>;
}
