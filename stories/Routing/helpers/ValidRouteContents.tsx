import Stack from "@mui/material/Stack";

import { InternalLink } from "src/routing";

function ValidRouteContents() {
  return (
    <Stack>
      This is a valid route
      <InternalLink to="/">Back to main demonstration</InternalLink>
    </Stack>
  );
}

export default ValidRouteContents;
