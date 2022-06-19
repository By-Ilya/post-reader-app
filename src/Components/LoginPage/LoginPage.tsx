import React from "react";
import { useAuthContext } from "Contexts/AuthContext";
import { TEXTS, EMPTY_STRING } from "Constants/constants";
import InputField from "Components/Common/InputField/InputField";
import BlankButton from "Components/Common/BlankButton/BlankButton";
import styles from "./LoginPage.module.css";

export default function LoginPage(): React.ReactElement {
  const { doLogin, authErrorMessage } = useAuthContext();

  const nameRef: React.RefObject<HTMLInputElement> =
    React.createRef<HTMLInputElement>();
  const emailRef: React.RefObject<HTMLInputElement> =
    React.createRef<HTMLInputElement>();

  const handleOnClickGo = (): void => {
    if (nameRef.current?.checkValidity() && emailRef.current?.checkValidity()) {
      doLogin(
        nameRef.current?.value || EMPTY_STRING,
        emailRef.current?.value || EMPTY_STRING
      );
    }
  };

  return (
    <form className={styles.loginContainer}>
      <span className={styles.loginHeader}>Login</span>

      <InputField
        label={TEXTS.loginPage.nameField.title}
        placeholder={TEXTS.loginPage.nameField.placeholder}
        value={nameRef.current?.value}
        type="text"
        required
        ref={nameRef}
      />
      <InputField
        label={TEXTS.loginPage.emailField.title}
        placeholder={TEXTS.loginPage.emailField.placeholder}
        value={emailRef.current?.value}
        type="email"
        required
        ref={emailRef}
      />

      <div className={styles.loginButtonContainer}>
        <BlankButton
          type="submit"
          title={TEXTS.loginPage.loginButton.tooltip}
          className={styles.loginButton}
          onClick={handleOnClickGo}
        >
          {TEXTS.loginPage.loginButton.text}
        </BlankButton>
      </div>

      <div
        className={styles.errorContainer}
        style={{ visibility: authErrorMessage ? "visible" : "hidden" }}
      >
        {authErrorMessage}
      </div>
    </form>
  );
}
