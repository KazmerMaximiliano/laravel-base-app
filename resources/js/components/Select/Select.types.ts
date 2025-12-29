export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  onChange?: (value: string) => void;
};
