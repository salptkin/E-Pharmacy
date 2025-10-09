import React, { useEffect } from "react";
import styles from "./MedicineStores.module.css";
import { CommonContainer } from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectAllStores } from "../../redux/pharmacy/selectors";
import { getAllStores } from "../../redux/pharmacy/operations";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

const sprite = "/images/sprite.svg";

const MedicineStores = () => {
  const dispatch = useDispatch();
  const stores = useSelector(selectAllStores);
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const storesLimit = isDesktop ? 9 : 8;

  useEffect(() => {
    dispatch(getAllStores({ limit: storesLimit }));
  }, [dispatch, storesLimit]);

  return (
    <section>
      <div className={`${CommonContainer} ${styles.container}`}>
        <h2 className={styles.title}>Medicine store</h2>
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {stores?.map((store) => (
              <li key={store._id} className={styles.item}>
                <h3 className={styles.subTitle}>{store.name}</h3>

                <div className={styles.addressBox}>
                  <svg>
                    <use href={`${sprite}#map`} />
                  </svg>
                  <ul>
                    <li>
                      <a
                        href={`https://maps.google.com/?q=${store.address},${store.city}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {store.address}
                      </a>
                    </li>
                    <li>{store.city}</li>
                  </ul>
                </div>

                <div className={styles.phoneBox}>
                  <svg>
                    <use href={`${sprite}#phone`} />
                  </svg>
                  <a href={`tel:${store.phone}`}>
                    <p>{store.phone}</p>
                  </a>
                </div>

                {isTabletOrDesktop && (
                  <button type="button" className={styles.visitStoreBtn}>
                    <NavLink to="/medicine">Visit Store</NavLink>
                  </button>
                )}

                <div className={styles.ratingWithBtn}>
                  <div className={styles.ratingBox}>
                    <svg>
                      <use href={`${sprite}#star`} />
                    </svg>
                    <p>{store.rating}</p>
                  </div>
                  <div
                    className={`${styles.isOpenItem} ${
                      store.isOpen ? styles.isOpen : styles.isClosed
                    }`}
                  >
                    {store.isOpen ? "open" : "close"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MedicineStores;
