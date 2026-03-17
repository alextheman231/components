import { ExternalLink, ExternalLinkProps } from "src";

function ExternalLinkMain({ children, ...props }: ExternalLinkProps) {
  return <ExternalLink {...props}>{children}</ExternalLink>;
}

export default ExternalLinkMain;
