import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./Footer.module.css";

import FooterLogo from "./FooterLogo/FooterLogo";
import NavLinks from "./NavLinks/NavLinks";
import Socials from "./Socials/Socials";
import BottomSide from "./BottomSide/BottomSide";

const Footer = () => {
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <div className={styles.textWrapper}>
            <FooterLogo />
            <p className={styles.text}>
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>

          <div className={styles.linksWrapper}>
            <NavLinks />
            {isTabletOrDesktop && <Socials />}
          </div>
        </div>

        <BottomSide />
      </div>
    </footer>
  );
};

export default Footer;
