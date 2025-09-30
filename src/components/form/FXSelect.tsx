import { IInput } from "@/src/types";
import { Select } from "@heroui/react";
import { SelectItem } from "@heroui/select";
import { useFormContext } from "react-hook-form";

interface ISelect extends IInput {
    options: {
        key: string
        label: string
    }[]
}

const FXSelect = ({ name, label, variant = "bordered", options }: ISelect) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Select
        variant={variant}
        {...register(name)}
        className="min-w-xs"
        label={label}
      >
        {options.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </>
  );
};

export default FXSelect;
