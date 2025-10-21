import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations";
import { registerSchema } from "../../schemas/schemas";
import styles from "./RegisterForm.module.css";
import Logo from "../Header/HeaderLogo/HeaderLogo";

const usualMob = "/images/pill-mob@1x.png";
const retinaMob = "/images/pill-mob@2x.png";
const usualTab = "/images/pill-tab@1x.png";
const retinaTab = "/images/pill-tab@2x.png";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

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
    initialValues: { name: "", email: "", phone: "", password: "" },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerThunk(values))
        .unwrap()
        .then(() => navigate("/login"));
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
              <img
                srcSet={`${usualMob} 1x, ${retinaMob} 2x`}
                alt="illustration"
              />
            )}
            {isTabletOrDesktop && (
              <img
                srcSet={`${usualTab} 1x, ${retinaTab} 2x`}
                alt="illustration"
              />
            )}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputBox}>
            {["name", "email", "phone", "password"].map((field) => (
              <label key={field} htmlFor={field}>
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  name={field}
                  placeholder={
                    field === "name"
                      ? "User Name"
                      : field === "email"
                      ? "Email address"
                      : field === "phone"
                      ? "+90 5XX XXX XX XX"
                      : "Password"
                  }
                  onChange={field === "phone" ? handlePhoneChange : formik.handleChange}
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
              Register
            </button>
            <NavLink to="/login">Already have an account?</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
