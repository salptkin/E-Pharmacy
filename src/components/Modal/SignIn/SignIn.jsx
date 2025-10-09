import React from "react";
import styles from "./SignIn.module.css";
import { useFormik } from "formik";
import { loginSchema } from "../../../schemas/schemas";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../redux/auth/operations";
import { CommonContainer } from "../../../styles/GlobalStyles";

const SignIn = ({ onClose, onToggleModal }) => {
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    onClose();
    onToggleModal();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
      onClose();
    },
  });

  return (
    <>
      <h2 className={styles.title}>Log in to your account</h2>
      <p className={styles.text}>
        Please login to your account before continuing.
      </p>

      <form className={`${CommonContainer} ${styles.form}`} onSubmit={formik.handleSubmit}>
        <div className={styles.inputBox}>
          <label htmlFor="email">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <span>{formik.errors.email}</span>
            )}
          </label>

          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <span>{formik.errors.password}</span>
            )}
          </label>
        </div>

        <div className={styles.btnBox}>
          <button type="submit" className={styles.submitBtn}>
            Log in
          </button>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={handleToggleModal}
          >
            Don't have an account?
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
