import React from "react";
import { NavLink } from "react-router-dom";
import logo from "/logo.png";
import styles from "./FooterLogo.module.css";

const FooterLogo = () => {
  return (
    <NavLink to="/home" className={styles.navLink}>
      <img src={logo} alt="logo" className={styles.logoImg} />
      <p className={styles.logoText}>E-Pharmacy</p>
    </NavLink>
  );
};

export default FooterLogo;
