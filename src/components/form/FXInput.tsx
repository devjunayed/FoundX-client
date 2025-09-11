import { Input } from '@heroui/input';
import { useFormContext } from 'react-hook-form';

interface IProps{
    variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
    size?: 'sm' | 'md' | 'lg';
    required?: boolean
    type?: string;
    label: string;
    name: string;
}

const FXInput = ({
    variant = "bordered",
    size = "md",
    required = false,
    label,
    name
}: IProps) => {
    const {register} = useFormContext();
  return (
    <Input
        {...register(name)}
        variant={variant}
        size={size}
        required={required}
        label={label}
    />
  )
}

export default FXInput