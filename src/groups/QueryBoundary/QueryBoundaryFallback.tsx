import type { ReactNode } from "react";

import type { QueryBoundaryErrorProps } from "src/groups/QueryBoundary/QueryBoundaryError";
import type { QueryBoundaryNullableProps } from "src/groups/QueryBoundary/QueryBoundaryNullable";

import QueryBoundaryError from "src/groups/QueryBoundary/QueryBoundaryError";
import QueryBoundaryNullable from "src/groups/QueryBoundary/QueryBoundaryNullable";

export type QueryBoundaryFallbackProps = Omit<QueryBoundaryErrorProps, "children"> & {
  /** The component to show if an error has been thrown. */
  errorComponent?: ReactNode | ((error: unknown) => ReactNode);
} & QueryBoundaryNullableProps;

/**
 * The component responsible for handling both errors and nullable data from `QueryBoundaryProvider`
 */
function QueryBoundaryFallback({
  errorComponent,
  logError,
  ...queryBoundaryNullableProps
}: QueryBoundaryFallbackProps) {
  return (
    <>
      <QueryBoundaryError logError={logError}>{errorComponent}</QueryBoundaryError>
      <QueryBoundaryNullable {...queryBoundaryNullableProps} />
    </>
  );
}

export default QueryBoundaryFallback;
