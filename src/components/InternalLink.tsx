import type { LinkProps } from "@mui/material/Link";
import type { ReactNode, Ref } from "react";

import MUILink from "@mui/material/Link";
import { Link as ReactDOMLink } from "react-router-dom";

export interface InternalLinkProps extends Omit<LinkProps, "href"> {
  to: `/${string}` | `~/${string}` | (string & {});
  href?: never;
  children: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * A stylised link for navigating within your application.
 *
 * Uses the app router for client-side navigation and opens the destination in the same tab.
 *
 * @note
 * This component is coupled to the routing solution used by the application and may change if the routing implementation changes.
 */
function InternalLink({ to, children, ref, ...linkProps }: InternalLinkProps) {
  return (
    <MUILink component={ReactDOMLink} to={to} ref={ref} {...linkProps}>
      {children}
    </MUILink>
  );
}

export default InternalLink;
