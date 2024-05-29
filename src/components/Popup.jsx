import React, { useState } from "react";
import styles from "./Popup.module.css";

function Popup({ content, label }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.popupWrapper}>
      <button onClick={() => setIsOpen(true)} className={styles.popupBtn}>
        {label}
      </button>
      {isOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContainer}>
            <div className={styles.popup}>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
              <div className={styles.popupCoontent}>{content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
