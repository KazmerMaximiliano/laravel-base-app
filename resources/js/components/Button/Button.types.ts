type ButtonType = 'primary' | 'secondary' | 'solid';

export type ButtonProps = {
  type?: ButtonType;
  onClick?: () => void;
  label: string;
  submit?: boolean;
};
