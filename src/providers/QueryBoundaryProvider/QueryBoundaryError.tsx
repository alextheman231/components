import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import { useRef } from "react";

import { useQueryBoundary } from "src/providers/QueryBoundaryProvider/QueryBoundaryProvider";

export interface QueryBoundaryErrorBaseProps {
  /** The component to show if an error has been thrown. */
  children?: ReactNode | ((error: unknown) => ReactNode);
  /** An option to log the error to the console. */
  logError?: boolean;
}

export interface QueryBoundaryErrorPropsWithUndefinedOrNull extends QueryBoundaryErrorBaseProps {
  /** The component to show if no error was thrown but data is undefined */
  undefinedComponent?: ReactNode;
  /** The component to show if no error was thrown but data is null */
  nullComponent?: ReactNode;
  nullableComponent?: never;
}

export interface QueryBoundaryErrorPropsWithNullable extends QueryBoundaryErrorBaseProps {
  undefinedComponent?: never;
  nullComponent?: never;
  /** The component to show if no error was thrown but data is undefined or null */
  nullableComponent?: ReactNode;
}

export type QueryBoundaryErrorProps =
  | QueryBoundaryErrorPropsWithUndefinedOrNull
  | QueryBoundaryErrorPropsWithNullable;

/**
 * The component responsible for showing any errors provided by QueryBoundaryProvider.
 */
function QueryBoundaryError({
  children,
  undefinedComponent,
  nullComponent,
  nullableComponent,
  logError: propsLogError,
}: QueryBoundaryErrorProps) {
  const {
    isLoading,
    data,
    error,
    errorComponent: contextErrorComponent,
    logError: contextLogError,
  } = useQueryBoundary();
  const logError = propsLogError ?? contextLogError;
  const warnedOnce = useRef(false);

  const errorComponent = children ?? contextErrorComponent;

  if (data !== null && data !== undefined) {
    return null;
  }

  if (error) {
    if (logError && !warnedOnce.current) {
      console.error(error);
      warnedOnce.current = true;
    }
    if (typeof errorComponent === "function") {
      return errorComponent(error);
    }
    if (errorComponent) {
      return <>{errorComponent}</>;
    }

    return (
      <Alert severity="error">
        {typeof error === "object" && "message" in error && typeof error.message === "string"
          ? error.message
          : "An unknown error has occured. Please try again later."}
      </Alert>
    );
  }

  if (!isLoading && (data === null || data === undefined)) {
    if (nullableComponent) {
      if (logError && !warnedOnce.current) {
        console.error("Data is nullable after loading.");
        warnedOnce.current = true;
      }
      return <>{nullableComponent}</>;
    }

    if (data === undefined) {
      if (logError && !warnedOnce.current) {
        console.error(
          "Data is undefined after loading. This could either be an issue with the query or you have not passed in the data to QueryBoundaryProvider. Please double-check that you have provided data.",
        );
        warnedOnce.current = true;
      }

      if (undefinedComponent) {
        return <>{undefinedComponent}</>;
      }
    }

    if (data === null) {
      if (logError && !warnedOnce.current) {
        console.error("Data is null after loading.");
        warnedOnce.current = true;
      }

      if (nullComponent) {
        return <>{nullComponent}</>;
      }
    }

    return <Alert severity="error">Failed to load data. Please try again later.</Alert>;
  }

  return null;
}

export default QueryBoundaryError;
