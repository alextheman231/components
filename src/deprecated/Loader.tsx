import type { QueryBoundaryProps } from "src/components/QueryBoundary";

import { QueryBoundary } from "src/components";
/** @deprecated This type has been renamed to QueryBoundaryProps. */
export type LoaderProps<DataType> = QueryBoundaryProps<DataType>;
/** @deprecated This component has been renamed to QueryBoundary */
const Loader = QueryBoundary;

export default Loader;
