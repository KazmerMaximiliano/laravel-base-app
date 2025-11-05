export interface MultiSelectProps {
  name: string;
  placeholder?: string;
  error?: string;
  options: { value: string; label: string }[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
}
