import React, { useEffect } from "react";
import styles from "./Cart.module.css";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../redux/pharmacy/operations";
import CartForm from "./CartForm/CartForm";
import CartItems from "./CartItems/CartItems";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Cart</h2>
        <div className={styles.mainWrapper}>
          <CartForm />
          <CartItems />
        </div>
      </div>
    </section>
  );
};

export default Cart;
