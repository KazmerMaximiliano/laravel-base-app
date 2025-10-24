import "./Button.styles.css";
import { ButtonProps } from "./Button.types";

export const Button = ({
  label,
  type = "primary",
  submit = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`button button--${type}`}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {label}
    </button>
  );
};
