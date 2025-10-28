import React from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operations";
import { loginSchema } from "../../schemas/schemas";
import styles from "./LoginForm.module.css";
import Logo from "../Header/HeaderLogo/HeaderLogo";

const mobPng1x = "/images/pill-mob@1x.png";
const mobPng2x = "/images/pill-mob@2x.png";
const mobWebp1x = "/images/pill-mob@1x.webp";
const mobWebp2x = "/images/pill-mob@2x.webp";
const tabPng1x = "/images/pill-tab@1x.png";
const tabPng2x = "/images/pill-tab@2x.png";
const tabWebp1x = "/images/pill-tab@1x.webp";
const tabWebp2x = "/images/pill-tab@2x.webp";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values))
        .unwrap()
        .then(() => navigate("/home"));
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>
            Your medication, delivered Say goodbye to all{" "}
            <span>your healthcare</span> worries with us
          </h2>
          <div className={styles.imgWrapper}>
            {isMobile && (
              <picture>
                <source type="image/webp" srcSet={`${mobWebp1x} 1x, ${mobWebp2x} 2x`} />
                <source type="image/png" srcSet={`${mobPng1x} 1x, ${mobPng2x} 2x`} />
                <img
                  src={mobPng1x}
                  alt="İlaç ilaçlanmış zemin üzerinde tıbbi simgeler"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            )}
            {isTabletOrDesktop && (
              <picture>
                <source type="image/webp" srcSet={`${tabWebp1x} 1x, ${tabWebp2x} 2x`} />
                <source type="image/png" srcSet={`${tabPng1x} 1x, ${tabPng2x} 2x`} />
                <img
                  src={tabPng1x}
                  alt="İlaç ilaçlanmış zemin üzerinde tıbbi simgeler"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            )}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputBox}>
            {["email", "password"].map((field) => (
              <label key={field} htmlFor={field}>
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  name={field}
                  placeholder={field === "email" ? "Email address" : "Password"}
                  onChange={formik.handleChange}
                  value={formik.values[field].trim()}
                />
                {formik.errors[field] && formik.touched[field] && (
                  <span>{formik.errors[field]}</span>
                )}
              </label>
            ))}
          </div>

          <div className={styles.btnBox}>
            <button type="submit" className={styles.submitBtn}>
              Login
            </button>
            <NavLink to="/register">Don't have an account?</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
