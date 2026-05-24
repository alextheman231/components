import type { JSX, ReactNode } from "react";

import QueryBoundaryData from "src/groups/QueryBoundary/QueryBoundaryData";
import QueryBoundaryDataMap from "src/groups/QueryBoundary/QueryBoundaryDataMap";
import QueryBoundaryError from "src/groups/QueryBoundary/QueryBoundaryError";
import QueryBoundaryFallback from "src/groups/QueryBoundary/QueryBoundaryFallback";
import QueryBoundaryNullable from "src/groups/QueryBoundary/QueryBoundaryNullable";
import QueryBoundaryProvider from "src/groups/QueryBoundary/QueryBoundaryProvider";

export interface QueryBase {
  /** The current loading status (true if loading, false if not) */
  isLoading?: boolean;
  /** The error given if the response gave an error. */
  error?: unknown;
}

export interface QuerySingle<DataType> extends QueryBase {
  /** The data being loaded. */
  data: DataType | null | undefined;
  dataCollection?: never;
}

export interface QueryMultiple<ItemType> extends QueryBase {
  /** An array of data items being loaded. */
  dataCollection: Array<ItemType> | null | undefined;
  data?: never;
}

export type Query<DataType> = QuerySingle<DataType> | QueryMultiple<DataType>;

export interface CreateQueryBoundaryParameters<DataType> {
  query: Query<DataType>;
}

export interface DefaultQueryBoundaryComponents<DataType> {
  Context: (props: { children: ReactNode }) => JSX.Element;
  Error: typeof QueryBoundaryError;
  Data: typeof QueryBoundaryData<DataType>;
  DataMap: typeof QueryBoundaryDataMap<DataType>;
  Fallback: typeof QueryBoundaryFallback;
  Nullable: typeof QueryBoundaryNullable;
}

/**
 * A creator function to create a system of QueryBoundary components with the data fully typed throughout.
 *
 * @deprecated Please use either `createBaseQueryBoundary`, `createItemQueryBoundary`, or `createListQueryBoundary` from `@alextheman/components/v7` instead.
 */
function createQueryBoundary<DataType>({
  query,
}: CreateQueryBoundaryParameters<DataType>): DefaultQueryBoundaryComponents<DataType> {
  return {
    Context: ({ children }) => {
      return (
        <QueryBoundaryProvider
          isLoading={query.isLoading}
          error={query.error}
          data={"data" in query ? query.data : query.dataCollection}
        >
          {children}
        </QueryBoundaryProvider>
      );
    },
    Error: QueryBoundaryError,
    Data: QueryBoundaryData<DataType>,
    DataMap: QueryBoundaryDataMap<DataType>,
    Fallback: QueryBoundaryFallback,
    Nullable: QueryBoundaryNullable,
  };
}

export default createQueryBoundary;
