import type { LinkProps } from "@mui/material/Link";
import type { ElementType, ReactNode, Ref } from "react";

import MUILink from "@mui/material/Link";
import { Link as ReactDOMLink } from "react-router-dom";

export interface InternalLinkProps extends Omit<LinkProps, "href" | "component"> {
  /** The path to navigate to */
  to: `/${string}` | `~/${string}` | (string & {});
  /**
   * An optional component to provide to override the current component.
   *
   * Note that the provided component must:
   * - accept a `to` prop
   * - correctly handle the forwarded `ref`
   * - render a valid anchor element (or equivalent) for proper accessibility
   */
  component?: ElementType;
  href?: never;
  /** The readable content to display on the link. */
  children: ReactNode;
  /** An optional ref to allow it to be used with polymorphic components. */
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * A stylised link for navigating within your application.
 *
 * Uses the app router for client-side navigation and opens the destination in the same tab.
 *
 * Defaults to a React Router implementation but can be overridden via the `component` prop.
 */
function InternalLink({
  to,
  component = ReactDOMLink,
  children,
  ref,
  ...linkProps
}: InternalLinkProps) {
  return (
    <MUILink component={component} to={to} ref={ref} {...linkProps}>
      {children}
    </MUILink>
  );
}

export default InternalLink;
