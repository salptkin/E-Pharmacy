import React, { useCallback, useEffect } from "react";
import sprite from "/public/images/sprite.svg";
import NavLinks from "../NavLinks/Navlinks";
import Links from "../Links/Links";
import styles from "./Menu.module.css";

const Menu = ({ isOpen, onClose, pageType }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.overlay} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-title"
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Menüyü kapat"
          >
            <svg aria-hidden="true">
              <use href={`${sprite}#close`} />
            </svg>
          </button>

          <NavLinks />
          <Links pageType={pageType} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
