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
  Omit<QueryBoundaryErrorProps, "errorComponent" | "children"> &
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
  return (
    <QueryBoundaryProvider<DataType> loadingComponent={loadingComponent} {...loaderProviderProps}>
      {/* @ts-expect-error: We need to pass all four to QueryBoundaryError for the wrapper to work. It is ok as QueryBoundary will then do its own checks to enforce mutual exclusivity, and QueryBoundaryError knows how to deal with it anyway. */}
      <QueryBoundaryError
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        nullableComponent={nullableComponent}
        logError={logError}
      >
        {errorComponent}
      </QueryBoundaryError>
      <QueryBoundaryData<DataType>>{children}</QueryBoundaryData>
    </QueryBoundaryProvider>
  );
}

export default QueryBoundary;
