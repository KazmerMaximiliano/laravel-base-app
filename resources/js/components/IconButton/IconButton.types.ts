import { IconType } from "react-icons";

type ButtonType = 'primary' | 'secondary' | 'solid';

export type ButtonProps = {
  type?: ButtonType;
  onClick?: () => void;
  icon: IconType;
  disabled?: boolean;
};
