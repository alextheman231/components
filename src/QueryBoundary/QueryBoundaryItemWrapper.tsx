import type { ReactNode } from "react";

import type { QueryBoundaryDataProps } from "src/QueryBoundary/QueryBoundaryData";
import type { QueryBoundaryErrorProps } from "src/QueryBoundary/QueryBoundaryError";

import createItemQueryBoundary from "src/QueryBoundary/creators/createItemQueryBoundary";

export type QueryBoundaryItemWrapperProps<DataType> = Omit<QueryBoundaryErrorProps, "children"> & {
  errorFallback?: ReactNode;
} & QueryBoundaryDataProps<DataType>;

/**
 * An in-line component that deals with state management when fetching data from an API.
 * This may be used over `createItemQueryBoundary` if you don't require as much control over the placement of the error message and data display.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryItemWrapper<DataType>({
  errorFallback,
  logError,
  isLoading,
  error,
  data,
  ...queryBoundaryDataProps
}: QueryBoundaryItemWrapperProps<DataType>) {
  const QueryBoundary = createItemQueryBoundary({ query: { isLoading, error, data } });

  return (
    <>
      <QueryBoundary.Error logError={logError}>{errorFallback}</QueryBoundary.Error>
      <QueryBoundary.Data {...queryBoundaryDataProps} />
    </>
  );
}

export default QueryBoundaryItemWrapper;
