import React, { useState } from "react";
import styles from "./CartForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/pharmacy/selectors";
import { useFormik } from "formik";
import { orderSchema } from "../../../schemas/schemas";
import { cartCheckout } from "../../../redux/pharmacy/operations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const total = Number(cart?.total).toFixed(2) || 0;
  const [isCashPayment, setIsCashPayment] = useState(true);

  // Telefon numarası formatlanma fonksiyonu
  const formatPhoneNumber = (value) => {
    // Sadece rakamları al
    const numbers = value.replace(/\D/g, '');
    
    // Eğer +90 ile başlıyorsa
    if (numbers.startsWith('90')) {
      const phoneNumber = numbers.substring(2);
      if (phoneNumber.length <= 10) {
        if (phoneNumber.length <= 3) return `+90 ${phoneNumber}`;
        if (phoneNumber.length <= 6) return `+90 ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3)}`;
        if (phoneNumber.length <= 8) return `+90 ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6)}`;
        return `+90 ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6, 8)} ${phoneNumber.substring(8)}`;
      }
    }
    
    // Eğer 0 ile başlıyorsa
    if (numbers.startsWith('0')) {
      const phoneNumber = numbers.substring(1);
      if (phoneNumber.length <= 10) {
        if (phoneNumber.length <= 3) return `0 ${phoneNumber}`;
        if (phoneNumber.length <= 6) return `0 ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3)}`;
        if (phoneNumber.length <= 8) return `0 ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6)}`;
        return `0 ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6, 8)} ${phoneNumber.substring(8)}`;
      }
    }
    
    // Eğer sadece rakamlar girilmişse ve 10 haneli
    if (numbers.length <= 10 && numbers.length > 0) {
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `${numbers.substring(0, 3)} ${numbers.substring(3)}`;
      if (numbers.length <= 8) return `${numbers.substring(0, 3)} ${numbers.substring(3, 6)} ${numbers.substring(6)}`;
      return `${numbers.substring(0, 3)} ${numbers.substring(3, 6)} ${numbers.substring(6, 8)} ${numbers.substring(8)}`;
    }
    
    return value;
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    formik.setFieldValue('phone', formattedValue);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      payment: isCashPayment ? "cash" : "bank",
    },
    validationSchema: orderSchema,
    onSubmit: (values) => {
      if (!cart || !cart.cartProducts || cart.cartProducts.length === 0) {
        toast.error("Please select product to make an order");
        return;
      }
      dispatch(cartCheckout(values))
        .unwrap()
        .then(() => {
          navigate("/home");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h3 className={styles.subTitle}>Enter shipping info</h3>
      <p className={styles.text}>
        Enter your delivery address where you get the product. You can also send
        any other location where you send the products.
      </p>

      <div className={styles.inputBox}>
        {["name", "email", "phone", "address"].map((field) => (
          <label key={field} htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
            <input
              type="text"
              id={field}
              name={field}
              placeholder={
                field === "phone" 
                  ? "+90 5XX XXX XX XX"
                  : "Enter text"
              }
              onChange={field === "phone" ? handlePhoneChange : formik.handleChange}
              value={formik.values[field]}
            />
            {formik.errors[field] && formik.touched[field] ? (
              <span>{formik.errors[field]}</span>
            ) : null}
          </label>
        ))}
      </div>

      <div className={styles.paymentBox}>
        <h3 className={styles.subTitle}>Payment method</h3>
        <p className={styles.text}>
          You can pay us in a multiple way in our payment gateway system.
        </p>

        <div className={styles.radioBox}>
          <label htmlFor="cash">
            <input
              type="radio"
              id="cash"
              name="payment"
              checked={isCashPayment}
              onChange={() => setIsCashPayment(true)}
            />
            Cash On Delivery
          </label>
          <label htmlFor="bank">
            <input
              type="radio"
              id="bank"
              name="payment"
              checked={!isCashPayment}
              onChange={() => setIsCashPayment(false)}
            />
            Bank
          </label>
          {formik.errors.payment && formik.touched.payment ? (
            <span>{formik.errors.payment}</span>
          ) : null}
        </div>
      </div>

      <div className={styles.orderBox}>
        <h3 className={styles.subTitle}>Order details</h3>
        <p className={styles.text}>
          Shipping and additional costs are calculated based on values you have
          entered.
        </p>

        <div className={styles.totalBox}>
          <p>Total:</p>
          <p>{`৳ ${total}`}</p>
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Place order
      </button>
    </form>
  );
};

export default CartForm;
