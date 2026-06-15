import type { ReactNode } from "react";

import { DataError } from "@alextheman/utility/v6";
import Skeleton from "@mui/material/Skeleton";

export interface QueryBoundaryValueBaseProps<DataType extends object, Key extends keyof DataType> {
  /** The current loading status (true if loading, false if not) */
  isLoading?: boolean;
  /** The data being loaded. */
  data?: DataType | null | undefined;
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<DataType>;
  /** The error given if the request gave an error. */
  error?: unknown;
  /** The component to show when the data is being fetched. */
  loadingFallback?: ReactNode;
  /** The name of the key of the value to be rendered. */
  propertyName: Key;
  /** Throw an error if the provided data is not an object. (defaults to `true`) */
  strictlyRequireObject?: boolean;
}

export interface QueryBoundaryValuePropsWithValueFormatter<
  DataType extends object,
  Key extends keyof DataType,
> extends QueryBoundaryValueBaseProps<DataType, Key> {
  /** A formatter to handle the property display. */
  valueFormatter: (property: DataType[Key]) => ReactNode;
  children?: never;
}

export interface QueryBoundaryValuePropsWithChildren<
  DataType extends object,
  Key extends keyof DataType,
> extends QueryBoundaryValueBaseProps<DataType, Key> {
  /** Content to render. Can either be a direct ReactNode or a formatter function. */
  children: ReactNode | ((property: DataType[Key]) => ReactNode);
  valueFormatter?: never;
}

export interface QueryBoundaryValuePropsWithNoFormatter<
  DataType extends object,
  Key extends keyof DataType,
> extends QueryBoundaryValueBaseProps<DataType, Key> {
  children?: never;
  valueFormatter?: never;
}

export type QueryBoundaryValueProps<DataType extends object, Key extends keyof DataType> =
  | QueryBoundaryValuePropsWithValueFormatter<DataType, Key>
  | QueryBoundaryValuePropsWithChildren<DataType, Key>
  | QueryBoundaryValuePropsWithNoFormatter<DataType, Key>;

/**
 * The component responsible for handling values from the data object provided.
 *
 * It will extract the value associated with the key specified by `propertyName`, formatting it according to the `valueFormatter` if provided.
 *
 * @template DataType - The type of data being loaded.
 *
 * @throws {DataError} If the data provided is not an object, and the `strictlyRequireObject` prop is `true` (it is by default).
 */
function QueryBoundaryValue<DataType extends object, Key extends keyof DataType>({
  isLoading,
  data,
  error,
  loadingFallback = <Skeleton />,
  propertyName,
  valueFormatter,
  dataParser,
  children,
  strictlyRequireObject = true,
}: QueryBoundaryValueProps<DataType, Key>) {
  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (error) {
    return null;
  }

  if (data === null || data === undefined) {
    return null;
  }

  if (typeof data !== "object" && strictlyRequireObject) {
    throw new DataError(
      { data, strictlyRequireObject },
      "NOT_AN_OBJECT",
      "Expected the data to be an object but it was not an object.",
    );
  }

  const resolvedData = dataParser !== undefined ? dataParser(data) : data;
  const value = resolvedData[propertyName];

  if (valueFormatter !== undefined) {
    return valueFormatter(value);
  }

  if (children !== undefined) {
    return typeof children === "function" ? children(value) : children;
  }

  return <>{value}</>;
}

export default QueryBoundaryValue;
