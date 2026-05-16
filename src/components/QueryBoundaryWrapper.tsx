import type { ReactNode } from "react";

import type { QueryBoundaryDataProps, QueryBoundaryProviderProps } from "src/providers";
import type { QueryBoundaryFallbackProps } from "src/providers/QueryBoundaryProvider/QueryBoundaryFallback";

import CircularProgress from "@mui/material/CircularProgress";

import { createQueryBoundary } from "src/hooks";

export type QueryBoundaryWrapperProps<DataType> = Omit<
  QueryBoundaryProviderProps<DataType>,
  "children" | "logError"
> &
  Omit<QueryBoundaryFallbackProps, "errorComponent"> &
  Omit<QueryBoundaryDataProps<DataType>, "showOnError" | "onUndefined" | "onNull" | "onNullable">;

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
  const QueryBoundary = createQueryBoundary({ query: { isLoading, error, data } });

  let boundaryFallbackComponent: ReactNode = (
    <QueryBoundary.Fallback logError={logError} errorComponent={errorComponent} />
  );

  if (nullableComponent) {
    boundaryFallbackComponent = (
      <QueryBoundary.Fallback
        nullableComponent={nullableComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
    );
  } else if (undefinedComponent || nullComponent) {
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
