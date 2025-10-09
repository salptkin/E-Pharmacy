import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../redux/auth/selectors";
import { selectCart } from "../../../redux/pharmacy/selectors";
import { getCartItems } from "../../../redux/pharmacy/operations";
import { getUserInfoThunk } from "../../../redux/auth/operations";
import styles from "./UserIcon.module.css";

const sprite = "/images/sprite.svg";

const UserIcon = ({ pageType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const cartItemsQuantity = cart?.cartProducts?.length || 0;

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, cartItemsQuantity]);

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, [dispatch]);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const iconBackground =
    pageType === "home" ? "#F1F1F1" : "rgba(89, 177, 122, 0.10)";

  return (
    <div className={styles.wrapper}>
      <button className={styles.cartBtn} onClick={handleCartClick}>
        <svg className={styles.cartIcon}>
          <use href={`${sprite}#shop`} />
        </svg>
        <div className={styles.cartItems}>{cartItemsQuantity}</div>
      </button>

      <div className={styles.userIcon} style={{ background: iconBackground }}>
        {user?.name?.[0]}
      </div>
    </div>
  );
};

export default UserIcon;
