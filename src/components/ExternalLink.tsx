import type { LinkProps } from "@mui/material/Link";
import type { ReactNode, Ref } from "react";

import MUILink from "@mui/material/Link";

export interface ExternalLinkProps extends Omit<LinkProps, "to" | "target" | "rel"> {
  /** The URL of the place you want to navigate to. */
  href: `https://${string}` | `http://${string}` | (string & {});
  to?: never;
  /** The readable content to display on the link. */
  children: ReactNode;
  /** An optional ref to allow it to be used with polymorphic components. */
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * A stylised link that is best used when you want to navigate to a different domain.
 *
 * Opens the destination in a new tab and applies recommended security defaults automatically.
 */
function ExternalLink({ href, children, ref, ...linkProps }: ExternalLinkProps) {
  return (
    <MUILink
      component="a"
      href={href}
      ref={ref}
      target="_blank"
      rel="noopener noreferrer"
      {...linkProps}
    >
      {children}
    </MUILink>
  );
}

export default ExternalLink;
