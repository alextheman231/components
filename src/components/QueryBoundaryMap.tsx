import type { QueryBoundaryErrorProps, QueryBoundaryProviderProps } from "src/providers";
import type { QueryBoundaryDataMapProps } from "src/providers/QueryBoundaryProvider/QueryBoundaryDataMap";

import { QueryBoundaryError, QueryBoundaryProvider } from "src/providers";
import QueryBoundaryDataMap from "src/providers/QueryBoundaryProvider/QueryBoundaryDataMap";

export type QueryBoundaryMapProps<ItemType> = Omit<
  QueryBoundaryProviderProps<Array<ItemType>>,
  "children" | "logError"
> &
  Omit<QueryBoundaryErrorProps, "errorComponent" | "children"> &
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
  return (
    <QueryBoundaryProvider<Array<ItemType>>
      loadingComponent={loadingComponent}
      isLoading={isLoading}
      error={error}
      data={data}
    >
      {/* @ts-expect-error: We need to pass all four to QueryBoundaryError for the wrapper to work. It is ok as QueryBoundaryMap will then do its own checks to enforce mutual exclusivity, and QueryBoundaryError knows how to deal with it anyway. */}
      <QueryBoundaryError
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        nullableComponent={nullableComponent}
        logError={logError}
      >
        {errorComponent}
      </QueryBoundaryError>
      <QueryBoundaryDataMap<ItemType> {...props}>{children}</QueryBoundaryDataMap>
    </QueryBoundaryProvider>
  );
}

export default QueryBoundaryMap;
