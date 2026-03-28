import type { OptionalOnCondition } from "@alextheman/utility";
import type { ReactNode } from "react";

import type { ContextHookOptions } from "src/types";

import { DataError } from "@alextheman/utility";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface ScreenSizeProps {
  /** The children that will be receiving the ScreenSizeContext. */
  children: ReactNode;
  /** The minimum screen width in pixels required to be considered a large screen. */
  largeScreenWidth?: number;
  /** The minimum screen height in pixels required to be considered a large screen. */
  largeScreenHeight?: number;
}

export interface ScreenSizeContextValue {
  /** Whether the screen is a large screen or not. */
  isLargeScreen: boolean;
  /** The current window width. */
  windowWidth: number;
  /** The current window height. */
  windowHeight: number;
}

const ScreenSizeContext = createContext<ScreenSizeContextValue>({
  windowWidth: 0,
  windowHeight: 0,
  isLargeScreen: false,
});

/** Access the screen size context directly. */
export function useScreenSize<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, ScreenSizeContextValue> {
  const context = useContext(ScreenSizeContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "SCREEN_SIZE_PROVIDER_NOT_FOUND",
      "Could not find the ScreenSizeProvider context. Please double-check that it is present.",
    );
  }
  return context;
}

/** Provides context about the current screen size. */
function ScreenSizeProvider({
  children,
  largeScreenWidth = 669,
  largeScreenHeight = 660,
}: ScreenSizeProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function setDimensions() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
    setDimensions();
    window.addEventListener("resize", setDimensions);
    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  const isLargeScreen = useMemo(() => {
    return windowWidth > largeScreenWidth && windowHeight > largeScreenHeight;
  }, [windowWidth, windowHeight, largeScreenWidth, largeScreenHeight]);

  return (
    <ScreenSizeContext.Provider
      value={{
        isLargeScreen,
        windowWidth,
        windowHeight,
      }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
}

export default ScreenSizeProvider;
