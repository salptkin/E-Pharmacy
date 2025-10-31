import React from "react";
import styles from "./MainBanner.module.css";

const MainBanner = () => {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.heroBox}>
          <picture>
            <source
              type="image/webp"
              srcSet="/images/mainbanner-mob@1x.webp 331w, /images/mainbanner-tab@1x.webp 704w, /images/mainbanner-desk@1x.webp 749w"
              sizes="(max-width: 767px) 331px, (max-width: 1439px) 704px, 749px"
            />
            <source
              type="image/png"
              srcSet="/images/mainbanner-mob@1x.png 331w, /images/mainbanner-tab@1x.png 704w, /images/mainbanner-desk@1x.png 749w"
              sizes="(max-width: 767px) 331px, (max-width: 1439px) 704px, 749px"
            />
            <img
              className={styles.heroImg}
              src="/images/mainbanner-mob@1x.png"
              alt="Eczane ana görsel"
              width="749"
              height="508"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <h1 className={styles.title}>Your medication delivered</h1>
          <p className={styles.text}>
            Say goodbye to all your healthcare worries with us
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
