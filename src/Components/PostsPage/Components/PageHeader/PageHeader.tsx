import React from "react";
import logoIcon from "Components/Common/Icons/logoIcon.png";
import BlankButton from "Components/Common/BlankButton/BlankButton";
import { TEXTS } from "Constants/constants";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  onLogout: () => void;
}

export default function PageHeader(props: PageHeaderProps): React.ReactElement {
  const { onLogout } = props;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWithLogo}>
        <img src={logoIcon} alt="Logo" />
        <span className={styles.headerText}>
          {TEXTS.postsPage.header.title}
        </span>
      </div>

      <BlankButton
        type="button"
        className={styles.logoutButton}
        onClick={onLogout}
      >
        {TEXTS.postsPage.header.logoutButtonText}
      </BlankButton>
    </div>
  );
}
