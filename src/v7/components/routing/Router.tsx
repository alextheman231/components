import type { NonUndefined } from "@alextheman/utility";
import type { BaseLocationHook, RouterObject, RouterProps, useLocation } from "wouter";

import { escapeRegexPattern } from "@alextheman/utility";
import { Router as Wouter } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";

type SetLocation = ReturnType<typeof useLocation>[1];

function normaliseNestedRouterPath(path: string, router: RouterObject) {
  return path.replace(new RegExp(`^${escapeRegexPattern(router.base)}`), "");
}

function createCustomLocation(
  hook: BaseLocationHook = useBrowserLocation,
): NonUndefined<RouterProps["hook"]> {
  return (router: RouterObject): ReturnType<typeof useLocation> => {
    const [location, setLocation] = hook(router);

    return [
      location,
      (...[path, ...args]: Parameters<SetLocation>): ReturnType<SetLocation> => {
        const newPath = normaliseNestedRouterPath(path, router);
        return setLocation(newPath, ...args);
      },
    ];
  };
}

/**
 * An app Router that integrates with Wouter and handles nested routing behaviour.
 *
 * If you use a Wouter Link within a nested Route with Wouter, navigation can behave unexpectedly as it ends up resolving relative to the nested router's base URL. For example:
 *
 * ```tsx
 * <Route path="/users" nest>
 *    <Link to="/users/sign-in"> // Navigates to `/users/users/sign-in` (it appends the `to` prop to the `path` prop in the Route)
 *      View user details
 *    </Link>
 * </Route>
 * ```
 *
 * This can be surprising, especially when re-using page logic across routes, where you don't want links to rely on implicit nested routing behaviour. This router deals with the above so that, for as long as you define your nested routes in this Router component, the Link example above would navigate to `/users/sign-in` instead. That is, it uses the `to` prop as an absolute path rather than appending it to the parent Route path.
 *
 * This effectively makes all navigation behave as if paths are absolute (relative to the application's base URL), regardless of nested routing structure.
 */
function Router({ children, hook, ...routerProps }: Omit<RouterProps, "hrefs">) {
  return (
    <Wouter
      {...routerProps}
      hook={createCustomLocation(hook)}
      hrefs={(path, router) => {
        return normaliseNestedRouterPath(path, router);
      }}
    >
      {children}
    </Wouter>
  );
}

export default Router;
