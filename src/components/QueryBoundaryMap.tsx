import type { ReactNode } from "react";

import type { QueryBoundaryFallbackProps, QueryBoundaryProviderProps } from "src/providers";
import type { QueryBoundaryDataMapProps } from "src/providers/QueryBoundaryProvider/QueryBoundaryDataMap";

import { QueryBoundaryFallback, QueryBoundaryProvider } from "src/providers";
import QueryBoundaryDataMap from "src/providers/QueryBoundaryProvider/QueryBoundaryDataMap";

export type QueryBoundaryMapProps<ItemType> = Omit<
  QueryBoundaryProviderProps<Array<ItemType>>,
  "children" | "logError"
> &
  Omit<QueryBoundaryFallbackProps, "errorComponent"> &
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
  let boundaryErrorComponent: ReactNode = (
    <QueryBoundaryFallback logError={logError} errorComponent={errorComponent} />
  );

  if (nullableComponent) {
    boundaryErrorComponent = (
      <QueryBoundaryFallback
        nullableComponent={nullableComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
    );
  } else if (undefinedComponent || nullComponent) {
    boundaryErrorComponent = (
      <QueryBoundaryFallback
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
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
