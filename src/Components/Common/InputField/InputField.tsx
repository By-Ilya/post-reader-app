import React from "react";
import classNames from "classnames";
import styles from "./InputField.module.css";

interface InputFieldProps {
  label?: string;
  className?: string;
}

type Props = React.InputHTMLAttributes<HTMLInputElement> & InputFieldProps;

const InputField = React.forwardRef(
  (
    props: Props,
    ref: React.ForwardedRef<HTMLInputElement>
  ): React.ReactElement => {
    const { label, className } = props;

    const textFieldClassName: string = classNames(styles.inputField, className);

    return (
      <div className={styles.inputContainer}>
        {label !== undefined && (
          <span className={styles.inputLabel}>{label}</span>
        )}
        <input {...props} className={textFieldClassName} ref={ref} />
      </div>
    );
  }
);

InputField.defaultProps = {
  label: undefined,
  className: undefined,
};

export default InputField;
