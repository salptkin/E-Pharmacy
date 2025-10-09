import React from "react";
import styles from "./SignUp.module.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { registerSchema } from "../../../schemas/schemas";
import { registerThunk } from "../../../redux/auth/operations";
import { CommonContainer } from "../../../styles/GlobalStyles";

const SignUp = ({ onClose, onToggleModal }) => {
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    onClose();
    onToggleModal();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerThunk(values))
        .unwrap()
        .then(() => {
          handleToggleModal();
        });
    },
  });

  return (
    <>
      <h2 className={styles.title}>Sign Up</h2>
      <p className={styles.text}>
        Before proceeding, please register on our site.
      </p>

      <form className={`${CommonContainer} ${styles.form}`} onSubmit={formik.handleSubmit}>
        <div className={styles.inputBox}>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="User Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <span>{formik.errors.name}</span>
            )}
          </label>

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

          <label htmlFor="phone">
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <span>{formik.errors.phone}</span>
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
            Sign Up
          </button>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={handleToggleModal}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
