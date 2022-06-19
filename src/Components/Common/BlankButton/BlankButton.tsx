import React from "react";
import classNames from "classnames";
import styles from "./BlankButton.module.css";

interface BlankButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & BlankButtonProps;

export default function BlankButton(props: Props): React.ReactElement {
  const { className } = props;

  const blankButtonClassName = classNames(styles.buttonContainer, className);

  return (
    <button {...props} className={blankButtonClassName}>
      {props.children}
    </button>
  );
}

BlankButton.defaultProps = { className: undefined, type: "button" };
