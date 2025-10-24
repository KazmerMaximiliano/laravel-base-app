import "./Input.styles.css";
import { InputProps } from "./Input.types";

export const Input = ({
  name,
  defaultValue,
  placeholder,
  error,
  onChange,
}: InputProps) => {
  return (
    <div className="input-wrapper">
      <input
        className="input"
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div className="input-error">{error}</div>
    </div>
  );
};
