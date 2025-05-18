import clsx from "clsx";
import styles from "./Section.module.css";

const Section = ({ children, className }) => {
  const resolvedClassName = styles[className] || className;

  return (
    <div className={clsx(styles.section, resolvedClassName)}>{children}</div>
  );
};

export default Section;
