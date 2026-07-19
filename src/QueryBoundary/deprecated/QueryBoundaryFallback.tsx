import type { ReactNode } from "react";

import type { QueryBoundaryNullableProps } from "src/QueryBoundary/deprecated/QueryBoundaryNullable";
import type { QueryBoundaryErrorProps } from "src/QueryBoundary/QueryBoundaryError";

import QueryBoundaryNullable from "src/QueryBoundary/deprecated/QueryBoundaryNullable";
import QueryBoundaryError from "src/QueryBoundary/QueryBoundaryError";

export type QueryBoundaryFallbackProps = Omit<QueryBoundaryErrorProps, "children"> & {
  /** The component to show if an error has been thrown. */
  errorFallback?: ReactNode | ((error: unknown) => ReactNode);
} & QueryBoundaryNullableProps;

/**
 * The component responsible for handling both errors and nullable data.
 *
 * @deprecated Please use `QueryBoundaryError` and/or the `undefinedFallback`, `nullFallback`, and `nullableFallback` props on the `QueryBoundaryData`, `QueryBoundaryDataMap`, and `QueryBoundaryValue` components instead.
 */
function QueryBoundaryFallback({
  errorFallback,
  logError,
  data,
  isLoading,
  error,
  ...props
}: QueryBoundaryFallbackProps) {
  return (
    <>
      <QueryBoundaryError data={data} error={error} logError={logError}>
        {errorFallback}
      </QueryBoundaryError>
      <QueryBoundaryNullable data={data} isLoading={isLoading} error={error} {...props} />
    </>
  );
}

export default QueryBoundaryFallback;
