import "./Button.styles.css";
import { ButtonProps } from "./Button.types";

export const Button = ({ label, type = "primary", onClick }: ButtonProps) => {
  return (
    <button className={`button button--${type}`} onClick={onClick}>
      {label}
    </button>
  );
};
