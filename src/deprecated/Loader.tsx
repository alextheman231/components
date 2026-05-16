import type { QueryBoundaryWrapperProps } from "src/components/QueryBoundaryWrapper";

import { QueryBoundaryWrapper } from "src/components";
/** @deprecated This type has been renamed to QueryBoundaryProps. */
export type LoaderProps<DataType> = QueryBoundaryWrapperProps<DataType>;
/** @deprecated This component has been renamed to QueryBoundary */
const Loader = QueryBoundaryWrapper;

export default Loader;
