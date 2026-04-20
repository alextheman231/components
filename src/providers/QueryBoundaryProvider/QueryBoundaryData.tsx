import type { ReactNode } from "react";

import { useQueryBoundary } from "src/providers/QueryBoundaryProvider/QueryBoundaryProvider";

export interface QueryBoundaryDataProps<DataType> {
  /**
   * The elements to show after data has been loaded.
   * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
   */
  children: ReactNode | ((data: NonNullable<DataType>) => ReactNode);
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<DataType>;
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
}

/**
 * The component responsible for showing the data provided by QueryBoundaryProvider.
 *
 * @template DataType - The type of data being loaded.
 */
function QueryBoundaryData<DataType>({
  children,
  dataParser: loaderDataParser,
  loadingComponent,
}: QueryBoundaryDataProps<DataType>) {
  const {
    isLoading,
    data,
    dataParser: contextDataParser,
    loadingComponent: contextLoadingComponent,
    error,
  } = useQueryBoundary<DataType>();
  const dataParser = loaderDataParser ?? contextDataParser;

  if (isLoading) {
    return <>{loadingComponent ?? contextLoadingComponent}</>;
  }

  if (error) {
    return null;
  }

  // No need to also check for isLoading === true here, since this was covered earlier
  if (data === null || data === undefined) {
    return null;
  }

  if (dataParser) {
    return typeof children === "function" ? <>{children(dataParser(data))}</> : <>{children}</>;
  }

  return typeof children === "function" ? <>{children(data)}</> : <>{children}</>;
}

export default QueryBoundaryData;
