import type { ReactNode } from "react";

import Typography from "@mui/material/Typography";

import { useQueryBoundary } from "src/root/groups/QueryBoundary/QueryBoundaryProvider";

export interface QueryBoundaryNullablePropsWithUndefinedOrNull {
  /** The component to show if no error was thrown but data is undefined */
  undefinedFallback?: ReactNode;
  /** The component to show if no error was thrown but data is null */
  nullFallback?: ReactNode;
  nullableFallback?: never;
}

export interface QueryBoundaryNullablePropsWithNullable {
  undefinedFallback?: never;
  nullFallback?: never;
  /** The component to show if no error was thrown but data is undefined or null */
  nullableFallback?: ReactNode;
}

export type QueryBoundaryNullableProps =
  | QueryBoundaryNullablePropsWithUndefinedOrNull
  | QueryBoundaryNullablePropsWithNullable;

/** The component responsible for handling cases when the data provided by `QueryBoundaryProvider` may be missing. */
function QueryBoundaryNullable({
  undefinedFallback,
  nullFallback,
  nullableFallback,
}: QueryBoundaryNullableProps) {
  const { isLoading, data, error } = useQueryBoundary();

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (data === null || data === undefined) {
    if (nullableFallback !== undefined) {
      return <>{nullableFallback}</>;
    }

    if (data === undefined) {
      if (undefinedFallback !== undefined) {
        return <>{undefinedFallback}</>;
      }
      return <Typography>No data available.</Typography>;
    }

    if (data === null) {
      if (nullFallback !== undefined) {
        return <>{nullFallback}</>;
      }
      return <Typography>No data found.</Typography>;
    }
  }

  return null;
}

export default QueryBoundaryNullable;
