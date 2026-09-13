import type { ComponentType } from "react";

import { omitProperties } from "@alextheman/utility";
import { createFormHook as createTanstackFormHook } from "@tanstack/react-form";

import DateField from "src/form/DateField";
import { fieldContext, formContext } from "src/form/formHooks";
import SubmitButton from "src/form/SubmitButton";
import TextField from "src/form/TextField";

export interface AlexFieldComponents {
  TextField: typeof TextField;
  DateField: typeof DateField;
}

export interface AlexFormComponents {
  SubmitButton: typeof SubmitButton;
}

/** Create the hooks for your app form with `@tanstack/react-form` using our default configuration. */
function createFormHook<
  FieldComponents extends Record<string, ComponentType<any>> = Record<string, never>,
  FormComponents extends Record<string, ComponentType<any>> = Record<string, never>,
>(
  options?: Partial<
    Omit<Parameters<typeof createTanstackFormHook>[0], "formComponents" | "fieldComponents"> & {
      fieldComponents?: FieldComponents;
      formComponents?: FormComponents;
    }
  >,
): ReturnType<
  typeof createTanstackFormHook<
    AlexFieldComponents & FieldComponents,
    AlexFormComponents & FormComponents
  >
> {
  return createTanstackFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      TextField,
      DateField,
      ...options?.fieldComponents,
    } as AlexFieldComponents & FieldComponents,
    formComponents: {
      SubmitButton,
      ...options?.formComponents,
    } as AlexFormComponents & FormComponents,
    ...omitProperties(options ?? {}, ["formComponents", "fieldComponents"]),
  });
}

export default createFormHook;
