export { default as AudioProvider, useAudioContext } from "src/root/providers/AudioProvider";
export { default as AudioControls } from "src/root/providers/AudioProvider/AudioControls";
export {
  default as ScreenSizeProvider,
  useScreenSize,
} from "src/root/providers/ScreenSizeProvider";
export { default as SnackbarProvider, useSnackbar } from "src/root/providers/SnackbarProvider";
export { default as ThemeProvider, useTheme } from "src/root/providers/ThemeProvider";

export type {
  AudioContextValue,
  AudioProviderProps,
  TrackData,
} from "src/root/providers/AudioProvider";
export type {
  ScreenSizeProps,
  ScreenSizeContextValue,
  ScreenDimensions,
} from "src/root/providers/ScreenSizeProvider";
export type { SnackbarProviderProps } from "src/root/providers/SnackbarProvider";
export type { ThemeProviderProps, ThemeContextValue } from "src/root/providers/ThemeProvider";
