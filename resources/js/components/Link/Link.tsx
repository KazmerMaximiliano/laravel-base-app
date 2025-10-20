import "./Link.styles.css";
import { LinkProps } from "./Link.types";

export const Link = ({ label, type = "primary", href = "#" }: LinkProps) => {
  return (
    <a className={`link link--${type}`} href={href}>
      {label}
    </a>
  );
};
