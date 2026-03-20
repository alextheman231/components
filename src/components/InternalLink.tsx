import type { LinkProps } from "@mui/material/Link";
import type { ElementType, ReactNode, Ref } from "react";

import MUILink from "@mui/material/Link";
import { Link as ReactDOMLink } from "react-router-dom";

export interface InternalLinkProps extends Omit<LinkProps, "href" | "component"> {
  to: `/${string}` | `~/${string}` | (string & {});
  component?: ElementType;
  href?: never;
  children: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * A stylised link for navigating within your application.
 *
 * Uses the app router for client-side navigation and opens the destination in the same tab.
 *
 * Defaults to a React Router implementation but can be overridden via the `component` prop.
 *
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
