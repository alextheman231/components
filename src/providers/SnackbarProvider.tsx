import type { OptionalOnCondition } from "@alextheman/utility";
import type { AlertColor } from "@mui/material/Alert";
import type { ReactNode } from "react";

import type { ContextHookOptions } from "src/types";

import { DataError } from "@alextheman/utility/v6";
import { createContext, use, useState } from "react";

export interface SnackbarProviderProps {
  /** The children that will have access to the snackbar context. */
  children: ReactNode;
  /** The amount of seconds to wait before hiding the snackbar. */
  autoHideDuration?: number;
}

export interface SnackbarItem {
  /** The ID of the Snackbar */
  id: string;
  /** The severity of the alert. This defines the color and icon used. */
  severity?: AlertColor;
  /** The message to show as part of the snackbar. */
  message: string;
  /** The amount of milliseconds to show the snackbar for. */
  duration: number;
}

export interface AddSnackbarOptions {
  severity?: AlertColor;
  duration?: number;
}
export interface SnackbarContextValue {
  /** An array of all the snackbars to render. */
  snackbars: Array<SnackbarItem>;
  /** A function that adds the snackbar to the page. */
  addSnackbar: (message: string, options?: AddSnackbarOptions) => void;
  /** A function to remove a snackbar. */
  removeSnackbar: (id?: string) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

/** Access the snackbar context directly. */
export function useSnackbar<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, SnackbarContextValue> {
  const context = use(SnackbarContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "SNACKBAR_PROVIDER_NOT_FOUND",
      "Could not find the SnackbarProvider context. Please double-check that it is present.",
    );
  }
  return context as OptionalOnCondition<Strict, SnackbarContextValue>;
}

/** Provides an array of snackbars for the `Snackbars` component to display. */
function SnackbarProvider({ children, autoHideDuration = 5000 }: SnackbarProviderProps) {
  const [snackbars, setSnackbars] = useState<Array<SnackbarItem>>([]);

  function addSnackbar(message: string, options: AddSnackbarOptions = {}) {
    const { severity = "info", duration = autoHideDuration } = options;
    setSnackbars((previous) => {
      return [
        ...previous,
        {
          severity,
          id: crypto.randomUUID(),
          message,
          duration,
        },
      ];
    });
  }

  function removeSnackbar(id?: string) {
    setSnackbars((previous) => {
      const newSnackbars = [...previous];
      if (id === undefined) {
        newSnackbars.shift();
        return newSnackbars;
      }

      return newSnackbars.filter((snackbar) => {
        return snackbar.id !== id;
      });
    });
  }

  return (
    <SnackbarContext value={{ snackbars, addSnackbar, removeSnackbar }}>{children}</SnackbarContext>
  );
}

export default SnackbarProvider;
