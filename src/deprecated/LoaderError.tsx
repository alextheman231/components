import type {
  QueryBoundaryErrorBaseProps,
  QueryBoundaryErrorProps,
  QueryBoundaryErrorPropsWithNullable,
  QueryBoundaryErrorPropsWithUndefinedOrNull,
} from "src/providers";

import { QueryBoundaryError } from "src/providers";

/** @deprecated This type has been renamed to QueryBoundaryErrorBaseProps. */
export type LoaderErrorBaseProps = QueryBoundaryErrorBaseProps;

/** @deprecated This type has been renamed to QueryBoundaryErrorPropsWithUndefinedOrNull. */
export type LoaderErrorPropsWithUndefinedOrNull = QueryBoundaryErrorPropsWithUndefinedOrNull;

/** @deprecated This type has been renamed to QueryBoundaryErrorPropsWithNullable. */
export type LoaderErrorPropsWithNullable = QueryBoundaryErrorPropsWithNullable;

/** @deprecated This type has been renamed to QueryBoundaryErrorProps. */
export type LoaderErrorProps = QueryBoundaryErrorProps;

/** @deprecated This component has been renamed to LoaderError. */
const LoaderError = QueryBoundaryError;

export default LoaderError;
