import type { ButtonProps } from "@mui/material/Button";

import Button from "@mui/material/Button";

import { useFormContext } from "src/v7/hooks";

export interface SubmitButtonProps extends Omit<ButtonProps, "type"> {
  /** An option to disable the button on submit if the form is not dirty. */
  disableClean?: boolean;
  /** The label for the button. */
  label?: string;
}

/**
 * A Submit Button for use with TanStack Form's app form pattern. Must be used in a `<form.AppForm />` context.
 *
 * This should be initialised in your app form in the following way:
 *
 * ```typescript
 *  const { useAppForm } = createFormHook({
 *     fieldContext,
 *     formContext,
 *     formComponents: {
 *       SubmitButton,
 *     },
 *   });
 * ```
 * And then used as such:
 *
 * ```tsx
 * <form.AppField>
 *   ...
 * </form.AppField>
 * <form.AppForm>
 *   <form.SubmitButton />
 * </form.AppForm>
 * ```
 */
function SubmitButton({ disableClean, label = "Submit", ...buttonProps }: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <Button
      color="primary"
      disabled={buttonProps.disabled || (disableClean && !form.state.isDirty)}
      loading={form.state.isSubmitting}
      type="submit"
      variant="contained"
      {...buttonProps}
    >
      {label}
    </Button>
  );
}

export default SubmitButton;
