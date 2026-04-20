import type { QueryBoundaryDataProps } from "src/providers";

import { QueryBoundaryData } from "src/providers";

/** @deprecated This type has been renamed to QueryBoundaryDataProps. */
export type LoaderDataProps<DataType> = QueryBoundaryDataProps<DataType>;

/** @deprecated This component has been renamed to QueryBoundaryData. */
const LoaderData = QueryBoundaryData;

export default LoaderData;
