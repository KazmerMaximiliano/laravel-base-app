type ButtonType = 'primary' | 'secondary';

export type ButtonProps = {
  type?: ButtonType;
  onClick?: () => void;
  label: string;
};
