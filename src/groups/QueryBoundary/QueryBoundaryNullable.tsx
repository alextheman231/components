import type { ReactNode } from "react";

import Typography from "@mui/material/Typography";

import { useQueryBoundary } from "src/groups/QueryBoundary/QueryBoundaryProvider";

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
    if (nullableComponent !== undefined) {
      return <>{nullableComponent}</>;
    }

    if (data === undefined) {
      if (undefinedComponent !== undefined) {
        return <>{undefinedComponent}</>;
      }
      return <Typography>No data available.</Typography>;
    }

    if (data === null) {
      if (nullComponent !== undefined) {
        return <>{nullComponent}</>;
      }
      return <Typography>No data found.</Typography>;
    }
  }

  return null;
}

export default QueryBoundaryNullable;
