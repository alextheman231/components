import type { ReactNode } from "react";

import type { QueryBoundaryErrorProps } from "src/QueryBoundary/QueryBoundaryError";
import type { QueryBoundaryNullableProps } from "src/QueryBoundary/QueryBoundaryNullable";

import QueryBoundaryError from "src/QueryBoundary/QueryBoundaryError";
import QueryBoundaryNullable from "src/QueryBoundary/QueryBoundaryNullable";

export type QueryBoundaryFallbackProps = Omit<QueryBoundaryErrorProps, "children"> & {
  /** The component to show if an error has been thrown. */
  errorFallback?: ReactNode | ((error: unknown) => ReactNode);
} & QueryBoundaryNullableProps;

/**
 * The component responsible for handling both errors and nullable data from `QueryBoundaryProvider`
 */
function QueryBoundaryFallback({
  errorFallback,
  logError,
  ...queryBoundaryNullableProps
}: QueryBoundaryFallbackProps) {
  return (
    <>
      <QueryBoundaryError logError={logError}>{errorFallback}</QueryBoundaryError>
      <QueryBoundaryNullable {...queryBoundaryNullableProps} />
    </>
  );
}

export default QueryBoundaryFallback;
