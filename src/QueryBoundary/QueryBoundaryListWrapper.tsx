import type { ReactNode } from "react";

import type { QueryBoundaryDataMapProps } from "src/QueryBoundary/QueryBoundaryDataMap";
import type { QueryBoundaryErrorProps } from "src/QueryBoundary/QueryBoundaryError";

import createListQueryBoundary from "src/QueryBoundary/creators/createListQueryBoundary";

export type QueryBoundaryListWrapperProps<ItemType> = Omit<QueryBoundaryErrorProps, "children"> & {
  errorFallback?: ReactNode;
} & QueryBoundaryDataMapProps<ItemType>;

/**
 * An in-line component that handles an array of data provided by `QueryBoundaryProvider`.
 *
 * This may be used over `createListQueryBoundary` if you don't require as much control over the placement of the error message and data display.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryListWrapper<ItemType>({
  logError,
  errorFallback,
  isLoading,
  error,
  data,
  ...queryBoundaryDataMapProps
}: QueryBoundaryListWrapperProps<ItemType>) {
  const QueryBoundary = createListQueryBoundary({ query: { isLoading, error, data } });

  return (
    <>
      <QueryBoundary.Error logError={logError}>{errorFallback}</QueryBoundary.Error>
      <QueryBoundary.DataMap {...queryBoundaryDataMapProps} />
    </>
  );
}

export default QueryBoundaryListWrapper;
