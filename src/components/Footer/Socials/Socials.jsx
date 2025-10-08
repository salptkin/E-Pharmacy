import React from "react";
import sprite from "/public/images/sprite.svg";
import styles from "./Socials.module.css";

const Socials = () => {
  return (
    <div className={styles.wrapper}>
      <a
        href="https://www.facebook.com/goITclub/"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <div className={styles.icon}>
          <svg>
            <use href={`${sprite}#facebook`} />
          </svg>
        </div>
      </a>

      <a
        href="https://www.instagram.com/goitclub/"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <div className={styles.icon}>
          <svg>
            <use href={`${sprite}#instagram`} />
          </svg>
        </div>
      </a>

      <a
        href="https://www.youtube.com/c/GoIT"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <div className={styles.icon}>
          <svg>
            <use href={`${sprite}#youtube`} />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default Socials;
