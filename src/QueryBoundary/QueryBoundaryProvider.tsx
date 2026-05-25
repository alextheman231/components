import type { OptionalOnCondition } from "@alextheman/utility";
import type { ReactNode } from "react";

import type { ContextHookOptions } from "src/root/types";

import { DataError } from "@alextheman/utility/v6";
import { createContext, use } from "react";

export interface QueryBoundaryContextValue<DataType> {
  /** The current loading status (true if loading, false if not) */
  isLoading?: boolean;
  /** The data being loaded. */
  data?: DataType | null | undefined;
  /** The error given if the request gave an error. */
  error: unknown;
}

export type QueryBoundaryProviderProps<DataType> = QueryBoundaryContextValue<DataType> & {
  children: ReactNode;
};

const QueryBoundaryContext = createContext<QueryBoundaryContextValue<unknown> | undefined>(
  undefined,
);

/** Access the QueryBoundary context directly. */
export function useQueryBoundary<DataType, Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<
  Strict,
  QueryBoundaryContextValue<DataType>
> {
  const context = use(QueryBoundaryContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "QUERY_BOUNDARY_PROVIDER_NOT_FOUND",
      "Could not find the QueryBoundaryProvider context. Please double-check that it is present.",
    );
  }
  return context as OptionalOnCondition<Strict, QueryBoundaryContextValue<DataType>>;
}

/**
 * A provider for a context that deals with state management when fetching data from an API.
 * This may be used over QueryBoundary if you require more control over the placement of the error message and data display.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryProvider<DataType>({
  children,
  ...contextProps
}: QueryBoundaryProviderProps<DataType>) {
  return <QueryBoundaryContext value={contextProps}>{children}</QueryBoundaryContext>;
}

export default QueryBoundaryProvider;
