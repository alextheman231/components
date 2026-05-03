import type { ReactNode } from "react";

import type { QueryBoundaryDataProps, QueryBoundaryProviderProps } from "src/providers";
import type { QueryBoundaryErrorProps } from "src/providers/QueryBoundaryProvider/QueryBoundaryError";

import CircularProgress from "@mui/material/CircularProgress";

import { QueryBoundaryError } from "src/providers";
import QueryBoundaryProvider from "src/providers/QueryBoundaryProvider";
import QueryBoundaryData from "src/providers/QueryBoundaryProvider/QueryBoundaryData";

export type QueryBoundaryProps<DataType> = Omit<
  QueryBoundaryProviderProps<DataType>,
  "children" | "logError"
> &
  Omit<QueryBoundaryErrorProps, "children"> &
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
  let boundaryErrorComponent: ReactNode = (
    <QueryBoundaryError logError={logError}>{errorComponent}</QueryBoundaryError>
  );

  if (nullableComponent) {
    boundaryErrorComponent = (
      <QueryBoundaryError nullableComponent={nullableComponent} logError={logError}>
        {errorComponent}
      </QueryBoundaryError>
    );
  } else if (undefinedComponent || nullComponent) {
    boundaryErrorComponent = (
      <QueryBoundaryError
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        logError={logError}
      >
        {errorComponent}
      </QueryBoundaryError>
    );
  }

  return (
    <QueryBoundaryProvider<DataType> loadingComponent={loadingComponent} {...loaderProviderProps}>
      {boundaryErrorComponent}
      <QueryBoundaryData<DataType>>{children}</QueryBoundaryData>
    </QueryBoundaryProvider>
  );
}

export default QueryBoundary;
