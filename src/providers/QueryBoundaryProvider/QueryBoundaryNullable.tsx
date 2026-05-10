import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";

import { useQueryBoundary } from "src/providers/QueryBoundaryProvider/QueryBoundaryProvider";

export interface QueryBoundaryNullablePropsWithUndefinedOrNull {
  /** The component to show if no error was thrown but data is undefined */
  undefinedComponent?: ReactNode;
  /** The component to show if no error was thrown but data is null */
  nullComponent?: ReactNode;
  nullableComponent?: never;
}

export interface QueryBoundaryNullablePropsWithNullable {
  undefinedComponent?: never;
  nullComponent?: never;
  /** The component to show if no error was thrown but data is undefined or null */
  nullableComponent?: ReactNode;
}

export type QueryBoundaryNullableProps =
  | QueryBoundaryNullablePropsWithUndefinedOrNull
  | QueryBoundaryNullablePropsWithNullable;

/** The component responsible for handling cases when the data provided by `QueryBoundaryProvider` may be missing. */
function QueryBoundaryNullable({
  undefinedComponent,
  nullComponent,
  nullableComponent,
}: QueryBoundaryNullableProps) {
  const { isLoading, data, error } = useQueryBoundary();

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (data === null || data === undefined) {
    if (nullableComponent) {
      return <>{nullableComponent}</>;
    }

    if (data === undefined) {
      if (undefinedComponent) {
        return <>{undefinedComponent}</>;
      }
    }

    if (data === null) {
      if (nullComponent) {
        return <>{nullComponent}</>;
      }
    }

    return <Alert severity="error">Failed to load data. Please try again later.</Alert>;
  }

  return null;
}

export default QueryBoundaryNullable;
