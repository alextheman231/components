import type { ThemeContextValue, ThemeProviderProps } from "src/providers";

import { ThemeProvider, useTheme } from "src/providers";

/** @deprecated This type has been renamed to `ThemeProviderProps` */
export type ModeProviderProps = ThemeProviderProps;
/** @deprecated This type has been renamed to `ThemeContextValue` */
export type ModeContextValue = ThemeContextValue;
/** @deprecated This hook has been renamed to `useTheme` */
export const useMode = useTheme;

/** @deprecated This component has been renamed to `ThemeProvider`. */
const ModeProvider = ThemeProvider;

export default ModeProvider;
