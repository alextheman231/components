import type { TextFieldProps as MUITextFieldProps } from "@mui/material/TextField";

import MUITextField from "@mui/material/TextField";

import { useFieldContext } from "src/v7/hooks";

/**
 * A text field component for use with TanStack Form's app form pattern. Must be used in a `<form.AppField />` context.
 *
 * This should be initialised in your app form in the following way:
 *
 * ```typescript
 *  const { useAppForm } = createFormHook({
 *     fieldContext,
 *     formContext,
 *     fieldComponents: {
 *       TextField,
 *     },
 *   });
 * ```
 * And then used as such:
 *
 * ```tsx
 * <form.AppField name="firstName">
 *   {(field) => {
 *      return <field.TextField />
 *    }}
 * </form.AppField>
 * <form.AppForm>
 *   <form.SubmitButton />
 * </form.AppForm>
 * ```
 */
function TextField(props: MUITextFieldProps) {
  const field = useFieldContext();

  return (
    <MUITextField
      {...props}
      error={field.state.meta.errors.length !== 0}
      type="text"
      value={field.state.value}
      onChange={(event) => {
        return field.handleChange(event.target.value);
      }}
      onBlur={field.handleBlur}
      placeholder={field.name}
      helperText={field.state.meta.errors[0] ?? ""}
    />
  );
}

export default TextField;
