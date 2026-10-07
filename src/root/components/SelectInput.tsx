import type { SelectProps } from "@mui/material/Select";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useId } from "react";

export interface SelectOption<ValueType extends string = string> {
  value: ValueType;
  label?: string;
}

export interface SelectInputPropsBase<ValueType extends string = string> {
  options: Array<SelectOption<ValueType>>;
  onChange: (value: ValueType) => void | Promise<void>;
}

export type SelectInputProps<ValueType extends string = string> = SelectInputPropsBase<ValueType> &
  Omit<SelectProps<ValueType>, "onChange">;

/** Renders an input associated with a list of items to choose from. */
function SelectInput<ValueType extends string = string>({
  fullWidth,
  label,
  options,
  labelId,
  onChange,
  ...props
}: SelectInputProps<ValueType>) {
  const potentialInputId = useId();
  const inputId = labelId ?? potentialInputId;

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={inputId}>{label}</InputLabel>
      <Select<ValueType>
        {...props}
        labelId={inputId}
        onChange={(event) => {
          onChange(event.target.value as ValueType);
        }}
        label={label}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label ?? option.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
