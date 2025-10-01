"use client"
import { IInput } from '@/src/types';
import {  Textarea } from '@heroui/input';
import { useFormContext } from 'react-hook-form';

interface IProps extends IInput {}

const FXTextArea = ({
    variant = "bordered",
    size = "md",
    required = false,
    label,
    name
}: IProps) => {
    const {register, formState: {errors}} = useFormContext();
    console.log(errors)
  return (
    <Textarea

        {...register(name)}
        variant={variant}
        minRows={6}
        size={size}
        required={required}
        label={label}
        isInvalid={!!errors[name]}
        errorMessage={ errors[name] ? errors[name].message as string : "" }
    />
  )
}

export default FXTextArea