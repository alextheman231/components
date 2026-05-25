import type { JSX, ReactNode } from "react";

import QueryBoundaryError from "src/root/groups/QueryBoundary/QueryBoundaryError";
import QueryBoundaryFallback from "src/root/groups/QueryBoundary/QueryBoundaryFallback";
import QueryBoundaryNullable from "src/root/groups/QueryBoundary/QueryBoundaryNullable";
import QueryBoundaryProvider from "src/root/groups/QueryBoundary/QueryBoundaryProvider";

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
  /** Provides the context for the query boundary. */
  Context: (props: { children: ReactNode }) => JSX.Element;
  /** The component responsible for showing any errors provided by `QueryBoundary.Context`. */
  Error: typeof QueryBoundaryError;
  /** The component responsible for handling cases when the data provided by `QueryBoundary.Context` may be missing. */
  Fallback: typeof QueryBoundaryFallback;
  /** The component responsible for handling both errors and nullable data from `QueryBoundary.Context`*/
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
