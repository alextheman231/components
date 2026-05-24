import type { JSX, ReactNode } from "react";

import QueryBoundaryError from "src/groups/QueryBoundary/QueryBoundaryError";
import QueryBoundaryFallback from "src/groups/QueryBoundary/QueryBoundaryFallback";
import QueryBoundaryNullable from "src/groups/QueryBoundary/QueryBoundaryNullable";
import QueryBoundaryProvider from "src/groups/QueryBoundary/QueryBoundaryProvider";

export interface QueryBase<DataType> {
  /** The current loading status (true if loading, false if not) */
  isLoading?: boolean;
  /** The error given if the response gave an error. */
  error?: unknown;
  /** The data being loaded. */
  data: DataType;
}

export interface CreateBaseQueryBoundaryParameters<DataType> {
  query: QueryBase<DataType>;
}

export interface DefaultQueryBoundaryComponentsBase {
  Context: (props: { children: ReactNode }) => JSX.Element;
  Error: typeof QueryBoundaryError;
  Fallback: typeof QueryBoundaryFallback;
  Nullable: typeof QueryBoundaryNullable;
}

/** A creator function to create the base system of QueryBoundary components with the data fully typed throughout. */
function createBaseQueryBoundary<DataType>({
  query,
}: CreateBaseQueryBoundaryParameters<DataType>): DefaultQueryBoundaryComponentsBase {
  return {
    Context: ({ children }) => {
      return (
        <QueryBoundaryProvider isLoading={query.isLoading} error={query.error} data={query.data}>
          {children}
        </QueryBoundaryProvider>
      );
    },
    Error: QueryBoundaryError,
    Fallback: QueryBoundaryFallback,
    Nullable: QueryBoundaryNullable,
  };
}

export default createBaseQueryBoundary;
