import type { JSX, ReactNode } from "react";

import type { QueryBoundaryErrorProps } from "src/QueryBoundary/QueryBoundaryError";
import type { QueryBoundaryFallbackProps } from "src/QueryBoundary/QueryBoundaryFallback";
import type { QueryBoundaryNullableProps } from "src/QueryBoundary/QueryBoundaryNullable";

import QueryBoundaryError from "src/QueryBoundary/QueryBoundaryError";
import QueryBoundaryFallback from "src/QueryBoundary/QueryBoundaryFallback";
import QueryBoundaryNullable from "src/QueryBoundary/QueryBoundaryNullable";

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
  /**
   * Provides the context for the query boundary.
   *
   * @deprecated This no longer does anything and can now be removed. All other components in this group can be used without the context present.
   */
  Context: (props: { children: ReactNode }) => JSX.Element | null;
  /** The component responsible for showing any errors provided by `QueryBoundary.Context`. */
  Error: (props: Omit<QueryBoundaryErrorProps, "data" | "isLoading" | "error">) => JSX.Element;
  /** The component responsible for handling both errors and nullable data from `QueryBoundary.Context`*/
  Fallback: (
    props: Omit<QueryBoundaryFallbackProps, "data" | "isLoading" | "error">,
  ) => JSX.Element;
  /** The component responsible for handling cases when the data provided by `QueryBoundary.Context` may be missing. */
  Nullable: (
    props: Omit<QueryBoundaryNullableProps, "data" | "isLoading" | "error">,
  ) => JSX.Element;
}

/** A creator function to create the base system of QueryBoundary components with the data fully typed throughout. */
function createBaseQueryBoundary<DataType>({
  query,
}: CreateBaseQueryBoundaryParameters<DataType>): DefaultQueryBoundaryComponentsBase {
  return {
    Context: () => {
      return null;
    },
    Error: (props) => {
      return <QueryBoundaryError {...query} {...props} />;
    },
    Fallback: ({ undefinedFallback, nullFallback, nullableFallback, ...props }) => {
      if (nullableFallback !== undefined) {
        return <QueryBoundaryFallback {...query} {...props} nullableFallback={nullableFallback} />;
      }
      if (undefinedFallback !== undefined || nullFallback !== undefined) {
        return (
          <QueryBoundaryFallback
            {...query}
            {...props}
            undefinedFallback={undefinedFallback}
            nullFallback={nullFallback}
          />
        );
      }
      return <QueryBoundaryFallback {...query} {...props} />;
    },
    Nullable: ({ undefinedFallback, nullFallback, nullableFallback, ...props }) => {
      if (nullableFallback !== undefined) {
        return <QueryBoundaryNullable {...query} {...props} nullableFallback={nullableFallback} />;
      }
      if (undefinedFallback !== undefined || nullFallback !== undefined) {
        return (
          <QueryBoundaryNullable
            {...query}
            {...props}
            undefinedFallback={undefinedFallback}
            nullFallback={nullFallback}
          />
        );
      }
      return <QueryBoundaryNullable {...query} {...props} />;
    },
  };
}

export default createBaseQueryBoundary;
