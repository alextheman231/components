import type {
  QueryBoundaryErrorProps,
  QueryBoundaryFallbackProps,
  QueryBoundaryNullablePropsWithNullable,
  QueryBoundaryNullablePropsWithUndefinedOrNull,
} from "src/providers";

import { QueryBoundaryFallback } from "src/providers";

/** @deprecated This type has been renamed to QueryBoundaryErrorProps. */
export type LoaderErrorBaseProps = QueryBoundaryErrorProps;

/** @deprecated This type has been renamed to QueryBoundaryNullablePropsWithUndefinedOrNull. */
export type LoaderErrorPropsWithUndefinedOrNull = LoaderErrorBaseProps &
  QueryBoundaryNullablePropsWithUndefinedOrNull;

/** @deprecated This type has been renamed to QueryBoundaryNullablePropsWithNullable. */
export type LoaderErrorPropsWithNullable = LoaderErrorBaseProps &
  QueryBoundaryNullablePropsWithNullable;

/** @deprecated This type has been renamed to QueryBoundaryFallbackProps. */
export type LoaderErrorProps = QueryBoundaryFallbackProps;

/** @deprecated This component has been renamed to LoaderError. */
const LoaderError = QueryBoundaryFallback;

export default LoaderError;
