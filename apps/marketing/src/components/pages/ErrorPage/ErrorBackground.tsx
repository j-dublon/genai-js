import styles from "./ErrorBackground.module.css";

export const ErrorBackground = () => {
  return (
    <div className={styles["error-background"]}>
      <div className={styles.static} />
      <div className={styles.scan} />
    </div>
  );
};
