export interface MultiSelectProps {
  name: string;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
}
