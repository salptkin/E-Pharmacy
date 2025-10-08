import React from "react";
import { NavLink } from "react-router-dom";
import logo from "/logo.png";
import styles from "./HeaderLogo.module.css";

const Logo = ({ pageType }) => {
  const logoColor = pageType === "home" ? "#FFF" : "#1D1E21";
  const logoFilter = pageType === "home" ? "brightness(0) invert(1)" : "none";

  return (
    <NavLink to="/home" className={styles.navLink}>
      <img 
        src={logo} 
        alt="logo" 
        className={styles.logoImg} 
        style={{ filter: logoFilter }}
      />
      <p className={styles.logoText} style={{ color: logoColor }}>
        E-Pharmacy
      </p>
    </NavLink>
  );
};

export default Logo;
