import type { QueryBoundaryDataProps } from "src/groups";

import { QueryBoundaryData } from "src/groups";

/** @deprecated This type has been renamed to QueryBoundaryDataProps. */
export type LoaderDataProps<DataType> = QueryBoundaryDataProps<DataType>;

/** @deprecated This component has been renamed to QueryBoundaryData. */
const LoaderData = QueryBoundaryData;

export default LoaderData;
