import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img 
          src="/images/notFound.png" 
          alt="Page not found" 
          className={styles.image}
        />
        <h3>Page Not Found</h3>
        <p>
          You can go to{" "}
          <NavLink to="/home" className={styles.link}>
            Home Page
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
