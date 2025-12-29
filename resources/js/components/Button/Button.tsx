import { BeatLoader } from "react-spinners";
import { colorAliases } from "../../styles/colors";
import "./Button.styles.css";
import { ButtonProps } from "./Button.types";

export const Button = ({
  label,
  type = "primary",
  submit = false,
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`button button--${type}`}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      disabled={disabled || loading}
    >
      {loading ? (
        <BeatLoader
          speedMultiplier={0.5}
          color={
            type === "solid" || type === "danger"
              ? colorAliases.bgPrimary
              : colorAliases.primaryColor
          }
        />
      ) : (
        label
      )}
    </button>
  );
};
