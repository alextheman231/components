import { omitProperties } from "@alextheman/utility";
import { createFormHook as createTanstackFormHook } from "@tanstack/react-form";

import { SubmitButton, TextField } from "src/v7/components";
import { fieldContext, formContext } from "src/v7/hooks/formHooks";

/** Create the hooks for your app form with `@tanstack/react-form` using our default configuration. */
function createFormHook(options?: Partial<Parameters<typeof createTanstackFormHook>[0]>) {
  return createTanstackFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      TextField,
      ...options?.fieldComponents,
    },
    formComponents: {
      SubmitButton,
      ...options?.formComponents,
    },
    ...omitProperties(options ?? {}, ["formComponents", "fieldComponents"]),
  });
}

export default createFormHook;
