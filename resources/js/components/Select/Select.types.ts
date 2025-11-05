export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
};
