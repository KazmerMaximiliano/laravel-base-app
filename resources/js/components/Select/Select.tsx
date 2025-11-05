import "./Select.styles.css";
import { SelectProps } from "./Select.types";

export const Select = ({
  name,
  defaultValue,
  placeholder,
  error,
  options,
  onChange,
}: SelectProps) => {
  return (
    <div className="select-wrapper">
      <div className="select-container">
        <select
          className="select"
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="select-error">{error}</div>
    </div>
  );
};
