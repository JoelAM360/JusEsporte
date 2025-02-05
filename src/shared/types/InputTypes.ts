export interface IInputProps {
  label?: string;
  value: string;
  type?: string;
  withLabel?: boolean;
  placeholder: string;
  onChange: (newValue: string) => void;
}