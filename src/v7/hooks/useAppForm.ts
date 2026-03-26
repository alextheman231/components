import { createFormHook } from "@tanstack/react-form";

import { SubmitButton, TextField } from "src/v7/components";
import { fieldContext, formContext } from "src/v7/hooks/formHooks";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
});

export default useAppForm;
