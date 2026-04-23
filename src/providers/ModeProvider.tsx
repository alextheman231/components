import type { OptionalOnCondition } from "@alextheman/utility";
import type { PaletteMode } from "@mui/material/styles";
import type { ReactNode } from "react";

import type { ContextHookOptions } from "src/types";

import { DataError } from "@alextheman/utility/v6";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";

export interface ModeContextValue {
  toggleMode: () => void;
  mode: PaletteMode;
}

const ModeContext = createContext<ModeContextValue>({
  toggleMode: () => {},
  mode: "dark",
});

/** Access the mode context directly. */
export function useMode<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, ModeContextValue> {
  const context = useContext(ModeContext);
  if (strict && !context) {
    throw new DataError(
      { strict, context },
      "MODE_PROVIDER_NOT_FOUND",
      "Could not find the ModeProvider context. Please double-check that it is present.",
    );
  }
  return context;
}

export interface ModeProviderProps {
  /** The children that will have access to the current mode. */
  children: ReactNode;
  /** The initial mode. */
  mode?: PaletteMode;
}

/** Provides information about the current theme mode to its children components. */
function ModeProvider({ children, mode: modeProp = "dark" }: ModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(modeProp);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);

  return (
    <ModeContext.Provider
      value={{
        mode,
        toggleMode: () => {
          setMode((prev) => {
            return prev === "light" ? "dark" : "light";
          });
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ModeContext.Provider>
  );
}

export default ModeProvider;
