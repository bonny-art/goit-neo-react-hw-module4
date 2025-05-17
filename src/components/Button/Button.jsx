import { clsx } from "clsx";

import styles from "./Button.module.css";

const Button = ({ children, style = "default", type, onClick }) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[style])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
