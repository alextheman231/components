import type { ReactNode } from "react";

import type { QueryBoundaryContextValue, QueryBoundaryFallbackProps } from "src/groups";
import type { QueryBoundaryDataMapProps } from "src/groups/QueryBoundary/QueryBoundaryDataMap";

import createListQueryBoundary from "src/groups/QueryBoundary/creators/createListQueryBoundary";

export type QueryBoundaryMapProps<ItemType> = QueryBoundaryContextValue<Array<ItemType>> &
  QueryBoundaryFallbackProps &
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
  dataParser,
  itemParser,
  itemKey,
}: QueryBoundaryMapProps<ItemType>) {
  const QueryBoundary = createListQueryBoundary({ query: { isLoading, error, data } });

  let boundaryErrorComponent: ReactNode = (
    <QueryBoundary.Fallback logError={logError} errorComponent={errorComponent} />
  );

  if (nullableComponent) {
    boundaryErrorComponent = (
      <QueryBoundary.Fallback
        nullableComponent={nullableComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
    );
  } else if (undefinedComponent || nullComponent) {
    boundaryErrorComponent = (
      <QueryBoundary.Fallback
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        logError={logError}
        errorComponent={errorComponent}
      />
    );
  }

  let boundaryDataMapComponent: ReactNode = (
    <QueryBoundary.DataMap loadingComponent={loadingComponent} itemKey={itemKey}>
      {children}
    </QueryBoundary.DataMap>
  );

  if (dataParser) {
    boundaryDataMapComponent = (
      <QueryBoundary.DataMap
        loadingComponent={loadingComponent}
        itemKey={itemKey}
        dataParser={dataParser}
      >
        {children}
      </QueryBoundary.DataMap>
    );
  } else if (itemParser) {
    boundaryDataMapComponent = (
      <QueryBoundary.DataMap
        loadingComponent={loadingComponent}
        itemKey={itemKey}
        itemParser={itemParser}
      >
        {children}
      </QueryBoundary.DataMap>
    );
  }

  return (
    <QueryBoundary.Context>
      {boundaryErrorComponent}
      {boundaryDataMapComponent}
    </QueryBoundary.Context>
  );
}

export default QueryBoundaryMap;
