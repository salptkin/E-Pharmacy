import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./PromoBanner.module.css";

const sprite = "/images/sprite.svg";
const usualMob = "/images/promobanner-mob@1x.png";
const retinaMob = "/images/promobanner-mob@2x.png";
const usualTab = "/images/promobanner-tab@1x.png";
const retinaTab = "/images/promobanner-tab@2x.png";
const usualDesk = "/images/promobanner-desk@1x.png";
const retinaDesk = "/images/promobanner-desk@2x.png";

const PromoBanner = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1439px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div>
            <h2 className={styles.title}>Add the medicines you need online now</h2>
            <p className={styles.text}>
              Enjoy the convenience of having your prescriptions filled from
              home by connecting with your community pharmacy through our
              online platform.
            </p>
            <button className={styles.btn}>
              <NavLink to="/medicine-store">Buy medicine</NavLink>
            </button>
          </div>
          <div className={styles.imgBox}>
            {isMobile && (
              <img srcSet={`${usualMob} 1x, ${retinaMob} 2x`} alt="illustration" />
            )}
            {isTablet && (
              <img srcSet={`${usualTab} 1x, ${retinaTab} 2x`} alt="illustration" />
            )}
            {isDesktop && (
              <img srcSet={`${usualDesk} 1x, ${retinaDesk} 2x`} alt="illustration" />
            )}
          </div>
        </div>
        <ul className={styles.featuresList}>
          {["Take user orders form online","Create your shop profile","Manage your store","Get more orders","Storage shed"].map((text, idx) => (
            <li key={idx} className={styles.item}>
              <svg>
                <use href={`${sprite}#lightning`} />
              </svg>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PromoBanner;
