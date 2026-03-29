import type { RouterProps } from "wouter";

import { memoryLocation } from "wouter/memory-location";

import { Router } from "src/v7";

/**
 * A router that can be used with Wouter that stores all entries in memory. Works similarly to the `MemoryRouter` from `react-router-dom`.
 *
 * Note that it also contains the same absolute routing behaviour found in the base `Router` component from `@alextheman/components/v7`.
 */
function MemoryRouter({ children, ...routerProps }: Omit<RouterProps, "hook" | "hrefs">) {
  const { hook } = memoryLocation({ path: "/" });

  return (
    <Router {...routerProps} hook={hook}>
      {children}
    </Router>
  );
}

export default MemoryRouter;
