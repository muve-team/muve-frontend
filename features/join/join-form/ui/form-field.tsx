// features/join/join-form/ui/form-field.tsx
import { Input } from '@/components/ui/merged/Input';
import { Label } from '@/components/ui/merged/Label';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
};
