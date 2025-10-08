import React from "react";
import styles from "./BottomSide.module.css";

const BottomSide = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li>© E-Pharmacy 2023. All Rights Reserved</li>
        <li>|</li>
        <li>Privacy Policy</li>
        <li>|</li>
        <li>Terms & Conditions</li>
      </ul>
    </div>
  );
};

export default BottomSide;
