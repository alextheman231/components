import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { InternalLink } from "src/v7";

interface MainRouteLinksProps {
  showValid?: boolean;
  showNestedValid?: boolean;
  showInvalid?: boolean;
  showNestedInvalid?: boolean;
}

function MainRouteLinks({
  showValid,
  showNestedValid,
  showInvalid,
  showNestedInvalid,
}: MainRouteLinksProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Please choose a link</Typography>
      {showValid ? <InternalLink to="/valid">Go to a valid route</InternalLink> : null}
      {showNestedValid ? (
        <InternalLink to="/nested/valid">Go to a valid nested route</InternalLink>
      ) : null}
      {showInvalid ? <InternalLink to="/invalid">Go to an invalid route</InternalLink> : null}
      {showNestedInvalid ? (
        <InternalLink to="/nested/invalid">Go to an invalid nested route</InternalLink>
      ) : null}
    </Stack>
  );
}

export default MainRouteLinks;
