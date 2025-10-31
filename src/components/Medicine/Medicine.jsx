import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchProducts,
  selectTotalPages,
} from "../../redux/pharmacy/selectors";
import {
  addToCart,
  getCartItems,
  getProductById,
} from "../../redux/pharmacy/operations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import SignIn from "../Modal/SignIn/SignIn";
import SignUp from "../Modal/SignUp/SignUp";
import Filter from "./MedicineFilter/MedicineFilter";
import Pagination from "./Pagination/Pagination";
import styles from "./Medicine.module.css";
import { CommonContainer } from "../../styles/GlobalStyles";

const Medicine = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectSearchProducts);
  const totalPages = useSelector(selectTotalPages);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  const handleAddToCart = (id) => {
    if (!isLoggedIn) {
      handleOpenSignIn();
    } else {
      dispatch(addToCart({ productId: id, quantity: 1 }))
        .unwrap()
        .then(() => {
          dispatch(getCartItems());
        })
        .catch((error) => {
          // Error handling is done in the addToCart thunk via toast notifications
          // This catch is for any unexpected errors
          if (!error.response) {
            toast.error("Network error. Please check your connection.");
          }
        });
    }
  };

  const handleDetailsClick = (id) => {
    dispatch(getProductById(id)).then(() => {
      navigate("/product");
    });
  };

  const DEFAULT_MEDICINE_IMAGE = "https://via.placeholder.com/280x200/f9fafb/6b7280?text=No+Image";
  
  const isValidImageUrl = (url) => {
    if (!url || url === '' || 
        url.includes('imgbb.com') || 
        url.includes('image not found') || 
        url.includes('placeholder') || 
        url.includes('default') ||
        url.includes('404') ||
        url.length < 10) {
      return false;
    }
    return true;
  };

  return (
    <>
      <section>
        <div className={`${CommonContainer} ${styles.container}`}>
          <h2 className={styles.title}>Medicine</h2>
          <Filter totalPages={totalPages} />
          <ul className={styles.list}>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <li key={product._id} className={styles.item}>
                  <div className={styles.imgBox}>
                    <img 
                      src={isValidImageUrl(product.photo) ? product.photo : DEFAULT_MEDICINE_IMAGE}
                      alt={`${product.name} ürün görseli`}
                      loading="lazy"
                      width="280"
                      height="200"
                      sizes="(max-width: 767px) 45vw, (max-width: 1439px) 30vw, 280px"
                      onError={(e) => {
                        e.target.src = DEFAULT_MEDICINE_IMAGE;
                      }}
                    />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.nameWithPriceBox}>
                      <h3 className={styles.subTitle}>{product.name}</h3>
                      <p className={styles.price}>৳{product.price}</p>
                    </div>
                    <p className={styles.text}>{product.category}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={styles.addToCartBtn}
                        onClick={() => handleAddToCart(product._id)}
                        aria-label={`${product.name} ürününü sepete ekle`}
                      >
                        Add to cart
                      </button>
                      <button
                        type="button"
                        className={styles.detailsBtn}
                        onClick={() => handleDetailsClick(product._id)}
                        aria-label={`${product.name} ürün detaylarını göster`}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
      </section>

      <Modal isOpen={openSignIn} onClose={handleCloseSignIn}>
        <SignIn onClose={handleCloseSignIn} onToggleModal={handleOpenSignUp} />
      </Modal>

      <Modal isOpen={openSignUp} onClose={handleCloseSignUp}>
        <SignUp onClose={handleCloseSignUp} onToggleModal={handleOpenSignIn} />
      </Modal>
    </>
  );
};

export default Medicine;
