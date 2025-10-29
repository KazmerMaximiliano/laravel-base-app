export type InputProps = {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  onChange?: (value: string) => void;
};
