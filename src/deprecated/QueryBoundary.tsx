import type { QueryBoundaryWrapperProps } from "src/components/QueryBoundaryWrapper";

import QueryBoundaryWrapper from "src/components/QueryBoundaryWrapper";

/** @deprecated This type has been renamed to `QueryBoundaryWrapperProps`. */
export type QueryBoundaryProps<DataType> = QueryBoundaryWrapperProps<DataType>;

/** @deprecated This component has been renamed to `QueryBoundaryWrapper` */
const QueryBoundary = QueryBoundaryWrapper;

export default QueryBoundary;
