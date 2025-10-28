import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./PromoBanner.module.css";

const sprite = "/images/sprite.svg";
const mobPng1x = "/images/promobanner-mob@1x.png";
const mobPng2x = "/images/promobanner-mob@2x.png";
const mobWebp1x = "/images/promobanner-mob@1x.webp";
const mobWebp2x = "/images/promobanner-mob@2x.webp";
const tabPng1x = "/images/promobanner-tab@1x.png";
const tabPng2x = "/images/promobanner-tab@2x.png";
const tabWebp1x = "/images/promobanner-tab@1x.webp";
const tabWebp2x = "/images/promobanner-tab@2x.webp";
const deskPng1x = "/images/promobanner-desk@1x.png";
const deskPng2x = "/images/promobanner-desk@2x.png";
const deskWebp1x = "/images/promobanner-desk@1x.webp";
const deskWebp2x = "/images/promobanner-desk@2x.webp";

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
              <picture>
                <source type="image/webp" srcSet={`${mobWebp1x} 1x, ${mobWebp2x} 2x`} />
                <source type="image/png" srcSet={`${mobPng1x} 1x, ${mobPng2x} 2x`} />
                <img 
                  src={mobPng1x}
                  alt="Eczane promosyon illüstrasyonu"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 33vw"
                />
              </picture>
            )}
            {isTablet && (
              <picture>
                <source type="image/webp" srcSet={`${tabWebp1x} 1x, ${tabWebp2x} 2x`} />
                <source type="image/png" srcSet={`${tabPng1x} 1x, ${tabPng2x} 2x`} />
                <img 
                  src={tabPng1x}
                  alt="Eczane promosyon illüstrasyonu"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1439px) 50vw, 33vw"
                />
              </picture>
            )}
            {isDesktop && (
              <picture>
                <source type="image/webp" srcSet={`${deskWebp1x} 1x, ${deskWebp2x} 2x`} />
                <source type="image/png" srcSet={`${deskPng1x} 1x, ${deskPng2x} 2x`} />
                <img 
                  src={deskPng1x}
                  alt="Eczane promosyon illüstrasyonu"
                  loading="lazy"
                  decoding="async"
                  sizes="33vw"
                />
              </picture>
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
