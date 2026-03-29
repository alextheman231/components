import type { ReactNode } from "react";

import Stack from "@mui/material/Stack";
import VALID_ROUTE from "stories/Routing/helpers/constants/VALID_ROUTE";
import { Route } from "wouter";

import { InternalLink, Switch } from "src/v7";

interface NestedRouterProps {
  fallback?: ReactNode;
}

function NestedRouter({ fallback }: NestedRouterProps) {
  return (
    <Switch fallback={fallback}>
      <Route path={VALID_ROUTE}>
        <Stack>
          This is a valid nested route
          <InternalLink to="/">Back to main demonstration</InternalLink>
        </Stack>
      </Route>
    </Switch>
  );
}

export default NestedRouter;
