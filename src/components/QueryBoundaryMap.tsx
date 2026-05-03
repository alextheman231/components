import type { ReactNode } from "react";

import type { QueryBoundaryErrorProps, QueryBoundaryProviderProps } from "src/providers";
import type { QueryBoundaryDataMapProps } from "src/providers/QueryBoundaryProvider/QueryBoundaryDataMap";

import { QueryBoundaryError, QueryBoundaryProvider } from "src/providers";
import QueryBoundaryDataMap from "src/providers/QueryBoundaryProvider/QueryBoundaryDataMap";

export type QueryBoundaryMapProps<ItemType> = Omit<
  QueryBoundaryProviderProps<Array<ItemType>>,
  "children" | "logError"
> &
  Omit<QueryBoundaryErrorProps, "children"> &
  QueryBoundaryDataMapProps<ItemType>;

/**
 * An in-line component that handles an array of data provided by `QueryBoundaryProvider`.
 *
 * This may be used over QueryBoundaryProvider/QueryBoundaryDataMap if you don't require as much control over the placement of the error message and data display.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryMap<ItemType>({
  loadingComponent,
  undefinedComponent,
  nullComponent,
  nullableComponent,
  logError,
  errorComponent,
  children,
  isLoading,
  error,
  data,
  ...props
}: QueryBoundaryMapProps<ItemType>) {
  let boundaryErrorComponent: ReactNode = null;

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
    <QueryBoundaryProvider<Array<ItemType>>
      loadingComponent={loadingComponent}
      isLoading={isLoading}
      error={error}
      data={data}
    >
      {boundaryErrorComponent}
      <QueryBoundaryDataMap<ItemType> {...props}>{children}</QueryBoundaryDataMap>
    </QueryBoundaryProvider>
  );
}

export default QueryBoundaryMap;
