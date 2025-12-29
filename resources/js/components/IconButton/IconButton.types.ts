import { IconType } from "react-icons";

type ButtonType = 'primary' | 'secondary' | 'solid';

export type ButtonProps = {
  icon: IconType;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
};
