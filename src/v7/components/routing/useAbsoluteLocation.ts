import type { RouterObject } from "wouter";

import { useLocation, useRouter } from "wouter";

function resolveNestedRouterPath(path: string, router: RouterObject) {
  return `${router.base}/${path}`.replace(/\/+/g, "/");
}

/**
 * Returns the current app location as an absolute app-relative path, along with a function to set it.
 *
 * Unlike Wouter's default nested router behaviour, this hook always resolves locations relative to the application's root router, even when called within nested routers.
 *
 * @returns A tuple containing the current absolute app location and a function to navigate to a new location.
 */
function useAbsoluteLocation(
  ...args: Parameters<typeof useLocation>
): ReturnType<typeof useLocation> {
  const router = useRouter();
  const [location, setLocation] = useLocation(...args);

  return [resolveNestedRouterPath(location, router), setLocation];
}

export default useAbsoluteLocation;
