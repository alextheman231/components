import type { ExternalLinkProps } from "src";

import { ExternalLink } from "src";

function ExternalLinkMain({ children, ...props }: ExternalLinkProps) {
  return <ExternalLink {...props}>{children}</ExternalLink>;
}

export default ExternalLinkMain;
