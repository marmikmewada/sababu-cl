import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img
        src="/logo-nobackground-200.png"
        alt="Sababu Fund Inc. official logo"
        className={styles.logo}
      />
      <span>Sababu Fund</span>
    </div>
  );
}

export default Logo;
