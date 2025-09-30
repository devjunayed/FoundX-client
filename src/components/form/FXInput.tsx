"use client"
import { IInput } from '@/src/types';
import { Input } from '@heroui/input';
import { useFormContext } from 'react-hook-form';

interface IProps extends IInput {}

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