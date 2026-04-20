import type { OptionalOnCondition } from "@alextheman/utility";
import type { ReactNode } from "react";

import type { ContextHookOptions } from "src/types";

import { DataError } from "@alextheman/utility";
import CircularProgress from "@mui/material/CircularProgress";
import { createContext, useContext } from "react";

export interface QueryBoundaryProviderBaseProps<DataType> {
  /** The current loading status (true if loading, false if not) */
  isLoading: boolean;
  /** The data being loaded. */
  data?: DataType;
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<DataType>;
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
}

export interface QueryBoundaryProviderPropsWithNoError<
  DataType,
> extends QueryBoundaryProviderBaseProps<DataType> {
  error?: never;
  errorComponent?: never;
  logError?: never;
}

export interface QueryBoundaryProviderPropsWithError<
  DataType,
> extends QueryBoundaryProviderBaseProps<DataType> {
  /** The error given if the request gave an error. */
  error: unknown;
  /** The component to show if an error has been thrown. Note that this may not be provided unless the error prop has also been provided. */
  errorComponent?: ReactNode | ((error: unknown) => ReactNode);
  /** Whether you want to log the error to the console or not. */
  logError?: boolean;
}

export type QueryBoundaryContextValue<DataType> =
  | QueryBoundaryProviderPropsWithNoError<DataType>
  | QueryBoundaryProviderPropsWithError<DataType>;
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
  const context = useContext(QueryBoundaryContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "LOADER_PROVIDER_NOT_FOUND",
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
  loadingComponent = <CircularProgress />,
  ...contextProps
}: QueryBoundaryProviderProps<DataType>) {
  return (
    <QueryBoundaryContext.Provider value={{ loadingComponent, ...contextProps }}>
      {children}
    </QueryBoundaryContext.Provider>
  );
}

export default QueryBoundaryProvider;
