type ButtonType = 'primary' | 'secondary' | 'solid' | 'danger';

export type ButtonProps = {
  label: string;
  type?: ButtonType;
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};
