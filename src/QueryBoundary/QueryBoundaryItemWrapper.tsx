import type { ReactNode } from "react";

import type { QueryBoundaryDataProps } from "src/QueryBoundary/QueryBoundaryData";
import type { QueryBoundaryFallbackProps } from "src/QueryBoundary/QueryBoundaryFallback";
import type { QueryBoundaryContextValue } from "src/QueryBoundary/QueryBoundaryProvider";

import CircularProgress from "@mui/material/CircularProgress";

import createItemQueryBoundary from "src/QueryBoundary/creators/createItemQueryBoundary";

export type QueryBoundaryItemWrapperProps<DataType> = QueryBoundaryContextValue<DataType> &
  QueryBoundaryFallbackProps &
  QueryBoundaryDataProps<DataType>;

/**
 * An in-line component that deals with state management when fetching data from an API.
 * This may be used over QueryBoundaryProvider if you don't require as much control over the placement of the error message and data display.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryItemWrapper<DataType>({
  children,
  errorFallback,
  undefinedFallback,
  nullFallback,
  nullableFallback,
  logError,
  loadingFallback = <CircularProgress />,
  isLoading,
  error,
  data,
  dataParser,
}: QueryBoundaryItemWrapperProps<DataType>) {
  const QueryBoundary = createItemQueryBoundary({ query: { isLoading, error, data } });

  let boundaryFallbackComponent: ReactNode = (
    <QueryBoundary.Fallback logError={logError} errorFallback={errorFallback} />
  );

  if (nullableFallback !== undefined) {
    boundaryFallbackComponent = (
      <QueryBoundary.Fallback
        nullableFallback={nullableFallback}
        logError={logError}
        errorFallback={errorFallback}
      />
    );
  } else if (undefinedFallback !== undefined || nullFallback !== undefined) {
    boundaryFallbackComponent = (
      <QueryBoundary.Fallback
        undefinedFallback={undefinedFallback}
        nullFallback={nullFallback}
        logError={logError}
        errorFallback={errorFallback}
      />
    );
  }

  return (
    <>
      {boundaryFallbackComponent}
      <QueryBoundary.Data loadingFallback={loadingFallback} dataParser={dataParser}>
        {children}
      </QueryBoundary.Data>
    </>
  );
}

export default QueryBoundaryItemWrapper;
