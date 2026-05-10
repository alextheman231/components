import type { ReactNode } from "react";

import type { QueryBoundaryDataProps, QueryBoundaryProviderProps } from "src/providers";
import type { QueryBoundaryFallbackProps } from "src/providers/QueryBoundaryProvider/QueryBoundaryFallback";

import CircularProgress from "@mui/material/CircularProgress";

import { QueryBoundaryFallback } from "src/providers";
import QueryBoundaryProvider from "src/providers/QueryBoundaryProvider";
import QueryBoundaryData from "src/providers/QueryBoundaryProvider/QueryBoundaryData";

export type QueryBoundaryProps<DataType> = Omit<
  QueryBoundaryProviderProps<DataType>,
  "children" | "logError"
> &
  Omit<QueryBoundaryFallbackProps, "children"> &
  Omit<QueryBoundaryDataProps<DataType>, "showOnError" | "onUndefined" | "onNull" | "onNullable">;

/**
 * An in-line component that deals with state management when fetching data from an API.
 * This may be used over QueryBoundaryProvider if you don't require as much control over the placement of the error message and data display.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundary<DataType>({
  children,
  errorComponent,
  undefinedComponent,
  nullComponent,
  nullableComponent,
  logError,
  loadingComponent = <CircularProgress />,
  ...loaderProviderProps
}: QueryBoundaryProps<DataType>) {
  let boundaryFallbackComponent: ReactNode = (
    <QueryBoundaryFallback logError={logError} errorComponent={errorComponent} />
  );

  if (nullableComponent) {
    boundaryFallbackComponent = (
      <QueryBoundaryFallback
        nullableComponent={nullableComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
    );
  } else if (undefinedComponent || nullComponent) {
    boundaryFallbackComponent = (
      <QueryBoundaryFallback
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
    );
  }

  return (
    <QueryBoundaryProvider<DataType> loadingComponent={loadingComponent} {...loaderProviderProps}>
      {boundaryFallbackComponent}
      <QueryBoundaryData<DataType>>{children}</QueryBoundaryData>
    </QueryBoundaryProvider>
  );
}

export default QueryBoundary;
