import "./Input.styles.css";
import { InputProps } from "./Input.types";

export const Input = ({
  name,
  defaultValue,
  placeholder,
  error,
  type = "text",
  onChange,
}: InputProps) => {
  return (
    <div className="input-wrapper">
      <input
        className="input"
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div className="input-error">{error}</div>
    </div>
  );
};
