import type { JSX } from "react";

import type {
  DefaultQueryBoundaryComponentsBase,
  QueryBase,
} from "src/QueryBoundary/creators/createBaseQueryBoundary";
import type { QueryBoundaryValueProps } from "src/QueryBoundary/QueryBoundaryValue";

import createBaseQueryBoundary from "src/QueryBoundary/creators/createBaseQueryBoundary";
import QueryBoundaryValue from "src/QueryBoundary/QueryBoundaryValue";

export interface QueryObject<DataType extends object = Record<PropertyKey, unknown>> extends Omit<
  QueryBase<DataType>,
  "data"
> {
  /** The data being loaded. */
  data: DataType | null | undefined;
}

export interface CreateObjectQueryBoundaryParameters<
  DataType extends object = Record<PropertyKey, unknown>,
> {
  query: QueryObject<DataType>;
}

export interface DefaultQueryBoundaryObjectComponents<
  DataType extends object = Record<PropertyKey, unknown>,
> extends DefaultQueryBoundaryComponentsBase {
  /**
   * The component responsible for handling values from the data object provided in `createObjectQueryBoundary`.
   *
   * It will extract the value associated with the key specified by `propertyName`, formatting it according to the `valueFormatter` if provided.
   *
   * @template DataType - The type of data being loaded.
   *
   * @throws {DataError} If the data provided by `createObjectQueryBoundary` is not an object, and the `strictlyRequireObject` prop is `true` (it is by default).
   */
  Value: <Key extends keyof DataType>(
    props: Omit<QueryBoundaryValueProps<DataType, Key>, "data" | "isLoading" | "error">,
  ) => JSX.Element;
}

/** A creator function to create the system of QueryBoundary components with the data treated as an object of data items, fully typed throughout. */
function createObjectQueryBoundary<DataType extends object = Record<PropertyKey, unknown>>({
  query,
}: CreateObjectQueryBoundaryParameters<DataType>): DefaultQueryBoundaryObjectComponents<DataType> {
  const baseComponents = createBaseQueryBoundary({ query });

  return {
    ...baseComponents,
    Value: ({ valueFormatter, children, ...props }) => {
      if (valueFormatter !== undefined) {
        return <QueryBoundaryValue {...query} valueFormatter={valueFormatter} {...props} />;
      }

      if (children !== undefined) {
        return (
          <QueryBoundaryValue {...query} {...props}>
            {children}
          </QueryBoundaryValue>
        );
      }

      return <QueryBoundaryValue {...query} {...props} />;
    },
  };
}

export default createObjectQueryBoundary;
