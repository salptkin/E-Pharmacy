import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.css";

const NavLinks = () => {
  return (
    <ul className={styles.navList}>
      <li>
        <NavLink to="/home" className={styles.link}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/medicine-store" className={styles.link}>
          Medicine store
        </NavLink>
      </li>
      <li>
        <NavLink to="/medicine" className={styles.link}>
          Medicine
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
