import type { ReactNode } from "react";
import type { SwitchProps as WouterSwitchProps } from "wouter";

import { Route, Switch as WouterSwitch } from "wouter";

import ErrorPage from "src/v7/components/routing/ErrorPage";
import InternalLink from "src/v7/components/routing/InternalLink";

export interface SwitchProps extends WouterSwitchProps {
  /** The content to render if no routes match. */
  fallback?: ReactNode;
}

/**
 * A wrapper around Wouter's Switch that adds a fallback route.
 *
 * This ensures that any unmatched routes in the Switch always shows something rather than just showing an empty page.
 */
function Switch({
  children,
  fallback = (
    <ErrorPage title="Page Not Found">
      This page is not available. Please click <InternalLink to="/">here</InternalLink> to return to
      the homepage.
    </ErrorPage>
  ),
  ...switchProps
}: SwitchProps) {
  return (
    <WouterSwitch {...switchProps}>
      {children}
      <Route>{fallback}</Route>
    </WouterSwitch>
  );
}

export default Switch;
