import "./Checkbox.styles.css";
import { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({ name, checked, onChange }: CheckboxProps) => {
  return (
    <input
      className="checkbox"
      type="checkbox"
      name={name}
      onChange={(e) => onChange?.(e.target.checked)}
      checked={checked}
      readOnly
    />
  );
};
