import type { OptionalOnCondition } from "@alextheman/utility";
import type { PaletteMode, ThemeOptions } from "@mui/material/styles";
import type { ReactNode } from "react";

import type { ContextHookOptions } from "src/root/types";

import { omitProperties } from "@alextheman/utility";
import { DataError } from "@alextheman/utility/v6";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createContext, use, useMemo, useState } from "react";

export interface ThemeContextValue {
  toggleMode: () => void;
  mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/** Access the mode context directly. */
export function useThemeContext<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, ThemeContextValue> {
  const context = use(ThemeContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "MODE_PROVIDER_NOT_FOUND",
      "Could not find the ModeProvider context. Please double-check that it is present.",
    );
  }
  return context as OptionalOnCondition<Strict, ThemeContextValue>;
}

export interface ThemeProviderProps {
  /** The children that will have access to the current mode. */
  children: ReactNode;
  /** The initial mode. */
  mode?: PaletteMode;
  /** Extra options to apply on top of our default theme options */
  themeOptions?: ThemeOptions;
}

/** Provides information about the current theme mode to its children components. */
function ThemeProvider({ children, mode: modeProp = "dark", themeOptions }: ThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(modeProp);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...omitProperties(themeOptions?.palette ?? {}, ["mode"]),
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: ({ theme }) => {
              return {
                border: 1,
                borderStyle: "solid",
                borderColor: theme.palette.divider,
              };
            },
            ...themeOptions?.components?.MuiPaper?.styleOverrides,
          },
          ...omitProperties(themeOptions?.components?.MuiPaper ?? {}, "styleOverrides"),
        },
        ...omitProperties(themeOptions?.components ?? {}, "MuiPaper"),
      },
      ...omitProperties(themeOptions ?? {}, ["components", "palette"]),
    });
  }, [mode, themeOptions]);

  return (
    <ThemeContext
      value={{
        mode,
        toggleMode: () => {
          setMode((prev) => {
            return prev === "light" ? "dark" : "light";
          });
        },
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext>
  );
}

export default ThemeProvider;
