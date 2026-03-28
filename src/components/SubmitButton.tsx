import type { ButtonProps } from "@mui/material/Button";

import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";

export interface SubmitButtonProps extends Omit<ButtonProps, "type"> {
  /** An option to disable the button on submit if the form is not dirty. */
  disableClean?: boolean;
  /** The label for the button. */
  label: string;
}

/**
 * A Submit Button for use with `react-hook-form`.
 *
 * Note that this is planned to eventually be deprecated and replaced with a newer version of `SubmitButton` that is instead compatible with `@tanstack/react-form`.
 */
function SubmitButton({ disableClean, label, ...buttonProps }: SubmitButtonProps) {
  const {
    formState: { disabled: formDisabled, isDirty, isSubmitting },
  } = useFormContext();

  return (
    <Button
      color="primary"
      disabled={buttonProps.disabled || (disableClean && !isDirty) || formDisabled}
      loading={isSubmitting}
      type="submit"
      variant="contained"
      {...buttonProps}
    >
      {label}
    </Button>
  );
}

export default SubmitButton;
