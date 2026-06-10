import type { ReactNode } from "react";

import CircularProgress from "@mui/material/CircularProgress";

export interface QueryBoundaryDataProps<DataType> {
  /**
   * The elements to show after data has been loaded.
   * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
   */
  children: ReactNode | ((data: NonNullable<DataType>) => ReactNode);
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<DataType>;
  /** The component to show when the data is being fetched. */
  loadingFallback?: ReactNode;
  /** The current loading status (true if loading, false if not) */
  isLoading?: boolean;
  /** The data being loaded. */
  data?: DataType | null | undefined;
  /** The error given if the request gave an error. */
  error?: unknown;
}

/**
 * The component responsible for showing the data provided by QueryBoundaryProvider.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryData<DataType>({
  children,
  dataParser,
  loadingFallback = <CircularProgress />,
  data,
  isLoading,
  error,
}: QueryBoundaryDataProps<DataType>) {
  if (error) {
    return null;
  }

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (data === null || data === undefined) {
    return null;
  }

  return (
    <>
      {typeof children === "function" ? children(dataParser ? dataParser(data) : data) : children}
    </>
  );
}

export default QueryBoundaryData;
