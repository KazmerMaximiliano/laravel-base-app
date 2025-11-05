type ButtonType = 'primary' | 'secondary' | 'solid' | 'danger';

export type ButtonProps = {
  type?: ButtonType;
  onClick?: () => void;
  label: string;
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
};
