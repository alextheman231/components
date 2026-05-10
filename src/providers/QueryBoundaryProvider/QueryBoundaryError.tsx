import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import { useRef } from "react";

import { useQueryBoundary } from "src/providers/QueryBoundaryProvider/QueryBoundaryProvider";

export interface QueryBoundaryErrorProps {
  /** The component to show if an error has been thrown. */
  children?: ReactNode | ((error: unknown) => ReactNode);
  /** An option to log the error to the console. */
  logError?: boolean;
}

/**
 * The component responsible for showing any errors provided by QueryBoundaryProvider.
 */
function QueryBoundaryError({ children, logError: propsLogError }: QueryBoundaryErrorProps) {
  const {
    data,
    error,
    errorComponent: contextErrorComponent,
    logError: contextLogError,
  } = useQueryBoundary();
  const logError = propsLogError ?? contextLogError;
  const warnedOnce = useRef(false);

  const errorComponent = children ?? contextErrorComponent;

  if (error) {
    if (logError && !warnedOnce.current) {
      if (data !== null && data !== undefined) {
        console.error(
          "An error has occurred but data is still present. This may indicate an invalid query state.",
          { data, error },
        );
      }
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

  return null;
}

export default QueryBoundaryError;
