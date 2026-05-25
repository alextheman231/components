import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import { useRef } from "react";

import { useQueryBoundary } from "src/QueryBoundary/QueryBoundaryProvider";

export interface QueryBoundaryErrorProps {
  /** The component to show if an error has been thrown. */
  children?: ReactNode | ((error: unknown) => ReactNode);
  /** An option to log the error to the console. */
  logError?: boolean;
}

/**
 * The component responsible for showing any errors provided by QueryBoundaryProvider.
 */
function QueryBoundaryError({ children, logError }: QueryBoundaryErrorProps) {
  const { data, error } = useQueryBoundary();
  const warnedOnceRef = useRef(false);

  if (error) {
    if (logError && !warnedOnceRef.current) {
      if (data !== null && data !== undefined) {
        console.error(
          "An error has occurred but data is still present. This may indicate an invalid query state.",
          { data, error },
        );
      } else {
        console.error(error);
      }
      warnedOnceRef.current = true;
    }
    if (typeof children === "function") {
      return children(error);
    }
    if (children !== undefined) {
      return <>{children}</>;
    }

    return (
      <Alert severity="error">
        {typeof error === "object" && "message" in error && typeof error.message === "string"
          ? error.message
          : "An unknown error has occured."}
      </Alert>
    );
  }

  return null;
}

export default QueryBoundaryError;
