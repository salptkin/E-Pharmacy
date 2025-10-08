import React from "react";
import RegisterButton from "./RegisterButton/RegisterButton";
import LoginButton from "./LoginButton/LoginButton";
import LogoutButton from "./LogoutButton/LogoutButton";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import styles from "./Links.module.css";

const Links = ({ pageType }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={styles.wrapper}>
      {isLoggedIn ? (
        <LogoutButton pageType={pageType} />
      ) : (
        <>
          <RegisterButton pageType={pageType} />
          <LoginButton pageType={pageType} />
        </>
      )}
    </div>
  );
};

export default Links;
