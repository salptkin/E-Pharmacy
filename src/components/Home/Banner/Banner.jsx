import React from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <section>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.banner}>
            <div className={styles.roundWithTitle}>
              <div className={styles.round}>1</div>
              <h3 className={styles.title}>Huge Sale</h3>
            </div>
            <div className={styles.box}>
              <p className={styles.percentage}>70%</p>
              <button type="button" className={styles.btn}>
                Shop now
              </button>
            </div>
          </li>

          <li className={styles.banner}>
            <div className={styles.roundWithTitle}>
              <div className={styles.round}>2</div>
              <h3 className={styles.title}>Secure delivery</h3>
            </div>
            <div className={styles.box}>
              <p className={styles.percentage}>100%</p>
              <button type="button" className={styles.btn}>
                Read more
              </button>
            </div>
          </li>

          <li className={styles.banner}>
            <div className={styles.roundWithTitle}>
              <div className={styles.round}>3</div>
              <h3 className={styles.title}>Off</h3>
            </div>
            <div className={styles.box}>
              <p className={styles.percentage}>35%</p>
              <button type="button" className={styles.btn}>
                Shop now
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Banner;
