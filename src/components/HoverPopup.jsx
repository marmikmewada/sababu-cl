import React, { useState } from "react";
import styles from "./HoverPopup.module.css";

function HoverPopup({ content }) {
  const [isHovering, setIsHovering] = useState();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={styles.hoverContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>Mission</div>
      {isHovering && <Popup content={content} />}
    </div>
  );
}

export default HoverPopup;

function Popup({ content }) {
  return <div className={styles.popup}>{content}</div>;
}
