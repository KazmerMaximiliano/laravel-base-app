import "./IconButton.styles.css";
import { ButtonProps } from "./IconButton.types";

export const IconButton = ({
  icon: Icon,
  type = "primary",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`icon-button icon-button--${type}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={16} />
    </button>
  );
};
