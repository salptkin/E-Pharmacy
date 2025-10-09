import React from "react";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductReviews from "./ProductReviews/ProductReviews";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  return (
    <section>
      <div className={styles.container}>
        <ProductInfo />
        <ProductReviews />
      </div>
    </section>
  );
};

export default ProductDetail;
