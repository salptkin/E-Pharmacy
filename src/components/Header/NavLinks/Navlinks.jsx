import React from "react";
import { NavLink } from "react-router-dom";
import sprite from "/images/sprite.svg";
import { useMediaQuery } from "react-responsive";
import styles from "./Navlinks.module.css";

const NavLinks = () => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1439px)" });

  return (
    <div className={styles.wrapper}>
      {isMobileOrTablet ? (
        <svg className={styles.navIcon}>
          <use href={`${sprite}#nav-vertical`} />
        </svg>
      ) : (
        <svg className={styles.navIcon}>
          <use href={`${sprite}#nav-horyzontal`} />
        </svg>
      )}

      <div className={styles.navBox}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/medicine-store"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Medicine store
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/medicine"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Medicine
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavLinks;
