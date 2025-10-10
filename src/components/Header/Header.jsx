import React, { useState, useEffect } from "react";
import Logo from "./HeaderLogo/HeaderLogo";
import Menu from "./Menu/Menu";
import NavLinks from "./NavLinks/Navlinks";
import Links from "./Links/Links";
import UserIcon from "./UserIcon/UserIcon";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const sprite = "/images/sprite.svg";

const Header = ({ pageType }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);

  // Sayfa değiştiğinde menüyü kapat
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerBackground = pageType === "home" ? "#59B17A" : "#F7F8FA";

  return (
    <>
      <header>
        <div className={styles.container} style={{ background: headerBackground }}>
          <Logo pageType={pageType} />

          {/* Mobil / Tablet */}
          {isLoggedIn && !isDesktop && (
            <div className={styles.wrapper}>
              <UserIcon pageType={pageType} />
              <button className={styles.burgerBtn} onClick={handleOpenMenu}>
                {pageType === "home" ? (
                  <svg className={styles.whiteSvg}>
                    <use href={`${sprite}#burger`} />
                  </svg>
                ) : (
                  <svg className={styles.greenSvg}>
                    <use href={`${sprite}#burger`} />
                  </svg>
                )}
              </button>
            </div>
          )}

          {!isLoggedIn && !isDesktop && (
            <button className={styles.burgerBtn} onClick={handleOpenMenu}>
              {pageType === "home" ? (
                <svg className={styles.whiteSvg}>
                  <use href={`${sprite}#burger`} />
                </svg>
              ) : (
                <svg className={styles.greenSvg}>
                  <use href={`${sprite}#burger`} />
                </svg>
              )}
            </button>
          )}

          {/* Desktop */}
          {isLoggedIn && isDesktop && (
            <>
              <NavLinks />
              <div className={styles.box}>
                <UserIcon pageType={pageType} />
                <Links pageType={pageType} />
              </div>
            </>
          )}

          {!isLoggedIn && isDesktop && (
            <>
              <NavLinks />
              <Links pageType={pageType} />
            </>
          )}
        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} pageType={pageType} />
    </>
  );
};

export default Header;
