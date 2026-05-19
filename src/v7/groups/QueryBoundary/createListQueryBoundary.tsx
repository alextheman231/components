import type {
  DefaultQueryBoundaryComponentsBase,
  QueryBase,
} from "src/v7/groups/QueryBoundary/createBaseQueryBoundary";

import QueryBoundaryDataMap from "src/groups/QueryBoundary/QueryBoundaryDataMap";
import createBaseQueryBoundary from "src/v7/groups/QueryBoundary/createBaseQueryBoundary";

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
