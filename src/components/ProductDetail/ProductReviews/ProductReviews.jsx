import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../redux/pharmacy/selectors";
import { useMediaQuery } from "react-responsive";
import { productDescriptions } from "../../../data/productDescriptions";
import { productReviews } from "../../../data/productReviews";
import Avatar from "../../Avatar/Avatar";

const sprite = "/images/sprite.svg";

import styles from "./ProductReviews.module.css";

const ProductReviews = () => {
  const product = useSelector(selectProduct);
  
  
  // Product henüz yüklenmemişse loading göster
  if (!product) {
    return <div>Loading reviews...</div>;
  }

  // Product ID'ye göre özel description kullan, yoksa default
  const description = product.description || productDescriptions[product.id] || {
    text: "No description available for this product.",
    anti_cancer_properties: "Not specified",
    anti_diabetic_effects: "Not specified", 
    digestive_aid: "Not specified",
    heart_health: "Not specified",
    immune_support: "Not specified",
    medicinal_uses: "Not specified"
  };

  const {
    text,
    anti_cancer_properties,
    anti_diabetic_effects,
    digestive_aid,
    heart_health,
    immune_support,
    medicinal_uses,
  } = description;

  const [showDesc, setShowDesc] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnBox}>
        <button
          type="button"
          className={`${styles.descBtn} ${showDesc ? styles.active : ""}`}
          onClick={() => { setShowDesc(true); setShowReviews(false); }}
        >
          Description
        </button>
        <button
          type="button"
          className={`${styles.reviewsBtn} ${showReviews ? styles.active : ""}`}
          onClick={() => { setShowDesc(false); setShowReviews(true); }}
        >
          Reviews
        </button>
      </div>

      {showDesc && (
        <ul className={styles.descList}>
          <li className={styles.item}><span>{text}</span></li>
          <li className={styles.item}><span>Medicinal Uses: Antioxidant Properties: </span>{medicinal_uses}</li>
          <li className={styles.item}><span>Anti-Diabetic Effects: </span>{anti_diabetic_effects}</li>
          <li className={styles.item}><span>Heart Health: </span>{heart_health}</li>
          <li className={styles.item}><span>Anti-Cancer Properties: </span>{anti_cancer_properties}</li>
          <li className={styles.item}><span>Immune Support: </span>{immune_support}</li>
          <li className={styles.item}><span>Digestive Aid: </span>{digestive_aid}</li>
        </ul>
      )}

      {showReviews && (
        <div>
          {productReviews[product.id] && productReviews[product.id].length > 0 ? (
            <ul className={styles.reviewsList}>
              {productReviews[product.id].map((review, index) => (
                <li className={styles.reviewItem} key={index}>
                  <div className={styles.imgNameBox}>
                    <div className={styles.imgBox}>
                      <Avatar name={review.reviewer} size="medium" />
                    </div>
                    <div>
                      <h3 className={styles.name}>{review.reviewer}</h3>
                      <p className={styles.time}>{review.time}</p>
                    </div>
                  </div>
                  <p className={styles.text}>{review.review}</p>
                  <div className={styles.ratingBox}>
                    <div>
                      <svg><use href={`${sprite}#star`} /></svg>
                      {isTabletOrDesktop && (
                        <>
                          <svg><use href={`${sprite}#star`} /></svg>
                          <svg><use href={`${sprite}#star`} /></svg>
                          <svg><use href={`${sprite}#star`} /></svg>
                          <svg style={{ fill: "#F1F1F1" }}><use href={`${sprite}#star`} /></svg>
                        </>
                      )}
                    </div>
                    <p>{review.rating}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
