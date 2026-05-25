import type {
  DefaultQueryBoundaryComponentsBase,
  QueryBase,
} from "src/QueryBoundary/creators/createBaseQueryBoundary";

import createBaseQueryBoundary from "src/QueryBoundary/creators/createBaseQueryBoundary";
import QueryBoundaryDataMap from "src/QueryBoundary/QueryBoundaryDataMap";

export interface QueryList<DataType> extends Omit<QueryBase<DataType>, "data"> {
  /** The data being loaded. */
  data: Array<DataType> | null | undefined;
}

export interface CreateListQueryBoundaryParameters<DataType> {
  query: QueryList<DataType>;
}

export interface DefaultQueryBoundaryListComponents<
  DataType,
> extends DefaultQueryBoundaryComponentsBase {
  /**
   * The component responsible for handling an array of data provided by `QueryBoundary.Context`.
   *
   * It will map through the data array, rendering the result of the children function in a fragment with a key of its index in the list, unless overridden by the `itemKey` prop.
   *
   * @template ItemType - The type of data being loaded.
   *
   * @throws {DataError} If the data provided by `QueryBoundary.Context` is not an array, and the `strictlyRequireArray` prop is `true` (it is by default).
   */
  DataMap: typeof QueryBoundaryDataMap<DataType>;
}

/** A creator function to create the system of QueryBoundary components with the data treated as an array of data items, fully typed throughout. */
function createListQueryBoundary<DataType>({
  query,
}: CreateListQueryBoundaryParameters<DataType>): DefaultQueryBoundaryListComponents<DataType> {
  const baseComponents = createBaseQueryBoundary({ query });

  return {
    ...baseComponents,
    DataMap: QueryBoundaryDataMap,
  };
}

export default createListQueryBoundary;
