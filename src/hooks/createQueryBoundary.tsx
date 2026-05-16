/* 
eslint-disable react/prop-types -- ESLint gives false positives because it thinks the props are not typed.
However, they are - this compound component are all typed and the prop types are recognised by TypeScript.
*/
import type { JSX, ReactNode } from "react";

import {
  QueryBoundaryData,
  QueryBoundaryDataMap,
  QueryBoundaryError,
  QueryBoundaryFallback,
  QueryBoundaryNullable,
  QueryBoundaryProvider,
} from "src/providers";

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

/** A creator function to create a system of QueryBoundary components with the data fully typed throughout. */
function createQueryBoundary<DataType>({
  query,
}: CreateQueryBoundaryParameters<DataType>): DefaultQueryBoundaryComponents<DataType> {
  return {
    Context: ({ children }) => {
      return (
        <QueryBoundaryProvider
          isLoading={query.isLoading}
          error={query.error}
          data={query.data ?? query.dataCollection}
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
