import type { ReactNode } from "react";

import type { QueryBoundaryContextValue, QueryBoundaryDataProps } from "src/groups";
import type { QueryBoundaryFallbackProps } from "src/groups/QueryBoundary/QueryBoundaryFallback";

import CircularProgress from "@mui/material/CircularProgress";

import createItemQueryBoundary from "src/groups/QueryBoundary/creators/createItemQueryBoundary";

export type QueryBoundaryWrapperProps<DataType> = QueryBoundaryContextValue<DataType> &
  QueryBoundaryFallbackProps &
  QueryBoundaryDataProps<DataType>;

/**
 * An in-line component that deals with state management when fetching data from an API.
 * This may be used over QueryBoundaryProvider if you don't require as much control over the placement of the error message and data display.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryWrapper<DataType>({
  children,
  errorComponent,
  undefinedComponent,
  nullComponent,
  nullableComponent,
  logError,
  loadingComponent = <CircularProgress />,
  isLoading,
  error,
  data,
  dataParser,
}: QueryBoundaryWrapperProps<DataType>) {
  const QueryBoundary = createItemQueryBoundary({ query: { isLoading, error, data } });

  let boundaryFallbackComponent: ReactNode = (
    <QueryBoundary.Fallback logError={logError} errorComponent={errorComponent} />
  );

  if (nullableComponent !== undefined) {
    boundaryFallbackComponent = (
      <QueryBoundary.Fallback
        nullableComponent={nullableComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
    );
  } else if (undefinedComponent !== undefined || nullComponent !== undefined) {
    boundaryFallbackComponent = (
      <QueryBoundary.Fallback
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
    );
  }

  return (
    <QueryBoundary.Context>
      {boundaryFallbackComponent}
      <QueryBoundary.Data loadingComponent={loadingComponent} dataParser={dataParser}>
        {children}
      </QueryBoundary.Data>
    </QueryBoundary.Context>
  );
}

export default QueryBoundaryWrapper;
