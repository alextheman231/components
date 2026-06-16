import type { ReactNode } from "react";

import type { QueryBoundaryDataMapProps } from "src/QueryBoundary/QueryBoundaryDataMap";
import type { QueryBoundaryFallbackProps } from "src/QueryBoundary/QueryBoundaryFallback";
import type { QueryBoundaryContextValue } from "src/QueryBoundary/QueryBoundaryProvider";

import createListQueryBoundary from "src/QueryBoundary/creators/createListQueryBoundary";

export type QueryBoundaryListWrapperProps<ItemType> = QueryBoundaryContextValue<Array<ItemType>> &
  QueryBoundaryFallbackProps &
  QueryBoundaryDataMapProps<ItemType>;

/**
 * An in-line component that handles an array of data provided by `QueryBoundaryProvider`.
 *
 * This may be used over `createListQueryBoundary` if you don't require as much control over the placement of the error message and data display.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryListWrapper<ItemType>({
  loadingFallback,
  undefinedFallback,
  nullFallback,
  nullableFallback,
  logError,
  errorFallback,
  children,
  isLoading,
  error,
  data,
  dataParser,
  itemParser,
  itemKey,
}: QueryBoundaryListWrapperProps<ItemType>) {
  const QueryBoundary = createListQueryBoundary({ query: { isLoading, error, data } });

  let boundaryErrorFallback: ReactNode = (
    <QueryBoundary.Fallback logError={logError} errorFallback={errorFallback} />
  );

  if (nullableFallback !== undefined) {
    boundaryErrorFallback = (
      <QueryBoundary.Fallback
        nullableFallback={nullableFallback}
        logError={logError}
        errorFallback={errorFallback}
      />
    );
  } else if (undefinedFallback !== undefined || nullFallback !== undefined) {
    boundaryErrorFallback = (
      <QueryBoundary.Fallback
        undefinedFallback={undefinedFallback}
        nullFallback={nullFallback}
        logError={logError}
        errorFallback={errorFallback}
      />
    );
  }

  let boundaryDataMapComponent: ReactNode = (
    <QueryBoundary.DataMap loadingFallback={loadingFallback} itemKey={itemKey}>
      {children}
    </QueryBoundary.DataMap>
  );

  if (dataParser) {
    boundaryDataMapComponent = (
      <QueryBoundary.DataMap
        loadingFallback={loadingFallback}
        itemKey={itemKey}
        dataParser={dataParser}
      >
        {children}
      </QueryBoundary.DataMap>
    );
  } else if (itemParser) {
    boundaryDataMapComponent = (
      <QueryBoundary.DataMap
        loadingFallback={loadingFallback}
        itemKey={itemKey}
        itemParser={itemParser}
      >
        {children}
      </QueryBoundary.DataMap>
    );
  }

  return (
    <>
      {boundaryErrorFallback}
      {boundaryDataMapComponent}
    </>
  );
}

export default QueryBoundaryListWrapper;
