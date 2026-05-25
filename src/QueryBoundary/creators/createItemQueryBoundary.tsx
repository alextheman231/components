import type {
  DefaultQueryBoundaryComponentsBase,
  QueryBase,
} from "src/QueryBoundary/creators/createBaseQueryBoundary";

import createBaseQueryBoundary from "src/QueryBoundary/creators/createBaseQueryBoundary";
import QueryBoundaryData from "src/QueryBoundary/QueryBoundaryData";

export interface QueryItem<DataType> extends Omit<QueryBase<DataType>, "data"> {
  /** The data being loaded. */
  data: DataType | null | undefined;
}

export interface CreateItemQueryBoundaryParameters<DataType> {
  query: QueryItem<DataType>;
}

export interface DefaultQueryBoundaryItemComponents<
  DataType,
> extends DefaultQueryBoundaryComponentsBase {
  /**
   * The component responsible for showing the data provided by `QueryBoundary.Context`.
   *
   * @template DataType - The type of data being loaded.
   */
  Data: typeof QueryBoundaryData<DataType>;
}

/** A creator function to create the system of QueryBoundary components with the data treated as a single data item, fully typed throughout. */
function createItemQueryBoundary<DataType>({
  query,
}: CreateItemQueryBoundaryParameters<DataType>): DefaultQueryBoundaryItemComponents<DataType> {
  const baseComponents = createBaseQueryBoundary({ query });

  return {
    ...baseComponents,
    Data: QueryBoundaryData,
  };
}

export default createItemQueryBoundary;
