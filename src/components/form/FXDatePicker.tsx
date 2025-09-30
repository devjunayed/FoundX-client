import { IInput } from "@/src/types";
import { DatePicker } from "@heroui/date-picker";
import { Controller } from "react-hook-form";

interface IProps extends IInput {}

const FXDatePicker = ({ label, name, variant="bordered" }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => {
        return (
          <DatePicker variant={variant} label={label} {...field} className="min-w-[255px]" />
        );
      }}
    />
  );
};

export default FXDatePicker;
