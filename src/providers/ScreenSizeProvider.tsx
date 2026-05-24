import type { OptionalOnCondition } from "@alextheman/utility";
import type { ReactNode } from "react";

import type { ContextHookOptions } from "src/types";

import { DataError } from "@alextheman/utility/v6";
import { createContext, use, useMemo, useSyncExternalStore } from "react";

export interface ScreenSizeProps {
  /** The children that will be receiving the ScreenSizeContext. */
  children: ReactNode;
  /** The minimum screen width in pixels required to be considered a large screen. */
  largeScreenWidth?: number;
  /** The minimum screen height in pixels required to be considered a large screen. */
  largeScreenHeight?: number;
}

export interface ScreenDimensions {
  /** The current window width. */
  windowWidth: number;
  /** The current window height. */
  windowHeight: number;
}

export interface ScreenSizeContextValue extends ScreenDimensions {
  /** Whether the screen is a large screen or not. */
  isLargeScreen: boolean;
}

const ScreenSizeContext = createContext<ScreenSizeContextValue | undefined>({
  windowWidth: 0,
  windowHeight: 0,
  isLargeScreen: false,
});

/** Access the screen size context directly. */
export function useScreenSize<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, ScreenSizeContextValue> {
  const context = use(ScreenSizeContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "SCREEN_SIZE_PROVIDER_NOT_FOUND",
      "Could not find the ScreenSizeProvider context. Please double-check that it is present.",
    );
  }
  return context as OptionalOnCondition<Strict, ScreenSizeContextValue>;
}

let dimensions: ScreenDimensions = {
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
};

function getDimensions(): ScreenDimensions {
  return dimensions;
}

function subscribe(callback: () => void) {
  function handleResize() {
    dimensions = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };

    callback();
  }
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}

/** Provides context about the current screen size. */
function ScreenSizeProvider({
  children,
  largeScreenWidth = 669,
  largeScreenHeight = 660,
}: ScreenSizeProps) {
  const { windowWidth, windowHeight } = useSyncExternalStore<ScreenDimensions>(
    subscribe,
    getDimensions,
  );

  const isLargeScreen = useMemo(() => {
    return windowWidth > largeScreenWidth && windowHeight > largeScreenHeight;
  }, [windowWidth, windowHeight, largeScreenWidth, largeScreenHeight]);

  return (
    <ScreenSizeContext
      value={{
        isLargeScreen,
        windowWidth,
        windowHeight,
      }}
    >
      {children}
    </ScreenSizeContext>
  );
}

export default ScreenSizeProvider;
