import type {
  QueryBoundaryContextValue,
  QueryBoundaryProviderBaseProps,
  QueryBoundaryProviderProps,
  QueryBoundaryProviderPropsWithError,
  QueryBoundaryProviderPropsWithNoError,
} from "src/groups/QueryBoundary/QueryBoundaryProvider";

import QueryBoundaryProvider, {
  useQueryBoundary,
} from "src/groups/QueryBoundary/QueryBoundaryProvider";

/** @deprecated This type has been renamed to QueryBoundaryProviderBaseProps. */
export type LoaderProviderBaseProps<DataType> = QueryBoundaryProviderBaseProps<DataType>;

/** @deprecated This type has been renamed to QueryBoundaryProviderPropsWithNoError. */
export type LoaderProviderPropsWithNoError<DataType> =
  QueryBoundaryProviderPropsWithNoError<DataType>;

/** @deprecated This type has been renamed to QueryBoundaryProviderPropsWithError. */
export type LoaderProviderPropsWithError<DataType> = QueryBoundaryProviderPropsWithError<DataType>;

/** @deprecated This type has been renamed to QueryBoundaryContextValue. */
export type LoaderContextValue<DataType> = QueryBoundaryContextValue<DataType>;
/** @deprecated This type has been renamed to QueryBoundaryProviderProps. */
export type LoaderProviderProps<DataType> = QueryBoundaryProviderProps<DataType>;

/** @deprecated This hook has been renamed to useQueryBoundary */
export const useLoader = useQueryBoundary;

/** @deprecated This component has been renamed to QueryBoundaryProvider */
const LoaderProvider = QueryBoundaryProvider;

export default LoaderProvider;
