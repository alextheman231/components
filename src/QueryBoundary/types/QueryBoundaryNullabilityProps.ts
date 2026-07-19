import type { ReactNode } from "react";

export interface QueryBoundaryUndefinedOrNullFallbackProps {
  undefinedFallback?: ReactNode;
  nullFallback?: ReactNode;
  nullableFallback?: never;
}

export interface QueryBoundaryNullableFallbackProps {
  undefinedFallback?: never;
  nullFallback?: never;
  nullableFallback?: ReactNode;
}

export type QueryBoundaryNullabilityFallbackProps =
  QueryBoundaryUndefinedOrNullFallbackProps | QueryBoundaryNullableFallbackProps;
