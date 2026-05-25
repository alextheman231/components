import type { ReactNode } from "react";

import type { QueryBoundaryContextValue, QueryBoundaryFallbackProps } from "src/groups";
import type { QueryBoundaryDataMapProps } from "src/groups/QueryBoundary/QueryBoundaryDataMap";

import createListQueryBoundary from "src/groups/QueryBoundary/creators/createListQueryBoundary";

export type QueryBoundaryListWrapperProps<ItemType> = QueryBoundaryContextValue<Array<ItemType>> &
  QueryBoundaryFallbackProps &
  QueryBoundaryDataMapProps<ItemType>;

/**
 * An in-line component that handles an array of data provided by `QueryBoundaryProvider`.
 *
 * This may be used over QueryBoundaryProvider/QueryBoundaryDataMap if you don't require as much control over the placement of the error message and data display.
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

  if (nullableFallback) {
    boundaryErrorFallback = (
      <QueryBoundary.Fallback
        nullableFallback={nullableFallback}
        logError={logError}
        errorFallback={errorFallback}
      />
    );
  } else if (undefinedFallback || nullFallback) {
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
    <QueryBoundary.Context>
      {boundaryErrorFallback}
      {boundaryDataMapComponent}
    </QueryBoundary.Context>
  );
}

export default QueryBoundaryListWrapper;
