"use client"
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
    const {register, formState: {errors}} = useFormContext();
    console.log(errors)
  return (
    <Input
        {...register(name)}
        variant={variant}
        size={size}
        required={required}
        label={label}
        isInvalid={!!errors[name]}
        errorMessage={ errors[name] ? errors[name].message as string : "" }
    />
  )
}

export default FXInput