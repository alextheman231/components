import type { Key, ReactNode } from "react";

import { DataError } from "@alextheman/utility";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { useQueryBoundary } from "src/providers/QueryBoundaryProvider/QueryBoundaryProvider";

export interface QueryBoundaryDataMapBaseProps<ItemType> {
  /**
   * The elements to show after data has been loaded.
   *
   * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
   */
  children: ReactNode | ((data: ItemType) => ReactNode);
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
  /** The component to show if the array is empty. */
  emptyComponent?: ReactNode;
  /** Throw an error if the provided data is not an array. (defaults to `true`) */
  strictlyRequireArray?: boolean;
  /**
   * A function that takes a data item and returns the key to be used for the item.
   *
   * If not provided, it will fall back to using the index.
   */
  itemKey?: (item: ItemType, index: number) => Key;
}

export interface QueryBoundaryDataMapPropsWithItemParser<
  ItemType,
> extends QueryBoundaryDataMapBaseProps<ItemType> {
  /** A parser for each data item. */
  itemParser: (data: unknown) => ItemType;
  dataParser?: never;
}

export interface QueryBoundaryDataMapPropsWithDataParser<
  ItemType,
> extends QueryBoundaryDataMapBaseProps<ItemType> {
  /** A parser for each data item. */
  dataParser: (data: unknown) => Array<ItemType>;
  itemParser?: never;
}

export interface QueryBoundaryDataMapPropsWithNoParser<
  ItemType,
> extends QueryBoundaryDataMapBaseProps<ItemType> {
  dataParser?: never;
  itemParser?: never;
}

export type QueryBoundaryDataMapProps<ItemType> =
  | QueryBoundaryDataMapPropsWithItemParser<ItemType>
  | QueryBoundaryDataMapPropsWithDataParser<ItemType>
  | QueryBoundaryDataMapPropsWithNoParser<ItemType>;

/**
 * The component responsible for handling an array of data provided by `QueryBoundaryProvider`.
 *
 * It will map through the data array, rendering the result of the children function in a fragment with a key of its index in the list, unless overridden by the `itemKey` prop.
 *
 * @template ItemType - The type of data being loaded.
 *
 * @throws {DataError} If the data provided by `QueryBoundaryProvider` is not an array, and the `strictlyRequireArray` prop is `true` (it is by default).
 */
function QueryBoundaryDataMap<ItemType>({
  children,
  loadingComponent: propLoadingComponent,
  itemKey,
  itemParser,
  dataParser: propDataParser,
  emptyComponent = <Typography>No data present</Typography>,
  strictlyRequireArray = true,
}: QueryBoundaryDataMapProps<ItemType>) {
  const {
    isLoading,
    data,
    dataParser: contextDataParser,
    loadingComponent: contextLoadingComponent,
    error,
  } = useQueryBoundary<Array<ItemType>>();

  const dataParser = propDataParser ?? contextDataParser;
  const loadingComponent = propLoadingComponent ?? contextLoadingComponent;

  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return null;
  }

  if (data === null || data === undefined) {
    return null;
  }

  if (!Array.isArray(data)) {
    if (strictlyRequireArray) {
      throw new DataError(
        { data, strictlyRequireArray },
        "NOT_AN_ARRAY",
        "Expected the data to be an array but it was not an array.",
      );
    }
    return null;
  }

  if (data.length === 0) {
    return <>{emptyComponent}</>;
  }

  let items: Array<ItemType>;

  if (dataParser) {
    items = dataParser(data);
  } else if (itemParser) {
    items = data.map(itemParser);
  } else {
    items = data;
  }

  return (
    <>
      {items.map((item, index) => {
        return (
          <Fragment key={itemKey ? itemKey(item, index) : index}>
            {typeof children === "function" ? children(item) : children}
          </Fragment>
        );
      })}
    </>
  );
}

export default QueryBoundaryDataMap;
