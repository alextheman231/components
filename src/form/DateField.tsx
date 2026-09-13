import type { TextFieldProps } from "@mui/material/TextField";
import type { Locale } from "date-fns";

import { omitProperties } from "@alextheman/utility";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { formatISO, parseISO } from "date-fns";

import { useFieldContext } from "src/form/formHooks";

export interface DateFieldPropsBase {
  locale?: Locale;
}

export type DateFieldProps = DateFieldPropsBase & TextFieldProps;

/**
 * A date field component for use with TanStack Form's app form pattern. Must be used in a `<form.AppField />` context.
 *
 * This should be initialised in your app form in the following way:
 *
 * ```typescript
 *  const { useAppForm } = createFormHook({
 *     fieldContext,
 *     formContext,
 *     fieldComponents: {
 *       DateField,
 *     },
 *   });
 * ```
 * And then used as such:
 *
 * ```tsx
 * <form.AppField name="dateOfBirth">
 *   {(field) => {
 *      return <field.DateField />
 *    }}
 * </form.AppField>
 * <form.AppForm>
 *   <form.SubmitButton />
 * </form.AppForm>
 * ```
 */
function DateField({ locale, label, fullWidth, required, ...props }: DateFieldProps) {
  const field = useFieldContext();

  let value = null;
  if (field.state.value instanceof Date) {
    // eslint-disable-next-line prefer-destructuring -- It won't work here as value is a mutable variable assigned above.
    value = field.state.value;
  } else if (field.state.value === "") {
    value = null;
  } else if (typeof field.state.value === "string" && field.state.value !== "") {
    value = parseISO(field.state.value);
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{
        fieldMonthPlaceholder: (params) => {
          return params.contentType === "letter" ? "MM" : params.format;
        },
      }}
      adapterLocale={locale}
    >
      <DatePicker
        format="d MMMM yyyy"
        name={field.name}
        onChange={(newValue) => {
          if (newValue === null) {
            field.handleChange("");
          } else {
            field.handleChange(formatISO(newValue, { representation: "date" }));
          }
        }}
        label={label}
        slotProps={{
          textField: {
            fullWidth,
            error: field.state.meta.errors[0] !== undefined,
            helperText: field.state.meta.errors[0] ?? "",
            required,
          },
        }}
        {...omitProperties(props, ["slotProps", "onError", "slots", "onChange", "defaultValue"])}
        value={value}
      />
    </LocalizationProvider>
  );
}

export default DateField;
